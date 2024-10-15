<template>
	<div class="header">
		<div class="header__common">
			<div class="common page-size">
				<span style="font-weight: 600;">Хабр</span>
				<span style="margin: 0 0 0 8px">ПуПуПу</span>
			</div>
		</div>
		<div class="header__navigation">
			<div class="page-size navigation">
					<div
						v-for="tab in tabs"
						class="navigation__tab"
					>
						{{ tab }}
					</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const tabs = ['Вакансии', 'Специалисты', 'Эксперты', 'Компании', 'Рейтинг', 'Зарплаты', 'Образование', 'Журнал']
</script>

<style lang="stylus">
.header {
	z-index: 100
	width: 100%
	height: 120px
	&__common {
		height: 50px
		background-color: #303b44
	}
	&__navigation {
		height: 70px
		background-color: #fff
	}
}
.common {
	font-size: 24px;
	text-align: start;
	line-height: 48px;
	height: 100%;
	color: #fff;
}
.navigation {
	display: flex;
	font-size: 18px;
	height: 100%;
	color: #909090;
	gap: 10px;
	&__tab {
		display: flex;
		height: 100%;
		text-align: start
		align-items: center;
		&:hover {
			
		}
	}
}
</style>