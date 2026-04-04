<template>
  <div class="wrapper">
    <div class="grain" />

    <!-- ── Password gate ───────────────────────── -->
    <Transition name="fade">
      <div v-if="!unlocked" class="gate">
        <div class="bg">
          <img src="/images/kuyper.webp" alt="" aria-hidden="true" class="bg-img" />
          <div class="bg-vignette" />
          <div class="bg-bottom" />
        </div>

        <form class="gate-form" @submit.prevent="handleAuth">
          <div class="orn">
            <div class="orn-rule" />
            <div class="orn-diamond" />
            <div class="orn-rule" />
          </div>
          <p class="gate-label">Antirevolutionary</p>
          <h1 class="gate-title"><em>A Call</em><br>to Arms</h1>
          <div class="gate-input-row">
            <input
              v-model="password"
              type="password"
              placeholder="Enter password"
              autocomplete="current-password"
              class="gate-input"
              :class="{ 'gate-input-error': error }"
              :disabled="checking"
            />
            <button type="submit" class="gate-btn" :disabled="checking">
              <span v-if="!checking">Enter</span>
              <span v-else>···</span>
            </button>
          </div>
          <p v-if="error" class="gate-error">{{ error }}</p>
        </form>
      </div>
    </Transition>

    <!-- ── Slide deck ──────────────────────────── -->
    <Transition name="fade">
      <div v-if="unlocked" class="deck">

        <!-- 1. Title -->
        <div class="slide slide-portrait" :class="{ active: current === 0 }">
          <div class="bg"><img src="/images/kuyper.webp" alt="" class="bg-img" /><div class="bg-vignette" /><div class="bg-bottom" /></div>
          <div class="content">
            <div class="orn"><div class="orn-rule" /><div class="orn-diamond" /><div class="orn-rule" /></div>
            <p class="label">A Call to Arms</p>
            <h1 class="title-main"><em>Anti</em>revolutionary</h1>
            <p class="title-sub">Rebuilding the Protestant political tradition</p>
          </div>
        </div>

        <!-- 2. The Feeling -->
        <div class="slide" :class="{ active: current === 1 }">
          <div class="orn"><div class="orn-rule" /><div class="orn-diamond" /><div class="orn-rule" /></div>
          <h2>You already know something is wrong.</h2>
          <div class="rule" />
          <p class="body">
            Faithful men. Good fathers. Reliable voters for twenty, thirty years.<br><br>
            Arrived at middle age with the distinct sense that the ground moved beneath them while they stood still.<br><br>
            <strong>It did.</strong>
          </p>
        </div>

        <!-- 3. GOP -->
        <div class="slide" :class="{ active: current === 2 }">
          <p class="label">The Right</p>
          <h2>The party that conserves nothing.</h2>
          <div class="rule" />
          <p class="body">
            On marriage, on life, on the place of God in public life —<br>
            the Republican party did not hold the line.<br><br>
            <strong>It moved the line.</strong> Slowly. Reluctantly. With great rhetorical anguish.<br><br>
            This is not conservatism. This is managed decline with a flag pin.
          </p>
        </div>

        <!-- 4. Left -->
        <div class="slide" :class="{ active: current === 3 }">
          <p class="label">The Left</p>
          <h2>The party of the French Revolution.</h2>
          <div class="rule" />
          <p class="body">
            Its operating premise: <strong>human autonomy is the foundation of all political order.</strong><br><br>
            God is not opposed — He is made irrelevant.<br>
            Religion is privatized. The public square is naked.<br><br>
            They call it freedom.
          </p>
        </div>

        <!-- 5. Same framework -->
        <div class="slide" :class="{ active: current === 4 }">
          <div class="statement">Both parties.<br><em>Same</em> foundation.</div>
          <div class="rule" />
          <p class="body">
            Both accept that political authority derives from human will.<br>
            They differ on which humans, how fast, toward what ends.<br><br>
            <strong>Neither begins with God.</strong>
          </p>
        </div>

        <!-- 6. Kuyper quote -->
        <div class="slide slide-portrait" :class="{ active: current === 5 }">
          <div class="bg"><img src="/images/kuyper.webp" alt="" class="bg-img" /><div class="bg-vignette" /><div class="bg-bottom" /></div>
          <div class="content">
            <p class="quote-giant">"There is not a square inch in the whole domain of human existence over which Christ does not cry: <em>Mine.</em>"</p>
            <div class="orn" style="margin-bottom:1rem;"><div class="orn-rule short" /><div class="orn-diamond" /><div class="orn-rule short" /></div>
            <p class="cite">Abraham Kuyper &nbsp;·&nbsp; 1837–1920</p>
          </div>
        </div>

        <!-- 7. The Tradition -->
        <div class="slide" :class="{ active: current === 6 }">
          <p class="label">The Netherlands · 1879</p>
          <h2>There has always been another way.</h2>
          <div class="rule" />
          <p class="body">
            Abraham Kuyper founded the <strong>Anti-Revolutionary Party</strong> on one premise:<br><br>
            The French Revolution's claim — that human autonomy grounds political order — is a lie.<br><br>
            <strong>God's sovereignty, not popular sovereignty,<br>is the source of all legitimate authority.</strong>
          </p>
        </div>

        <!-- 8. What it is / isn't -->
        <div class="slide" :class="{ active: current === 7 }">
          <p class="label">What we're building</p>
          <div class="rule" style="margin-top:0;" />
          <div class="two-col">
            <div>
              <p class="col-label">Not this</p>
              <p class="col-head" style="color:rgba(232,224,208,0.4);">Theocracy</p>
              <p class="col-body">The church does not run the state. Each sphere — family, church, state — has its own God-given authority.</p>
              <br />
              <p class="col-head" style="color:rgba(232,224,208,0.4);">Anger</p>
              <p class="col-body">Not a reaction. A principled alternative built on different soil entirely.</p>
            </div>
            <div>
              <p class="col-label">This</p>
              <p class="col-head">Sphere Sovereignty</p>
              <p class="col-body">Every domain of life — including politics — under the crown rights of King Jesus.</p>
              <br />
              <p class="col-head">Principled Engagement</p>
              <p class="col-body">Natural law. The family as the fundamental unit. A public order that acknowledges God.</p>
            </div>
          </div>
        </div>

        <!-- 9. It has worked -->
        <div class="slide" :class="{ active: current === 8 }">
          <h2>This is not a theory.</h2>
          <div class="rule" />
          <p class="body">
            Kuyper's party <strong>governed the Netherlands.</strong><br>
            It built schools. Shaped policy. Formed coalitions.<br>
            Not from the margins — from the center of public life.<br><br>
            He became Prime Minister.<br><br>
            <strong>The Anti-Revolutionary tradition is a tested,<br>historic practice of Christian political engagement.</strong>
          </p>
        </div>

        <!-- 10. The Question -->
        <div class="slide" :class="{ active: current === 9 }">
          <div class="orn"><div class="orn-rule" /><div class="orn-diamond" /><div class="orn-rule" /></div>
          <p class="question">Who would be<br>interested in running?</p>
          <div class="rule" />
          <p class="body" style="color:var(--muted);">
            I don't have all the answers. I don't have a finished platform.<br><br>
            What I have is a conviction — and a desire to support any man<br>
            willing to step forward and stand on different ground.<br><br>
            <strong>I'm seeking interest. If that's you, come find me after.</strong>
          </p>
        </div>

        <!-- 11. Close -->
        <div class="slide slide-portrait" :class="{ active: current === 10 }">
          <div class="bg"><img src="/images/kuyper.webp" alt="" class="bg-img" /><div class="bg-vignette" /><div class="bg-bottom" /></div>
          <div class="content">
            <div class="orn"><div class="orn-rule" /><div class="orn-diamond" /><div class="orn-rule" /></div>
            <p class="label" style="margin-bottom:2rem;">antirevolutionary.org &nbsp;·&nbsp; @anti_rev_party</p>
            <h1 class="title-main" style="font-size:clamp(2rem,5vw,4.5rem);">
              This is the beginning<br>of a conversation.
            </h1>
            <p class="title-sub" style="margin-top:1.5rem;">Come find me. Let's talk.</p>
          </div>
        </div>

        <!-- Progress dots -->
        <div class="progress">
          <div v-for="(_, i) in 11" :key="i" class="dot" :class="{ active: current === i }" @click="current = i" />
        </div>
        <div class="nav-hint">← → to navigate</div>

      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({
  title: 'Antirevolutionary — A Call to Arms',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap' },
  ],
})

