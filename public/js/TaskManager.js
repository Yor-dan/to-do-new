import Task from './Task.js';

export class TaskManager {
  #tasks = [];

  get tasks() {
    return this.#tasks;
  };

  async fetch() {
    try {
      const response = await fetch('/task');
      const items = await response.json();
      items.forEach(item => {
        this.#tasks.push(new Task(item));
      });
    } catch (error) {
      // handle error
    };
  };

  deleteTask(task) {
    const index = this.#tasks.indexOf(task);
    if (index > -1) {
      this.#tasks.splice(index, 1);
    };
  };

  renderAll() {
    this.#tasks.forEach(task => {
      task.render();
      task.deleteButton.addEventListener('click', () => {
        this.deleteTask(task);
      });
    });
  };
};