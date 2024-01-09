<template>
  <div
    class="bg-white rounded-xl shadow-xl xl:my-10 my-5  w-11/12 mx-auto"
  >
    <Drawer
      :buttonDisabled="cartButtonDisabled"
      @createOrder="createOrder"
      :totalPrice="totalPrice"
      :dostavkaPrice="DostavkaPrice"
      v-if="drawerOpen"
    />
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="xl:p-10 p-6">
        <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import Header from "./components/Header.vue";
import Drawer from "./components/Drawer.vue";
import Home from "./pages/Home.vue";
import axios from "axios";
import { computed, provide, ref, watch } from "vue";

const cart = ref([]);
const isCreatingOrder = ref(false);
const drawerOpen = ref(false);
const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => acc + +item.price, 0)
);
const DostavkaPrice = computed(() => Math.round(totalPrice.value * 0.05));

const cartButtonDisabled = computed(
  () => isCreatingOrder.value || cartIsEmpty.value
);

const cartIsEmpty = computed(() => cart.value.length === 0);

const closeDrawer = () => {
  drawerOpen.value = false;
};

const openDrawer = () => {
  drawerOpen.value = true;
};

const addToCart = (item) => {
  cart.value.push(item);
  item.isAdded = true;
};

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1);
  item.isAdded = false;
};

const createOrder = async () => {
  try {
    isCreatingOrder.value = true;
    const { data } = await axios.post(
      "https://3adaba7887399f0b.mokky.dev/orders",
      {
        items: cart.value,
        totalPrice: totalPrice.value,
      }
    );

    cart.value = [];

    await Swal.fire({
      icon: "success",
      title: "Ваш заказ принят!",
      showConfirmButton: false,
      timer: 1500,
    });

    return data;
  } catch (error) {
    console.log(error);
  } finally {
    isCreatingOrder.value = false;
  }
};

watch(
  cart,
  () => {
    localStorage.setItem("cart", JSON.stringify(cart.value));
  },
  { deep: true }
);

provide("cart", {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart,
});
</script>
<style lang=""></style>
