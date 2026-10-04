# TutorMe

TutorMe Tuition Center & Student Boarding House is the customer-facing tuition, boarding and learning-support product for Block 8, Gaborone, Botswana, under Keza Educational / Keza Tutoring.

## Public experience

The public journey is intentionally simple:

Discover TutorMe → understand tuition + boarding → enquire → TutorMe responds → return for useful study resources and verified updates.

Customers do not need an account to make an enquiry.

The enquiry captures:
- parent/guardian name
- phone / WhatsApp
- student name
- education level
- subjects / tuition needs
- boarding interest
- optional notes

## Operations

`/admin` is protected by Firebase Authentication plus an `admins/{uid}` role document with `owner` or `staff`.

Current Operations areas:
- enquiries
- moderated learning feed
- resources
- boarding availability summary

## Offline-first behaviour

TutorMe is an installable PWA with a public service worker and Firestore persistent local cache.

Customer-facing states are truthful:
- synchronized online enquiry: TutorMe has the enquiry
- offline queued enquiry: saved on this phone and waiting to synchronize
- failed save: the app does not claim TutorMe received it

The service worker caches bounded public shell/content routes only. Firebase/private API responses and large media are not cached by the service worker.

## Business

- Block 8, Gaborone, Botswana
- Enrolment contact: Ruth
- Call / WhatsApp: +267 72281640
- Advertised package: P5,500 per student, including tuition services
- Facilities advertised: high-speed WiFi, swimming pool, study area, conducive location, tuition services and lounge area

## Stack

- Next.js 15 / React 19 / TypeScript
- Firebase Authentication
- Cloud Firestore with persistent local cache
- UploadThing for approved owner/staff resources
- Installable PWA + service worker
- Vercel Analytics + Speed Insights
- Vercel deployment from GitHub `main`

## Development

Run:

```bash
npm install
npm run dev
```

Quality gates:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Never commit `.env.local`, service-account credentials or other private secrets.

See [AGENTS.md](AGENTS.md) for the product and implementation contract.
