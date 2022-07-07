<template>
	<div class="taskModal">
		<header>
			<div class="left">
				<img src="../../../public/img/btn/workTask.svg" alt="workTask" />
				<p v-if="task.hours">{{ hoursAgo }}ч. / {{ task.hours }}ч.</p>
				<p v-else>{{ hoursAgo }}ч.</p>
			</div>
			<div class="right">
				<img src="../../../public/img/btn/doneTask.svg" alt="doneTask" />
				<img src="../../../public/img/btn/copy.svg" alt="copy" />
				<img src="../../../public/img/btn/back.svg" alt="back" @click="closeModal" />
			</div>
		</header>
		<div class="description">
			<h2>{{ task.taskTitle }}</h2>
			<table class="description__detail">
				<tbody>
					<tr id="author">
						<th>Исполнитель</th>
						<td>
							Никита Хаецкий
						</td>
					</tr>
					<tr id="date">
						<th>Даты</th>
						<td>Нет даты</td>
					</tr>
					<tr id="project">
						<th>Проект</th>
						<td>Добавить проект</td>
					</tr>
					<tr id="desc">
						<th>Описание</th>
						<td> <input type="text" placeholder="Добавьте описание к этой задаче..."
								v-model="task.description"
								v-bind="$store.dispatch('addDescription', { description: task.description, taskId: task.id, columnId, ...task })">
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="taskModal__subtasks">
			<h4>Подзадачи</h4>
			<div class="content">
				<div class="subtask" v-for="st in subtasks" :key="st.id">
					<div class="left">
						<input type="checkbox" v-model="st.completed" @change="updateSubtask(subtask)">
						<p>{{ st.title }}</p>
					</div>
					<div class="right">
						<img src="../../../public/img/btn/calendar.svg" alt="calendar" />
						<img src="../../../public/img/btn/profile.svg" alt="profile" />
					</div>
				</div>
				<transition name="slide-fade">
					<div class="subtask" v-if="visiblePopUp" v-click-outside="() => visiblePopUp = false">
						<input type="text" placeholder="Название подзадачи..." v-model="subtaskTitle"
							:class="{ invalid: v$.subtaskTitle.$error }" v-on:keyup.enter="clickAdd">
						<button @click="clickAdd">Добавить</button>
					</div>
				</transition>
			</div>
			<img src="../../../public/img/icons/addSubtask.svg" alt="addSubtask" @click="visiblePopUp = true">
		</div>
	</div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
	data: () => ({
		visiblePopUp: false,
		subtaskTitle: ''
	}),
	props: {
		task: Object,
		subtasks: Array,
		hoursAgo: Number,
		closeModal: Function,
		createSubtask: Function,
		updateSubtask: Function,
		columnId: String
	},
	setup() {
		return { v$: useVuelidate() }
	},
	validations() {
		return {
			subtaskTitle: { required }
		}
	},
	methods: {
		clickAdd() {
			if (this.v$.$invalid) {
				this.v$.$touch();
				return;
			}

			this.createSubtask(this.subtaskTitle)
			this.subtaskTitle = ""
		}
	}
}
</script>

<style exact lang="scss">
.subtask {
	>input {
		padding: 3px 5px;
		width: 85%;
		border-radius: 10px;
	}

	>button {
		width: 100px;
		padding: 2px 5px;
		border: 1px solid #4f6ea3;
		color: #4f6ea3;
		background-color: #fff;
		cursor: pointer;
		transition: all 0.2s ease-in-out;

		&:hover {
			background-color: #4f6ea3;
			color: #fff;
		}
	}
}
</style>