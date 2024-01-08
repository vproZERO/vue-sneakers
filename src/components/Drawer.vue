    <script setup>
    import DrawerHead from './DrawerHead.vue'
    import CartItemList from './CartItemList.vue'
    import { inject } from 'vue'

    const {closeDrawer} = inject('cart')


    defineProps({
        totalPrice: Number,
        DostavkaPrice: Number
    })
    </script>


<template>
  <div @click="closeDrawer" class="fixed top-0 left-0 bottom-0 h-full w-full transition bg-black z-10 opacity-30"></div>
  <div class="bg-white xl:w-96 w-9/12 h-full fixed right-0 transition top-0 bottom-0 z-20 p-8">
    <DrawerHead/>

    <CartItemList/>


    <div class="flex flex-col gap-4 mb-8 mt-7">

        <div class="flex gap-2 items-end">
            <span>Итого :</span>
            <div class="flex-1 border-b border-slate-300 border-dashed"></div>
            <b>{{ totalPrice }} $</b>
        </div>

        <div class="flex gap-2 items-end">
            <span>Доставка 5% :</span>
            <div class="flex-1 border-b border-slate-300 border-dashed"></div>
            <b>{{ DostavkaPrice }} $</b>
        </div>

        <button disabled class="bg-lime-500 transition mt-4 active:bg-lime-700 disabled:-translate-y-0 cursor-pointer hover:-translate-y-1 disabled:bg-slate-300 w-full rounded-xl py-3 text-white hover:bg-lime-600">
            Оформить заказ
        </button>
    </div>


  </div>
</template>
