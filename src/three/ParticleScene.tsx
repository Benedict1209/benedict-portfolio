import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { halftoneShader, particleFragmentShader, particleVertexShader } from './particleShaders'
import { getScrollProgress } from '../lib/scroll'

/**
 * Material palette. Particles are not tinted at random — each one is assigned
 * to a warm or cool family so the sculpture reads as one object rather than
 * confetti. Gold dominates, blue accents carry the core, ember stays rare.
 */
const GOLD_DEEP = new THREE.Color('#c25a0c')
const GOLD_LIGHT = new THREE.Color('#ffd79a')
const BLUE_DEEP = new THREE.Color('#1d3f86')
const BLUE_LIGHT = new THREE.Color('#8cc8ff')
const EMBER = new THREE.Color('#e4534f')

/**
 * Stage composition. Each chapter places the sculpture in the viewport's
 * negative space instead of behind running copy. Values are world units.
 */
const MODEL_POSITIONS = [
  new THREE.Vector3(2.6, 0.1, 0),
  new THREE.Vector3(5.8, -4.4, -1.4),
  new THREE.Vector3(7.5, 3.2, -3.8),
  new THREE.Vector3(7.5, 2.2, -1.1),
  new THREE.Vector3(8, 2.4, -1.4),
  new THREE.Vector3(-4.4, 0.6, -1.2),
]

/** Size of the work per chapter. Reading chapters recede. */
const MODEL_SCALES = [1, 0.7, 0.76, 0.84, 0.72, 1]

/** How present the artwork is per chapter (multiplied by base opacity). */
const MODEL_PRESENCE = [1, 0.36, 0.42, 0.55, 0.4, 0.86]

const CAMERA_STOPS = [
  new THREE.Vector3(0, 0.4, 34),
  new THREE.Vector3(-1.8, 1.2, 30),
  new THREE.Vector3(2, -1.1, 28),
  new THREE.Vector3(-1.4, 1.1, 30),
  new THREE.Vector3(0, 0.8, 26),
  new THREE.Vector3(0, -0.2, 22),
]

/** Focal length breathes between chapters, like a slow lens pull. */
const FOV_STOPS = [58, 52, 55, 50, 54, 62]

const STAGE_SECTIONS = ['home', 'about', 'skills', 'projects', 'experience', 'contact']

const CAMERA_Z = 34

function sampleStops(stops: number[], position: number) {
  const scaled = Math.min(Math.max(position, 0), stops.length - 0.000001)
  const index = Math.floor(scaled)
  const t = smoothstep(scaled - index)
  const next = Math.min(index + 1, stops.length - 1)
  return stops[index] + (stops[next] - stops[index]) * t
}

function smoothstep(value: number) {
  const t = Math.min(1, Math.max(0, value))
  return t * t * (3 - 2 * t)
}

function getParticleCount() {
  return window.innerWidth < 768 ? 12000 : 26000
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    )
  } catch {
    return false
  }
}

function getDotSize(width: number) {
  if (width < 480) return 40
  if (width < 768) return 80
  if (width < 1280) return 120
  if (width < 1600) return 200
  return 300
}

type ParticleForm = {
  geometries: THREE.BufferGeometry[]
  weights?: number[]
  jitter?: number
  fill?: number
}

function createHelix(offsetAngle: number) {
  const points: THREE.Vector3[] = []
  const turns = 2.4

  for (let index = 0; index <= 240; index += 1) {
    const t = index / 240
    const angle = offsetAngle + t * Math.PI * 2 * turns
    const radius = 4.5 * (1 - 0.1 * Math.sin(t * Math.PI))
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        -7 + t * 14,
        Math.sin(angle) * radius,
      ),
    )
  }

  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 320, 0.28, 8, false)
}

