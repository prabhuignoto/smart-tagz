# Master Plan: Modern Unit Test Setup for Smart-Tagz

**Goal:** Achieve 90%+ test coverage with comprehensive unit & component tests, CI/CD integration, and pre-commit hooks.

## Phase 1: Install Dependencies & Configuration
1. Install testing dependencies:
   - `vitest` - Modern test framework with Vite integration
   - `@vue/test-utils@^2.x` - Official Vue 3 testing utilities
   - `@vitest/ui` - Visual test interface
   - `happy-dom` - Lightweight DOM environment
   - `@vitest/coverage-v8` - Coverage reporting

2. Create `vitest.config.ts` with:
   - Path aliases matching TypeScript config (`@/*` → `src/*`)
   - Vue plugin support
   - Happy-DOM environment
   - Coverage configuration (90% thresholds for statements, branches, functions, lines)
   - Test file patterns (`**/*.{test,spec}.{ts,tsx}`)

3. Add npm scripts to `package.json`:
   - `test` - Run all tests
   - `test:ui` - Launch visual UI
   - `test:watch` - Watch mode
   - `test:coverage` - Generate coverage report

## Phase 2: Unit Tests - Core Business Logic (Priority 1)

**File: `src/components/MainSetup.test.ts`** (~400-500 lines)

Test suites:
- **Tag Addition**: Valid tags, duplicates prevention, max limit, empty/whitespace handling, trim behavior
- **Tag Removal**: Single deletion, backspace with highlight, quick delete (Ctrl+A), tag count updates
- **Tag Editing**: Value updates, duplicate prevention on edit, validation, save/cancel flows
- **Keyboard Navigation**: Arrow keys (up/down), Enter selection, Escape handling, Tab behavior
- **Auto-suggest Filtering**: Search matching, case sensitivity, empty results, special characters
- **Input Management**: Focus/blur events, input clearing, placeholder behavior
- **State Management**: Reactive updates, watcher triggers, computed properties

**File: `src/components/HandlePaste.test.ts`** (~200-250 lines)

Test suites:
- **Delimiter Parsing**: Single delimiter, multiple delimiters, custom separators, edge cases
- **Paste Validation**: Duplicate detection, max tags enforcement, available slots calculation
- **String Processing**: Trimming, empty string filtering, special characters, Unicode support
- **Integration**: Paste event handling, clipboard data extraction, tag array merging

## Phase 3: Component Tests - Vue Components (Priority 1)

**File: `src/components/Main.spec.ts`** (~300-350 lines)
- Props validation & defaults
- Theme customization rendering
- Event emissions (`onChanged` with correct payload)
- Read-only vs editable mode
- Input element mounting & focus
- Slot rendering (if applicable)
- CSS class application

**File: `src/components/Tag.spec.ts`** (~200-250 lines)
- Tag rendering with value
- Edit mode toggle (double-click)
- Remove button functionality
- Highlight state visual changes
- Read-only mode (no edit/remove)
- Event emissions to parent

**File: `src/components/Tags.spec.ts`** (~150-200 lines)
- Multiple tag rendering
- Tag list iteration
- Empty state handling
- Transition effects

**File: `src/components/SuggestPane.spec.ts`** (~250-300 lines)
- Suggestion list rendering
- Filtering logic integration
- Keyboard navigation (arrow keys)
- Mouse click selection
- Enter key selection
- Escape key to close
- Empty state message

**File: `src/components/CloseIcon.spec.ts`** (~50-100 lines)
- Icon rendering
- Click event handling
- Accessibility attributes

## Phase 4: CI/CD Integration

Update `.github/workflows/lint-build.yml`:
1. Add test job step after lint:
   ```yaml
   - name: Run Tests
     run: pnpm test

   - name: Generate Coverage
     run: pnpm test:coverage
   ```

2. Configure to fail pipeline if coverage < 90%

3. Optional: Add coverage badge to README

## Phase 5: Pre-commit Hooks

Update `.husky/pre-commit` or `package.json` lint-staged:
1. Run related tests for changed files:
   ```json
   "*.{ts,vue}": [
     "eslint",
     "vitest related --run"
   ]
   ```

2. Ensure tests pass before commit is allowed

## Phase 6: Test Utilities & Helpers

**File: `src/test/test-utils.ts`** (~100-150 lines)
- Custom mount wrapper for Vue components
- Mock data factories (sample tags, props)
- Common assertions/matchers
- Keyboard event helpers
- Clipboard simulation utilities

## Phase 7: Coverage Enforcement & Documentation

1. Set coverage thresholds in `vitest.config.ts`:
   - Statements: 90%
   - Branches: 90%
   - Functions: 90%
   - Lines: 90%

2. Add test documentation:
   - Update README with test commands
   - Add testing best practices guide (optional)

## Execution Summary

**Total Test Files:** 8 files
**Estimated Lines:** ~1,900-2,200 lines
**Coverage Target:** 90%+ across all metrics
**Timeline:** 3-4 hours setup + 10-12 hours comprehensive test writing

**Order of Execution:**
1. Install dependencies (Phase 1)
2. Create configuration (Phase 1)
3. Build test utilities (Phase 6)
4. Write unit tests in parallel with component tests (Phases 2 & 3)
5. Integrate CI/CD (Phase 4)
6. Add pre-commit hooks (Phase 5)
7. Enforce coverage thresholds (Phase 7)

**Key Benefits:**
✅ Prevents regressions
✅ Enables confident refactoring
✅ Documents expected behavior
✅ Catches bugs before production
✅ Improves code quality through testability
✅ Automated quality gates in CI/CD
