# PulseGrid Console

Modern React dashboard for real-time and historical IoT health sensor data (ECG + GSR) from ThingSpeak.

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Recharts
- React Router
- Optional Node.js + Express proxy

## Features

- Live ECG waveform chart with auto-refresh
- Stress level visualization derived from GSR thresholds
- Heart rate card display (when available)
- Device online/offline indicator
- Last update timestamp
- Historical charts for 1 hour, 24 hours, and 7 days
- CSV export of loaded dataset
- Responsive dark-themed UI with subtle gradients and transitions

## Quick Start

1. Install frontend dependencies:

```bash
npm install
```

2. Create your env file:

```bash
cp .env.example .env
```

3. Add your ThingSpeak settings in .env:

```bash
VITE_THINGSPEAK_CHANNEL_ID=YOUR_CHANNEL_ID
VITE_THINGSPEAK_READ_API_KEY=YOUR_READ_API_KEY
VITE_THINGSPEAK_FIELD_ECG=1
VITE_THINGSPEAK_FIELD_GSR=2
VITE_THINGSPEAK_FIELD_HEART_RATE=3
```

4. Start the frontend:

```bash
npm run dev
```

## Optional Secure Proxy (Recommended)

Use this if you do not want to expose your ThingSpeak read key in frontend requests.

1. Install proxy dependencies:

```bash
npm install --prefix server
```

2. Add backend env vars (in root .env):

```bash
THINGSPEAK_CHANNEL_ID=YOUR_CHANNEL_ID
THINGSPEAK_READ_API_KEY=YOUR_READ_API_KEY
PORT=3001
VITE_THINGSPEAK_USE_PROXY=true
VITE_API_BASE_URL=http://localhost:3001
```

3. Run the proxy:

```bash
npm run proxy
```

4. In another terminal, run the frontend:

```bash
npm run dev
```

## Stress Level Logic

- Low: GSR < VITE_GSR_LOW_THRESHOLD (default 300)
- Medium: GSR < VITE_GSR_MEDIUM_THRESHOLD (default 700)
- High: GSR >= VITE_GSR_MEDIUM_THRESHOLD

You can tune thresholds from .env for your hardware calibration.

## Build

```bash
npm run build
```
