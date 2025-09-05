document.addEventListener("DOMContentLoaded", function () {
  const taskinput = document.getElementById("taskInput");
  const addbtn = document.getElementById("addBtn");
  const todolist = document.getElementById("todoList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  todolist.innerHTML = "";
  tasks.forEach((task) => renderTasks(task));

  addbtn.addEventListener("click", () => {
    const task = taskinput.value.trim();
    if (task === "") return;
    const taskObj = { id: Date.now(), name: task, completed: false };
    tasks.push(taskObj);
    savetasks();
    renderTasks(taskObj);
    taskinput.value = "";
    console.log(tasks);
  });
  taskinput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addbtn.click();
    }
  });

  todolist.addEventListener("click", function (e) {
    if (e.target.classList.contains("deleteBtn")) {
      const li = e.target.closest("li");
      const id = Number(li.getAttribute("data-id"));

      tasks = tasks.filter((task) => task.id !== id);

      savetasks();

      li.remove();
    }
  });

  function renderTasks(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `<input type="checkbox" id="${task.id}"${task.completed ? "checked" : ""}>
        <label for="${task.id} ">${task.name}</label>
        <button class="deleteBtn"><i class="fas fa-trash-alt"></i></button>`;
       

    todolist.appendChild(li);
    console.log(task);
  }

  function savetasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  todolist.addEventListener("change", function (e) {
    if (e.target.type === "checkbox") {
        const li = e.target.closest("li");
        const id = Number(li.getAttribute("data-id"));
        const task = tasks.find((t) => t.id === id);
        if (task) {
            task.completed = e.target.checked;
            savetasks();
        }
    }
});


todolist.addEventListener("click", function (e) {
  const deleteBtn = e.target.closest(".deleteBtn");
  if (deleteBtn) {
    const li = deleteBtn.closest("li");
    const id = Number(li.getAttribute("data-id"));

    tasks = tasks.filter((task) => task.id !== id);

    savetasks();

    li.remove();
  }
});

});
