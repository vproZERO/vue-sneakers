<template>
  <div class="grid xl:grid-cols-4 gap-5">
    <Cart
      v-for="item in items"
      :isAdded="item.isAdded"
      :onClickAdd="() => emit('addToCart', item)"
      :onClickFavorite="() => emit('addToFavorite', item)"
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
  addToFavorite: Function,
});

const addToFavorite = inject("addToFavorite");

const emit = defineEmits(["addToFavorite", "addToCart"]);

const onClickAdd = () => {};
</script>
<style lang=""></style>
