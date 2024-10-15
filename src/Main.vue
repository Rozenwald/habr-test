<template>
  <div class="main">
    <Autocomplete
      v-model="search"
		  placeholder="Введите значение"
    />
  </div>
</template>

<script setup lang="ts">
// Импорты
import { ref } from 'vue'
import Autocomplete from './components/Autocomplete.vue'

const search = ref<string>('')

</script>

<style lang="stylus" scoped>

</style>
