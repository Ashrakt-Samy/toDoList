let state = {
  tasks: [],
};

document.getElementById("listItem").addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    createTask();
  }
});

function createTask() {
  let val = document.getElementById("listItem").value;

  if (val) {
    let task = {
      id: uuidv4(),
      content: val,
      completed: false,
    };

    state.tasks.push(task);
    let li = document.createElement("LI");
    li.setAttribute("id", "_" + task.id);
    let iconComplete = document.createElement("i");
    iconComplete.classList.add("fas", "fa-check", "completed")
    let span = document.createElement("span");
    let icon = document.createElement("i");
    icon.classList.add("fas", "fa-trash");
    span.innerText = val;
    document.getElementById("myList").appendChild(li);
    li.append(iconComplete)
    li.append(span);
    li.append(icon);
    document.getElementById("listItem").value = "";
    icon.onclick = function () {
      deleteTask(task.id);
    };

    iconComplete.onclick = function () {
      toggleCompleted(task.id)
    };

    span.onclick = function () {
      toggleCompleted(task.id);
    };

    localStorage.setItem("tasks", JSON.stringify(state.tasks))

  }
}

function deleteTask(id) {
  let data = state.tasks.filter(function (task) {
    if (task.id !== id) return task;
  });
  state.tasks = data;
  let item = document.getElementById("_" + id);
  item.parentNode.removeChild(item);
  localStorage.setItem("tasks", JSON.stringify(state.tasks))

}

function toggleCompleted(id) {
  let data = state.tasks.map((task) => {
    if (task.id == id) {
      task.completed = !task.completed;
      let x = document.getElementById("_" + id);
      x.children[0].classList.toggle("completed");
    }
    return task;
  });
  state.tasks = data;
  localStorage.setItem("tasks", JSON.stringify(state.tasks))

}

function readTasks() {

  let data = localStorage.getItem("tasks")

  if (data) {
    state.tasks = JSON.parse(data)

    for (let i = 0; i < state.tasks.length; i++) {

      let li = document.createElement("LI");
      li.setAttribute("id", "_" + state.tasks[i].id);

      let iconComplete = document.createElement("i");

      if (state.tasks[i].completed == false) {
        iconComplete.classList.add("fas", "fa-check", "completed")
      } else {
        iconComplete.classList.add("fas", "fa-check")
      }

      let span = document.createElement("span");
      let icon = document.createElement("i");
      icon.classList.add("fas", "fa-trash");
      span.innerText = state.tasks[i].content;
      document.getElementById("myList").appendChild(li);
      li.append(iconComplete)
      li.append(span);
      li.append(icon);
      icon.onclick = function () {
        deleteTask(state.tasks[i].id);
      };
      iconComplete.onclick = function () {
        toggleCompleted(state.tasks[i].id)
      };

      span.onclick = function () {
        toggleCompleted(state.tasks[i].id);
      };
    }
  }
}

readTasks()