function createCubeEdges(size: number, thickness: number) {
  const half = size / 2
  const barX = new THREE.BoxGeometry(size, thickness, thickness)
  const barY = new THREE.BoxGeometry(thickness, size, thickness)
  const barZ = new THREE.BoxGeometry(thickness, thickness, size)

  return [
    barX.clone().translate(0, half, half),
    barX.clone().translate(0, half, -half),
    barX.clone().translate(0, -half, half),
    barX.clone().translate(0, -half, -half),
    barY.clone().translate(half, 0, half),
    barY.clone().translate(half, 0, -half),
    barY.clone().translate(-half, 0, half),
    barY.clone().translate(-half, 0, -half),
    barZ.clone().translate(half, half, 0),
    barZ.clone().translate(half, -half, 0),
    barZ.clone().translate(-half, half, 0),
    barZ.clone().translate(-half, -half, 0),
  ]
}

function createFormGeometries(): ParticleForm[] {
  const seed = new THREE.IcosahedronGeometry(7.1, 4)
  const seedRing = new THREE.TorusGeometry(6.9, 0.55, 10, 120).rotateX(Math.PI / 2.35)
  const seedArm = new THREE.TorusGeometry(5.4, 0.42, 8, 96).rotateY(Math.PI / 2.6)

  // About — a planet: dense sphere with two offset orbital rings.
  const planet = new THREE.SphereGeometry(6.1, 72, 48)
  const planetRing = new THREE.TorusGeometry(7.5, 0.18, 8, 150).rotateX(Math.PI / 2.35)
  const planetRingInner = new THREE.TorusGeometry(5.5, 0.14, 8, 120).rotateY(Math.PI / 2.9)

  // Skills — a wireframe lattice: structure, stacked systems, an organised toolkit.
  const cubeEdges = createCubeEdges(10.4, 0.16)
  const cubeCore = new THREE.SphereGeometry(2.1, 32, 24)

  // Projects — a stepped monolith: built mass, one layer at a time.
  const foundation = new THREE.BoxGeometry(11.5, 1.5, 5.2)
  const storey = new THREE.BoxGeometry(8.4, 1.3, 4.2).translate(0, 2.7, 0)
  const crown = new THREE.BoxGeometry(5.2, 1.2, 3.2).translate(0, 4.8, 0)
  const spire = new THREE.CylinderGeometry(0.18, 0.62, 8.6, 20, 1, true).translate(0, 9.6, 0)

  // Experience — a double helix: a path, a sequence, a record of steps.
  const helixA = createHelix(0)
  const helixB = createHelix(Math.PI)

  const portalRing = new THREE.TorusGeometry(7.2, 0.24, 10, 120)
  const portalRingInner = new THREE.TorusGeometry(5.4, 0.18, 10, 108)
  const portalField = new THREE.RingGeometry(3.2, 7.05, 110, 1)
  const portalCore = new THREE.CircleGeometry(2.35, 96)

  return [
    {
      geometries: [seed, seedRing, seedArm],
      weights: [0.74, 0.14, 0.12],
      jitter: 0.5,
      fill: 0.34,
    },
    {
      geometries: [planet, planetRing, planetRingInner],
      weights: [0.76, 0.14, 0.1],
      jitter: 0.22,
    },
    {
      geometries: [...cubeEdges, cubeCore],
      jitter: 0.16,
    },
    {
      geometries: [foundation, storey, crown, spire],
      weights: [0.34, 0.28, 0.24, 0.14],
      jitter: 0.16,
    },
    {
      geometries: [helixA, helixB],
      weights: [0.5, 0.5],
      jitter: 0.14,
    },
    {
      geometries: [portalRing, portalRingInner, portalField, portalCore],
      weights: [0.28, 0.26, 0.34, 0.12],
      jitter: 0.16,
    },
  ]
}

