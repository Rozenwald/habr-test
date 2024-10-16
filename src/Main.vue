<template>
  <main @click.self="abort()">
    <Autocomplete
      v-model="search"
      :multiChoose="true"
		  placeholder="Введите значение"
      label="Поиск с подсказками"
      @input="updateController()"
    />
  </main>
</template>

<script setup lang="ts">
// Импорты
import { ref } from 'vue'
import { controller, updateController } from '~/utilities/helpers'
import Autocomplete from './components/Autocomplete.vue'

const search = ref('')

function abort() {
  controller.abort()
}
</script>
