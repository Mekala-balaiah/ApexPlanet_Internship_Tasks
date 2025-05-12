// script.js
function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();

  if (task !== "") {
    const li = document.createElement("li");
    li.textContent = task;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => li.remove();

    li.appendChild(removeBtn);
    document.getElementById("taskList").appendChild(li);

    input.value = "";
  }
}
