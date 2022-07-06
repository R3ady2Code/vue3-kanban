<template>
	<div class="task">
		<div class="task__header">
			<input type="text" placeholder="Название задачи..." autofocus v-model="taskTitle" v-on:keyup.enter="addTask"
				:class="{ invalid: v$.taskTitle.$error }">
		</div>
		<div class="task__footer">
			<div class="bio">
				<input type="checkbox" @change="isAddDeadline = !isAddDeadline">
				<div class="date">
					<input type="date" :disabled='isAddDeadline' v-model="deadline">
					<div class="hours">
						<input type="number" :disabled='isAddDeadline' v-model="hours">
						<p>ч.</p>
					</div>
				</div>
			</div>
			<div class="options">
				<button @click="addTask">Добавить</button>
			</div>
		</div>
	</div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
	data: () => ({
		taskTitle: "",
		isAddDeadline: true
	}),
	setup() {
		return { v$: useVuelidate() }
	},
	validations() {
		return {
			taskTitle: { required }
		}
	},
	props: {
		createTask: Function
	},
	methods: {
		addTask() {
			if (this.v$.$invalid) {
				this.v$.$touch();
				return;
			}
			const title = this.taskTitle
			const deadline = this.deadline
			const hours = this.hours
			this.createTask({ taskTitle: title, deadline, hours })
		}
	}
}
</script>