<template>
	<div class="card">
		<div class="card__logo">
			<!-- {{item.avatar}} -->
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
import { computed } from 'vue'
import { ISuggest } from '~/types/models.ts'

const { item } = defineProps<{
	item: ISuggest
}>()

const isCompany = computed(() => {
	return item.type === 'company'
})
</script>

<style lang="stylus" scoped>
.card {
	height: 100px;
	width: 100%;
	text-align: start;
	display: flex;
	justify-content: start;
	align-items: center
	padding 20px 16px;
	gap: 16px
	&:hover {
		background-color: #c9c9c9
	}
	&__logo {
		display: flex;
		justify-content: center;
		min-width: 50px;
		height: 50px;
		border-radius: 25%
		background-color: #111111

	}
	&__info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow-wrap: word-break;
		&__alias {
			color: #999
		}
	}
}
	// z-index: 100;
	// margin: 8px 0;
	// overflow-y: auto
	// position absolute;
	// width: 100%
	// max-width: 256px;
	// max-height: 300px;
	// color: black;
	// border-radius: 5px
	// background-color: #fff;
	// // -webkit-box-shadow: 0px 0px 8px 0px rgba(70, 70, 70, 0.2);
	// // -moz-box-shadow: 0px 0px 8px 0px rgba(70, 70, 70, 0.2);
	// // box-shadow: 0px 0px 8px 0px rgba(70, 70, 70, 0.2);
</style>
