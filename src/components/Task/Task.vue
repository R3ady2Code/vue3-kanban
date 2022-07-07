<template>
	<div class="task" @click="openModal">
		<div class="task__header">
			<input type="checkbox" v-model="task.completed" @click.stop @change="updateTask(task)" />
			<h4>{{ task.taskTitle }}</h4>
		</div>
		<div class="task__footer">
			<div class="bio">
				<img src="../../../public/img/avatar.svg" alt="avatar">
				<div class="date">
					<p class="timer" v-if="task.hours">{{ hoursAgo }} ч. / {{ task.hours }} ч.</p>
					<p class="deadline" v-if="task.deadline">до {{ task.deadline }}</p>
					<p v-else-if="!task.hours && !task.deadline">{{ hoursAgo }} ч.</p>
				</div>
			</div>
			<div class="options">
				<div class="branch" v-if="subtasks.length" @click.stop @click="visibleSubtasks = !visibleSubtasks">
					<p>{{ subtasks.length }}</p>
					<img src="../../../public/img/icons/branch.svg" alt="branch">
				</div>
				<img :src="require(`../../../public/img/icons/${active ? 'starting' : 'start'}.svg`)" alt="start"
					@click.stop @click="startTask">
			</div>
		</div>

		<div class="subtasks" v-if="visibleSubtasks" @click.stop>
			<Subtask v-for="subtask in subtasks" :key="subtask.id" :subtask="subtask" :updateSubtask="updateSubtask" />
			<SubtaskCreation v-if="visibleStCreation" v-click-outside="() => visibleStCreation = false"
				:createSubtask="createSubtask" />
			<img src="../../../public/img/icons/addSubtask.svg" alt="addSubtask" @click="visibleStCreation = true" />
		</div>
	</div>
	<transition name="slide-fade">
		<ModalTask v-if="visibleModalTask" v-click-outside="() => closeModal()" :task="task" :subtasks="subtasks"
			:hoursAgo="hoursAgo" :closeModal="closeModal" :createSubtask='createSubtask' :updateSubtask="updateSubtask"
			:columnId="columnId" />
	</transition>
</template>

<script>
import ModalTask from './ModalTask'
import Subtask from '../Subtask/Subtask'
import SubtaskCreation from '../Subtask/SubtaskCreation'

export default {
	data: () => ({
		subtasks: [],
		visibleModalTask: false,
		visibleSubtasks: false,
		visibleStCreation: false,
		hoursAgo: 0,
		active: false
	}),
	props: {
		task: Object,
		columnId: String,
		updateTask: Function
	},
	components: { ModalTask, Subtask, SubtaskCreation },
	methods: {
		openModal() {
			this.visibleModalTask = true
		},
		closeModal() {
			this.visibleModalTask = false
		},
		startTask() {
			this.active = !this.active

			if (this.active) {
				const addHour = setInterval(() => {
					if (!this.active) clearInterval(addHour)
					this.hoursAgo++
					if (this.hoursAgo == this.task.hours && this.task.hours !== '') clearInterval(addHour)
				}, 1000 * 60 * 60)
			}
		},
		async createSubtask(subtaskTitle) {
			const taskId = this.task.id
			const columnId = this.columnId
			const subtask = await this.$store.dispatch('createSubtask', { title: subtaskTitle, columnId, taskId })
			this.subtasks.push({ ...subtask })
		},
		async updateSubtask(subtask) {
			try {
				await this.$store.dispatch('updateSubtask', { ...subtask, taskId: this.task.id, columnId: this.columnId, completed: !subtask.completed })
			} catch (error) {
				console.log(error)
			}
		}
	},
	async mounted() {
		await this.$store.dispatch('fetchProjects', true)
		this.subtasks = await this.$store.dispatch('fetchSubtasks', { projectId: this.$store.getters.getSelectedProjectId, columnId: this.columnId, taskId: this.task.id })
		this.$store.watch(() => this.$store.getters.getSelectedProjectId, async (id) => { this.columns = await this.$store.dispatch('fetchSubtasks', { projectId: id, columnId: this.columnId, taskId: this.task.id }), { deep: true } })
	}
}
</script>

<style exact>
.slide-fade-enter-active {
	transition: all .2s ease-out;
}

.slide-fade-leave-active {
	transition: all .2s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(20px);
	opacity: 0;
}
</style>