const unlocked = ref(false)
const password = ref('')
const checking = ref(false)
const error = ref('')
const current = ref(0)

// Check existing session on mount
onMounted(async () => {
  const { granted } = await $fetch('/api/auth/slides-check')
  if (granted) unlocked.value = true

  window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
})

function handleKey(e: KeyboardEvent) {
  if (!unlocked.value) return
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
    e.preventDefault()
    if (current.value < 10) current.value++
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault()
    if (current.value > 0) current.value--
  }
}

async function handleAuth() {
  error.value = ''
  checking.value = true
  try {
    await $fetch('/api/auth/slides', { method: 'POST', body: { password: password.value } })
    unlocked.value = true
  } catch (err: any) {
    error.value = err?.data?.message ?? 'Incorrect password.'
  } finally {
    checking.value = false
  }
}
</script>

<style>
:root {
  --ink:         #0d0c0b;
  --ivory:       #e8e0d0;
  --amber:       #c9a84c;
  --muted:       rgba(232,224,208,0.6);
  --amber-faint: rgba(201,168,76,0.2);
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: var(--ink); }

.wrapper { position: relative; width: 100vw; height: 100vh; background: var(--ink); overflow: hidden; }

/* ── Grain ───────────────────────────────────── */
.grain {
  position: fixed; inset: -50%; width: 200%; height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.04; pointer-events: none; z-index: 9999;
  animation: grain 8s steps(10) infinite;
}
@keyframes grain {
  0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 20%{transform:translate(2%,2%)}
  30%{transform:translate(-1%,3%)} 40%{transform:translate(1%,-1%)} 50%{transform:translate(-2%,1%)}
  60%{transform:translate(2%,-2%)} 70%{transform:translate(-1%,2%)} 80%{transform:translate(2%,1%)} 90%{transform:translate(-1%,-2%)}
}

