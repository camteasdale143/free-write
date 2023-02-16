log = ""
visible = false

const currentDate = new Date();


document.querySelector("form").addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
});
document.querySelector("form").addEventListener("submit", submitJournal)

function submitJournal(event){
  event.preventDefault();
  const title_text= document.getElementById("title_box");
  if (log == ''){
    return
  }

  if (title_text.value == ""){
    return
  }

  console.log(title_text.value, log)
  save_text(title_text.value, log)
  window.location = "/";
}

function handleKeyPress(event) {
  const textBox = document.getElementById("big-text");
  const output = document.getElementById("output");
  const title_text= document.getElementById("title_box");

  if (event.key === " ") {
    log += " " + textBox.value
    textBox.value = "";
  } else if (event.key === "Tab") {
    event.preventDefault();
    visible = !visible
    if (visible) {
      output.innerHTML = log;
      save_text(title_text.value, log)
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
    body: JSON.stringify({ title, text}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error(error);
    });
}
