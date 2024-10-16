<template>
	<div class="suggest-list">
		<card
			v-for="(suggest, index) in props.data"
			:key="`${suggest.name}${index}`"
			:item="suggest"
			:preselect="preselect === index"
			@click="choose(suggest)"
		/>
	</div>
</template>

<script setup lang="ts">
import Card from '~/components/Card.vue'
import { ISuggest } from '~/types/models.ts'

// Переменные
const props = defineProps<{
	data: ISuggest[],
	preselect: number,
}>()
const emit = defineEmits(['choose'])

// Функции
function choose(suggest: ISuggest) {
	emit('choose', suggest)
}

</script>

<style lang="sass" scoped>
.suggest-list
	z-index: 100
	margin: 8px 0
	overflow-y: auto
	overflow-x: hidden
	position: absolute
	width: 100%
	max-width: 256px
	max-height: 400px
	color: black
	border-radius: 5px
	background-color: #fff
	// -webkit-box-shadow: 0px 0px 8px 0px rgba(70, 70, 70, 0.2)
	// -moz-box-shadow: 0px 0px 8px 0px rgba(70, 70, 70, 0.2)
	// box-shadow: 0px 0px 8px 0px rgba(70, 70, 70, 0.2)

</style>
