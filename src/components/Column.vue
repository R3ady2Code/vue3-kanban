<template>
	<div class="column">
		<div class="column__header">
			<h3>{{ column.title || column }}</h3>
			<div class="column__headerIcons">
				<img src="../../public/img/icons/plus_black.svg" alt="plus" @click="visibleCreateTask = true">
				<img src="../../public/img/icons/options.svg" alt="options">
			</div>
		</div>
		<div class="column__tasks">
			<CreationTask v-if="visibleCreateTask" v-click-outside="() => this.visibleCreateTask = false"
				:createTask="createTask" />
			<Task />
		</div>
	</div>
</template>

<script>
import Task from './Task';
import CreationTask from './CreationTask';

export default {
	data: () => ({
		visibleCreateTask: false,
		tasks: []
	}),
	props: {
		column: Object,
	},
	components: { Task, CreationTask },
	methods: {
		async createTask(newTask) {
			const columnId = this.column.id
			const task = await this.$store.dispatch('createTask', { ...newTask, columnId })
			this.tasks.push({ ...task })
		}
	}
}
</script>