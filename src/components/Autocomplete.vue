<template>
	<article class="autocomplete">
		<label
			v-if="label"
			for="search"
			class="autocomplete__label"
		>
			{{ label }}
		</label>
		<div class="autocomplete__search">
			<div v-if="picked.length !== 0" class="autocomplete__wrapper">
				<div
					v-for="item in picked"
					class="picked-suggest"
				>
					<span class="picked-suggest__val">
						@{{	item.alias }}
					</span>
					<div
						class="picked-suggest__icon"
						@click="clearPicked(item)"
					>
						X
					</div>
				</div>
			</div>
			<input
				v-model="search"
				v-show="picked.length === 1 || multiChoose"
				id="search"
				:placeholder="placeholder"
				alt="Поле поиска пользователей и компаний"
				@input="searchData"
				@click="searchData"
				@keydown.up.down="preselectSuggest($event)"
				@keydown.enter="choose(dataList[preselect])"
			>
		</div>
		<suggest
			v-if="!hasSlot"
			v-show="!isAborted && showSuggest"
			:data="dataList"
			:preselect="preselect"
			@choose="choose"
		/>
		<slot v-else name="alternative">
		</slot>
	</article>
</template>

<script setup lang="ts">
// Импорты
import { ref, reactive, computed, useSlots } from 'vue'
import Suggest from '~/components/Suggest.vue'
import { debounce, controller } from '~/utilities/helpers'
import { getSuggest } from '~/utilities/dataRequests'
import { IAutocomplete, ISuggest } from '~/types/models.ts'

// Переменные
const search = defineModel<string>()
const dataList = reactive<ISuggest[]>([])
const picked = ref<ISuggest[]>([])
const preselect = ref<number>(0)

const { label, searchFunc, multiChoose } = defineProps<IAutocomplete>()
const emit = defineEmits(['choose', 'input'])

const slots = useSlots()
const hasSlot = computed(() => {
	return !!slots.alternative
})
const isAborted = computed(() => {
	return controller.signal.aborted
})
const showSuggest = computed(() => {
	return dataList.length > 0
})

// Функции
const callData = debounce(getSuggest, 500)

function searchData() {
	emit('input')
	if (searchFunc) searchFunc()
	else {
		callData(search.value, 2)
			.then((data) => {
				dataList.length = 0
				if (data && (data as []).length > 0) {
					dataList.push(...data as [])
				}
			})
	}
}

function clearPicked(item: ISuggest) {
	const index = picked.value.indexOf(item, 0)
	picked.value.splice(index, 1)
}

function preselectSuggest(event: KeyboardEvent) {
	if (event.key === 'ArrowDown' && dataList.length > preselect.value ) {
		preselect.value = preselect.value === null
		? 0
		: preselect.value + 1
	}
	if (event.key === 'ArrowUp' && preselect.value > 0 ) {
		preselect.value = preselect.value === null
		? 0
		: preselect.value - 1
	}
}

function choose(item: ISuggest) {
	picked.value.push(item)
	search.value = ''
	dataList.length = 0
}
</script>

<style lang="sass" scoped>
.autocomplete
	width: 100%
	max-width: 600px
	text-align: start
	gap: 8px
	&__wrapper
		display: flex
		flex-wrap: wrap
		gap: 8px
	
	&__label
		line-height: 18px
		margin: 8px 4px
		font-size: 14px
	&__search
		display: flex
		flex-wrap: wrap
		min-height: 42px
		height: max-content
		font-size: 16px
		line-height: 18px
		width: 100%
		border-radius: 3px
		border: 1px solid #c9c9c9
		padding: 4px 4px
		background-color: #fff
		gap: 8px
	input
		min-height: 32px
		height: 100%
		width: 100%
		border: none
		border-radius: 3px
		padding: 4px 8px
		font-size: 16px
		&:focus-visible
			outline: 0

.picked-suggest
	cursor: pointer
	display: flex
	background-color: #8089cb
	color: white
	height: 32px
	width: max-content
	border-radius: 3px
	text-align: center
	padding: 4px 12px
	gap: 8px
	&__val
		width: 100%
		display: flex
		align-items: center
		justify-content: center
	&__icon
		display: flex
		align-items: center
		justify-content: center
		min-width: 24px
		height: 100%
		border-radius: 50%
		&:hover
			background-color: black

</style>