function sampleForm(
  geometries: THREE.BufferGeometry[],
  count: number,
  weights?: number[],
  jitter = 0,
  fill?: number,
) {
  const positions = new Float32Array(count * 3)
  const totalWeight = weights?.reduce((sum, weight) => sum + weight, 0) ?? geometries.length
  let cursor = 0

  geometries.forEach((geometry, geometryIndex) => {
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial())
    mesh.updateMatrixWorld(true)

    const sampler = new MeshSurfaceSampler(mesh).build()
    const isLast = geometryIndex === geometries.length - 1
    const weight = weights?.[geometryIndex] ?? 1
    const sampleCount = isLast
      ? count - cursor
      : Math.floor((count * weight) / totalWeight)
    const sample = new THREE.Vector3()

    for (let index = 0; index < sampleCount; index += 1) {
      sampler.sample(sample)
      const target = (cursor + index) * 3
      const fillScale =
        fill !== undefined && geometryIndex === 0
          ? fill + (1 - fill) * Math.cbrt(Math.random())
          : 1
      positions[target] = sample.x * fillScale + (Math.random() - 0.5) * jitter
      positions[target + 1] = sample.y * fillScale + (Math.random() - 0.5) * jitter
      positions[target + 2] = sample.z * fillScale + (Math.random() - 0.5) * jitter
    }

    cursor += sampleCount
    mesh.material.dispose()
    geometry.dispose()
  })

  return positions
}

function createParticleGeometry() {
  const count = getParticleCount()
  const forms = createFormGeometries()
  const positions = forms.map((form) =>
    sampleForm(form.geometries, count, form.weights, form.jitter, form.fill),
  )
  const colors = new Float32Array(count * 3)
  const opacities = new Float32Array(count)
  const scales = new Float32Array(count)
  const color = new THREE.Color()

  for (let index = 0; index < count; index += 1) {
    // A coherent material: amber body, blue core accents, rare ember sparks.
    // Tone is driven by height so the object reads with a warm top and cool base.
    const height = positions[0][index * 3 + 1] / 14
    const tone = Math.min(1, Math.max(0, 0.5 + height * 0.45 + (Math.random() - 0.5) * 0.36))
    const family = Math.random()

    if (family < 0.66) {
      color.copy(GOLD_DEEP).lerp(GOLD_LIGHT, tone)
    } else if (family < 0.92) {
      color.copy(BLUE_DEEP).lerp(BLUE_LIGHT, tone)
    } else {
      color.copy(EMBER).lerp(GOLD_LIGHT, tone * 0.55)
    }

    colors[index * 3] = color.r
    colors[index * 3 + 1] = color.g
    colors[index * 3 + 2] = color.b
    opacities[index] = 0.3 + Math.random() * 0.56
    scales[index] = 0.52 + Math.random() * 0.72
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions[0], 3))
  geometry.setAttribute('aPositionB', new THREE.BufferAttribute(positions[1], 3))
  geometry.setAttribute('aPositionC', new THREE.BufferAttribute(positions[2], 3))
  geometry.setAttribute('aPositionD', new THREE.BufferAttribute(positions[3], 3))
  geometry.setAttribute('aPositionE', new THREE.BufferAttribute(positions[4], 3))
  geometry.setAttribute('aPositionF', new THREE.BufferAttribute(positions[5], 3))
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1))
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
  geometry.computeBoundingSphere()

  return geometry
}

function createAmbientParticles({
  count,
  spread,
  size,
  opacity,
}: {
  count: number
  spread: number
  size: number
  opacity: number
}) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const color = new THREE.Color()

  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (Math.random() - 0.5) * spread
    positions[index * 3 + 1] = (Math.random() - 0.5) * spread
    positions[index * 3 + 2] = (Math.random() - 0.5) * spread

    if (Math.random() < 0.72) {
      color.copy(GOLD_DEEP).lerp(GOLD_LIGHT, Math.random())
    } else {
      color.copy(BLUE_DEEP).lerp(BLUE_LIGHT, Math.random())
    }

    colors[index * 3] = color.r
    colors[index * 3 + 1] = color.g
    colors[index * 3 + 2] = color.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size,
    sizeAttenuation: true,
    transparent: true,
    opacity,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const points = new THREE.Points(geometry, material)
  points.frustumCulled = false

  return points
}

