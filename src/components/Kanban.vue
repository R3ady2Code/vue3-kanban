<template>
	<div class="kanban">
		<div class="kanban__header">
			<h6>Последняя задача выполнена 10 марта</h6>
			<div class="filters">
				<div class="filter">
					<img src="../../public/img/icons/filter.svg" alt="filter">
					<p>Фильтрация</p>
				</div>
				<div class="filter">
					<img src="../../public/img/icons/sort.svg" alt="sort">
					<p>Сортировка</p>
				</div>
			</div>
		</div>
		<div class="kanban__content">
			<Column v-for="column in columns" :key="column.id" :column="column" />
			<CreationColumn :addColumn="addColumn" v-if="visibleAddInput"
				v-click-outside="() => this.visibleAddInput = false" />
			<h4 v-else @click="visibleAddInput = true">+ Добавить столбец</h4>
		</div>
	</div>
</template>

<script>
import Column from './Column'
import CreationColumn from './CreationColumn'

export default {
	data: () => ({
		visibleAddInput: false,
		columns: []
	}),
	components: {
		Column,
		CreationColumn
	},
	async mounted() {
		await this.$store.dispatch('fetchProjects')
		this.columns = await this.$store.dispatch('fetchProjectColumns', this.$store.getters.getSelectedProjectId)
		this.$store.watch(() => this.$store.getters.getSelectedProjectId, async (id) => this.columns = await this.$store.dispatch('fetchProjectColumns', id), { deep: true })

	},
	methods: {
		async addColumn(title) {
			try {
				const column = await this.$store.dispatch('createColumn', title)
				this.columns.push(column.title)
				this.visibleAddInput = false
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>