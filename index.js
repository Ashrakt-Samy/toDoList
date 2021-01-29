/***
 *
 * Create
 * Read
 * Update
 * Delete
 *
 */

let state = {
  // our single source of truth
  tasks: [
    {
      content: "test 1",
      completed: false,
    },
    {
      content: "test 2",
      completed: false,
    },
    {
      content: "test 3",
      completed: false,
    },
  ],
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
      content: val,
      completed: false,
    };

    state.tasks.push(task);

    let li = document.createElement("LI");
    li.setAttribute("id", "_" + state.tasks.indexOf(task));
    let icon = document.createElement("i");
    icon.classList.add("fa", "fa-trash");
    li.innerText = val;
    document.getElementById("myList").appendChild(li);
    li.append(icon);
  
    icon.onclick = function () {
      deleteTask(state.tasks.indexOf(task));
    };
  //  createElment(val, state.tasks.indexOf(task));
    document.getElementById("listItem").value = "";
  }
}

function readTasks() {
  for (let i = 0; i < state.tasks.length; i++) {
    let li = document.createElement("LI");
    li.setAttribute("id", "_" + i);
    let icon = document.createElement("i");
    icon.classList.add("fa", "fa-trash");
    li.innerText = state.tasks[i].content;
    document.getElementById("myList").appendChild(li);
    li.append(icon);
  
    icon.onclick = function () {
      deleteTask(i);
    };
   // createElment(state.tasks[i].content, i);
  }
}

function createElment(txt, index) {
  let li = document.createElement("LI");
  li.setAttribute("id", "_" + index);
  let icon = document.createElement("i");
  icon.classList.add("fa", "fa-trash");
  li.innerText = txt;
  document.getElementById("myList").appendChild(li);
  li.append(icon);

  icon.onclick = function () {
    deleteTask(index);
  };
}

readTasks();

function deleteTask(i) {
  let data = state.tasks.filter(function (task, index) {
    if (index !== i) return task;
  });
  state.tasks = data;
  let item = document.getElementById("_" + i);
  item.parentNode.removeChild(item);
}

var today = new Date();
var date =
  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
document.getElementById("date").innerHTML = date;
