# Usage

1. **Install Backend Dependencies**  
   
   - Rename the `.env.example` file to `.env` in the backend directory.
   - Navigate to the backend directory and install the necessary dependencies:
   ```sh
   npm install
   npm run dev
   ```

2. **Install Frontend Dependencies & Start the App**  
   Navigate to the frontend directory, install dependencies, and start the application:
   ```sh
   npm install
   npm run dev
   ```

4. **Access the App**  
   Open your browser and visit: [http://localhost:3000](http://localhost:3000)

5. **Deploy**
   - Branch            - main
   - Root Directory    - backend
   - Build Command     - npm run build:view
   - Start Command     - npm start

1. [Code for API V1 (without authentication)](https://github.com/levkaravanov/gr7_cm3_branch3-update-router/tree/main/backend)

2. [Code for API V2 (with authentication and protection)](https://github.com/levkaravanov/gr7_cm3_branch3-update-router/tree/with_auth/backend)

3. [Code for the final frontend.](https://github.com/levkaravanov/gr7_cm3_branch3-update-router/tree/with_auth/frontend)

4. Backend tests for API V1

 ```PASS  tests/job.test.js
  Job Controller
    ✓ should return all jobs as JSON when GET /api/jobs is called (74 ms)
    ✓ should create a new job when POST /api/jobs is called (15 ms)
    ✓ should return one job by ID when GET /api/jobs/:id is called (6 ms)
    ✓ should return 404 for a non-existing job ID (3 ms)
    ✓ should update one job with partial data when PUT /api/jobs/:id is called (12 ms)
    ✓ should return 400 for invalid job ID when PUT /api/jobs/:id (3 ms)
    ✓ should delete one job by ID when DELETE /api/jobs/:id is called (8 ms)
    ✓ should return 400 for invalid job ID when DELETE /api/jobs/:id (4 ms)

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        0.577 s, estimated 1 s
Ran all test suites.```

5. Backend tests for API V2

 ```PASS  tests/user.test.js
  User Auth
    ✓ should signup a new user (164 ms)
    ✓ should login and return a token (141 ms)
    ✓ should access protected route /me with Bearer token (199 ms)
    ✓ should reject /me without token (3 ms)

  console.log
    [dotenv@17.2.3] injecting env (4) from .env -- tip: ⚙️  enable debug logging with { debug: true }

      at _log (node_modules/dotenv/lib/main.js:142:11)

  console.log
    [dotenv@17.2.3] injecting env (0) from .env -- tip: 🔐 encrypt with Dotenvx: https://dotenvx.com

      at _log (node_modules/dotenv/lib/main.js:142:11)

  console.log
    MongoDB Connected: localhost

      at log (config/db.js:7:13)

 PASS  tests/job.test.js
  Job Controller
    ✓ should return all jobs as JSON when GET /api/jobs is called (22 ms)
    ✓ should create a new job when POST /api/jobs is called (15 ms)
    ✓ should return one job by ID when GET /api/jobs/:id is called (6 ms)
    ✓ should return 404 for a non-existing job ID (4 ms)
    ✓ should update one job with partial data when PUT /api/jobs/:id is called (14 ms)
    ✓ should return 400 for invalid job ID when PUT /api/jobs/:id (3 ms)
    ✓ should delete one job by ID when DELETE /api/jobs/:id is called (5 ms)
    ✓ should return 400 for invalid job ID when DELETE /api/jobs/:id (7 ms)

Test Suites: 2 passed, 2 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        1.167 s, estimated 2 s
Ran all test suites.```

6. URLs for the deployed APIs and frontend(s)

Project without authentication https://gr7-cm3-without-auth.onrender.com

Project with authentication https://gr7-cm3-with-auth.onrender.com

7. Self-assesments files:
   [Lev](lev.md)
   [Jari](Jari.md)
   [Aleksi](Aleksi.md)
