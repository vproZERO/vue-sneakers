<template>
  <div
    class="relative bg-white border border-slate-200 xl:rounded-3xl rounded-lg p-6 cursor-pointer transition lg:hover:-translate-y-2 lg:hover:shadow-xl"
  >
    <img
      v-if="onClickFavorite"
      @click="onClickFavorite"
      class="absolute top-8 left-8 hover:-translate-y-1 transition"
      :src="!isFavorite ? like1 : like2"
      alt="like 1"
    />
    <img class="h-auto w-full rounded-lg" :src="imageUrl" :alt="title" />
    <p class="mt-2">{{ title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>${{ price }}</b>
      </div>
      <img
        v-if="onClickAdd"
        @click="onClickAdd"
        :src="!isAdded ? plus : checked"
        alt="plus"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import like1 from "../assets/like-1.svg";
import like2 from "../assets/like-2.svg";
import plus from "../assets/plus.svg";
import checked from "../assets/checked.svg";

const props = defineProps({
  imageUrl: String,
  id: Number,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
});

const visibleFavoriteButton = Boolean(props.onClickFavorite);
</script>
