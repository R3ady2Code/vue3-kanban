import firebase from 'firebase/compat/app';

export default {
  state: {
    selectedProject: {},
  },
  getters: {
    getSelectedProject(state) {
      return state.selectedProject.title;
    },
    getSelectedProjectId(state) {
      return state.selectedProject.id;
    },
  },
  mutations: {
    setSelectedProject(state, payload) {
      state.selectedProject = payload;
    },
  },
  actions: {
    async createProject({ commit }, title) {
      try {
        const project = await firebase.database().ref(`/projects`).push({ title });
        commit('setSelectedProject', project);
        return { title, id: project.key };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async fetchProjects({ commit }) {
      try {
        const projects = (await firebase.database().ref(`/projects`).once('value')).val() || {};

        commit(
          'setSelectedProject',
          { title: projects[Object.keys(projects)[0]].title, id: Object.keys(projects)[0] } || '',
        );

        return Object.keys(projects).map((key) => ({ ...projects[key], id: key }));
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
