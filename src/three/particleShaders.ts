export const particleVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uIntro;
  uniform float uPixelRatio;
  uniform float uPulse;
  uniform vec3 uCursor;

  attribute vec3 aPositionB;
  attribute vec3 aPositionC;
  attribute vec3 aPositionD;
  attribute vec3 aPositionE;
  attribute vec3 aPositionF;
  attribute vec3 aColor;
  attribute float aOpacity;
  attribute float aScale;

  varying vec3 vColor;
  varying float vOpacity;

  float easeInOut(float t) {
    return t * t * (3.0 - 2.0 * t);
  }

  void main() {
    float p = clamp(uProgress, 0.0, 1.0) * 4.999;
    float segment = floor(p);
    float t = easeInOut(fract(p));

    vec3 pos;

    if (segment < 1.0) {
      pos = mix(position, aPositionB, t);
    } else if (segment < 2.0) {
      pos = mix(aPositionB, aPositionC, t);
    } else if (segment < 3.0) {
      pos = mix(aPositionC, aPositionD, t);
    } else if (segment < 4.0) {
      pos = mix(aPositionD, aPositionE, t);
    } else {
      pos = mix(aPositionE, aPositionF, t);
    }

    float wave = sin(fract(p) * 3.14159265);
    wave = wave * wave;

    vec3 normalish = normalize(pos + vec3(0.0001));
    float radial = smoothstep(0.0, 4.5, length(pos));
    pos += normalish * wave * 2.6 * aScale * radial;
    pos += normalish * sin(uTime * 0.75 + position.x * 0.35) * 0.14;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);

    vec2 cursorDelta = worldPos.xy - uCursor.xy;
    float cursorDist = length(cursorDelta);
    vec2 cursorDirection = normalize(cursorDelta + vec2(0.0001));
    float cursorField = smoothstep(9.0, 0.0, cursorDist);
    float pulseField = cursorField * uPulse;
    float cursorPush = cursorField * 2.2 + pulseField * 4.2;

    worldPos.xy += cursorDirection * cursorPush;
    worldPos.xy += vec2(-cursorDirection.y, cursorDirection.x) * cursorField * 1.2;
    worldPos.z += pulseField * 5.5;

    float intro = clamp(uIntro, 0.0, 1.0);
    float introScale = mix(0.18, 1.0, intro);
    worldPos.xyz *= introScale;
    worldPos.z += (1.0 - intro) * 14.0;

    vec4 mvPosition = viewMatrix * worldPos;
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aScale * uPixelRatio * (150.0 / max(-mvPosition.z, 1.0)) * mix(0.45, 1.0, intro);

    vColor = aColor * (1.0 + pulseField * 0.8);
    vOpacity = aOpacity * intro * (0.86 + 0.14 * sin(uTime * 1.35 + position.y * 0.7));
  }
`

export const particleFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float distanceToCenter = length(coord);

    if (distanceToCenter > 0.5) discard;

    float alpha = smoothstep(0.5, 0.06, distanceToCenter) * vOpacity;

    if (alpha < 0.01) discard;

    gl_FragColor = vec4(vColor, alpha);
  }
`

export const halftoneShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uResolution: { value: null },
    uSize: { value: 120 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uSize;

    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec4 tex = texture2D(tDiffuse, vUv);
      float brightness = dot(tex.rgb, vec3(0.299, 0.587, 0.114));

      vec2 grid = vUv * uResolution / max(uSize, 1.0);
      vec2 cell = floor(grid);
      vec2 local = fract(grid) - 0.5;

      float radius = 0.48 * (1.0 - smoothstep(0.04, 0.86, brightness));
      float dotMask = 1.0 - smoothstep(radius - 0.045, radius + 0.045, length(local));
      float pattern = mix(1.0, 0.82 + 0.18 * dotMask, 0.2);
      float grain = (hash(cell + floor(uTime * 7.0)) - 0.5) * 0.016;

      vec3 color = tex.rgb * pattern + grain * (1.0 - brightness);

      gl_FragColor = vec4(color, tex.a);
    }
  `,
}
