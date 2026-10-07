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


## Owner requirement — tuition-centre workspaces — 2026-10-07
The owner has now explicitly expanded the product beyond public discovery: **tuition centres should be able to register on TutorMe and receive their own private tuition workspace.**

This requirement is central to the product direction:
- A tuition centre can register its own organisation/workspace on TutorMe rather than being only a public marketplace listing.
- The centre workspace is the operational home for that centre's tuition activity.
- Centre staff/owners can onboard students.
- Centres can invite parents to engage with the student's tuition relationship and invite tutors/staff where appropriate.
- Centres can facilitate tuition sessions online as well as in person. Online sessions may carry a meeting link; TutorMe must not imply that TutorMe itself provides a video-conferencing service unless an integration is actually implemented.
- Centres can track and resolve student fee/payment obligations. TutorMe may record fee amounts, due dates and Paid/Due/Waived state, but must not claim a payment was actually received unless the centre records/confirmes it.
- Workspace membership is role-based: owner, staff, tutor, parent, student.
- Invitation/join flows are part of the product, not a future marketing claim.
- The platform owner/staff Operations area oversees registered centres and public provider listings; the centre's workspace handles its own operational data.

### Internal implementation references
Translend is the intended reference for the **workspace + invitation concept**: reuse the principle of a customer-owned workspace and invite-driven participation rather than inventing a completely separate account model.

BOEMO is the intended reference for **simple admin/Operations UX**: keep operational controls direct, tabbed, data-driven and easy to understand rather than building an enterprise ERP.

Where an exact Translend implementation cannot be inspected through the connected repository tooling, do not claim an exact code reuse. Apply the known product pattern only.

### Current TutorMe workspace model
The first implementation introduces:
- `workspaces`
- `workspaceMembers`
- `workspaceStudents`
- `tuitionSessions`
- `workspaceFees`
- `workspaceInvites`

The public centre registration path creates a Firebase email/password account and a private centre workspace. The workspace provides basic student, session, fee and invitation operations. Platform Operations can see registered centres and manage public provider listings.

This is an operational foundation, not permission to invent:
- payment gateways
- automated billing
- video conferencing infrastructure
- attendance claims
- grades/results
- tutor qualifications
- reviews/ratings
- schedules/availability beyond records actually entered by a centre.

### Workspace product loop
Centre registers → creates workspace → adds students → invites parents/tutors/staff → schedules tuition → shares/hosts online session through the centre's chosen meeting link or runs in person → records fees → resolves fee state → parents/students engage → centre continues managing tuition.

The public marketplace loop remains separate:
Discover support → compare verified options → enquire/connect.

The two loops should eventually reinforce one another:
**discover a provider → enter its workspace relationship → receive tuition → continue learning → return to TutorMe for the next academic need.**

### Security / truthfulness
Workspace and operational data is private by default. Firestore rules must be default-deny outside explicit public collections and authorised workspace/platform roles.

Do not deploy or claim the new Firestore rules are live merely because `firestore.rules` changed in GitHub. Live Firebase deployment must be separately verified.

Invitation links/codes grant access only through an authenticated account and an explicit workspace membership record. Do not expose private student data through public provider listings.

## 2026-10-07 workspace checkpoint
Customer marketplace work has now continued into the first provider-owned workspace layer. The next implementation checkpoints should deepen real centre operations before adding speculative marketplace transaction mechanics.


### Implementation checkpoint — 2026-10-07
The first centre-workspace implementation is pushed to main. It includes centre registration, private workspaces, workspace membership roles, student records, tuition session records with online/in-person mode and optional meeting links, fee tracking, invitation codes, invitation acceptance, platform Operations visibility of registered centres, and provider-draft creation for newly registered centres. Firebase rules remain source-controlled but require explicit Firebase deployment before they are live.

## Push discipline / anti-waste rule — 2026-10-07

**Do not waste commits, pushes, Vercel deployments, CI runs or deployment-rate-limit capacity.**

