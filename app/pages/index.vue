<template>
  <div class="wrapper">
    <div class="grain" />

    <!-- Full-bleed portrait background -->
    <div class="bg">
      <img
        src="/images/kuyper.webp"
        alt=""
        aria-hidden="true"
        class="bg-img"
      />
      <div class="bg-vignette" />
      <div class="bg-bottom" />
    </div>

    <!-- Main content -->
    <main class="main">

      <!-- Top ornament -->
      <div class="orn animate-1">
        <div class="orn-rule" />
        <div class="orn-diamond" />
        <div class="orn-rule" />
      </div>

      <!-- Site label -->
      <p class="site-label animate-1">Antirevolutionary.org</p>

      <!-- Title -->
      <h1 class="title animate-2">
        <em class="title-anti">Anti</em><span class="title-main">Revolutionary</span>
      </h1>

      <!-- Coming soon badge -->
      <div class="badge animate-3">
        <div class="badge-rule" />
        <span class="badge-text">Coming Soon</span>
        <div class="badge-rule" />
      </div>

      <!-- Pull quote -->
      <blockquote class="quote animate-4">
        <p class="quote-text">
          "All authority of governments on earth originates<br class="br-desktop" />
          from the Sovereignty of God alone."
        </p>
        <cite class="quote-cite">— Abraham Kuyper</cite>
      </blockquote>

      <!-- Tagline -->
      <p class="tagline animate-5">
        A platform for Christian political engagement,<br class="br-desktop" />
        standing against the revolutionary spirit of the age.
      </p>

      <!-- Email capture -->
      <div class="form-wrap animate-6">
        <Transition name="fade" mode="out-in">
          <form v-if="!submitted" key="form" class="form" @submit.prevent="handleSubmit">
            <div class="input-row">
              <input
                v-model="email"
                type="email"
                placeholder="your@email.com"
                required
                autocomplete="email"
                class="email-input"
                :class="{ 'input-error': error }"
              />
              <button type="submit" class="submit-btn" :disabled="submitting">
                <span v-if="!submitting">Notify me</span>
                <span v-else class="submitting-dots">···</span>
              </button>
            </div>
            <p v-if="error" class="error-msg">{{ error }}</p>
          </form>

          <div v-else key="success" class="success">
            <div class="success-orn">
              <div class="orn-rule short" />
              <div class="orn-diamond" />
              <div class="orn-rule short" />
            </div>
            <p class="success-msg">You'll hear from us.</p>
          </div>
        </Transition>

        <p class="form-note">Be the first to know when we launch.</p>
      </div>

    </main>

    <!-- Footer -->
    <footer class="footer">
      <span class="footer-text">© {{ new Date().getFullYear() }} Antirevolutionary</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({
  title: 'Antirevolutionary — Coming Soon',
  meta: [
    {
      name: 'description',
      content:
        'A platform for Christian political engagement, standing against the revolutionary spirit of the age.',
    },
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap',
    },
  ],
})

const email = ref('')
const submitted = ref(false)
const submitting = ref(false)
const error = ref('')

async function handleSubmit() {
  error.value = ''
  submitting.value = true

  try {
    await $fetch('/api/subscribe', {
      method: 'POST',
      body: { email: email.value },
    })
    submitted.value = true
  } catch (err: any) {
    error.value = err?.data?.message ?? 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<style>
/* ─── Variables ─────────────────────────────────────────── */
:root {
  --ink:    #0d0c0b;
  --ivory:  #e8e0d0;
  --amber:  #c9a84c;
  --muted:  rgba(232,224,208,0.55);
  --amber-faint: rgba(201,168,76,0.18);
}

/* ─── Base ──────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* Fix overscroll flash on iOS/Chrome */
html, body { background: #0d0c0b; }

.wrapper {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--ink);
  overflow: hidden;
}

/* ─── Grain ─────────────────────────────────────────────── */
.grain {
  position: fixed;
  inset: -50%;
  width: 200%;
  height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.045;
  pointer-events: none;
  z-index: 900;
  animation: grain 8s steps(10) infinite;
}
@keyframes grain {
  0%,100% { transform:translate(0,0) }
  10% { transform:translate(-2%,-3%) }
  20% { transform:translate(2%, 2%) }
  30% { transform:translate(-1%, 3%) }
  40% { transform:translate(1%,-1%) }
  50% { transform:translate(-2%, 1%) }
  60% { transform:translate(2%,-2%) }
  70% { transform:translate(-1%, 2%) }
  80% { transform:translate(2%, 1%) }
  90% { transform:translate(-1%,-2%) }
}

/* ─── Background portrait ───────────────────────────────── */
.bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 65% top;
  filter: sepia(0.08) brightness(0.28) contrast(1.25);
}
/* Radial vignette — edges darker, slight center reveal */
.bg-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 75% 65% at 62% 28%,
    transparent 0%,
    rgba(13,12,11,0.55) 60%,
    rgba(13,12,11,0.92) 100%
  );
}
/* Strong bottom fade */
.bg-bottom {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(13,12,11,0.98) 0%,
    rgba(13,12,11,0.6) 30%,
    transparent 65%
  );
}

