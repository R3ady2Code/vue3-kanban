<template>
	<div class="sidebar">
		<div class="sidebar__header">
			<img src="../../public/img/logo.svg" id="logo" alt="logo" />
			<img src="../../public/img/burger.svg" id="burger" alt="burger" />
		</div>
		<div class="sidebar__menu">
			<ul>
				<li>
					<img src="../../public/img/icons/house.svg" class="icons" alt='dashboard' />
					<a href="#">Дашборд</a>
				</li>
				<li>
					<img src="../../public/img/icons/tasks.svg" class="icons" alt='tasks' />
					<a href="#">Мои Задачи</a>
				</li>
				<li>
					<img src="../../public/img/icons/analytics.svg" class="icons" alt='projects' />
					<a href="#">Проекты</a>
				</li>
			</ul>
		</div>
		<div class="sidebar__favorites">
			<div class="sidebar__favoritesTitle" @click="this.visibleAddInput = true">
				<h5>Проекты</h5>
				<img src="../../public/img/icons/plus_grey.svg" class="icons" />
			</div>
			<ul>
				<li v-if="visibleAddInput" v-click-outside="() => this.visibleAddInput = false">
					<input type="text" placeholder="Название проекта..." v-model="newProjectTitle"
						:class="{ invalid: v$.newProjectTitle.$error }" v-on:keyup.enter="createNewProject">
					<p @click="createNewProject">+</p>
				</li>
				<li v-for="(proj, i) in projects" :key="i"
					@click.prevent="this.$store.commit('setSelectedProject', proj)">
					<img src="../../public/img/icons/projectStatus.svg" alt="status" class="statusBar">
					<p>{{ proj.title }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
	data: () => ({
		visibleAddInput: false,
		newProjectTitle: '',
		projects: []
	}),
	setup() {
		return { v$: useVuelidate() }
	},
	validations() {
		return {
			newProjectTitle: { required }
		}
	},
	async mounted() {
		this.projects = await this.$store.dispatch('fetchProjects')
	},
	methods: {
		async createNewProject() {
			if (this.v$.$invalid) {
				this.v$.$touch();
				return;
			}
			try {
				const project = await this.$store.dispatch('createProject', this.newProjectTitle)
				this.projects.push(project)
				this.visibleAddInput = false
				this.newProjectTitle = ""
			} catch (error) {
				console.log(error)
			}

		}
	},
}
</script>