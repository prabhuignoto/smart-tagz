<template>
  <div class="page">
    <!-- Sticky Navigation Header -->
    <nav class="nav-header">
      <div class="nav-container">
        <div class="nav-brand">
          <img
            src="../assets/logo.png"
            alt="Smart-Tagz"
            class="logo"
          />
          <span class="brand-text">Smart-Tagz</span>
        </div>
        <div class="nav-links">
          <a
            href="https://github.com/prabhuignoto/smart-tagz"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-link"
          >
            <img
              src="../assets/github.svg"
              alt="GitHub"
            />
          </a>
          <a
            href="https://www.npmjs.com/package/smart-tagz"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-link"
          >
            NPM
          </a>
          <a
            href="https://github.com/prabhuignoto/smart-tagz#documentation"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-link"
          >
            Docs
          </a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Smart Input Tags</h1>
        <p class="hero-description">
          A powerful, feature-rich input tags component for Vue 3. Built with TypeScript, fully
          customizable, and production-ready.
        </p>

        <div class="features-badges">
          <span class="badge">Vue 3</span>
          <span class="badge">TypeScript</span>
          <span class="badge">Customizable</span>
          <span class="badge">Accessible</span>
        </div>

        <div class="hero-actions">
          <button
            class="btn btn-primary"
            @click="copyInstall"
          >
            {{ copied ? '✓ Copied!' : 'npm install smart-tagz' }}
          </button>
          <a
            href="https://github.com/prabhuignoto/smart-tagz"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-secondary"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>

    <!-- Examples Section -->
    <section class="examples-section">
      <div class="examples-container">
        <div class="section-header">
          <h2>Examples & Features</h2>
          <p>Explore all the powerful features with interactive examples</p>
        </div>

        <div class="examples-grid">
          <div class="example-card">
            <Basic />
          </div>
          <div class="example-card">
            <Defaults />
          </div>
          <div class="example-card">
            <Editable />
          </div>
          <div class="example-card">
            <Autocomplete />
          </div>
          <div class="example-card">
            <Paste />
          </div>
          <div class="example-card">
            <ReadOnly />
          </div>
          <div class="example-card">
            <Duplicates />
          </div>
          <div class="example-card">
            <Maxtags />
          </div>
          <div class="example-card">
            <Theme />
          </div>
          <div class="example-card">
            <QuickDelete />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="demo-footer">
      <div class="footer-content">
        <!-- Feature Highlights -->
        <section class="footer-section">
          <h3>Why Smart-Tagz?</h3>
          <ul class="features-list">
            <li>⚡ Lightweight and performant</li>
            <li>🎨 Fully customizable styling</li>
            <li>♿ Built with accessibility in mind</li>
            <li>📦 Zero external dependencies</li>
          </ul>
        </section>

        <!-- Quick Links -->
        <section class="footer-section">
          <h3>Documentation</h3>
          <ul class="footer-links">
            <li>
              <a
                href="https://github.com/prabhuignoto/smart-tagz#getting-started"
                target="_blank"
                rel="noopener noreferrer"
              >
                Getting Started
              </a>
            </li>
            <li>
              <a
                href="https://github.com/prabhuignoto/smart-tagz#api"
                target="_blank"
                rel="noopener noreferrer"
              >
                API Reference
              </a>
            </li>
            <li>
              <a
                href="https://github.com/prabhuignoto/smart-tagz#examples"
                target="_blank"
                rel="noopener noreferrer"
              >
                Examples
              </a>
            </li>
            <li>
              <a
                href="https://github.com/prabhuignoto/smart-tagz/blob/master/CHANGELOG.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Changelog
              </a>
            </li>
          </ul>
        </section>

        <section class="footer-section">
          <h3>Resources</h3>
          <ul class="footer-links">
            <li>
              <a
                href="https://github.com/prabhuignoto/smart-tagz"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/smart-tagz"
                target="_blank"
                rel="noopener noreferrer"
              >
                NPM Package
              </a>
            </li>
            <li>
              <a
                href="https://github.com/prabhuignoto/smart-tagz/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                Issues
              </a>
            </li>
            <li>
              <a
                href="https://github.com/prabhuignoto/smart-tagz/discussions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discussions
              </a>
            </li>
          </ul>
        </section>

        <!-- Social Links & Attribution -->
        <section class="footer-section footer-bottom">
          <div class="social-links">
            <a
              href="https://github.com/prabhuignoto"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              title="GitHub"
            >
              <img
                src="../assets/github.svg"
                alt="GitHub"
              />
            </a>
            <a
              href="https://www.prabhumurthy.com"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              title="Personal Website"
            >
              🌐
            </a>
          </div>
          <div class="footer-attribution">
            <p>
              Created by
              <a
                href="https://www.prabhumurthy.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prabhu Murthy
              </a>
            </p>
            <p class="version">v{{ version }}</p>
          </div>
        </section>
      </div>

      <div class="footer-divider"></div>
      <p class="footer-copyright">© 2024 Smart-Tagz. MIT License.</p>
    </footer>
  </div>
