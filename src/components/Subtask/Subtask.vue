<template>
	<div class="subtask">
		<div class="subtask__info">
			<input type="checkbox" v-model="subtask.completed" @change="updateSubtask(subtask)">
			<h4>{{ subtask.title }}</h4>
		</div>
		<img src="../../../public/img/avatar.svg" alt="avatar" />
	</div>
</template>

<script>
export default {
	props: {
		subtask: Object,
		updateSubtask: Function
	},
}
</script>