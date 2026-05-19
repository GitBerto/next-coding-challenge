# technical solution

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
1. Fix TypeScript configuration
2. Introduce project structure by using dynamic routes [locale] and add /us route
3. Set up lib/ utilities: API client, currency/locale formatters
4. Refactor into reusable, semantic, accessible components
5. Migrate to products API.
6. Fix and stabilize existing tests (specific selectors)
7. Implement checkout page and use contexts
8. Integrate more-products API asynchronously after initial load
9. Set up GitHub Actions for tests + deploy on push

## Testing Strategy
Tests are written or reviewed alongside each feature, not as a separate phase.