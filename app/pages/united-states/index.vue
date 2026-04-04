<template>
  <div class="wrapper">
    <div class="grain" />

    <NuxtLink to="/" class="back-link">← Home</NuxtLink>

    <main class="main">
      <p class="site-label">Antirevolutionary.org</p>
      <h1 class="heading">The Battlefield</h1>
      <p class="subheading">Select a region to explore</p>

      <div class="map-container">
        <svg
          :viewBox="viewBox"
          class="us-map"
          aria-label="Map of the United States"
          role="img"
        >
          <path
            v-for="state in locations"
            :key="state.id"
            :d="state.path"
            :data-state-id="state.id"
            :class="['state', { 'state--active': state.id === 'wa' }]"
            :aria-label="state.id === 'wa' ? 'Washington — South Sound' : state.name"
            @click="() => state.id === 'wa' && navigateTo('/united-states/wa/regions/south-sound')"
            @mousemove="(e: MouseEvent) => state.id === 'wa' && onMouseMove(e)"
            @mouseleave="() => state.id === 'wa' && hideTooltip()"
          />
        </svg>

        <div
          v-if="tooltip.visible"
          class="tooltip"
          :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
          aria-hidden="true"
        >
          Washington — South Sound
        </div>
      </div>
    </main>

    <footer class="footer">
      <span class="footer-text">© {{ new Date().getFullYear() }} Antirevolutionary</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import USAMap from '@svg-maps/usa'

definePageMeta({ layout: false })

useHead({
  title: 'The Battlefield — Antirevolutionary',
  meta: [{ name: 'description', content: '2026 legislative race opportunities by region.' }],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap',
    },
  ],
})

const { locations, viewBox } = USAMap

const tooltip = reactive({ visible: false, x: 0, y: 0 })

function onMouseMove(e: MouseEvent) {
  tooltip.visible = true
  tooltip.x = e.clientX + 14
  tooltip.y = e.clientY - 34
}

function hideTooltip() {
  tooltip.visible = false
}
</script>

<style>
:root {
  --ink:         #0d0c0b;
  --ivory:       #e8e0d0;
  --amber:       #c9a84c;
  --muted:       rgba(232,224,208,0.55);
  --amber-faint: rgba(201,168,76,0.18);
  --state-fill:  #2a2825;
  --state-stroke:#1a1816;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #0d0c0b; }

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
  20% { transform:translate(2%,2%) }
  30% { transform:translate(-1%,3%) }
  40% { transform:translate(1%,-1%) }
  50% { transform:translate(-2%,1%) }
  60% { transform:translate(2%,-2%) }
  70% { transform:translate(-1%,2%) }
  80% { transform:translate(2%,1%) }
  90% { transform:translate(-1%,-2%) }
}

.wrapper {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--ink);
  overflow: hidden;
}

.back-link {
  position: absolute;
  top: 1.5rem;
  left: 1.75rem;
  z-index: 10;
  font-family: 'EB Garamond', serif;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
}
.back-link:hover { color: var(--ivory); }

.main {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem 2rem;
  width: 100%;
  flex: 1;
}

.site-label {
  font-family: 'EB Garamond', serif;
  font-size: 0.62rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--amber);
  opacity: 0.7;
  margin-bottom: 1rem;
}

.heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 600;
  color: var(--ivory);
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.subheading {
  font-family: 'EB Garamond', serif;
  font-size: 0.95rem;
  color: var(--muted);
  margin-bottom: 2rem;
  letter-spacing: 0.04em;
}

.map-container {
  position: relative;
  width: 100%;
  max-width: 900px;
}

.us-map {
  width: 100%;
  height: auto;
  display: block;
}

.state {
  fill: var(--state-fill);
  stroke: var(--state-stroke);
  stroke-width: 0.5;
  transition: fill 0.15s;
}

.state--active {
  fill: var(--amber);
  cursor: pointer;
}
.state--active:hover {
  fill: #e0b85c;
}

.tooltip {
  position: fixed;
  background: rgba(13,12,11,0.92);
  border: 1px solid var(--amber-faint);
  color: var(--amber);
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.9rem;
  font-style: italic;
  padding: 0.35rem 0.75rem;
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
}

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
</style>
