# Flare - Professional Live Streaming App

Flare simplifies professional live streaming for beginners and podcasters with a clean, modern interface and integrated marketplace.

## Features

- Stream Setup Wizard (Twitch, YouTube, Kick)
- Template Integration from Marketplace
- Live Controls Panel
- Built-in Marketplace
- Help & Support Section
- Performance Mode for Low-End PCs
- User Authentication (Email/Google)
- Local 1080p MP4 Recording
- Real-time Stream Status Monitoring

## Tech Stack

- **Frontend**: Electron + React + TailwindCSS
- **Backend**: Node.js + Express + WebRTC
- **Database**: PostgreSQL + Firebase
- **Cloud**: AWS/GCP for media processing
- **Security**: AES-256 encryption, OAuth2, HTTPS-only

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (copy .env.example to .env)
4. Run development server: `npm run dev`

## Building for Production

- Build all: `npm run build`
- Build frontend: `npm run build:frontend`
- Build Electron app: `npm run build:electron`
