<template>
  <div>
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('index', () =>
  queryCollection('content').path('/').first()
)

useHead({
  title: page.value?.title ?? 'Antirevolutionary',
  meta: [
    { name: 'description', content: page.value?.description ?? '' },
  ],
})
</script>