Before pushing any code change:
1. **Inspect the actual current state first.** Read the relevant source and current GitHub/CI/deployment status; do not assume the previous fix was sufficient.
2. **Batch related fixes into one controlled change.** Do not make a separate commit for each obvious lint/type error when the errors are in the same affected area and can be corrected together.
3. **Run the required local checks before pushing:** at minimum `npx tsc --noEmit`, `npm run lint`, and `npm run build` when dependencies/environment allow. If a check cannot be run, say so explicitly rather than pushing blindly.
4. **Never push a known-failing build.** A warning may be acceptable only if it is genuinely non-blocking and understood; a TypeScript error, lint error or build error must be fixed before push.
5. **Do not use Vercel as the first test runner.** Vercel deployment attempts are for a candidate that has already passed source-level verification, not for discovering predictable compile/lint/type errors.
6. **After a failed CI/Vercel build, stop and inspect the exact failure before another push.** Do not guess, stack “fix commits”, or spend deployment attempts hoping the next one works.
7. **Respect deployment/rate limits.** If Vercel is rate-limited, do not trigger manual/redeploy builds or push speculative changes merely to see what happens. Fix and verify source locally, then wait for the available deployment window.
8. **Keep commits meaningful and atomic.** A commit should represent a coherent verified change/checkpoint, not a reaction to one line of a failed remote build.
9. **Before checkpointing, verify the candidate commit itself:** inspect `git diff`, status, the final relevant files, and the exact commit SHA/branch. Confirm CI/Vercel is evaluating the commit you intend.
10. **If remote CI reveals a failure that should have been caught locally, treat that as a process failure:** fix the process/checklist as well as the code.

**Golden rule for pushes:** `VERIFY FIRST → PUSH ONCE → INSPECT REMOTE RESULT → STOP IF FAILED`.

A push is not a debugging tool. It is the release of a verified candidate.

## Verification + network trust checkpoint — 2026-10-07
- Every tuition-centre workspace enters **unverified**. Workspace access does not depend on verification.
- Verification is a platform trust tier, not a subscription tier: TutorMe Operations verifies only after confirming proof of payment and the required tuition-centre documentation.
- Verified public listings appear first and receive a restrained verified badge / stronger visual treatment. Unverified published listings remain available but visually basic. “Unverified” means TutorMe has not completed its verification review; it is not a claim that the centre is illegitimate.
- Verification state is stored on the workspace and mirrored to its provider listing. Admin verification is the only route to the verified public state.
- Centres can submit documentation references and request verification from their workspace. The current implementation stores URLs/review state; actual document upload/storage remains a later implementation decision.

## Connection + workspace loop — 2026-10-07
- Public discovery is the front door; a private workspace is the operating relationship.
- Use both relationship-entry patterns: invitation for a known person and a parent/student connection request for someone discovering a centre publicly.
- Requests are private workspace data. Public provider pages expose only safe provider information and a connection CTA.
- Never expose student records, parent contact details, grades, weaknesses or private workspace activity publicly.

## Notification onboarding checkpoint — 2026-10-07
- Notification preferences are early onboarding infrastructure for authenticated workspace members.
- Do not request browser notification permission on page load. Explain the value first and ask only after an explicit user action. citeturn0search5
- Preference categories: sessions, fees, connection requests, workspace updates and learning/feed updates.
- Preference storage is not the same as working push delivery. Do not claim push works until FCM web credentials, service-worker registration and a trusted server send path are configured and tested.
- Eventual FCM implementation should use active device registrations with freshness timestamps and remove stale/invalid registrations.

## Full product loop — 2026-10-07
**Discover → choose → connect (invite/request) → configure notifications → enter workspace → learn/work → receive useful updates → return.**
The public network optimizes for fit and trust; the private workspace optimizes for action and continuity. Verification, connection requests and notification setup are foundational infrastructure, not decorative features.
