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
    async createProject(arg, title) {
      try {
        const project = await firebase.database().ref(`/projects`).push({ title });
        return { title, id: project.key };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async fetchProjects({ commit }, dontSet) {
      try {
        const projects = (await firebase.database().ref(`/projects`).once('value')).val() || {};

        if (!dontSet) {
          commit(
            'setSelectedProject',
            { title: projects[Object.keys(projects)[0]].title, id: Object.keys(projects)[0] } || '',
          );
        }

        return Object.keys(projects).map((key) => ({ ...projects[key], id: key }));
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
