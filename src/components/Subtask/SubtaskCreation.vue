<template>
	<div class="subtask">
		<div class="creation">
			<input type="text" placeholder="Название подзадачи..." v-model="title" v-on:keyup.enter="addSubtask">
			<button @click="addSubtask">+</button>
		</div>
	</div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
	data: () => ({
		title: ""
	}),
	props: {
		createSubtask: Function
	},
	setup() {
		return { v$: useVuelidate() }
	},
	validations() {
		return {
			title: { required }
		}
	},
	methods: {
		addSubtask() {
			if (this.v$.$invalid) {
				this.v$.$touch();
				return;
			}

			this.createSubtask(this.title)
			this.title = ""
		}
	},
}
</script>