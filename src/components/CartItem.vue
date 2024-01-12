<template>
  <div
    class="flex items-center border border-slate-200 p-4 rounded-xl md:gap-4 gap-2"
  >
    <img class="md:w-16 h-16" :src="imageUrl" :alt="title" />

    <div class="flex flex-col w-full">
      <p class="text-sm">{{ title }}</p>

      <div class="flex justify-between mt-2">
        <b>${{ price }}</b>
        <img
          @click="emit('onClickRemove')"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/src/assets/close.svg"
          alt="close"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["onClickRemove"]);
defineProps({
  id: Number,
  title: String,
  price: Number,
  imageUrl: String,
});
</script>