/* ─── Entrance animations ───────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-1 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
.animate-2 { animation: fadeUp 1.0s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
.animate-3 { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.75s both; }
.animate-4 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.95s both; }
.animate-5 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.15s both; }
.animate-6 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.35s both; }

/* ─── Main content ──────────────────────────────────────── */
.main {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 5rem 2rem 4rem;
  max-width: 680px;
  width: 100%;
}

/* ─── Ornament ──────────────────────────────────────────── */
.orn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.4rem;
}
.orn-rule {
  width: 40px;
  height: 1px;
  background: var(--amber-faint);
  border: none;
}
.orn-rule.short { width: 24px; }
.orn-diamond {
  width: 5px;
  height: 5px;
  background: var(--amber);
  transform: rotate(45deg);
  flex-shrink: 0;
  opacity: 0.7;
}

/* ─── Site label ────────────────────────────────────────── */
.site-label {
  font-family: 'EB Garamond', serif;
  font-size: 0.62rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--amber);
  opacity: 0.7;
  margin-bottom: 1.5rem;
}

/* ─── Title ─────────────────────────────────────────────── */
.title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.6rem, 7vw, 7.5rem);
  line-height: 0.9;
  letter-spacing: -0.025em;
  color: var(--ivory);
  margin-bottom: 2.2rem;
  max-width: 100%;
  text-transform: uppercase;
}
.title-anti {
  font-style: italic;
  font-weight: 300;
  color: var(--amber);
}
.title-main {
  font-style: normal;
  font-weight: 700;
}

/* ─── Badge ─────────────────────────────────────────────── */
.badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
}
.badge-rule {
  width: 36px;
  height: 1px;
  background: var(--amber);
  opacity: 0.5;
}
.badge-text {
  font-family: 'EB Garamond', serif;
  font-size: 0.68rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--amber);
}

/* ─── Quote ─────────────────────────────────────────────── */
.quote {
  margin-bottom: 2rem;
  padding: 0 1rem;
}
.quote-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.45rem, 3vw, 2rem);
  line-height: 1.5;
  font-style: italic;
  font-weight: 400;
  color: var(--ivory);
  margin-bottom: 0.9rem;
  letter-spacing: 0.01em;
}
.quote-cite {
  font-family: 'EB Garamond', serif;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--amber);
  font-style: normal;
  opacity: 0.75;
}

/* ─── Tagline ───────────────────────────────────────────── */
.tagline {
  font-family: 'EB Garamond', serif;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--muted);
  margin-bottom: 3rem;
  letter-spacing: 0.01em;
}

/* ─── Form ──────────────────────────────────────────────── */
.form-wrap {
  width: 100%;
  max-width: 440px;
}

.form { width: 100%; }

.input-row {
  display: flex;
  gap: 0;
  border: 1px solid var(--amber-faint);
  transition: border-color 0.25s;
}
.input-row:focus-within {
  border-color: rgba(201,168,76,0.45);
}

.email-input {
  flex: 1;
  background: rgba(13,12,11,0.6);
  border: none;
  outline: none;
  padding: 0.85rem 1.1rem;
  font-family: 'EB Garamond', serif;
  font-size: 1rem;
  color: var(--ivory);
  backdrop-filter: blur(8px);
  min-width: 0;
}
.email-input::placeholder {
  color: rgba(232,224,208,0.28);
}
.email-input.input-error {
  color: #e07070;
}

.submit-btn {
  background: var(--amber);
  border: none;
  padding: 0.85rem 1.4rem;
  font-family: 'EB Garamond', serif;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink);
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;
  transition: background 0.2s, opacity 0.2s;
  flex-shrink: 0;
}
.submit-btn:hover:not(:disabled) {
  background: #d9b85a;
}
.submit-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.submitting-dots {
  letter-spacing: 0.05em;
}

.error-msg {
  font-family: 'EB Garamond', serif;
  font-size: 0.82rem;
  color: #e07070;
  margin-top: 0.5rem;
  text-align: left;
}

.form-note {
  font-family: 'EB Garamond', serif;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(232,224,208,0.22);
  margin-top: 1rem;
}

/* ─── Success state ─────────────────────────────────────── */
.success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  padding: 1rem 0;
}
.success-orn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.success-msg {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--ivory);
  letter-spacing: 0.02em;
}

/* ─── Transition ────────────────────────────────────────── */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

/* ─── Footer ────────────────────────────────────────────── */
.footer {
  position: relative;
  z-index: 10;
  padding: 1.5rem 2rem 2rem;
  width: 100%;
  text-align: center;
}
.footer-text {
  font-family: 'EB Garamond', serif;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(232,224,208,0.16);
}

/* ─── Responsive ────────────────────────────────────────── */
.br-desktop { display: none; }
@media (min-width: 600px) {
  .br-desktop { display: block; }
}
</style>
