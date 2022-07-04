import firebase from 'firebase/compat/app';

export default {
  actions: {
    async createTask({ getters }, { taskTitle, deadline, hours, columnId }) {
      try {
        console.log(taskTitle, deadline, hours);
        const projectId = getters.getSelectedProjectId;
        const column = await firebase
          .database()
          .ref(`/projects/${projectId}/columns/${columnId}/tasks`)
          .push({ taskTitle, deadline, hours, createDate: Date.now() });
        return { taskTitle, createDate: Date.now(), id: column.key };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async fetchTasks(arg, projectId, columnId) {
      try {
        const tasks =
          (
            await firebase
              .database()
              .ref(`/projects/${projectId}/columns/${columnId}/tasks`)
              .once('value')
          ).val() || {};

        return Object.keys(tasks).map((key) => ({ ...tasks[key], id: key }));
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
