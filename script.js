// Form Validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!name || !email || !message) {
    formMessage.style.color = "red";
    formMessage.textContent = "Please fill in all fields.";
    return;
  }

  if (!email.match(emailRegex)) {
    formMessage.style.color = "red";
    formMessage.textContent = "Invalid email address.";
    return;
  }

  formMessage.style.color = "green";
  formMessage.textContent = "Your message has been sent!";
  this.reset();
});

// To-Do List with Local Storage
function addTask() {
  const input = document.getElementById("todoInput");
  const task = input.value.trim();

  if (task === "") return;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  displayTasks();
}

function displayTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = function () {
      deleteTask(index);
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

window.onload = displayTasks;
