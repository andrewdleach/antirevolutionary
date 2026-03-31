<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-gray-200 py-4 px-6">
      <nav>
        <NuxtLink to="/" class="font-semibold text-lg">Antirevolutionary</NuxtLink>
      </nav>
    </header>

    <main class="flex-1 px-6 py-8">
      <slot />
    </main>

    <footer class="border-t border-gray-200 py-4 px-6 text-sm text-gray-500">
      &copy; {{ new Date().getFullYear() }} Antirevolutionary
    </footer>
  </div>
</template>