</template>

<script lang="ts">
import Basic from '../examples/basic.vue'
import Defaults from '../examples/defaults.vue'
import Editable from '../examples/editable.vue'
import Autocomplete from '../examples/autocomplete.vue'
import Paste from '../examples/paste.vue'
import ReadOnly from '../examples/readonly.vue'
import Duplicates from '../examples/duplicates.vue'
import Maxtags from '../examples/maxtags.vue'
import Theme from '../examples/theme.vue'
import QuickDelete from '../examples/quickdelete.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Demo',
  components: {
    Basic,
    Defaults,
    Editable,
    Autocomplete,
    Paste,
    ReadOnly,
    Duplicates,
    Maxtags,
    Theme,
    QuickDelete,
  },
  data() {
    return {
      copied: false,
      version: '0.4.1',
    }
  },
  methods: {
    copyInstall() {
      const text = 'npm install smart-tagz'
      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.copied = true
          setTimeout(() => {
            this.copied = false
          }, 2000)
        })
        .catch(() => {
          alert('Failed to copy. Please try again.')
        })
    },
  },
})
</script>

<style lang="scss" scoped>
@use '@/styles' as *;

// ============ Page Layout ============
.page {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
}

// ============ Navigation Header ============
.nav-header {
  position: sticky;
  top: 0;
  z-index: var(--z-index-tooltip);
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(10px);
  background-color: rgb(255 255 255 / 98%);
  padding: var(--spacing-md) 0;
  box-shadow: 0 2px 8px rgb(0 0 0 / 8%);
}

.nav-container {
  @include flex-row(center, space-between);

  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  width: 100%;

  @include respond-to('sm') {
    padding: 0 var(--spacing-md);
  }
}

.nav-brand {
  @include flex-row(center, flex-start);

  gap: var(--spacing-sm);
  text-decoration: none;
  color: var(--color-text-primary);

  .logo {
    height: 28px;
    width: auto;
  }

  .brand-text {
    font-weight: var(--font-weight-semi-bold);
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    display: none;

    @include respond-to('sm') {
      display: inline;
    }
  }
}

.nav-links {
  @include flex-row(center, flex-end);

  gap: var(--spacing-lg);

  .nav-link {
    text-decoration: none;
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-normal);
    transition: color var(--transition-duration) ease;
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);

    img {
      height: 20px;
      width: 20px;
    }

    &:hover {
      color: var(--color-primary);
    }
  }
}

// ============ Hero Section ============
.hero {
  background: linear-gradient(
    135deg,
    var(--color-primary-gradient-start) 0%,
    var(--color-primary-gradient-end) 100%
  );
  padding: var(--spacing-3xl) var(--spacing-lg);
  text-align: center;
  position: relative;
  overflow: hidden;

  // Add subtle animated background pattern
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 20% 50%, rgb(255 255 255 / 10%) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgb(255 255 255 / 10%) 0%, transparent 50%);
    pointer-events: none;
  }

  @include respond-to('sm') {
    padding: var(--spacing-2xl) var(--spacing-md);
  }

  @include respond-to('md') {
    padding: var(--spacing-2xl) var(--spacing-lg);
  }

  @include respond-to('lg') {
    padding: var(--spacing-3xl) var(--spacing-lg);
  }
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 2.75rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  margin: 0 0 var(--spacing-lg) 0;
  line-height: 1.1;
  text-shadow: 0 2px 10px rgb(0 0 0 / 20%);

  @include respond-to('sm') {
    font-size: 2rem;
    margin-bottom: var(--spacing-md);
  }

  @include respond-to('md') {
    font-size: 2.25rem;
  }

  @include respond-to('lg') {
    font-size: 2.5rem;
  }

  @include respond-to('xl') {
    font-size: 2.75rem;
  }
}

