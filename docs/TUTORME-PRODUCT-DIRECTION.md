# TutorMe Product Direction — Research Checkpoint

## What the market says
Botswana already has serious digital-learning products. Moithuti emphasizes syllabus-aligned resources, AI tutoring, study planning, quizzes, progress analytics, class messaging and timetable updates. Atlega historically combined syllabus content, practice, instant feedback, recommendations, tutor questions and peer challenges. eduPLUS covers much of the traditional school-management/parent-portal space.

TutorMe should therefore not compete by pretending to be a full LMS or generic school ERP.

## TutorMe opportunity
TutorMe has a different asset: a real physical tuition + boarding environment.

The app should connect:
1. the physical place;
2. the student's learning habits;
3. the tutor's useful feedback;
4. the parent's understanding of the next step.

The strongest future loop is:
Plan → Study → Practice → Reflect → Feedback → Revisit → Parent/support conversation.

## Research implications
- EEF reports strong evidence for metacognition/self-regulation and actionable feedback. TutorMe should therefore favor short reflection prompts and specific next steps over passive dashboards.
- Research on educational gamification finds positive effects overall, but results vary by design. TutorMe should avoid leaderboard-first engagement.
- Learning-dashboard research suggests interactive reflection can be more useful than simply displaying metrics.
- Parent-engagement evidence supports involving families in learning, but the product should help parents support rather than surveil.
- Botswana's Learning Passport work demonstrates the importance of offline-capable digital learning in the local context.

## Feed concept
BoardSignal's editorial/public-private separation is a useful pattern.

TutorMe's feed should be:
- **Today at TutorMe** — notices, schedule changes and verified practical updates.
- **Study Move** — one concrete study technique.
- **Challenge** — a small optional retrieval/spacing task.
- **Parent Move** — one useful 5–10 minute way to support learning.
- **Student Life** — safe, factual boarding/facility/community moments.
- **Celebrate** — only verified achievements, with consent and no public grades/weaknesses.

This gives students a reason to return without turning the product into a social feed.

## Resource library
Owner-approved PDFs/images can become:
- revision sheets
- worked examples
- exam preparation guides
- study planners
- parent guides
- boarding information/forms

UploadThing is appropriate for the media layer; Firestore should contain metadata and publishing state.

## Future personalized layer
Only after the operational data exists:
- student/parent accounts
- invitation-based family linking
- attendance/session history
- subject goals
- homework/revision evidence
- tutor feedback
- next-step recommendations
- parent digest
- opt-in push/email/WhatsApp notifications

The parent view should answer:
**What happened? What is improving? What should we do next?**

It should not simply expose every metric the tutor has.

## Product guardrails
No:
- public child profiles
- public grades
- public weaknesses
- unmoderated student chat
- fake testimonials
- fabricated tutor credentials
- invented boarding availability
- gamification that rewards app usage instead of learning
