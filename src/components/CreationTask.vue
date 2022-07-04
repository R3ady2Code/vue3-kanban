<template>
	<div class="task">
		<div class="task__header">
			<input type="text" placeholder="Название задачи..." autofocus v-model="taskTitle">
		</div>
		<div class="task__footer">
			<div class="bio">
				<input type="checkbox" @change="isAddDeadline = !isAddDeadline">
				<span>Дэдлайн</span>
				<div class="date">
					<input type="date" :disabled='isAddDeadline' v-model="deadline">
					<div class="hours">
						<input type="number" :disabled='isAddDeadline' v-model="hours">
						<p>ч.</p>
					</div>
				</div>
			</div>
			<div class="options">
				<button @click="createTask({ taskTitle, deadline, hours })">Добавить</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		taskTitle: "",
		isAddDeadline: true
	}),
	props: {
		createTask: Function
	}
}
</script>