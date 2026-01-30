# Ezra Booking Automation Suite

## Overview
This project provides a production-ready automation framework for the Ezra booking flow. It prioritizes **Patient Privacy** (Question 2) and **System Reliability** (Question 1) using Playwright with TypeScript.

## Design Decisions & Scalability
- [cite_start]**Page Object Model (POM):** This structure separates test logic from page-specific selectors, making it highly scalable as Ezra adds more endpoints [cite: 296, 315].
- **Environment Agnostic:** The following instructions are scalable with the actual environment setup and configurations so that any changes made will be re-useable.
- [cite_start]**Security-First Approach:** Includes specific integration tests for **IDOR** (Insecure Direct Object Reference) prevention to protect sensitive medical data [cite: 301, 309].

## Setup Instructions
1. [cite_start]**Install Dependencies:** `npm install` [cite: 299, 338].
2. [cite_start]**Install Playwright Browsers:** `npx playwright install`[cite: 299, 338].
3. [cite_start]**Configure Environment:** Create a `.env` file with the provided staging login credentials rather than hardcoding them [cite: 653, 799].

## Execution
- [cite_start]**Run all tests:** `npm test` or `npx playwright test`[cite: 338, 371].
- [cite_start]**Headed mode (visual):** `npx playwright test --project=chromium --headed`[cite: 339].
- [cite_start]**View report:** `npx playwright show-report`[cite: 299, 325].

## Core Assumptions
1. [cite_start]**Stripe Test Mode:** The system is assumed to be in test mode to accept standard test cards (e.g., 4242...)[cite: 341, 357].
2. [cite_start]**BaseURL:** The `baseURL` is configured centrally in `playwright.config.ts` for easy switching between staging and production environments [cite: 324, 349].
3. [cite_start]**Data Isolation:** Each test run uses a unique `memberId` to avoid collisions in the database [cite: 359].

=====

For a detailed analysis of theses tests execution, please refer to [Test Execution Report](./TEST_REPORT.md).