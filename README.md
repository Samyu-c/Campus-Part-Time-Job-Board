                    CampusGig
AI-Powered Micro-Internship Marketplace for Universities:

CampusGig bridges the gap between academic research and student talent. It’s a specialized platform where professors post technical "Gigs" and an AI-driven matching engine helps identify the perfect students for the job based on real-time skill analysis.

Key Features:
1. Dual-Role Authentication: Secure JWT-based entry point with distinct, tailored experiences for Professors (Project Managers) and Students (Talent).

2. AI Match Scoring: When a student applies, the system performs a semantic analysis of their bio/skills against the gig's requirements, generating a % Match Score to help professors prioritize candidates.

3. Professor Control Center: A centralized dashboard to post new opportunities, track applicant volume, and manage project lifecycles.

4. One-Click Recruitment: Streamlined "Accept/Reject" workflows that trigger instant status updates for the applicants.

5. Interactive Activity Feed: A dynamic "Recent Activity" sidebar that allows users to jump directly into active project management pages

TECH STACK:
Frontend-"React, TypeScript, Tailwind CSS"
Animation-Framer Motion
Backend-"Node.js, Express"
Database--ORM "PostgreSQL/SQLite, Prisma ORM"
UI Components--"Lucide React, Radix UI (Shadcn/UI)"

INSTALLATION :
Clone the repository:

Bash
git clone https://github.com/your-username/CampusGig.git
cd CampusGig
Install dependencies:

Bash
npm install
Environment Setup:
Create a .env file in the root directory and add your credentials:

Code snippet
DATABASE_URL="postgresql://user:password@localhost:5432/campusgig"
JWT_SECRET="your_super_secret_key"
Database Migration:

Bash
npx prisma migrate dev --name init
Run the Application:

Bash
npm run dev


AI LOGIC FLOW

AI Logic Flow
CampusGig doesn't just look for keywords; it evaluates the context of a student's background.

Note: The current AI Match Scoring is designed to be extensible. It currently uses [Insert specific method, e.g., "OpenAI Embeddings" or "Natural Language Processing"] to compare the Student.bio string against the Gig.description string.

PROJECT STRUCTURE
Plaintext
├── prisma/              # Database schema & migrations
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI (Shadcn/Lucide)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions (AI scoring logic, etc.)
│   ├── pages/           # Dashboard and Auth views
│   └── server/          # Express API routes and Controllers
└── package.json
