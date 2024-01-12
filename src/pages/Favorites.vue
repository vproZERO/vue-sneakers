<script setup>
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import CartList from '../components/CartList.vue';

    const favorites = ref([])

    onMounted(async () => {
        try {
            const {data} = await axios.get('https://3adaba7887399f0b.mokky.dev/favorites')

            favorites.value = data.map(obj => obj.item)

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    })
</script>
<template>
    <div class="lg:h-screen h-[65vh]">
        <h2 class="xl:text-3xl text-xl font-bold xl:mb-8 mb-2">Мои закладки</h2>
        <div v-if="!favorites.length" class="flex items-center justify-center h-[80%] ">
            <div>
                <img class="text-center mx-auto w-[100px]" src="../assets/emoji-2.png" alt="emoji">
                <h2 class="font-bold text-2xl text-center mt-3">Закладок нет :(</h2>
                <p class="text-center text-slate-400 mt-1 mb-14">Вы ничего не добавляли в закладки</p>

                <router-link to="/" class="block text-center text-white bg-[#9CD358] rounded-xl hover:shadow-xl hover:bg-opacity-70 hover:-translate-y-2 transition py-3 mt-3">
                    <i class="fas fa-solid fa-arrow-left"></i>
                    <span class="ml-2">Вернуться к покупкам</span>
                </router-link>
            </div>
        </div>
        <CartList
            v-else
            is-favorites
            :items="favorites"
        />
        
    </div>
</template>