export function ParticleScene({ ready }: { ready: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const readyRef = useRef(ready)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    readyRef.current = ready
  }, [ready])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!supportsWebGL()) {
      const timeout = window.setTimeout(() => setFailed(true), 0)
      return () => window.clearTimeout(timeout)
    }

    let renderer: THREE.WebGLRenderer

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: (window.devicePixelRatio || 1) < 2,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      const timeout = window.setTimeout(() => setFailed(true), 0)
      return () => window.clearTimeout(timeout)
    }

    const canvas = renderer.domElement
    canvas.className = 'scene-canvas'
    container.appendChild(canvas)

    let contextLost = false
    const handleContextLost = (event: Event) => {
      event.preventDefault()
      contextLost = true
      setFailed(true)
    }
    canvas.addEventListener('webglcontextlost', handleContextLost)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      220,
    )
    camera.position.set(0, 0, CAMERA_Z)

    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    renderer.setSize(window.innerWidth, window.innerHeight, false)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NoToneMapping

    const group = new THREE.Group()
    scene.add(group)

    const ambientScale = window.innerWidth < 768 ? 0.58 : 1
    const ambientFar = createAmbientParticles({
      count: Math.round(460 * ambientScale),
      spread: 44,
      size: 0.075,
      opacity: 0.36,
    })
    const ambientNear = createAmbientParticles({
      count: Math.round(300 * ambientScale),
      spread: 18,
      size: 0.14,
      opacity: 0.55,
    })
    scene.add(ambientFar, ambientNear)

    const particleGeometry = createParticleGeometry()
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uIntro: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uPulse: { value: 0 },
        uCursor: { value: new THREE.Vector3() },
      },
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    particles.frustumCulled = false
    group.add(particles)

    const composer = new EffectComposer(renderer)
    composer.setPixelRatio(renderer.getPixelRatio())
    composer.setSize(window.innerWidth, window.innerHeight)
    composer.addPass(new RenderPass(scene, camera))

    const halftonePass = new ShaderPass(halftoneShader)
    halftonePass.uniforms.uResolution.value = new THREE.Vector2(
      window.innerWidth * renderer.getPixelRatio(),
      window.innerHeight * renderer.getPixelRatio(),
    )
    halftonePass.uniforms.uSize.value = getDotSize(window.innerWidth)
    composer.addPass(halftonePass)

    const pointerTarget = new THREE.Vector2(0, 0)
    const pointerCurrent = new THREE.Vector2(0, 0)
    const cursorWorld = new THREE.Vector3()
    const groupPosition = new THREE.Vector3()
    const cameraTarget = new THREE.Vector3()
    const cameraAim = new THREE.Vector3()
    let currentProgress = 0
    let currentStage = 0
    let currentIntro = 0
    let pointerPulse = 0
    let frame = 0
    let baseOpacity = window.innerWidth < 768 ? 0.72 : 0.95
    let stageStops = STAGE_SECTIONS.map((_, index) => index / (STAGE_SECTIONS.length - 1))

    const measureStageStops = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return

      const measured = STAGE_SECTIONS.map((id, index) => {
        const section = document.getElementById(id)
        if (!section) return index / (STAGE_SECTIONS.length - 1)
        const top = section.getBoundingClientRect().top + window.scrollY
        return Math.min(1, Math.max(0, (top - window.innerHeight * 0.18) / scrollable))
      })

      measured[0] = 0
      for (let index = 1; index < measured.length; index += 1) {
        measured[index] = Math.max(measured[index], measured[index - 1] + 0.01)
      }
      stageStops = measured
    }

    const getStageProgress = (progress: number) => {
      const clamped = Math.min(1, Math.max(0, progress))
      for (let index = 0; index < stageStops.length - 1; index += 1) {
        const start = stageStops[index]
        const end = stageStops[index + 1]
        if (clamped <= end) {
          const local = (clamped - start) / Math.max(end - start, 0.0001)
          // Hold the formed sculpture through most of a chapter, then resolve
          // into the next form in the final third. This is what makes the work
          // read as a sculpture instead of a permanently dissolving cloud.
          const morph = smoothstep((Math.min(1, Math.max(0, local)) - 0.6) / 0.32)
          return index + morph
        }
      }
      return stageStops.length - 1
    }

    const updateGroupPosition = (stageProgress: number) => {
      const scaled = Math.min(stageProgress, MODEL_POSITIONS.length - 0.000001)
      const index = Math.floor(scaled)
      const t = smoothstep(scaled - index)
      groupPosition.lerpVectors(
        MODEL_POSITIONS[index],
        MODEL_POSITIONS[Math.min(index + 1, MODEL_POSITIONS.length - 1)],
        t,
      )
      if (window.innerWidth < 768) {
        groupPosition.x *= 0.28
        groupPosition.y -= 6.2
        groupPosition.z = -2
      }
      group.position.copy(groupPosition)
    }

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75)

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(width, height, false)
      composer.setPixelRatio(pixelRatio)
      composer.setSize(width, height)

      particleMaterial.uniforms.uPixelRatio.value = pixelRatio
      halftonePass.uniforms.uResolution.value.set(width * pixelRatio, height * pixelRatio)
      halftonePass.uniforms.uSize.value = getDotSize(width)

      baseOpacity = width < 768 ? 0.62 : 0.9
      canvas.style.opacity = String(baseOpacity)
      measureStageStops()
      updateGroupPosition(currentStage)
      group.scale.setScalar(
        sampleStops(MODEL_SCALES, currentStage) * (width < 768 ? 0.52 : 1),
      )

      if (reducedMotion) {
        composer.render()
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerTarget.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1),
      )
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') pointerPulse = 1
    }

    const handleRefresh = () => {
      measureStageStops()
      updateGroupPosition(currentStage)
      if (reducedMotion) composer.render()
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('load', handleRefresh)
    window.addEventListener('portfolio:refresh', handleRefresh)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })

    if (reducedMotion) {
      currentProgress = getScrollProgress()
      currentStage = getStageProgress(currentProgress)
      currentIntro = 1
      particleMaterial.uniforms.uProgress.value = currentStage / (MODEL_POSITIONS.length - 1)
      particleMaterial.uniforms.uIntro.value = currentIntro
      updateGroupPosition(currentStage)
      group.rotation.y = currentStage * 0.55
      group.scale.setScalar(
        sampleStops(MODEL_SCALES, currentStage) * (window.innerWidth < 768 ? 0.52 : 1),
      )
      canvas.style.opacity = String(
        baseOpacity * sampleStops(MODEL_PRESENCE, currentStage) * 0.7,
      )
      composer.render()
    } else {
      const render = (time: number) => {
        if (contextLost) return

        const targetProgress = getScrollProgress()

        currentProgress += (targetProgress - currentProgress) * 0.1
        currentStage += (getStageProgress(currentProgress) - currentStage) * 0.085
        currentIntro += ((readyRef.current ? 1 : 0) - currentIntro) * 0.045
        pointerCurrent.lerp(pointerTarget, 0.065)
        pointerPulse *= 0.93

        const elapsed = time / 1000
        const mobile = window.innerWidth < 768
        const scaledCamera = Math.min(currentStage, CAMERA_STOPS.length - 0.000001)
        const cameraIndex = Math.floor(scaledCamera)
        const cameraMix = smoothstep(scaledCamera - cameraIndex)

        cameraTarget.lerpVectors(
          CAMERA_STOPS[cameraIndex],
          CAMERA_STOPS[Math.min(cameraIndex + 1, CAMERA_STOPS.length - 1)],
          cameraMix,
        )

        const cameraX = cameraTarget.x + pointerCurrent.x * (mobile ? 0.8 : 2.6)
        const cameraY = cameraTarget.y + pointerCurrent.y * (mobile ? 0.5 : 1.7)
        const cameraZ = cameraTarget.z + Math.sin(elapsed * 0.12) * 0.45

        camera.position.x += (cameraX - camera.position.x) * 0.045
        camera.position.y += (cameraY - camera.position.y) * 0.045
        camera.position.z += (cameraZ - camera.position.z) * 0.04

        // Slow focal-length breath: each chapter gets its own lens character.
        const targetFov = sampleStops(FOV_STOPS, currentStage)
        if (Math.abs(camera.fov - targetFov) > 0.01) {
          camera.fov += (targetFov - camera.fov) * 0.035
          camera.updateProjectionMatrix()
        }

        cameraAim.set(groupPosition.x * 0.34, groupPosition.y * 0.28, 0)
        camera.lookAt(cameraAim)

        updateGroupPosition(currentStage)
        const targetScale =
          sampleStops(MODEL_SCALES, currentStage) * (mobile ? 0.52 : 1)
        const nextScale = group.scale.x + (targetScale - group.scale.x) * 0.06
        group.scale.setScalar(nextScale)

        group.rotation.y = currentStage * 0.55 + Math.sin(elapsed * 0.14) * 0.1
        group.rotation.x = Math.sin(currentStage * 0.9 + elapsed * 0.18) * 0.08
        group.rotation.z = Math.sin(currentStage * 1.7 + elapsed * 0.09) * 0.035

        ambientFar.rotation.y = elapsed * 0.014 + currentProgress * Math.PI * 1.6
        ambientFar.rotation.x = currentProgress * Math.PI * 0.38
        ambientNear.rotation.y = -elapsed * 0.024 - currentProgress * Math.PI * 1.2
        ambientNear.rotation.z = elapsed * 0.012 + currentProgress * Math.PI * 0.3

        cursorWorld.set(pointerCurrent.x * 18, pointerCurrent.y * 18, 0)

        particleMaterial.uniforms.uTime.value = elapsed
        particleMaterial.uniforms.uProgress.value =
          currentStage / (MODEL_POSITIONS.length - 1)
        particleMaterial.uniforms.uIntro.value = currentIntro
        particleMaterial.uniforms.uPulse.value = pointerPulse
        particleMaterial.uniforms.uCursor.value.copy(cursorWorld)
        halftonePass.uniforms.uTime.value = elapsed

        // Presence follows the chapter: full in the hero, quieter behind
        // long-form copy, opening up again for the contact chapter. Education
        // and certifications share the journey -> contact morph, so the
        // artwork dips almost to texture while those dense card stacks read.
        const segmentLocal = currentStage - Math.floor(currentStage)
        const quietReading =
          currentStage > 4 && currentStage < 5
            ? 1 - 0.72 * Math.sin(Math.PI * segmentLocal)
            : 1
        const presence = sampleStops(MODEL_PRESENCE, currentStage) * quietReading
        // Below 1440px the reading column spans most of the viewport, so the
        // artwork drops to a texture once the hero is passed.
        const compactDamp = window.innerWidth < 1440 && currentStage > 0.7 ? 0.4 : 1
        canvas.style.opacity = String(
          baseOpacity * presence * compactDamp * (0.72 + currentIntro * 0.28),
        )

        composer.render()
        frame = window.requestAnimationFrame(render)
      }

      frame = window.requestAnimationFrame(render)
    }

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('load', handleRefresh)
      window.removeEventListener('portfolio:refresh', handleRefresh)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('webglcontextlost', handleContextLost)

      particleGeometry.dispose()
      particleMaterial.dispose()
      ambientFar.geometry.dispose()
      ;(ambientFar.material as THREE.PointsMaterial).dispose()
      ambientNear.geometry.dispose()
      ;(ambientNear.material as THREE.PointsMaterial).dispose()
      composer.dispose()
      renderer.dispose()
      canvas.remove()
    }
  }, [])

  return (
    <div ref={containerRef} className="scene-shell" aria-hidden="true">
      {failed ? <div className="scene-fallback" /> : null}
    </div>
  )
}
