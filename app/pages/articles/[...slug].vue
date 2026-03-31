<template>
  <div>
    <article v-if="article">
      <header class="mb-8">
        <h1 class="text-3xl font-bold">{{ article.title }}</h1>
        <p class="text-gray-500 text-sm mt-1">{{ article.date }}</p>
      </header>
      <ContentRenderer :value="article" />
    </article>
    <p v-else>Article not found.</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : route.params.slug

const { data: article } = await useAsyncData(`article-${slug}`, () =>
  queryCollection('content').path(`/articles/${slug}`).first()
)

useHead({
  title: article.value?.title ?? 'Antirevolutionary',
  meta: [
    { name: 'description', content: article.value?.description ?? '' },
  ],
})
</script>