/* ── Shared bg portrait ──────────────────────── */
.bg { position: absolute; inset: 0; }
.bg-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; filter: sepia(0.1) brightness(0.28) contrast(1.2); }
.bg-vignette { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 60% 25%, transparent 0%, rgba(13,12,11,0.6) 60%, rgba(13,12,11,0.92) 100%); }
.bg-bottom { position: absolute; inset: 0; background: linear-gradient(to top, rgba(13,12,11,0.98) 0%, rgba(13,12,11,0.5) 35%, transparent 70%); }

/* ── Gate ────────────────────────────────────── */
.gate {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
}
.gate-form {
  position: relative; z-index: 10;
  display: flex; flex-direction: column; align-items: center;
  text-align: center; padding: 2rem; max-width: 480px; width: 100%;
}
.gate-label {
  font-family: 'EB Garamond', serif;
  font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase;
  color: var(--amber); margin-bottom: 1.2rem; opacity: 0.85;
}
.gate-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600; font-size: clamp(3rem, 8vw, 5.5rem);
  line-height: 0.9; letter-spacing: -0.025em; text-transform: uppercase;
  color: var(--ivory); margin-bottom: 2.5rem;
}
.gate-title em { font-style: italic; font-weight: 300; color: var(--amber); }
.gate-input-row {
  display: flex; width: 100%;
  border: 1px solid var(--amber-faint);
  transition: border-color 0.25s;
}
.gate-input-row:focus-within { border-color: rgba(201,168,76,0.45); }
.gate-input {
  flex: 1; background: rgba(13,12,11,0.6); border: none; outline: none;
  padding: 0.85rem 1.1rem;
  font-family: 'EB Garamond', serif; font-size: 1rem; color: var(--ivory);
  backdrop-filter: blur(8px);
}
.gate-input::placeholder { color: rgba(232,224,208,0.28); }
.gate-input-error { color: #e07070; }
.gate-btn {
  background: var(--amber); border: none;
  padding: 0.85rem 1.6rem;
  font-family: 'EB Garamond', serif; font-size: 0.78rem;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--ink); cursor: pointer; font-weight: 500;
  transition: background 0.2s;
}
.gate-btn:hover:not(:disabled) { background: #d9b85a; }
.gate-btn:disabled { opacity: 0.6; cursor: default; }
.gate-error {
  font-family: 'EB Garamond', serif; font-size: 0.85rem;
  color: #e07070; margin-top: 0.75rem;
}

/* ── Deck ─────────────────────────────────────── */
.deck { position: absolute; inset: 0; }

.slide {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  text-align: center; padding: 5vw 8vw;
  opacity: 0; pointer-events: none;
  transition: opacity 0.5s ease;
  overflow: hidden;
}
.slide.active { opacity: 1; pointer-events: all; }
.slide-portrait .content { position: relative; z-index: 10; }

/* ── Ornament ─────────────────────────────────── */
.orn { display: flex; align-items: center; justify-content: center; gap: 0.7rem; margin-bottom: 2rem; }
.orn-rule { width: 48px; height: 1px; background: rgba(201,168,76,0.35); }
.orn-rule.short { width: 28px; }
.orn-diamond { width: 6px; height: 6px; background: var(--amber); transform: rotate(45deg); flex-shrink: 0; opacity: 0.8; }

/* ── Type ─────────────────────────────────────── */
.label { font-family: 'EB Garamond', serif; font-size: clamp(0.55rem, 1.1vw, 0.75rem); letter-spacing: 0.32em; text-transform: uppercase; color: var(--amber); margin-bottom: 1.4rem; opacity: 0.85; }
.title-main { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: clamp(2.5rem, 7vw, 6rem); line-height: 0.88; letter-spacing: -0.025em; text-transform: uppercase; color: var(--ivory); margin-bottom: 1.5rem; }
.title-main em { font-style: italic; font-weight: 300; color: var(--amber); }
.title-sub { font-family: 'EB Garamond', serif; font-size: clamp(1rem, 2.2vw, 1.5rem); color: var(--muted); line-height: 1.6; max-width: 620px; margin: 0 auto; }
h2 { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-style: italic; font-size: clamp(2rem, 5vw, 4rem); color: var(--ivory); line-height: 1.1; margin-bottom: 2rem; letter-spacing: -0.01em; }
.body { font-family: 'EB Garamond', serif; font-size: clamp(1rem, 2vw, 1.4rem); line-height: 1.8; color: var(--muted); max-width: 680px; margin: 0 auto; }
.body strong { color: var(--ivory); font-weight: 500; }
.quote-giant { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.6rem, 3.8vw, 3.2rem); font-style: italic; font-weight: 400; color: var(--ivory); line-height: 1.45; max-width: 820px; margin: 0 auto 2rem; letter-spacing: 0.01em; }
.cite { font-family: 'EB Garamond', serif; font-size: clamp(0.65rem, 1.2vw, 0.85rem); letter-spacing: 0.22em; text-transform: uppercase; color: var(--amber); }
.statement { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 6.5vw, 6rem); font-weight: 600; line-height: 1; letter-spacing: -0.02em; color: var(--ivory); text-transform: uppercase; }
.statement em { font-style: italic; color: var(--amber); font-weight: 300; }
.question { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.8rem, 7vw, 6.5rem); font-weight: 600; font-style: italic; color: var(--ivory); line-height: 1; letter-spacing: -0.02em; margin-bottom: 2rem; }
.rule { width: 64px; height: 1px; background: var(--amber); opacity: 0.5; margin: 1.8rem auto; }

/* ── Two-col ──────────────────────────────────── */
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 4vw; max-width: 900px; margin: 0 auto; text-align: left; }
.col-label { font-family: 'EB Garamond', serif; font-size: 0.65rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--amber); margin-bottom: 0.6rem; opacity: 0.8; }
.col-head { font-family: 'Cormorant Garamond', serif; font-size: clamp(1rem, 2.2vw, 1.6rem); font-weight: 600; color: var(--ivory); margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; }
.col-body { font-family: 'EB Garamond', serif; font-size: clamp(0.9rem, 1.6vw, 1.15rem); line-height: 1.75; color: var(--muted); }

/* ── Progress ─────────────────────────────────── */
.progress { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.5rem; z-index: 100; }
.dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(201,168,76,0.25); cursor: pointer; transition: background 0.3s; }
.dot.active { background: var(--amber); }
.nav-hint { position: fixed; bottom: 2rem; right: 2.5rem; font-family: 'EB Garamond', serif; font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(232,224,208,0.2); z-index: 100; }

/* ── Transitions ──────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.6s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
