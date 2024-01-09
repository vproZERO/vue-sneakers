<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String,
});
</script>

<template>
    <div class="flex flex-col items-center justify-center w-72 mx-auto h-[90%] text-center">
        <img :src="imageUrl" alt="Info image" height="70" width="70" />
        <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
        <p class="mt-2 text-slate-400">{{ description }}</p>
    </div>
</template>
