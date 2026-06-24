# Playwright Daraz.pk Tests

[![Daraz E2E Tests](https://github.com/hmik2003/playwright-daraz-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/hmik2003/playwright-daraz-tests/actions/workflows/playwright.yml)
[![Tests](https://img.shields.io/badge/tests-14%20passing-brightgreen)](https://github.com/hmik2003/playwright-daraz-tests)
[![Playwright](https://img.shields.io/badge/Playwright-1.49-blue?logo=playwright)](https://playwright.dev)
[![Daraz](https://img.shields.io/badge/Target-Daraz.pk-orange)](https://www.daraz.pk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

End-to-end automation suite for **[Daraz.pk](https://www.daraz.pk)** — Pakistan's largest e-commerce platform. Covers search, product pages, cart, and login flows with locale-aware configuration (`en-PK`, `Asia/Karachi`).

> **Portfolio highlight:** Local market context makes this stand out to Pakistani companies — demonstrates real-world e-commerce QA on a production site recruiters recognize.

## Features

- **Real e-commerce flows** — search, PDP, cart, login page validation
- **Resilient selectors** — multi-fallback locators for Daraz's dynamic DOM
- **Locale configuration** — Pakistan timezone and language headers
- **Smoke tag** — `@smoke` for fast CI feedback
- **Overlay handling** — auto-dismisses popups and modals

## Project Structure

```
playwright-daraz-tests/
├── .github/workflows/     # CI with weekly scheduled smoke runs
├── fixtures/              # Search terms, selectors, test fixtures
├── pages/                 # Page Object classes
├── tests/                 # Test specifications
├── utils/                 # Retry & network helpers
├── .env.example           # Optional credentials template
├── playwright.config.ts
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm 9+

### Installation

```bash
git clone https://github.com/hmik2003/playwright-daraz-tests.git
cd playwright-daraz-tests
npm install
npx playwright install
```

### Run Tests

```bash
# Full suite
npm test

# Smoke tests only (fast)
npm run test:smoke

# Headed mode (watch the browser)
npm run test:headed
```

### Optional: Authenticated Flows

Copy `.env.example` to `.env` and add credentials if you extend tests with logged-in flows:

```bash
cp .env.example .env
```

> Login tests currently validate the login **form UI** only — Daraz uses OTP verification which requires manual intervention.

## Test Coverage

| Suite      | Tests | Scenarios                              |
|------------|-------|----------------------------------------|
| Homepage   | 3     | Load, logo, search bar                 |
| Search     | 3     | Phones, laptops, URL validation        |
| Product    | 4     | PDP load, title, price, add-to-cart    |
| Login      | 2     | Form visibility, password field        |
| Cart       | 2     | Cart page access, add from PDP         |

## Design Decisions

| Decision              | Rationale                                           |
|-----------------------|-----------------------------------------------------|
| Single worker         | Reduces rate-limiting on live site                  |
| Retry on failure      | Handles transient network/DOM flakiness             |
| No hardcoded login    | OTP flow requires manual step — tests stay reliable |
| Multi-fallback selectors | Daraz updates CSS classes frequently             |

## Tech Stack

- [Playwright](https://playwright.dev/) — browser automation
- [TypeScript](https://www.typescriptlang.org/) — type-safe tests
- [GitHub Actions](https://github.com/features/actions) — CI/CD with weekly schedule

## License

MIT
