# TutorMe — Agent Operating Contract

## Product
TutorMe Tuition Center is the real customer-facing tuition and learning-support product for Block 8, Gaborone, Botswana, under Keza Educational / Keza Tutoring.

Known business facts:
- Enrolment contact: Ruth
- Phone / WhatsApp: +267 72281640
- Advertised package: P5,500 per student; tuition services included
- Advertised facilities: high-speed WiFi, swimming pool, study area, conducive Block 8 location, tuition services, lounge area

Do not invent tutor names, schedules, availability, results, testimonials, affiliations, guarantees or extra prices.

## Roles
- Product owner / final reviewer: user
- Technical navigator + implementation: ChatGPT through repository tooling
- GitHub is source of truth
- No Codex dependency

## Workflow
START → INSPECT → BUILD → VERIFY → CHECKPOINT → CONTINUE/RECOVER.

Golden rule: **Unexpected result = STOP → inspect reality → then act.**

## Product direction
TutorMe is not merely a brochure and should not become a generic school ERP.

The core loop is:
Parent/student discovers TutorMe → understands the real offer → enquires → TutorMe responds → student/parent returns for useful learning guidance, resources and updates → later, linked students/parents may receive role-appropriate progress and next-step information.

The digital product should strengthen the real physical TutorMe experience rather than replace it.

## Evidence-led design
Design decisions should reflect:
- autonomy, competence and relatedness rather than pressure;
- retrieval practice and spacing;
- metacognition and self-regulation;
- specific, actionable feedback;
- useful parent engagement;
- student belonging without public exposure.

Gamification is optional. If used, it must reinforce learning behaviour rather than empty points, streaks or public ranking.

Do not build public student profiles, public grades, public weaknesses, child contact details or unmoderated student-to-student messaging.

## Public experience
The public site must make tuition immediately understandable and make Enrol / Enquire plus direct WhatsApp contact prominent.

The enquiry form should not require an account. Capture only information useful to Ruth/team:
- parent/guardian name
- phone/WhatsApp
- student name
- education level
- subjects
- tuition needs
- optional notes

Truthful states:
- synchronized online enquiry: TutorMe has the enquiry;
- offline queued enquiry: saved on this phone and waiting to synchronize;
- failed save: do not claim TutorMe received it.

## Learning feed
The feed is a moderated editorial learning layer, not social media.

Useful categories:
- Study tip
- Challenge
- Notice
- Student life
- Achievement

Content can include retrieval/spacing prompts, exam/timetable notices when verified, parent guidance, student-life notices and factual TutorMe achievements.

Keep mixed-age content safe. Private student information never enters the public feed.

## Resources
Owner/staff can publish approved PDFs and images through UploadThing. Firestore stores metadata, not file blobs.

UploadThing uploads require authenticated owner/staff access and connectivity. Never claim an upload succeeded until the remote upload and metadata save succeed.

## Admin / Operations
/admin is for authorized owner/staff only.

First useful operational areas:
- enquiries and enquiry status
- prospective/active student records
- learning feed publishing
- resource publishing

Later layers may add:
- attendance
- lesson/session records
- subject goals
- homework/revision evidence
- specific tutor feedback
- parent digests
- student/parent accounts linked by invitation/owner approval
- opt-in notifications

Do not create fake progress dashboards before the underlying evidence exists.

## PWA / offline
TutorMe must be a real installable PWA:
- service-worker public shell
- offline route
- bounded static/public caching
- Firestore persistent local cache
- visible online/offline state
- truthful queued/synchronized wording
- global install promotion on installable browsers, with an explicit in-app Install action

The service worker must not cache Firebase/private API responses or large media blobs.

Public reading should remain useful on weak connectivity. Admin/private data remains governed by Firebase Auth and Firestore.

UploadThing media uploads are online-only.

## Firebase
Dedicated project: tutorme-d55b7.

Browser config uses NEXT_PUBLIC_FIREBASE_* environment variables.

Never commit .env.local, service-account JSON or private credentials.

Admin access requires Firebase Auth plus admins/{uid} with role owner or staff. No client-side admin provisioning.

Firestore is default-deny.

Public:
- create validated enquiries
- read published learning posts/resources

Private:
- owner/staff read and modify enquiries, students, learning content, resources and operational data.

## Mobile/Botswana context
Build mobile-first and data-conscious. Botswana has strong mobile access but connectivity remains an important design constraint. Useful public material should be cacheable and readable without a constant connection.

TutorMe must not imply affiliation with BEC, Botswana Learning Passport, Moithuti, Atlega or any other education platform.

Current exam references such as PSLE, JCE and BGCSE may be used only as accurate public educational context. Verify current dates/timetables before publishing them.

## Technical references
Use repositories as patterns, not business logic:
- Namane Tyres: PWA/offline, persistent Firestore cache, admin auth, truthful queued writes.
- Meating Place: public offerings/enquiry/request/admin patterns.
- Avram Kids: booking/customer patterns.
- Admin Hub Games: explicit PWA install/update UX and bounded caching.
- BoardSignal/PurePress: editorial feed hierarchy, public/private boundaries, notifications and UploadThing patterns.
- BOEMO: cached public content, reconnect state and useful return-to-app engagement patterns.

## Competitive UX research checkpoint — 2026-10-06
- Reviewed current tutoring UX patterns and Botswana alternatives including Stadira Training Institute, Superprof Gaborone listings and Tutopiya's Botswana offer.
- Reusable patterns: state subject/level fit quickly, make the parent/student next step obvious, keep mobile enquiry short, provide direct contact, and build trust without inventing testimonials or outcomes.
- TutorMe should not copy marketplace pricing or claims. Its advantage is a direct local tuition relationship, a simple enquiry path, and useful learning content that brings families back.
- Do not add tutor qualifications, exam results, reviews, guarantees, exact subject lists, schedules or availability until the business supplies verified evidence.

## Required removal rule
Boarding is retired. Remove boarding-related product copy, fields, routes, UI and rules before meaningful checkpoints. Existing legacy Firestore documents are not to be fabricated or rewritten without a specific data-migration need.

## Required verification
Before meaningful checkpoints:
- npx tsc --noEmit
- npm run lint
- npm run build
- inspect Git diff/status
- verify Firebase project identifiers
- verify no active Namane/tyre terminology remains
- verify PWA routes/cache names
- verify the install prompt can appear from the public shell, not only /admin
- verify online/offline wording is truthful

## Scope discipline
Prefer the smallest controlled change that moves TutorMe toward the product direction above. Preserve working capabilities only when they fit TutorMe. Delete inherited Namane business assumptions rather than renaming them.

