# Mithai Palace — Sweet Shop Demo

An example full-stack sweet-shop application (frontend + backend) used for development and demonstration.

## What this project is

- Frontend: React + Vite + Tailwind CSS (TypeScript).
- Backend: Node.js + Express with SQLite (better-sqlite3), JWT auth, and a sweets API (CRUD + purchase/restock).

This repository includes a seeded admin user and tests for key backend functionality.

## Quick start (Windows / PowerShell)

Prerequisites

- Node.js (>=16 recommended)
- npm

1. Install root dependencies

```powershell
cd "C:\Users\bhanu\Downloads\project-lovable-setup-main"
npm install
cd backend
npm install
cd ..
```

2. Prepare the database (optional: migrations + seed)

```powershell
cd backend
npm run migrate   # runs migrations
npm run seed      # creates an admin user and sample sweets
cd ..
```

3. Start backend and frontend (concurrently)

Open two terminals, or run them in background as you prefer.

Backend (terminal 1):

```powershell
cd backend
npm run dev
# Backend listens on port 4000 by default
```

Frontend (terminal 2):

```powershell
cd "C:\Users\bhanu\Downloads\project-lovable-setup-main"
npm run dev
# Vite will print the local URL (it may auto-select a different port if the default is in use)
```

If the frontend should target a different backend port, set the `VITE_API_URL` environment variable before starting Vite, for example in PowerShell:

```powershell
$env:VITE_API_URL='http://localhost:4000'; npm run dev
```

4. Running tests

Backend unit/integration tests live in `backend/tests` and use Jest + Supertest.

```powershell
cd backend
npm test
```

Test output has been captured in `tests/TEST_REPORT.md`.

## Screenshots

Example placeholder screenshots are included in the `screenshots/` folder. Replace these with real screenshots from your browser as needed.

- `screenshots/sample-desktop.svg`
- `screenshots/sample-mobile.svg`

## Project structure (high level)

- `src/` — frontend React app
- `backend/src/` — backend Express app and routes
- `backend/migrations/` — SQL migrations
- `backend/seed.js` — developer seed script
- `backend/tests/` — backend Jest tests

## Test report

The latest backend test run is included as `tests/TEST_REPORT.md` (also summarized below):

- Test Suites: 2 passed, 2 total
- Tests: 3 passed, 3 total

## My AI Usage

This section is an explicit record of how AI tools were used during development of this project.

- Tools used:
  - GitHub Copilot (the AI assistant used interactively during this session).

- How I used them:
  - Code generation and edits: I used the AI assistant to implement and refactor backend routes, create and harden the sweets purchase endpoint, write migration and seed scripts, and add frontend UI components and CSS utilities.
  - Debugging and iteration: I asked the assistant to run the backend test suite, interpret failing tests and terminal errors, and apply targeted fixes (for example, resolving duplicated route modules and a purchase handler TypeError). The assistant ran tests and repeated the edit/test loop until green.
  - Frontend changes and styling: the assistant helped implement the premium homepage design (hero, Sweet of the Day, trust strip, review cards) and added Tailwind CSS utilities and editor settings to avoid noisy validation warnings.
  - Documentation and automation: I had the assistant generate this `README.md`, a test report file, and placeholder screenshots.

- Reflection on impact:
  - Speed: Using the AI assistant accelerated repetitive edits and helped quickly prototype UI changes and backend fixes.
  - Accuracy & safety: The assistant proposed code changes and ran tests, but I reviewed each change and re-ran tests locally to verify behavior. AI made helpful suggestions, but human review was necessary for design decisions and security-sensitive logic (for example, authentication and inventory updates).
  - Learning: The interactive loop helped me locate and fix subtle bugs (route duplication, SQL atomic update for purchase) faster than manual trial-and-error alone.

If you want, I can expand this section with exact prompts used or redact specific internal notes.

## Notes and next steps

- Optional improvements:
  - Replace the placeholder screenshot SVGs with real screenshots.
  - Add stylelint or PostCSS settings to more precisely validate Tailwind rules in the editor instead of disabling CSS validation globally.
  - Restore TypeScript path aliases (`@/*`) in `tsconfig.json` if you prefer those imports.

---

If you want me to add real screenshots (I can take them if you point me to a running instance or provide images), or to include the exact prompts used with the AI assistant, tell me which option you prefer and I'll add them.
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
