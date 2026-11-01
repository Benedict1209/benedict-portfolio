import {
  Activity,
  ArrowRight,
  Braces,
  Car,
  CloudSun,
  Code2,
  Database,
  HeartPulse,
  History,
  ScanLine,
  ShieldAlert,
  Sprout,
} from 'lucide-react'

export function CropSentinelVisual() {
  return (
    <div className="relative h-full min-h-[25rem] overflow-hidden bg-[#07100b] p-3.5 sm:p-6">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(104,166,92,0.16),transparent_54%),radial-gradient(circle_at_88%_80%,rgba(216,255,101,0.07),transparent_48%)]"
        aria-hidden="true"
      />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden="true" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08110d]/80 p-3.5 backdrop-blur-sm sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/20 bg-accent/[0.07]">
              <Sprout className="h-4 w-4 text-accent" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div>
              <span className="block font-mono text-[0.55rem] tracking-[0.15em] text-white/70 uppercase">
                CropSentinel AI
              </span>
              <span className="mt-0.5 block font-mono text-[0.46rem] tracking-[0.1em] text-faint uppercase">
                Early warning system
              </span>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-accent/15 bg-accent/[0.05] px-2.5 py-1 font-mono text-[0.46rem] tracking-[0.1em] text-accent/80 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Monitoring
          </span>
        </div>

        <div className="relative mt-4 min-h-[13.5rem] flex-1 overflow-hidden rounded-xl border border-white/[0.07] bg-[#06100a]">
          <div className="dot-grid absolute inset-0 opacity-[0.1]" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/[0.08] sm:h-56 sm:w-56" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/[0.1] sm:h-40 sm:w-40" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/[0.12]" aria-hidden="true" />

          <div
            className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(216,255,101,0.14)_38deg,transparent_76deg)] [animation-duration:18s] motion-reduce:animate-none sm:h-56 sm:w-56"
            aria-hidden="true"
          />

          <div className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-accent/25 bg-[#0b1710] shadow-[0_0_50px_rgba(216,255,101,0.08)]">
            <Sprout className="h-7 w-7 text-accent" strokeWidth={1.4} aria-hidden="true" />
            <span className="absolute inset-0 animate-ping rounded-2xl border border-accent/10 [animation-duration:3.2s] motion-reduce:animate-none" aria-hidden="true" />
          </div>

          <div className="absolute top-[18%] left-[8%] flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-[#08130d]/90 px-2 py-1.5 backdrop-blur-sm">
            <ScanLine className="h-3 w-3 text-accent/75" strokeWidth={1.8} aria-hidden="true" />
            <span className="text-[0.55rem] font-semibold text-white/70">Crop imagery</span>
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
          </div>

          <div className="absolute top-[34%] right-[5%] flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-[#08130d]/90 px-2 py-1.5 backdrop-blur-sm">
            <CloudSun className="h-3 w-3 text-sky" strokeWidth={1.8} aria-hidden="true" />
            <span className="text-[0.55rem] font-semibold text-white/70">Weather</span>
          </div>

          <div className="absolute bottom-[24%] left-[7%] hidden items-center gap-1.5 rounded-md border border-white/[0.08] bg-[#08130d]/90 px-2 py-1.5 backdrop-blur-sm sm:flex">
            <History className="h-3 w-3 text-[#b7a0ff]" strokeWidth={1.8} aria-hidden="true" />
            <span className="text-[0.55rem] font-semibold text-white/70">Outbreak records</span>
          </div>

          <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-3 rounded-lg border border-accent/[0.12] bg-[#0b1710]/95 px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <ShieldAlert className="h-4 w-4 flex-none text-accent/80" strokeWidth={1.7} aria-hidden="true" />
              <div className="min-w-0">
                <span className="block text-[0.56rem] font-bold text-white/80">Early warning</span>
                <span className="block font-mono text-[0.43rem] tracking-[0.08em] text-faint uppercase">
                  Risk alerts · Hotspot tracking
                </span>
              </div>
            </div>
            <span className="hidden flex-none rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-1 font-mono text-[0.42rem] tracking-[0.08em] text-faint uppercase sm:inline-flex">
              Signal
            </span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { icon: ScanLine, label: 'Imagery' },
            { icon: CloudSun, label: 'Weather' },
            { icon: History, label: 'Records' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.022] px-2 py-2"
            >
              <Icon className="h-3 w-3 text-faint" strokeWidth={1.7} aria-hidden="true" />
              <span className="text-[0.51rem] font-semibold text-white/55">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ECG_TILE_WIDTH = 144
const ecgTileOrigins = [0, ECG_TILE_WIDTH, ECG_TILE_WIDTH * 2, ECG_TILE_WIDTH * 3]

const ecgTracePath = ecgTileOrigins
  .map(
    (x) =>
      `M${x} 48 H${x + 11} L${x + 20} 44 L${x + 34} 48 L${x + 43} 34 L${x + 54} 70 L${x + 66} 16 L${x + 78} 58 L${x + 90} 48 H${x + 144}`,
  )
  .join(' ')

const ecgPeakPath = ecgTileOrigins
  .map((x) => `M${x + 54} 70 L${x + 66} 16 L${x + 78} 58`)
  .join(' ')

export function HeartDiseaseVisual() {
  return (
    <div className="relative h-full min-h-[23rem] overflow-hidden bg-[#070b12] p-4 sm:p-6">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(88,122,255,0.13),transparent_52%),radial-gradient(circle_at_90%_85%,rgba(255,104,134,0.06),transparent_45%)]"
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080d16]/80 p-4 backdrop-blur-sm sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-sky/20 bg-sky/[0.07]">
              <HeartPulse className="h-4 w-4 text-sky" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div>
              <span className="block font-mono text-[0.55rem] tracking-[0.15em] text-white/70 uppercase">
                Prediction Lab
              </span>
              <span className="mt-0.5 block font-mono text-[0.46rem] tracking-[0.1em] text-faint uppercase">
                Random Forest classifier
              </span>
            </div>
          </div>
          <span className="rounded-full border border-sky/15 bg-sky/[0.05] px-2.5 py-1 font-mono text-[0.46rem] tracking-[0.1em] text-sky/80 uppercase">
            Flask
          </span>
        </div>

        <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#060a11] p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.46rem] tracking-[0.12em] text-faint uppercase">
              Signal monitor
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[0.44rem] tracking-[0.1em] text-sky/75 uppercase">
              <span className="ecg-ready-dot h-1.5 w-1.5 rounded-full bg-sky" aria-hidden="true" />
              Ready
            </span>
          </div>
          <svg
            viewBox="0 0 420 88"
            className="mt-2 h-[5.5rem] w-full"
            role="img"
            aria-label="Abstract ECG signal illustration representing a heart disease classification model"
          >
            <defs>
              <linearGradient id="ecg-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8aaaff" stopOpacity="0" />
                <stop offset="18%" stopColor="#8aaaff" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#d8ff65" />
                <stop offset="82%" stopColor="#8aaaff" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#8aaaff" stopOpacity="0" />
              </linearGradient>
              <filter id="ecg-glow" x="-4%" y="-55%" width="108%" height="210%">
                <feGaussianBlur stdDeviation="2.2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="ecg-peak-glow" x="-4%" y="-80%" width="108%" height="260%">
                <feGaussianBlur stdDeviation="2.8" result="peakBlur" />
                <feMerge>
                  <feMergeNode in="peakBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <mask id="ecg-wave-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="420" height="88">
                <path
                  className="ecg-scroll"
                  d={ecgTracePath}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </mask>
              <mask id="ecg-peak-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="420" height="88">
                <path
                  className="ecg-scroll"
                  d={ecgPeakPath}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </mask>
            </defs>
            <g filter="url(#ecg-glow)">
              <rect width="420" height="88" fill="url(#ecg-stroke)" mask="url(#ecg-wave-mask)" />
            </g>
            <g filter="url(#ecg-peak-glow)" opacity="0.55">
              <rect width="420" height="88" fill="url(#ecg-stroke)" mask="url(#ecg-peak-mask)" />
            </g>
          </svg>
          <div className="mt-1 flex items-center justify-between border-t border-white/[0.05] pt-2">
            <span className="font-mono text-[0.44rem] tracking-[0.08em] text-faint uppercase">
              13 health-related features
            </span>
            <span className="font-mono text-[0.44rem] tracking-[0.08em] text-white/35 uppercase">
              Classification
            </span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-[1fr_auto_1.25fr_auto_1fr] items-center gap-1.5">
          <div className="rounded-lg border border-white/[0.07] bg-white/[0.025] p-2.5">
            <Database className="h-3.5 w-3.5 text-sky/70" strokeWidth={1.7} aria-hidden="true" />
            <span className="mt-2 block text-[0.55rem] font-bold text-white/70">pandas</span>
            <span className="mt-0.5 block font-mono text-[0.4rem] tracking-[0.05em] text-faint uppercase">
              Preprocess
            </span>
          </div>
          <ArrowRight className="h-3 w-3 text-faint/60" strokeWidth={1.6} aria-hidden="true" />
          <div className="rounded-lg border border-accent/[0.14] bg-accent/[0.045] p-2.5">
            <Activity className="h-3.5 w-3.5 text-accent/80" strokeWidth={1.7} aria-hidden="true" />
            <span className="mt-2 block text-[0.55rem] font-bold text-white/80">Random Forest</span>
            <span className="mt-0.5 block font-mono text-[0.4rem] tracking-[0.05em] text-accent/55 uppercase">
              Predict
            </span>
          </div>
          <ArrowRight className="h-3 w-3 text-faint/60" strokeWidth={1.6} aria-hidden="true" />
          <div className="rounded-lg border border-white/[0.07] bg-white/[0.025] p-2.5">
            <Braces className="h-3.5 w-3.5 text-[#b7a0ff]" strokeWidth={1.7} aria-hidden="true" />
            <span className="mt-2 block text-[0.55rem] font-bold text-white/70">JSON API</span>
            <span className="mt-0.5 block font-mono text-[0.4rem] tracking-[0.05em] text-faint uppercase">
              Serve
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-lg border border-white/[0.06] bg-black/20 px-3 py-2 font-mono">
          <div className="flex items-center gap-2">
            <span className="rounded bg-sky/10 px-1.5 py-0.5 text-[0.4rem] font-bold tracking-[0.08em] text-sky uppercase">
              POST
            </span>
            <span className="text-[0.5rem] text-white/45">/predict</span>
          </div>
          <span className="text-[0.43rem] tracking-[0.08em] text-faint uppercase">application/json</span>
        </div>
      </div>
    </div>
  )
}

