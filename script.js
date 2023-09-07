let letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "X",
  "Y",
  "Z",
];
let FloatClass = [
  "float-none",
  "float-start",
  "float-end",
  "mt-5",
  "float-end",
  "float-start",
  "float-none",
  "mt-4",
];
let text = document.querySelector("[data-letter]");
let startbtn = document.querySelector(".startbtn");
let disabledBtn = document.querySelector(".startbtns");
let timehtml = document.querySelector(".time");
let letterBtn = document.querySelector(".letterBtn");
let AboutText = document.querySelector(".AboutText");
let resetBtn = document.querySelector(".resetBtn");
let second = document.getElementById("second");
let time, user, Localuser;
let true_answer = document.getElementById("true_answer");
let false_answer = document.getElementById("false_answer");
Localuser = localStorage.getItem("userHTML");
let answerTrue = 0;
let answerFalse = 0;
let NameEditBtn = document.querySelector(".NameEditBtn");

username = document.getElementById("name");
if (localStorage.getItem("userHTML")) {
  username.value = localStorage.getItem("userHTML");
  username.setAttribute("disabled", "disabled");
  NameEditBtn.classList.remove("d-none");
} else {
  NameEditBtn.classList.add("d-none");
  username.removeAttribute("disabled", "disabled");
}

// NameEditBtn

NameEditBtn.addEventListener("click", () => {
  username.removeAttribute("disabled", "disabled");
  username.value = "";
  username.focus();
});

// Start btn
startbtn.addEventListener("click", () => {
  let user = document.getElementById("name").value;
  let secondHTML = second.value;
  timehtml.innerHTML = secondHTML;
  localStorage.setItem("secondHTML", secondHTML);
  localStorage.setItem("userHTML", user);
  time = localStorage.getItem("secondHTML");
  user = localStorage.getItem("userHTML");
  letterBtn.classList.add("btn-success");
  letterBtn.classList.remove("d-none");
  letter();

  window.addEventListener("keydown", keyboard);
  disabledBtn.setAttribute("disabled", "disabled");
  sendtelegram(`${user} (${Localuser}) ${secondHTML} sekund tanladi!`);
});

// keyboard function
function keyboard(e) {
  if (e.key.toUpperCase() == text.innerHTML) {
    letter();
    playOn();
    answerTrue++;
    true_answer.innerHTML = answerTrue;
  } else {
    letters.forEach((data) => {
      if (e.key.toUpperCase() == data) {
        playOff();
      }
    });
    answerFalse++;
    false_answer.innerHTML = answerFalse;

    if (answerFalse == 20) {
      user = localStorage.getItem("userHTML");
      sendtelegram(`${user} (${Localuser}) xato javoblarni ko'p tanladi!`);
      alert(
        user + " sizda juda ham ko'p xatolik bo'ldi! Qaytadan harakat qiling"
      );
      location.reload();
    }
  }
  if (answerTrue == 1) {
    let secondHTML = localStorage.getItem("secondHTML");
    setInterval(times, 1000);
    setTimeout(stopkeyboard, 1000 * secondHTML);
  }
}

// Time function
function times() {
  if (time > 0) {
    --time;
  }
  timehtml.innerHTML = time;
}

// letter function
function letter() {
  let rand = Math.floor(Math.random() * letters.length);
  text.innerHTML = letters[rand];
  BtnFloatClass();
}

function BtnFloatClass() {
  let float = Math.floor(Math.random() * FloatClass.length);
  letterBtn.classList.remove("float-none");
  letterBtn.classList.remove("float-start");
  letterBtn.classList.remove("float-end");
  letterBtn.classList.remove("mt-5");
  letterBtn.classList.remove("mt-4");
  letterBtn.classList.add(FloatClass[float]);
}

// stop keyboard function
function stopkeyboard() {
  user = localStorage.getItem("userHTML");
  setTime = localStorage.getItem("secondHTML");
  window.removeEventListener("keydown", keyboard);
  letterBtn.classList.remove("btn-warning");
  letterBtn.classList.remove("btn-primary");
  letterBtn.classList.add("btn-danger");
  letterBtn.classList.add("float-none");
  letterBtn.classList.add("col-5");
  text.innerHTML = `To'g'ri: ${answerTrue}, Xato: ${answerFalse}`;
  AboutText.innerHTML = `${user} ${setTime} sekund vaqt davomida, ${answerTrue} ta to'g'ri va ${answerFalse} ta xato bajardi `;
  sendtelegram(
    `${user} (${Localuser}) ${setTime} sekund vaqt davomida, ${answerTrue} ta to'g'ri va ${answerFalse} ta xato bajardi `
  );
  resetBtn.classList.remove("d-none");
}

// Play audio
let playOn = () => new Audio("audio/on.mp3").play();
let playOff = () => new Audio("audio/off.mp3").play();

// sendtelegram
function sendtelegram(message) {
  let telegram_bot_id = "5809269513:AAHVkBrRpDj7VEWl2NvI46IRZA2DH75HXJI";
  let chat_id = 700727696;
  let settings = {
    async: true,
    crossDomain: true,
    url: "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
    },
    data: JSON.stringify({ chat_id: chat_id, text: message }),
  };
  $.ajax(settings).done(function (response) {});
}

// resetBtn

resetBtn.addEventListener("click", () => {
  location.reload();
});


 // disable right click
 document.addEventListener('contextmenu', event => event.preventDefault());

 document.onkeydown = function (e) {
     // disable F12 key
     if (e.keyCode == 123) {
         return false;
     }

     // disable I key
     if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
         return false;
     }

     // disable J key
     if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
         return false;
     }

     // disable U key
     if (e.ctrlKey && e.keyCode == 85) {
         return false;
     }
 }