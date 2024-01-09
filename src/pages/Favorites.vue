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
    <div>
        <h2 class="xl:text-3xl text-xl font-bold xl:mb-8 mb-2">Мои закладки</h2>
        <CartList
            is-favorites
            :items="favorites"
        />
    </div>
</template>