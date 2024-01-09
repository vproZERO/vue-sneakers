<script setup>
    import axios from 'axios';
    import { onMounted, ref } from 'vue';

    const favorites = ref([])

    onMounted(async () => {
        try {
            const {data} = await axios.get('https://3adaba7887399f0b.mokky.dev/favorites')

            favorites.value = data

            console.log(data);

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    })
</script>
<template>

</template>