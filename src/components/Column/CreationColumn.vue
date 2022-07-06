<template>
	<div class="column">
		<div class="column__header">
			<input type="text" placeholder="Название колонки..." autofocus v-model="columnTitle"
				:class="{ invalid: v$.columnTitle.$error }" v-on:keyup.enter="onClickPlus(columnTitle)" />
			<img src="../../../public/img/icons/plus_black.svg" alt="plus" @click="onClickPlus(columnTitle)"
				style="cursor: pointer">
		</div>
	</div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
	data: () => ({
		columnTitle: '',
	}),
	setup() {
		return { v$: useVuelidate() }
	},
	validations() {
		return {
			columnTitle: { required }
		}
	},
	props: {
		addColumn: Function
	},
	methods: {
		onClickPlus(title) {
			if (this.v$.$invalid) {
				this.v$.$touch();
				return;
			}
			this.columnTitle = ""
			this.addColumn(title)
		}
	}
}
</script>