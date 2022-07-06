<template>
	<div class="subtask">
		<div class="creation">
			<input type="text" placeholder="Название подзадачи..." v-model="title" v-on:keyup.enter="addSubtask"
				:class="{ invalid: v$.columnTitle.$error }">
			<button @click="addSubtask">+</button>
		</div>
	</div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
	props: {
		createSubtask: Function
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
	setup() {
		return { v$: useVuelidate() }
	},
	validations() {
		return {
			taskTitle: { required }
		}
	},
}
</script>