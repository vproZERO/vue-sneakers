        
<script setup>
import { inject } from 'vue'

const emit = defineEmits(['openDrawer'])

defineProps({
  totalPrice: Number
})

</script>
<template>
    <header class="xl:flex justify-between border-b border-slate-300 xl:px-8 p-6 xl:py-4">
      <router-link to="/">

        <div class="flex items-center gap-4">
          <img class="w-10" src="/src/assets/logo.png" alt="Logo">
          <div>
            <h2 class="uppercase xl:text-xl font-bold">Vue Sneakers</h2>
            <p class="text-slate-400 text-sm xl:text-lg">Eng yahwi krosovkalar magazini</p>
          </div>
        </div>
      </router-link>

        <ul class="flex items-center gap-10 mt-5 xl:mt-0">
          <li @click="() => emit('openDrawer')" class="flex w-[80px] md:w-[100px] text-[14px] xl:text-lg items-center xl:gap-3 gap-2 text-gray-500 hover:text-black cursor-pointer" >
            <img class="w-[16px] xl:w-[20px]" src="/src/assets/cart.svg" alt="cart">
            <b >{{ totalPrice }} $</b>
          </li>
          <router-link to="/favorites">
            <li class="flex items-center xl:gap-3 gap-2 text-gray-500 text-[14px] xl:text-lg hover:text-black cursor-pointer">
              <img class="w-[16px] xl:w-[20px]" src="/src/assets/heart.svg" alt="cart">
              <span>Закладки</span>
            </li>

          </router-link>
          <li class="flex items-center xl:gap-3 gap-2 text-gray-500 text-[14px] xl:text-lg hover:text-black cursor-pointer">
            <img class="w-[16px] xl:w-[20px]" src="/src/assets/profile.svg" alt="cart">
            <span>Профиль</span>
          </li>
        </ul>

    </header>
</template>
