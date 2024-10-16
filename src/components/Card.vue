<template>
	<div
		ref="suggest" 
		class="card"
		:class="{ 'preselect': preselect }"
	>
		<img
			v-if="item.avatar"
			:src="item.avatar"
			class="card__logo"
			alt="Аватар">
		</img>
		<div
			v-else
			class="card__logo"
			alt="Аватар">
		</div>
		<div class="card__info">
			<div v-if="item.name">
				{{item.name}}
			</div>
			<div v-if="!isCompany || !item.name" class="card__info__alias">
				@{{item.alias}}
			</div>
			<div v-if="isCompany">
				Компания
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useTemplateRef, watch } from 'vue'
import { computed } from 'vue'
import { ISuggest } from '~/types/models.ts'

// Переменные
const suggestRef = useTemplateRef('suggest')

const { item, preselect } = defineProps<{
	item: ISuggest
	preselect: boolean
}>()

const isCompany = computed(() => {
	return item.type === 'company'
})

// Скролл до предвыбранного элемента
watch(() => preselect, () => {
	if (suggestRef.value && preselect) {
		suggestRef.value.scrollIntoView()
	}
})
</script>

<style lang="sass" scoped>
.preselect
	background-color: #c9c9c9

.card
	height: 100px
	width: 100%
	text-align: start
	display: flex
	justify-content: start
	align-items: center
	padding: 20px 16px
	gap: 16px
	&:hover
		background-color: #c9c9c9
	&__logo
		display: flex
		justify-content: center
		width: 60px
		height: 60px
		border-radius: 25%
		background-color: #111111
	&__info
		display: flex
		flex-direction: column
		justify-content: center
		overflow-wrap: word-break
		&__alias
			font-size: 14px
			word-break: break-all
			color: #999

</style>
