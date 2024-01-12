<script setup>
import CartList from "../components/CartList.vue";
import axios from "axios";
import { inject, reactive, watch, ref, onMounted } from "vue";

const { cart, addToCart, removeFromCart } = inject("cart");
const items = ref([]);

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
  console.log(item);
};
const onChangeSearchinput = (event) => {
  filters.searchQuery = event.target.value;
};

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(
      "https://3adaba7887399f0b.mokky.dev/favorites"
    );

    items.value = items.value.map((item) => {
      const favorite = favorites.find(
        (favorite) => favorite.parentId === item.id
      );

      if (!favorite) {
        return item;
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: null,
        favoriteId: favorite.id,
      };
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    };
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }
    const { data } = await axios.get(
      "https://3adaba7887399f0b.mokky.dev/items",
      {
        params,
      }
    );

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false,
    }));
  } catch (error) {
    console.log(error);
  }
};

const filters = reactive({
  sortBy: "title",
  searchQuery: "",
});
watch(filters, fetchItems);

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
        item,
      };
      item.isFavorite = true;

      const { data } = await axios.post(
        "https://3adaba7887399f0b.mokky.dev/favorites",
        obj
      );

      item.favoriteId = data.id;
    } else {
      item.isFavorite = false;
      await axios.delete(
        `https://3adaba7887399f0b.mokky.dev/favorites/${item.favoriteId}`
      );
      item.favoriteId = null;
    }
  } catch (error) {
    console.log(error);
  }

  console.log(item);
};

onMounted(async () => {
  await fetchItems();
  await fetchFavorites();
});
watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false,
  }));
});
</script>
<template>
  <div class="xl:flex justify-between">
    <h2 class="xl:text-3xl text-xl font-bold xl:mb-8 mb-2">Все кросовки</h2>

    <div class="xl:flex gap-4">
      <select
        @change="onChangeSelect"
        class="header_select py-2 xl:h-[43px] w-full mb-3 xl:mb-0 px-3 border rounded-md outline-none"
      >
        <option selected class="custom-option" value="name">По названию</option>
        <option class="custom-option" value="price">По цене (дешевые)</option>
        <option class="custom-option" value="-price">По цене (дорогие)</option>
      </select>

      <div class="relative search-container">
        <i class="fas text-gray-300 fa-search absolute left-3 top-3"></i>
        <input
          type="text"
          @input="onChangeSearchinput"
          class="search-input border mb-8 xl:mb-0 border-gray-200 rounded-md w-full py-2 pl-10 pr-4 outline-none focus:border-gray-400"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>

  <CartList
    :items="items"
    @add-to-favorite="addToFavorite"
    @addToCart="onClickAddPlus"
  />
</template>
