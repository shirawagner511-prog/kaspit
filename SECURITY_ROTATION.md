# Security Rotation Checklist

Credentials that must be rotated manually after any suspected exposure.
Do NOT commit actual values to this file or anywhere in the repository.

## Required rotations after public exposure

| Credential | Where to rotate | Where to update |
|---|---|---|
| Firebase service account private key | Google Cloud Console → IAM → Service Accounts → Keys | Railway env: `FIREBASE_PRIVATE_KEY` |
| Firebase client email / project credentials | Same service account | Railway env: `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PROJECT_ID` |
| Twilio Account SID | Twilio Console → Account → General Settings | Railway env: `TWILIO_ACCOUNT_SID` |
| Twilio Auth Token | Twilio Console → Account → API Keys & Tokens → Rotate | Railway env: `TWILIO_AUTH_TOKEN` |
| Anthropic API key | console.anthropic.com → API Keys | Railway env: `ANTHROPIC_API_KEY` |
| Braintree private key | Braintree Control Panel → Account → My User → API Keys | Railway env: `BRAINTREE_PRIVATE_KEY` |
| Firebase VAPID key (web push) | Firebase Console → Project Settings → Cloud Messaging | `VITE_FIREBASE_VAPID_KEY` in Vite env |

## Environment variable locations

- **Railway (bot)**: kaspit-bot service → Variables tab
- **Local bot dev**: `kaspit-bot/.env` (never commit this file)
- **Frontend**: `.env.local` at repo root (never commit), or Vite build env

## What is safe to commit

- `kaspit-bot/.env.example` — placeholder values only
- `src/firebase/config.js` — Firebase client SDK config (apiKey is public by design, protected by Firestore Rules)
- `public/firebase-messaging-sw.js` — Firebase client config for service worker

## What must never be committed

- `kaspit-bot/.env`
- Any file containing `-----BEGIN PRIVATE KEY-----`
- Any file containing `sk-ant-` (Anthropic keys)
- Any file containing Twilio auth tokens
- Any service account JSON downloaded from Google Cloud
