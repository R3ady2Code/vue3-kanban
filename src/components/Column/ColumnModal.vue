<template>
	<div class="columnModal" @click="removeColumn(id)">
		Удалить столбец
	</div>
</template>

<script>
export default {
	props: {
		removeColumn: Function,
		id: String
	},

}
</script>