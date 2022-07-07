import firebase from 'firebase/compat/app';

export default {
  actions: {
    async createTask({ getters }, { taskTitle, deadline = '', hours = '', columnId }) {
      try {
        const projectId = getters.getSelectedProjectId;
        const task = await firebase
          .database()
          .ref(`/projects/${projectId}/columns/${columnId}/tasks`)
          .push({
            taskTitle,
            deadline,
            hours,
            createDate: Date.now(),
            completed: false,
            description: '',
          });
        return { taskTitle, createDate: Date.now(), id: task.key };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async fetchTasks(arg, { projectId, columnId }) {
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

    async updateTask({ getters }, { taskId, columnId, ...task }) {
      try {
        const projectId = getters.getSelectedProjectId;
        await firebase
          .database()
          .ref(`/projects/${projectId}/columns/${columnId}/tasks`)
          .child(taskId)
          .update({ ...task, completed: !task.completed });
      } catch (error) {
        console.log(error);
      }
    },

    async addDescription({ getters }, { taskId, columnId, description, ...task }) {
      try {
        const projectId = getters.getSelectedProjectId;
        await firebase
          .database()
          .ref(`/projects/${projectId}/columns/${columnId}/tasks`)
          .child(taskId)
          .update({ ...task, description: description });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
