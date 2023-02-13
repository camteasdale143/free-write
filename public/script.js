log = ""
visible = false

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth().toString().padStart(2, "0");
const day = currentDate.getDate().toString().padStart(2, "0");
const hours = currentDate.getHours().toString().padStart(2, "0");
const minutes = currentDate.getMinutes().toString().padStart(2, "0");
const seconds = currentDate.getSeconds().toString().padStart(2, "0");

const file_name = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;

function handleKeyPress(event) {
  const textBox = document.getElementById("textBox");
  const output = document.getElementById("output");

  if (event.key === " ") {
    log += " " + textBox.value
    textBox.value = "";
  } else if (event.key === "Tab") {
    event.preventDefault();
    visible = !visible
    if (visible) {
      output.innerHTML = log;
      save_text(file_name, log)
    }
    else {
      output.innerHTML = ""
    }
  } else if (event.key === 'Enter') {
    //log += (textBox.value + "\n")
    //textBox.value = "";
  }
}

function save_text(title, text){
  fetch('/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, text }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error(error);
    });
}
