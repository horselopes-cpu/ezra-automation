# Ezra Booking Automation Suite

## Overview
This project provides a production-ready automation framework for the Ezra booking flow. It prioritizes **Patient Privacy** (Question 2) and **System Reliability** (Question 1) using Playwright with TypeScript.

## Design Decisions & Scalability
- **Page Object Model (POM):** This structure separates test logic from page-specific selectors, making it highly scalable as Ezra adds more endpoints.
- **Environment Agnostic:** The following instructions are scalable with the actual environment setup and configurations so that any changes made will be re-useable.
- **Security-First Approach:** Includes specific integration tests for **IDOR** (Insecure Direct Object Reference) prevention to protect sensitive medical data.

## Setup Instructions
1. **Install Dependencies:** `npm install`.
2. **Install Playwright Browsers:** `npx playwright install.
3. **Configure Environment:** Create a `.env` file with the provided staging login credentials rather than hardcoding them.

## Execution
- **Run all tests:** `npm test` or `npx playwright test'.
- **Headed mode (visual):** `npx playwright test --project=chromium --headed`.
- **View report:** `npx playwright show-report`.

## Core Assumptions
1. **Stripe Test Mode:** The system is assumed to be in test mode to accept standard test cards (e.g., 4242...).
2. **BaseURL:** The `baseURL` is configured centrally in `playwright.config.ts` for easy switching between staging and production environments.
3. **Data Isolation:** Each test run uses a unique `memberId` to avoid collisions in the database.

=====

For a detailed analysis of theses tests execution, please refer to [Test Execution Report](./TEST_REPORT.md).
