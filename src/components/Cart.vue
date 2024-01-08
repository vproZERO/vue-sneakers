<template>
    <div class="relative bg-white border border-slate-200 xl:rounded-3xl rounded-lg p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl">
          <img @click="onClickFavorite" class="absolute top-8 left-8 hover:-translate-y-1 transition" :src="!isFavorite ? '/src/assets/like-1.svg' : '/src/assets/like-2.svg'" alt="like 1">
          <img class="h-[170px]" :src="imageUrl" alt="Sneaker">
          <p class="mt-2">{{ title }}</p>
          
          <div class="flex justify-between mt-5">
              <div class="flex flex-col">
                <span class="text-slate-400">Цена:</span>
                <b>{{ price }} $</b>
              </div>
              <img @click="onClickAdd" :src="!isAdded ? '/src/assets/plus.svg' : '/src/assets/checked.svg' " alt="plus">
          </div>  
        </div>
</template>

<script setup>
 const props =   defineProps({
        imageUrl : String,
        id:Number,
        title: String,
        price: Number,
        isFavorite: Boolean,
        isAdded: Boolean,
        onClickAdd: Function,
        onClickFavorite: Function
    })

   
</script>