.hero-description {
  font-size: var(--font-size-lg);
  color: rgb(255 255 255 / 95%);
  margin: 0 0 var(--spacing-xl) 0;
  line-height: 1.6;
  font-weight: var(--font-weight-normal);

  @include respond-to('sm') {
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-lg);
  }
}

.features-badges {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  justify-content: center;
  flex-wrap: wrap;

  .badge {
    display: inline-block;
    background: rgb(255 255 255 / 25%);
    backdrop-filter: blur(10px);
    color: var(--color-white);
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--border-radius-full);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semi-bold);
    box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
    border: 1px solid rgb(255 255 255 / 30%);
    transition: all var(--transition-base);

    &:nth-child(1) {
      background: linear-gradient(135deg, rgb(251 113 133 / 30%), rgb(251 113 133 / 50%));
    }

    &:nth-child(2) {
      background: linear-gradient(135deg, rgb(245 158 11 / 30%), rgb(245 158 11 / 50%));
    }

    &:nth-child(3) {
      background: linear-gradient(135deg, rgb(16 185 129 / 30%), rgb(16 185 129 / 50%));
    }

    &:nth-child(4) {
      background: linear-gradient(135deg, rgb(59 130 246 / 30%), rgb(59 130 246 / 50%));
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgb(0 0 0 / 20%);
    }
  }
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;

  @include respond-to('sm') {
    gap: var(--spacing-sm);
  }
}

.btn {
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semi-bold);
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    background var(--transition-base);
  white-space: nowrap;

  @include respond-to('sm') {
    padding: var(--spacing-md) var(--spacing-lg);
  }

  &:focus-visible {
    outline: 3px solid rgb(255 255 255 / 50%);
    outline-offset: 2px;
  }
}

.btn-primary {
  background: var(--color-accent);
  color: var(--color-white);
  box-shadow: 0 4px 16px rgb(245 158 11 / 40%);

  &:hover {
    background: var(--color-accent-light);
    box-shadow: 0 8px 24px rgb(245 158 11 / 50%);
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgb(245 158 11 / 40%);
  }
}

.btn-secondary {
  background: rgb(255 255 255 / 20%);
  backdrop-filter: blur(10px);
  color: var(--color-white);
  border: 2px solid rgb(255 255 255 / 40%);

  &:hover {
    background: rgb(255 255 255 / 30%);
    border-color: rgb(255 255 255 / 60%);
    box-shadow: 0 4px 16px rgb(0 0 0 / 20%);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
}

// ============ Examples Section ============
.examples-section {
  flex: 1;
  background: var(--color-bg-secondary);
  width: 100%;
  padding: var(--spacing-3xl) var(--spacing-lg) var(--spacing-2xl);

  @include respond-to('sm') {
    padding: var(--spacing-2xl) var(--spacing-md);
  }
}

.examples-container {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;

  @include respond-to('lg') {
    max-width: 1000px;
  }

  @include respond-to('xl') {
    max-width: 1100px;
  }
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);

  h2 {
    font-size: 2.25rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    margin: 0 0 var(--spacing-md) 0;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;

    @include respond-to('sm') {
      font-size: 1.75rem;
    }
  }

  p {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    margin: 0;
  }
}

.examples-grid {
  margin-bottom: 2rem;
}

.example-card {
  width: 100%;
  background: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: 0 4px 12px rgb(0 0 0 / 8%);
  border: 1px solid var(--color-border);
  position: relative;
  box-sizing: border-box;
  margin-bottom: 2rem;

  // Override example styles within cards
  :deep(.example) {
    width: 100%;
    max-width: 100%;
    overflow: hidden;

    * {
      box-sizing: border-box;
    }

    header {
      h3 {
        font-size: 1.25rem;
        font-weight: var(--font-weight-semi-bold);
        color: var(--color-text-primary);
        margin: 0 0 var(--spacing-md) 0;
        position: relative;

        /* stylelint-disable-next-line no-descending-specificity */
        &::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
          border-radius: var(--border-radius-full);
        }
      }
    }

    /* stylelint-disable-next-line no-descending-specificity */
    p {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      line-height: 1.7;
      margin-bottom: var(--spacing-lg);
      margin-top: var(--spacing-lg);
      text-align: left;
    }

    .sample-view {
      width: 100%;
      max-width: 100%;
      padding: var(--spacing-lg);
      background: linear-gradient(135deg, #faf5ff 0%, #f0f9ff 100%);
      border-radius: var(--border-radius-md);
      border: 2px solid var(--color-border);
      margin-top: var(--spacing-lg);
      box-shadow: inset 0 2px 8px rgb(99 102 241 / 8%);
    }
  }
}

