# Technical solution

## Preliminary Analysis

1. Project structure is not present.  
2. No file naming conventions: file names such as `test.tsx` are not descriptive.
3. Incomplete type configuration.
4. The implementation does not use semantic HTML elements and relies on hardcoded values.
5. The codebase is not properly split into reusable components.
6. Accessibility issues: missing ARIA attributes and general accessibility best practices.
7. Responsiveness issues: some layout issues appear on different screen sizes.
8. Use of generic selectors in tests instead of more specific and stable selectors.
9. `npm run lint` generates a TypeScript-related warning, as TypeScript version 5.2.2 is not officially supported (possible trade-off).

## High-Level Procedure
1. Update TypeScript configuration
2. Introduce project structure by using dynamic routes [locale] and add /us route
3. Set up lib/ utilities: API client, currency/locale formatters
4. Refactor into reusable, semantic, accessible components
5. Migrate to products API.
6. Fix and stabilise existing tests (specific selectors)
7. Implement checkout page and use contexts
8. Integrate more-products API asynchronously after initial load
9. Set up GitHub Actions for tests + deploy on push

## Trade-offs

1. **TypeScript version warning not addressed.** `npm run lint` warns 
   that TypeScript 5.2.2 is not officially supported. If everything 
   works as expected, this will be treated as technical debt rather than a 
   blocker.
2. **Minimal UI changes.** No design system or visual redesign is 
   introduced, as no UI/UX requirements were specified.
3. **Basket state is not persisted.** The basket lives only in React 
   Context and resets on page refresh. Persistence (localStorage, 
   cookies, or server-side sessions) is out of scope but would be the 
   natural next step for a production scenario.
4. **Custom i18n solution instead of a library.** Keeps dependencies 
   minimal and is sufficient for two locales. A dedicated library 
   (`next-intl`, `next-i18next`) would be preferable when scaling to 
   many languages with complex pluralisation rules.

## Deployment

The application is deployed on **Netlify** at [dulcet-jalebi-182af1.netlify.app](https://dulcet-jalebi-182af1.netlify.app).

A GitHub Actions workflow (`.github/workflows/ci.yml`) is configured to:
1. **Run all tests** on every push to `main` and on manual trigger (`workflow_dispatch`)
2. **Deploy to Netlify** automatically after tests pass, using the Netlify CLI

The deploy is gated behind the test job — if any test fails, the deployment is blocked. The workflow can also be triggered manually from the GitHub Actions UI, allowing deployment from any branch.

## Design Principles

- **Scalable, not over-engineered.** Favor small, well-placed 
  extension points over premature abstractions.
- **Server-first.** Leverage Next.js App Router for data fetching and 
  rendering on the server, avoiding client-side loading states where 
  possible.
- **Tests close to features.** Tests are written alongside the code 
  they cover.