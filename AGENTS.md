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
- Product requirements / project management: Ruth, who is expected to define the business requirements and specifications
- Technical navigator + implementation: ChatGPT through repository tooling
- GitHub is source of truth
- No Codex dependency

## Workflow
START → INSPECT → BUILD → VERIFY → CHECKPOINT → CONTINUE/RECOVER.

Golden rule: **Unexpected result = STOP → inspect reality → then act.**

## Product direction
TutorMe is not merely a brochure and should not become a generic school ERP.

The intended long-term direction is a **tutoring marketplace/network**, with TutorMe as the product and technical foundation for making academic support easier to discover, compare, enquire about and access.

The product direction discussed with the owner/project manager is informed by the gap left by existing tutoring products:
- TutorMe should aim toward the usefulness and breadth of a TeacherOn-style tutoring marketplace rather than remain only a single-centre website.
- In Botswana, Lion Tutoring did not achieve the intended “Uber version of tutoring” outcome. TutorMe should learn from that gap rather than simply reproduce the same model.
- The ambition is to make tutoring discoverable and reachable across providers: parents/students should eventually be able to find relevant tuition centres, independent tutors and other legitimate academic-support providers through one useful product.
- The marketplace ambition is a product direction, not permission to invent providers, pricing, tutor qualifications, reviews, availability or outcomes.
- The initial TutorMe centre remains real and operational. The current public experience should continue to represent the verified TutorMe offer while the broader network/marketplace capability is built in controlled stages.

### Product evolution
Use this staged model unless Ruth/the owner supplies a newer requirement:

1. **Current foundation — real TutorMe**
   - Present the verified Block 8 tuition offer clearly.
   - Capture short, useful enquiries without requiring an account.
   - Give parents/students a direct WhatsApp/contact path.
   - Provide useful moderated learning resources and updates that bring users back.

2. **Discovery/network layer**
   - Establish data structures and admin workflows that can represent legitimate tuition providers, tutors, subjects/levels, service areas, contact paths and publishing status.
   - Public discovery should eventually let a parent/student understand who offers what and how to enquire.
   - Provider information must be owner/admin verified before publication.

3. **Marketplace layer**
   - Move toward TeacherOn-like breadth: searchable academic support, provider profiles/listings, fit by subject/education level/location or delivery mode, and clear enquiry/connection flows.
   - Do not assume payments, booking, automated matching, ratings, subscriptions or commissions are required until the owner explicitly specifies them.
   - Keep the product useful even before a full transaction marketplace exists.

4. **Network effects**
   - Make it easier for more legitimate tutors/centres to participate and for parents/students to find suitable support.
   - Build trust, moderation, structured provider information and useful return-to-app behaviour before adding growth mechanics.

The core near-term loop remains:
Parent/student discovers TutorMe → understands the real offer → enquires → TutorMe responds → student/parent returns for useful learning guidance, resources and updates.

The longer-term loop is:
Parent/student discovers academic support → compares relevant verified options → enquires/connects → receives support → returns when another academic need arises.

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
The public site must make the verified TutorMe tuition offer immediately understandable and make Enrol / Enquire plus direct WhatsApp contact prominent.

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

As marketplace capability is introduced, do not turn the current TutorMe landing page into a fake catalogue of unverified providers. Public discovery should only reflect real, verified listings.

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

Marketplace groundwork may later add:
- provider/tutor profiles
- provider verification state
- subjects and education levels
- service area / delivery mode
- provider contact/enquiry routing
- publishing state
- provider ownership/admin controls

Later student-centre layers may add:
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
- TeacherOn is the relevant product reference for marketplace breadth, not a business model to copy blindly.
- Lion Tutoring is a local reference point for the unresolved “Uber of tutoring” opportunity; TutorMe should differentiate by building verified supply, structured discovery, trust and useful enquiry/connection flows rather than copying a failed surface.
- TutorMe should not copy marketplace pricing or claims. Its current advantage is a direct local tuition relationship; its long-term opportunity is to extend that foundation into a broader verified tutoring network.
- Do not add tutor qualifications, exam results, reviews, guarantees, exact subject lists, schedules or availability until the business supplies verified evidence.

## Customer marketplace redesign checkpoint — 2026-10-07
The customer side is now being reshaped around discovery rather than a single-centre brochure, using BOEMO's data-driven public experience, The Wall's ecosystem/navigation model, and Admin Hub Global's direct editorial hierarchy as internal product references.

External marketplace research reinforces the same pattern: TeacherOn exposes search by subject/skill/location and online/home modes, provider profiles, requirements and trust signals; Superprof emphasizes profile comparison and student choice. TutorMe should take the useful discovery patterns without copying their pricing or transaction model.

Psychology/evidence constraints:
- support autonomy through meaningful choice rather than pressure;
- reduce decision load by making subject, level, location and delivery mode visible early;
- support competence with small, actionable learning next steps;
- support relatedness with warm, human contact and safe boundaries;
- keep feedback specific and tied to the learner's next action.
These principles are consistent with Self-Determination Theory's autonomy/competence/relatedness framework and evidence-based feedback guidance.

Customer-side provider model is now represented by a providers Firestore collection with CRUD-ready fields for kind, identity, description, location, modes, subjects, levels, verification, featured state, contact route, price label, publishing state and timestamps. Public reads are restricted to published providers; owner/staff will later receive CRUD controls in Operations.

Preview provider data is intentionally marked as sample data. It must not be presented as real provider claims. The real TutorMe Tuition Center listing is the only current verified marketplace seed.

Do not add public reviews, ratings, tutor qualifications, availability, pricing or verification claims unless those facts are supplied and verified by the business.

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
- verify marketplace/provider claims are backed by real admin data before publication

## Scope discipline
Prefer the smallest controlled change that moves TutorMe toward the product direction above. Preserve working capabilities only when they fit TutorMe. Delete inherited Namane business assumptions rather than renaming them.

When requirements from Ruth/the owner are still forthcoming, record them as requirements to capture rather than inventing implementation details.
