# Self-Assessment — Lev Karavanov

## Summary of Contributions
- Connected frontend and backend: updated forms (AddJobPage, EditJobPage) to match the current Job model; displayed location/salary in list and detail views.
- Rewrote backend tests for Job and added authentication tests (signup, login, me).
- Integrated authentication: userRouter, requireAuth middleware, protected GET /api/users/me.
- Set up deployment on Render: built frontend into backend/view, served static files, and implemented an Express 5–compatible SPA fallback.

---

## Example 1: SPA Fallback for Express 5
Originally, a "*" route was used, which breaks with Express 5 (new path-to-regexp).

Before:
```js
// Not Express 5 compatible
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  return res.sendFile(path.join(viewPath, "index.html"));
});
```

After:
```js
// Express 5 compatible SPA fallback
app.get(/^(?!\/api).*/, (req, res) => {
  return res.sendFile(path.join(viewPath, "index.html"));
});
```

Why it’s better:
- Compatible with Express 5 and the new path-to-regexp.
- Explicitly excludes /api routes so the API is not affected.

---

## Example 2: Full‑Stack Deploy Script (Render)
Build the frontend and copy artifacts into `backend/view` so Express can serve them.

Key script:
```json
"build:view": "npm install --no-audit --no-fund && rm -rf view && npm --prefix ../frontend install --no-audit --no-fund && npm --prefix ../frontend run build && mkdir -p view && cp -R ../frontend/dist/* view"
```

Improvements:
- Installs dependencies for both backend and frontend (fixes “cross-env: not found”).
- Avoids fragile `cd`; uses `npm --prefix` (more robust in CI like Render).
- Ensures `view` directory exists before copying.

---

## Example 3: Aligning Model and UI
Added required fields to the UI and tests to match the Job schema (location, salary).

Before (add form excerpt):
```jsx
// Missing required fields
company: { name, contactEmail, contactPhone }
```

After:
```jsx
// Required by Job schema
company: { name, contactEmail, contactPhone },
location,
salary: Number(salary)
```

Effect: the form is valid for the Mongoose schema; POST tests are stable.

---

## Example 4: Backend Tests (V1 and V2)
Added/updated tests:
- `backend/tests/job.test.js`: CRUD with 200/201/204/400/404 checks.
- `backend/tests/user.test.js`: `signup → token`, `login → token`, `me` with and without Bearer token.

V2 snippet:
```js
const signupRes = await api.post("/api/users/signup").send(signupPayload).expect(201);
const token = signupRes.body.token;
await api.get("/api/users/me").set("Authorization", `Bearer ${token}`).expect(200);
```

Value: auth regressions are caught automatically.

---

## Example 5: Frontend Routing and Guards
Simple client‑side guards — redirect unauthenticated users away from create/edit pages.

```jsx
<Route path="/jobs/add-job" element={isAuthenticated ? <AddJobPage /> : <Navigate to="/signup" />} />
<Route path="/edit-job/:id" element={isAuthenticated ? <EditJobPage /> : <Navigate to="/signup" />} />
```

UX: clear redirects; server‑side protection is handled by `requireAuth` middleware.

---

## Issues Solved and Debugging
- Express 5 + "*" route → replaced with regex SPA fallback.
- Render: missing `vite`/`cross-env` → added dependency installation in `build:view`.
- UI ↔ Job model mismatch → added `location`/`salary` in UI and tests.
- ID handling in UI (`job.id` vs `job._id`) → unified rendering and links.

---

## What I’d Improve Next
- Move frontend auth to an `AuthContext` instead of prop drilling.
- Add E2E tests (e.g., Playwright) for critical flows (`signup/login/create job`).
- Add frontend form validation (Zod/Yup) + improved server error messages.

---

## Self‑Grading (per rubric)
- Code cleanliness/readability: 40/40 — consistent style and naming; room for UI validation improvements.
- Cloud deployment: 30/30 — full‑stack deploy with static serving and SPA fallback; a preview environment could be added.
- Backend testing: 30/30 — CRUD (V1) and auth (V2) covered; fewer deep negative cases (rate limit, TTL) yet.
- Self‑assessment: 20/20 — concrete examples and takeaways.

Total: 120/120.

---

## Links/Settings (short)
- API base: `/api` (jobs/users)
- Render (Root Directory): `backend`
- Build: `npm run build:view`
- Start: `npm start`