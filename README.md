# OWASP Juice Shop — End-to-End Automation

> Behaviour-driven browser tests for realistic account and payment workflows in OWASP Juice Shop.

![WebdriverIO](https://img.shields.io/badge/WebdriverIO-E2E-EA5906?logo=webdriverio&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-23D96C?logo=cucumber&logoColor=white)
![Allure](https://img.shields.io/badge/Allure-Reports-yellow)

## Test coverage

The suite exercises multi-step user journeys instead of isolated selectors:

- reject registration with an already-used email;
- reset a forgotten password through the security-question flow;
- authenticate a newly created user;
- add and verify a stored payment card;
- safely reuse account and navigation steps across scenarios.

```mermaid
flowchart LR
    A[Gherkin feature] --> B[Step definition]
    B --> C[Page Object]
    C --> D[Chrome / Juice Shop]
    D --> E[Assertions]
    E --> F[Spec and Allure reports]
```

## Architecture

```text
features/
├── *.feature             Business-readable scenarios
├── step-definitions/     Cucumber step implementations
└── pageobjects/          Reusable page interactions and selectors
wdio.conf.js              WebdriverIO runner configuration
allure-results/           Generated report data
```

## Running the suite

The repository contains the test sources and runner configuration but does not currently include a root `package.json`. To run it, initialise a compatible WebdriverIO project and install the packages referenced by `wdio.conf.js` and the source imports:

```bash
npm init -y
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/cucumber-framework @wdio/spec-reporter @wdio/allure-reporter webdriverio
npx wdio run wdio.conf.js
```

The tests expect Chrome and a reachable Juice Shop instance. Review the URL and test-account data in the page objects before execution.

## Design choices

- Page Object Model keeps selectors out of feature files.
- Cucumber expresses flows in domain language.
- A single browser instance reduces shared-account race conditions.
- Explicit waits are used around dynamic Angular UI elements.

> Use only against an OWASP Juice Shop instance that you own or are authorised to test.
