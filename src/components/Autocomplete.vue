<template>
	<div class="list">
		<label v-if="label" for="search" />
		<div class="search-input">
			<input
				v-model="model"
				v-show="!picked"
				id="search"
				:placeholder="placeholder"
				@input="searchData"
			>
			<div v-if="picked" class="picked-suggest">
				<span class="picked-suggest__val">
					{{	picked.alias }}
				</span>
				<div
					class="picked-suggest__icon"
					@click="clearPicked"
				>
					x
				</div>
			</div>
		</div>
		<suggest
			:data="dataList"
			@choose="choose"
		/>
	</div>
</template>

<script setup lang="ts">
// Импорты
import { ref, reactive } from 'vue'
import Suggest from '~/components/Suggest.vue'
import { debounce } from '~/composables/helpers.ts'
import { getSuggest } from '~/composables/dataRequests.ts'
import { IAutocomplete, ISuggest } from '~/types/models.ts'

// Переменные
let model = defineModel<string>()
let dataList = reactive([])
let picked = ref<ISuggest | null>(null)

const { label } = defineProps<IAutocomplete>()
const emit = defineEmits(['choose'])

// Функции
const callData = debounce(getSuggest, 500);

function searchData() {
	callData(model.value, 2)
		.then((data) => {
			console.log('data - ', data)
			if (data) {
				dataList.length = 0
				dataList.push(...data)
			}
		})
	}

function clearPicked() {
	console.log('clearPicked')
	picked.value = null
}
function choose(item: ISuggest) {
	console.log('choose')
	picked.value = item
	model.value = ''
	dataList.length = 0
}
</script>

<style lang="stylus">
.list {
	width: 100%;
}
.search-input {
	height: 42px;
	font-size: 16px;
	line-height: 18px;
	width: 100%;
	border-radius: 3px;
	border: 1px solid #464646;
	padding: 4px 4px;
	background-color: #fff;
	input {
		height: 100%;
		width: 100%;
		border: none;
		border-radius: 3px;
		padding: 4px 12px;
		&:focus-visible {
			outline: 0;
		}
	}
}
.picked-suggest {
	cursor: pointer;
	display: flex;
	background-color: #8089cb
	color: white;
	height: 100%;
	max-width: 100px;
	border-radius: 3px;
	text-align: center;
	&__val {
		width: 100%
		display: flex;
		align-items: center;
		justify-content: center;
	}
	&__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 24px;
		height: 100%;
		border-radius: 3px;
		&:hover {
			background-color: black
		}
	}
}
</style>