import firebase from 'firebase/compat/app';

export default {
  actions: {
    async createColumn({ getters }, title) {
      try {
        const projectId = getters.getSelectedProjectId;
        const column = await firebase
          .database()
          .ref(`/projects/${projectId}/columns`)
          .push({ title });
        return { title, id: column.key };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async fetchProjectColumns(arg, projectId) {
      try {
        const columns =
          (await firebase.database().ref(`/projects/${projectId}/columns`).once('value')).val() ||
          {};

        return Object.keys(columns).map((key) => ({ ...columns[key], id: key }));
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async removeColumn({ getters }, columnId) {
      try {
        const projectId = getters.getSelectedProjectId;
        await firebase.database().ref(`/projects/${projectId}/columns/${columnId}`).remove();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