// ============ Footer ============
.demo-footer {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: var(--color-white);
  border-top: 3px solid var(--color-primary);
  padding: var(--spacing-xl) var(--spacing-lg) var(--spacing-md);
  position: relative;
  overflow: hidden;

  // Add decorative gradient overlay
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: radial-gradient(circle at 30% 0%, rgb(99 102 241 / 10%) 0%, transparent 50%);
    pointer-events: none;
  }

  @include respond-to('sm') {
    padding: var(--spacing-lg) var(--spacing-md) var(--spacing-sm);
  }
}

.footer-content {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  position: relative;
  z-index: 1;

  @include respond-to('sm') {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  @include respond-to('md') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.footer-section {
  /* stylelint-disable-next-line no-descending-specificity */
  h3 {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
    color: var(--color-white);
    margin: 0 0 var(--spacing-md) 0;
    position: relative;
    padding-bottom: var(--spacing-xs);

    /* stylelint-disable-next-line no-descending-specificity */
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 30px;
      height: 2px;
      background: linear-gradient(90deg, var(--color-accent), var(--color-accent-coral));
      border-radius: var(--border-radius-full);
    }
  }

  &.footer-bottom {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    grid-column: 1 / -1;
    padding-top: var(--spacing-md);
    border-top: 1px solid rgb(255 255 255 / 10%);
    margin-top: var(--spacing-sm);
  }
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    color: rgb(255 255 255 / 80%);
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-sm);
    line-height: 1.5;
    padding-left: var(--spacing-md);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 7px;
      width: 5px;
      height: 5px;
      background: var(--color-accent);
      border-radius: 50%;
    }
  }
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: var(--spacing-sm);

    /* stylelint-disable-next-line no-descending-specificity */
    a {
      color: rgb(255 255 255 / 70%);
      text-decoration: none;
      font-size: var(--font-size-sm);
      transition: all var(--transition-base);
      display: inline-block;

      &:hover {
        color: var(--color-accent-light);
        transform: translateX(4px);
      }
    }
  }
}

.social-links {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--border-radius-md);
    background: rgb(255 255 255 / 10%);
    border: 2px solid rgb(255 255 255 / 20%);
    transition: all var(--transition-base);
    text-decoration: none;
    font-size: 18px;

    img {
      height: 18px;
      width: 18px;
      filter: invert(1);
    }

    &:hover {
      background: var(--color-accent);
      border-color: var(--color-accent);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgb(245 158 11 / 40%);

      img {
        filter: invert(1);
      }
    }
  }
}

.footer-attribution {
  /* stylelint-disable-next-line no-descending-specificity */
  p {
    margin: var(--spacing-xs) 0;
    color: rgb(255 255 255 / 60%);
    font-size: var(--font-size-sm);

    /* stylelint-disable-next-line no-descending-specificity */
    a {
      color: var(--color-accent-light);
      text-decoration: none;
      transition: color var(--transition-base);

      &:hover {
        color: var(--color-accent);
        text-decoration: underline;
      }
    }

    &.version {
      font-size: var(--font-size-xs);
      color: rgb(255 255 255 / 40%);
      font-weight: var(--font-weight-medium);
    }
  }
}

.footer-divider {
  max-width: 1100px;
  margin: var(--spacing-md) auto;
  height: 1px;
  background: rgb(255 255 255 / 10%);
  position: relative;
  z-index: 1;
}

.footer-copyright {
  text-align: center;
  color: rgb(255 255 255 / 50%);
  font-size: var(--font-size-xs);
  margin: 0;
  padding: var(--spacing-md) var(--spacing-lg);
  position: relative;
  z-index: 1;
}

// ============ Responsive Adjustments ============
@include respond-to('sm') {
  .nav-brand {
    gap: var(--spacing-xs);

    .logo {
      height: 24px;
    }
  }

  .nav-links {
    gap: var(--spacing-md);

    .nav-link {
      font-size: var(--font-size-xs);

      img {
        height: 16px;
        width: 16px;
      }
    }
  }
}
</style>
