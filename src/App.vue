<template>
  <div class="bg-white rounded-xl shadow-xl xl:my-10 my-5 xl:w-4/5 w-11/12 mx-auto">
    <Drawer :totalPrice="totalPrice" :dostavka-price="DostavkaPrice" v-if="drawerOpen"/>  
    <Header :total-price="totalPrice" @open-drawer="openDrawer"/>

    <div class="xl:p-10 p-6">
      <div class="xl:flex justify-between">
        <h2 class="xl:text-3xl text-xl font-bold xl:mb-8 mb-2">Все кросовки</h2>

        <div class="xl:flex gap-4">
          <select @change="onChangeSelect" class="py-2 xl:h-[43px] w-full mb-3 xl:mb-0 px-3 border rounded-md outline-none">
            <option value="name">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>

          <div class="relative">
            <img
              class="absolute left-3 top-3"
              src="/src/assets/search.svg"
              alt="search"
            />
            <input
            @input="onChangeSearchinput"
              class="border mb-8 xl:mb-0 border-gray-200 rounded-md w-full py-2 pl-10 pr-4 outline-none focus:border-gray-400"
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>

      <CartList :items="items" @add-to-favorite="addToFavorite" @addToCart="onClickAddPlus"/>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import Header from "./components/Header.vue";
import CartList from "./components/CartList.vue";
import Drawer from "./components/Drawer.vue";
import axios from 'axios'
import { computed, onMounted, provide, reactive, ref, watch } from "vue";

const items = ref([])
const cart = ref([])

const drawerOpen = ref(false)

const totalPrice = computed(() =>  cart.value.reduce((acc, item) => acc + +item.price, 0))


const DostavkaPrice = computed(() => Math.round((totalPrice.value * 5) / 100) )



const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const filters =  reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchinput = (event) => {
  filters.searchQuery = event.target.value
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const onClickAddPlus =  (item) => {
  if(!item.isAdded) {
    addToCart(item)
    
  } else{
    removeFromCart(item)
    
  }
    console.log(item);
}

const addToFavorite = async (item) => {
  try {

    if(!item.isFavorite) {
      const obj = {
        parentId: item.id
      }
      item.isFavorite = true

      const { data } = await axios.post('https://3adaba7887399f0b.mokky.dev/favorites' , obj)

      item.favoriteId = data.id
    }else {
      item.isFavorite = false
      await axios.delete(`https://3adaba7887399f0b.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
    
  } catch (error) {
    console.log(error);
  }

  console.log(item);
}

const fetchFavorites = async () => {
  try {
    
    const { data: favorites } = await axios.get('https://3adaba7887399f0b.mokky.dev/favorites')

    items.value = items.value.map(item => {
        const favorite = favorites.find(favorite => favorite.parentId === item.id)

        if(!favorite) {
          return item
        }

        return {
          ...item,
          isFavorite: true,
          favoriteId: null,
          favoriteId: favorite.id 
        }
    })
  } catch (error) {
    console.log(error);
  }
}
const fetchItems= async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if(filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get('https://3adaba7887399f0b.mokky.dev/items', {
      params
    })

    items.value = data.map(obj => ({
      ...obj,
      isFavorite: false,
      isAdded: false
    }))
  } catch (error) {
    console.log(error);
  }
}
onMounted(async () => {
  await fetchItems();
  await fetchFavorites()
})
watch(filters, fetchItems)

provide('cart' , {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})

</script>
<style lang=""></style>
