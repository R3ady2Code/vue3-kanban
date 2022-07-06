import firebase from 'firebase/compat/app';

export default {
  actions: {
    async createSubtask({ getters }, { title, columnId, taskId }) {
      try {
        const projectId = getters.getSelectedProjectId;
        const subtask = await firebase
          .database()
          .ref(`/projects/${projectId}/columns/${columnId}/tasks/${taskId}/subtasks`)
          .push({ title, completed: false });
        return { title, id: subtask.key };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async fetchSubtasks(arg, { projectId, columnId, taskId }) {
      try {
        const subtasks =
          (
            await firebase
              .database()
              .ref(`/projects/${projectId}/columns/${columnId}/tasks/${taskId}/subtasks`)
              .once('value')
          ).val() || {};

        return Object.keys(subtasks).map((key) => ({ ...subtasks[key], id: key }));
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async updateSubtask({ getters }, { taskId, columnId, ...subtask }) {
      try {
        const projectId = getters.getSelectedProjectId;
        await firebase
          .database()
          .ref(`/projects/${projectId}/columns/${columnId}/tasks/${taskId}/subtasks`)
          .child(subtask.id)
          .update({ ...subtask, completed: !subtask.completed });
        console.log('completed!)');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
