# PROJECT_HUB_STATUS

**Last Updated:** 2026-08-10  
**Workspace:** `D:\Project\HUB`  
**Hub Repository:** `palaside/HUB_ALL-Project`  
**Digital Evidence Repository:** `palaside/DIGITAL-EVIDENCE`

## 1. Current Summary

HUB ALL PROJECT remains the landing hub for connected systems. The active engineering focus is the `DIGITAL-EVIDENCE` SPA in:

```text
apps/DIGITAL-EVIDENCE/Create Single Page Website
```

Digital Evidence UI/UX work has been updated and pushed to GitHub on a dedicated branch:

```text
branch: agent/slip-preview-status-copy
commit: dbec4b8f Refine slip preview status
remote: https://github.com/palaside/DIGITAL-EVIDENCE.git
```

No production deployment was performed in this update.

## 2. Deployment Status

Main Hub landing dashboard:

- **Production URL:** https://landing-hub-delta.vercel.app/
- **Repository:** `palaside/HUB_ALL-Project`
- **Local branch:** `publish-hub-updates`
- **Local status:** branch is ahead of `origin/publish-hub-updates` by 2 commits.

Digital Evidence:

- **Production URL currently recorded:** https://digital-evidence-czhjg1fel-palaside-2318s-projects.vercel.app
- **Repository:** `palaside/DIGITAL-EVIDENCE`
- **Pushed branch:** `agent/slip-preview-status-copy`
- **PR status:** not opened yet.

## 3. Connected Systems

| System Name | Status | URL / Note |
| :--- | :--- | :--- |
| **DIGITAL EVIDENCE** | Live, active UI branch pushed | https://digital-evidence-czhjg1fel-palaside-2318s-projects.vercel.app |
| **AI Engineering Stack** | Live | https://brainstrom-3msb84a55-palaside-2318s-projects.vercel.app |
| **Prompt Architect 360** | Live | https://design-architecture-generator.vercel.app/ |
| **Herhyness** | Live | https://sales-report-parser.vercel.app |
| **POS** | Pending | Not created yet |
| **Design** | Pending | Not created yet |
| **ARTY** | Pending | Temporarily removed/pending recreation |

## 4. Digital Evidence UI/UX Work Logged

Completed and pushed work:

- Reframed the Digital Evidence dashboard hierarchy.
- Improved upload column behavior and copy.
- Rebuilt the preview area as the visual center of the page.
- Stabilized the preview layout at large breakpoints.
- Refined slip preview status so generated-state copy uses OCR result state instead of upload count.

Latest pushed commit:

```text
dbec4b8f Refine slip preview status
```

Recent Digital Evidence commits:

```text
dbec4b8f Refine slip preview status
4c25d0cd fix: stabilize preview center layout
ddadd695 Center the Digital Evidence preview pane
a31d8293 fix: align upload state copy with behavior
1a5f537a fix: simplify upload control semantics
```

## 5. Verification Evidence

Digital Evidence frontend verification was run from:

```text
D:\Project\HUB\apps\DIGITAL-EVIDENCE\Create Single Page Website
```

Commands executed successfully:

```powershell
npm.cmd run typecheck
npm.cmd run build
```

Results:

- TypeScript typecheck passed.
- Vite production build passed.
- Vite still reports the existing chunk-size warning for large bundles. This is not a build failure.

## 6. Git / Worktree Status

Outer Hub repository:

```text
branch: publish-hub-updates
remote status: ahead of origin/publish-hub-updates by 2 commits
```

The outer repo still contains many untracked local files and folders, including local skills, docs, app folders, `.env`, and generated/test artifacts. These were not committed as part of the Digital Evidence UI push.

Nested Digital Evidence repository:

```text
branch: agent/slip-preview-status-copy
remote status: tracking origin/agent/slip-preview-status-copy
latest commit: dbec4b8f Refine slip preview status
```

Remaining unrelated local changes in the nested repo:

```text
M .gitignore
M thai_ocr_project/app.py
?? SYSTEM_CHAT.md
?? chat_slicer_v2_flow.png
?? ingest.py
?? tests/test_ingest.py
```

These files were intentionally left out of the pushed UI commit.

## 7. Security / Secret Handling

Local `.env` exists in the workspace and may contain GitHub/Vercel credentials.

Rules:

- Do not commit `.env`.
- Do not copy token values into docs.
- Do not paste token values into Git history.
- If a token was ever exposed outside local `.env`, rotate it.

GitHub CLI authentication was verified for account `palaside`; token output was masked by `gh auth status`.

## 8. Local Preview Status

A local Vite preview attempt was started after the user asked to see the web app. The command was interrupted before a screenshot or browser preview was completed.

To view the app locally:

```powershell
cd "D:\Project\HUB\apps\DIGITAL-EVIDENCE\Create Single Page Website"
npm.cmd run dev -- --host 127.0.0.1 --port 4173
```

Then open:

```text
http://127.0.0.1:4173
```

## 9. Release Position

Digital Evidence remains on the local-first SPA plus Flask backend release path:

- Frontend: `Create Single Page Website`
- Backend: `thai_ocr_project`
- OCR flow: local backend endpoint at `http://localhost:5000/api/ocr`
- Packaging/export flow still requires full runtime verification before production release.

Release is still blocked by:

- End-to-end browser verification for upload, preview, export, and package flows.
- Backend OCR health verification with correct local credentials.
- Artifact cleanup policy for generated files, runtime databases, screenshots, and local test outputs.
- Decision on whether tracked runtime database files should remain in Git.

## 10. Next Actions

- [ ] Open a draft PR from `agent/slip-preview-status-copy` to the correct Digital Evidence base branch.
- [ ] Run local browser preview and capture screenshots for Chat mode and Slip mode.
- [ ] Verify backend health at `http://127.0.0.1:5000/health`.
- [ ] Verify Slip OCR with local credentials loaded from `.env`.
- [ ] Verify Chat preview, PDF export, and Send Project against real sample files.
- [ ] Decide what to do with unrelated dirty files in the Digital Evidence repo.
- [ ] Push or clean the outer Hub branch `publish-hub-updates` after scope is confirmed.
