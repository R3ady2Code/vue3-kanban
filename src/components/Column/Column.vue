<template>
	<div class="column">
		<div class="column__header">
			<h3>{{ column.title || column }}</h3>
			<ColumnModal v-if="visibleModal" v-click-outside="() => visibleModal = false" :removeColumn="removeColumn"
				:id="column.id" />
			<div class="column__headerIcons">
				<img src="../../../public/img/icons/plus_black.svg" alt="plus" @click="visibleCreateTask = true">
				<img src="../../../public/img/icons/options.svg" alt="options" @click="visibleModal = true">
			</div>
		</div>
		<div class="column__tasks">
			<p v-if="!tasks.length && !visibleCreateTask">Задач пока нет.</p>
			<transition name="slide-fade-ct">
				<CreationTask v-if="visibleCreateTask" v-click-outside="() => this.visibleCreateTask = false"
					:createTask="createTask" />
			</transition>
			<Task v-for="task in tasks" :key="task.id" v-bind:task="task" :columnId="column.id"
				:updateTask="updateTask" />
		</div>
	</div>
</template>

<script>
import Task from '../Task/Task';
import CreationTask from '../Task/CreationTask';
import ColumnModal from './ColumnModal';

export default {
	data: () => ({
		visibleCreateTask: false,
		visibleModal: false,
		tasks: []
	}),
	props: {
		column: Object,
		removeColumn: Function
	},
	components: { Task, CreationTask, ColumnModal },
	methods: {
		async createTask(newTask) {
			this.visibleCreateTask = false
			const columnId = this.column.id
			const task = await this.$store.dispatch('createTask', { ...newTask, columnId })
			this.tasks.push({ ...task })
		},
		async updateTask(task) {
			await this.$store.dispatch('updateTask', { ...task, taskId: task.id, columnId: this.column.id, completed: !task.completed })
		}
	},
	async mounted() {
		await this.$store.dispatch('fetchProjects', true)
		this.tasks = await this.$store.dispatch('fetchTasks', { projectId: this.$store.getters.getSelectedProjectId, columnId: this.column.id })
		this.$store.watch(() => this.$store.getters.getSelectedProjectId, async (id) => { this.columns = await this.$store.dispatch('fetchTasks', { projectId: id, columnId: this.column.id }), { deep: true } })
	}
}
</script>

<style exact>
.slide-fade-ct-enter-active {
	transition: all .2s ease-out;
}

.slide-fade-ct-leave-active {
	transition: all .2s ease-in;
}

.slide-fade-ct-enter-from,
.slide-fade-ct-leave-to {
	transform: translateY(-20px);
	opacity: 0;
}
</style>