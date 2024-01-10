<template>
  <div class="grid  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5" v-auto-animate>
    <Cart
      v-for="item in items"
      :isAdded="item.isAdded"
      :onClickAdd="isFavorites ? null : () => emit('addToCart', item)"
      :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
      :id="item.id"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :isFavorite="item.isFavorite"
      :title="item.title"
      :price="+item.price"
    />
  </div>
</template>
<script setup>
import Cart from "./Cart.vue";
import { inject } from "vue";

defineProps({
  items: Array,
  isFavorites: Boolean,
  addToFavorite: Function,
});

const addToFavorite = inject("addToFavorite");

const emit = defineEmits(["addToFavorite", "addToCart"]);

const onClickAdd = () => {};
</script>
<style lang=""></style>