const parkingSlots = [
  { id: 'P01', state: 'filled' },
  { id: 'P02', state: 'empty' },
  { id: 'P03', state: 'filled' },
  { id: 'P04', state: 'active' },
  { id: 'P05', state: 'empty' },
  { id: 'P06', state: 'empty' },
] as const

export function ParkingVisual() {
  return (
    <div className="relative h-full min-h-[23rem] overflow-hidden bg-[#0b0913] p-4 sm:p-6">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_8%,rgba(172,116,255,0.14),transparent_52%),radial-gradient(circle_at_12%_90%,rgba(216,255,101,0.05),transparent_45%)]"
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#100d18]/85 p-4 backdrop-blur-sm sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#c5a8ff]/20 bg-[#c5a8ff]/[0.07]">
              <Car className="h-4 w-4 text-[#c5a8ff]" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div>
              <span className="block font-mono text-[0.55rem] tracking-[0.15em] text-white/70 uppercase">
                Smart Parking
              </span>
              <span className="mt-0.5 block font-mono text-[0.46rem] tracking-[0.1em] text-faint uppercase">
                Management system
              </span>
            </div>
          </div>
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[0.46rem] tracking-[0.1em] text-white/45 uppercase">
            PHP
          </span>
        </div>

        <div className="mt-4 flex flex-1 flex-col rounded-xl border border-white/[0.07] bg-[#0c0a12] p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.46rem] tracking-[0.12em] text-faint uppercase">
              Parking map
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[0.44rem] tracking-[0.1em] text-accent/75 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Interface preview
            </span>
          </div>

          <div className="mt-3 grid flex-1 grid-cols-3 gap-2">
            {parkingSlots.map(({ id, state }) => (
              <div
                key={id}
                className={`relative flex min-h-[4.25rem] items-center justify-center rounded-lg border ${
                  state === 'active'
                    ? 'border-accent/35 bg-accent/[0.055]'
                    : state === 'filled'
                      ? 'border-white/[0.08] bg-white/[0.035]'
                      : 'border-dashed border-white/[0.09] bg-white/[0.015]'
                }`}
              >
                <span
                  className={`absolute top-1.5 left-2 font-mono text-[0.41rem] tracking-[0.05em] ${
                    state === 'active' ? 'text-accent/80' : 'text-faint'
                  }`}
                >
                  {id}
                </span>
                {state === 'filled' ? (
                  <Car className="h-5 w-5 text-white/25" strokeWidth={1.4} aria-hidden="true" />
                ) : null}
                {state === 'active' ? (
                  <>
                    <Car className="h-5 w-5 text-accent/80" strokeWidth={1.5} aria-hidden="true" />
                    <span className="absolute right-1.5 bottom-1.5 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  </>
                ) : null}
                {state === 'empty' ? (
                  <span className="font-mono text-[1.2rem] font-light text-white/[0.12]">+</span>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Code2 className="h-3 w-3 text-faint" strokeWidth={1.7} aria-hidden="true" />
              <span className="font-mono text-[0.43rem] tracking-[0.07em] text-faint uppercase">
                PHP backend
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c5a8ff]/60" aria-hidden="true" />
              <span className="font-mono text-[0.43rem] tracking-[0.07em] text-faint uppercase">
                XAMPP
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent/60" aria-hidden="true" />
              <span className="font-mono text-[0.43rem] tracking-[0.07em] text-faint uppercase">
                Web UI
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.022] px-3 py-2">
            <span className="block font-mono text-[0.41rem] tracking-[0.09em] text-faint uppercase">
              Frontend
            </span>
            <span className="mt-1 block text-[0.55rem] font-semibold text-white/65">HTML · CSS · JS</span>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.022] px-3 py-2">
            <span className="block font-mono text-[0.41rem] tracking-[0.09em] text-faint uppercase">
              Environment
            </span>
            <span className="mt-1 block text-[0.55rem] font-semibold text-white/65">XAMPP local server</span>
          </div>
        </div>
      </div>
    </div>
  )
}
