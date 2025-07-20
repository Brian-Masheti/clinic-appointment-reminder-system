> **⚠️ This project is under active development. Some features may be incomplete or subject to change.**

<p align="center">
  <img src="client/public/health-app.png" alt="Health App Logo" width="120" />
</p>

# 🏥 HealthTrack Appointment System

A full-stack MERN application for managing clinic appointments, with robust testing and debugging strategies.

---

## 🚀 Features

- User registration and login (Doctor/Patient)
- Appointment creation, update, and soft-delete
- Doctor and patient dashboards
- Clinic management
- Automated reminders (future scope)
- Comprehensive unit, integration, and end-to-end testing

---

## 📦 Project Structure

```
clinic-appointment-reminder-system/
│
├── client/         # React frontend (Vite, Tailwind, Cypress, Jest)
│   ├── src/
│   ├── public/
│   ├── coverage/
│   └── ...
│
├── server/         # Express backend (Jest, Supertest, MongoDB)
│   ├── controllers/
│   ├── models/
│   ├─��� routes/
│   ├── tests/
│   ├── coverage/
│   └── ...
│
├── .gitignore
├── README.md
└── ...
```

---

## 🧪 Testing Strategy

### Client (React)
- **Unit tests:** React components, utility functions (`Jest`, `@testing-library/react`)
- **Integration tests:** Component/API interaction, form handling
- **E2E tests:** User flows with `Cypress` (`cypress/e2e/*.cy.js`)
- **Coverage:** Run `npx jest --coverage` in `client` for a detailed report

### Server (Express)
- **Unit tests:** Utility functions, controllers
- **Integration tests:** API endpoints with `Supertest`
- **Database isolation:** Test DB is cleared before each test
- **Coverage:** Run `npx jest --coverage` in `server` for a detailed report

---

## 🐞 Debugging Techniques

- **React error boundaries** for catching UI errors
- **Express error handling middleware** for API errors
- **Logging:** Console logs for DB connection, errors, and test setup
- **.env files:** All secrets and URIs are kept out of source code

---

## 🛠️ Setup & Usage

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd clinic-appointment-reminder-system
```

### 2. Install dependencies
```sh
cd client && pnpm install
cd ../server && pnpm install
```

### 3. Set up environment variables
- Copy `.env.example` to `.env` in both `client` and `server` and fill in your values.

### 4. Run the app
- **Client:** `pnpm dev` (in `client`)
- **Server:** `pnpm start` (in `server`)

### 5. Run tests
- **Client:** `npx jest` or `npx jest --coverage`
- **Server:** `npx jest` or `npx jest --coverage`
- **E2E:** `pnpm test:e2e` (Cypress)

---

## 📸 Coverage Reports

- **Client Coverage:**
  <p align="center">
    <img src="client/public/client-coverage.png" alt="Client Coverage" width="600" />
  </p>
- **Server Coverage:**
  <p align="center">
    <img src="client/public/server-coverage.png" alt="Server Coverage" width="600" />
  </p>

---

## 📄 Submission Checklist

- [x] All tests passing (unit, integration, E2E)
- [x] Coverage reports/screenshots included
- [x] Documentation of testing and debugging strategies
- [x] `.gitignore` excludes test files, node_modules, and secrets
- [x] Regular commits pushed to GitHub Classroom repo

---

## 👨‍💻 Author

- Brian Masheti

---

## 📝 License

This project is for educational purposes (PLP Feb 2025 Cohort).
