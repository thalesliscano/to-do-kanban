<template>
  <div class="kanban-board">
    <div class="kanban-column" v-for="(tasks, status) in columns" :key="status">
      <h2>{{ statusLabels[status] }}</h2>
      
      <!-- Lista de tarefas -->
      <div v-for="task in tasks" :key="task.id" class="kanban-task">
        <p>{{ task.text }}</p>
        <div class="task-controls">
          <button v-if="status !== 'archive'" @click="moveTask(task, 'archive')">Archive</button>
          <button v-if="status !== 'toDo'" @click="moveTask(task, 'toDo')">To Do</button>
          <button v-if="status !== 'doing'" @click="moveTask(task, 'doing')">Doing</button>
          <button v-if="status !== 'done'" @click="moveTask(task, 'done')">Done</button>
        </div>
      </div>

      <!-- Botão para adicionar tarefa -->
      <div class="add-task-column">
        <div v-if="showInput[status]" class="input-container">
          <input
            v-model="newTaskText[status]"
            @keyup.enter="addTaskToColumn(status)"
            placeholder="Enter task name"
          />
        </div>
        <button @click="toggleInput(status)">+</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TemplateKanban",
  data() {
    return {
      columns: {
        toDo: [],
        doing: [],
        done: [],
        archive: []
      },
      newTaskText: {
        toDo: "",
        doing: "",
        done: "",
        archive: ""
      },
      showInput: {
        toDo: false,
        doing: false,
        done: false,
        archive: false
      },
      statusLabels: {
        toDo: "To Do",
        doing: "Doing",
        done: "Done",
        archive: "Archive"
      }
    };
  },
  methods: {
    toggleInput(status) {
      this.showInput[status] = !this.showInput[status];
      this.newTaskText[status] = ""; // Clear input when toggling
    },
    addTaskToColumn(status) {
      const taskText = this.newTaskText[status].trim();
      if (taskText === "") return;

      const newTask = {
        id: Date.now(),
        text: taskText
      };
      this.columns[status].push(newTask);
      this.newTaskText[status] = "";
      this.showInput[status] = false; // Hide input after adding task
    },
    moveTask(task, newStatus) {
      // Remove task from current status column
      for (const tasks of Object.values(this.columns)) {
        const taskIndex = tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) tasks.splice(taskIndex, 1);
      }
      // Add task to new status column
      this.columns[newStatus].push(task);
    }
  }
};
</script>

<style scoped>
.kanban-board {
  display: flex;
  justify-content: space-between;
}
.kanban-column {
  width: 22%;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.kanban-column h2 {
  text-align: center;
}
.kanban-task {
  background: #ffffff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.task-controls button {
  margin: 2px;
  padding: 4px;
  font-size: 0.8em;
}
.add-task-column {
  margin-top: 10px;
  text-align: center;
}
.input-container {
  margin-top: 5px;
}
input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>
