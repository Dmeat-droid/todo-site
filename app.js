"use strict";

// Access element in html
const form = document.getElementById("todo-form");
const textInput = document.getElementById("todo-input");
const list = document.getElementById("list-container");
    
let todos = JSON.parse(localStorage.getItem("todos") || "[]");
if(!todos.length) todos = [{ id: 1, text: "Learn Javascript", completed: false}];

//render list
function renderTodos() {
  list.innerHTML = "";

  todos.forEach(element => {
    const li = document.createElement("li");

    // checkbox
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = element.completed;
    cb.addEventListener("change", () => {
      element.completed = cb.checked;
      saveAndRender();
    });

    // Text label
    const span = document.createElement("span");
    span.textContent = " " + element.text;
    if (element.completed) {
      span.style.textDecoration = "line-through";
    }

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((item) => item.id !== element.id);
      saveAndRender();
    });

    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    // li.appendChild(document.createTextNode(" " + element.text));
    list.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = textInput.value.trim();
  if (!text) {
    console.log("Input value is null!");
    return;
  }
  todos.push({ id: Date.now(), text, completed: false });
  textInput.value = "";
  saveAndRender();
});

// disable submit when its empty
textInput.addEventListener("input", () => {
  const submitBtn = document.getElementById("todo-submit");
  if (submitBtn) submitBtn.disabled = !textInput.value.trim();
});

// Function marked as 'async' returns a promise automatically
async function getUserByID(id) {
  try {
    // Pause execution til the fetch promise resolves
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    
    // Check if the HTTP status is in safe range
    if (!response.ok){
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    // Use the fetched data
    const post = await response.json();
    console.log(`${post.name} works at ${post.company.name}`);
  } catch(error){
    console.error("Failed to fetch post:", error.message);
  }
}

getUserByID(2);
getUserByID(999);