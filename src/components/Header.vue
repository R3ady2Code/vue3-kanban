<template>
	<header class="header">
		<div class="projectHeader">
			<h2 class="projectHeader__projectTitle">{{ this.projectTitle }}</h2>
			<div class="projectHeader__status">
				<img src="../../public/img/icons/projectStatus.svg" alt="status" class="statusBar">
				<p>В работе</p>
			</div>
		</div>
		<div class="profileHeader">
			<img src="../../public/img/icons/profileHeader/theme.svg" alt="theme" />
			<img src="../../public/img/icons/profileHeader/notifications.svg" alt="notifications" />
			<img src="../../public/img/icons/profileHeader/messages.svg" alt="messages" />
			<img src="../../public/img/avatar.svg" alt="avatar" />
		</div>
	</header>
</template>

<script>
export default {
	data: () => ({
		projectTitle: ''
	}),

	mounted() {
		this.$store.watch(() => this.$store.getters.getSelectedProject, (getSelectedProject) => this.projectTitle = getSelectedProject, { deep: true })
	}
}
</script>