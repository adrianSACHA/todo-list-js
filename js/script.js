{
  let tasks = [];
  let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (index) => {
    tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
    render();
  };

  const toggleTaskDone = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      {
        ...tasks[index],
        done: !tasks[index].done,
      },
      ...tasks.slice(index + 1),
    ];
    render();
  };

  const markAllTaskDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleHideDoneTask = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const bindEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");
    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });

    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const renderTasks = () => {
    const taskToHTML = (task) => `
      <li class="tasks__item ${
        task.done && hideDoneTasks ? "tasks__item--hidden" : ""
      }">
        <button class="tasks__button tasks__button--toggleDone js-toggleDone">
        ${task.done ? "✔" : ""}
        </button>
        <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
        ${task.content}
        </span>
        <button class="tasks__button tasks__button--remove js-remove">
        🗑️
        </button>
      </li>
      `;

    const tasksElement = document.querySelector(".js-tasks");
    tasksElement.innerHTML = tasks.map(taskToHTML).join("");
  };

  const renderButtons = () => {
    const buttons = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttons.innerHTML = "";
      return;
    }

    buttons.innerHTML = `
      <button class="tasksList__doneButton js-toggleHideDoneButton">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
      </button>
      <button class="tasksList__doneButton js-markAllDoneButton"
        ${tasks.every(({ done }) => done) ? " disabled" : ""}
      >
        Ukończ wszystkie
      </button>
`;
  };

  const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDoneButton");

    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllTaskDone);
    }

    const toggleHideDoneTaskButton = document.querySelector(
      ".js-toggleHideDoneButton"
    );

    if (toggleHideDoneTaskButton) {
      toggleHideDoneTaskButton.addEventListener("click", toggleHideDoneTask);
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindButtonsEvents();
    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = ";";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
