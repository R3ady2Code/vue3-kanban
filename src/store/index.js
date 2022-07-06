import { createStore } from 'vuex';

import projects from './projects';
import columns from './columns';
import tasks from './tasks';
import subtasks from './subtasks';

export default createStore({
  actions: {},
  modules: {
    projects,
    columns,
    tasks,
    subtasks,
  },
});
