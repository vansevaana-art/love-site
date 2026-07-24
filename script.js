const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");


let yesSize = 1;
let noClicks = 0;

noBtn.addEventListener("mouseenter", moveButton);

noBtn.addEventListener("touchstart", (e) => {

    e.preventDefault();

    moveButton();

});
    
noBtn.addEventListener("click", () => {

    noClicks++;

    alert("Ну пожалуйста 🥺");

    yesSize += 0.25;

    yesBtn.style.transform =
    `scale(${yesSize})`;

    noBtn.style.transform =
    `scale(${1 - noClicks * 0.15})`;

});

function moveButton(){

    const x = Math.random() * 220 + 80;
    const y = Math.random() * 120 + 40;

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

}
yesBtn.addEventListener("click", () => {

    document.getElementById("page1").classList.remove("active");
    document.getElementById("page2").classList.add("active");

});

const nextBtns =
document.querySelectorAll(".nextBtn");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const page4 = document.getElementById("page4");
const page5 = document.getElementById("page5");

nextBtns[0].onclick = () => {

    page2.classList.remove("active");
    page3.classList.add("active");

};

nextBtns[1].onclick = () => {

    page3.classList.remove("active");
    page4.classList.add("active");

};

nextBtns[2].onclick = () => {

    page4.classList.remove("active");
    page5.classList.add("active");

};
const dateInput =
document.getElementById("dateInput");

const timeInput =
document.getElementById("timeInput");

const dateNext =
document.getElementById("dateNext");

function checkDateTime(){

    if(
        dateInput.value &&
        timeInput.value
    ){
        dateNext.disabled = false;
    }else{
        dateNext.disabled = true;
    }

}

dateInput.addEventListener("change", checkDateTime);

timeInput.addEventListener("change", checkDateTime);

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

let currentDate = new Date();

function renderCalendar(){

    calendar.innerHTML="";

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    monthYear.textContent =
    currentDate.toLocaleString("ru-RU", {
        month:"long",
        year:"numeric"
    });

    let firstDay = new Date(year, month, 1).getDay();

    if(firstDay===0){
        firstDay=7;
    }

    for(let i=1;i<firstDay;i++){

        let empty=document.createElement("div");
        calendar.appendChild(empty);

    }

    let days =
    new Date(year, month+1,0).getDate();

    for(let i=1;i<=days;i++){

        let day=document.createElement("div");

        day.textContent=i;

        day.className="day";

        day.onclick=()=>{

            document.querySelectorAll(".day")
            .forEach(d=>d.classList.remove("selected"));

            day.classList.add("selected");

            dateInput.value =
            `${i}.${month+1}.${year}`;

            checkDateTime();

        };

        calendar.appendChild(day);

    }

}

document.getElementById("prevMonth").onclick=()=>{

    currentDate.setMonth(
        currentDate.getMonth()-1
    );

    renderCalendar();

};

document.getElementById("nextMonth").onclick=()=>{

    currentDate.setMonth(
        currentDate.getMonth()+1
    );

    renderCalendar();

};

renderCalendar();

const cards = document.querySelectorAll(".card");
const wishNext = document.getElementById("wishNext");

const counter = document.getElementById("counter");
const wishList = document.getElementById("wishList");

let selectedWishes = [];

function updateWishList(){

    wishList.innerHTML = "";

    selectedWishes.forEach(item => {

        let wish = document.createElement("div");

        wish.className = "wish-item";

        wish.textContent = item;

        wishList.appendChild(wish);

    });

    counter.textContent =
    `Выбрано: ${selectedWishes.length}/3 💗`;

    if(selectedWishes.length === 3){

        wishNext.disabled = false;

    } else {

        wishNext.disabled = true;

    }

}

cards.forEach(card => {

    card.addEventListener("click", () => {

        let choice = card.dataset.choice;

        if(card.classList.contains("selected")){

            card.classList.remove("selected");

            selectedWishes =
            selectedWishes.filter(
                item => item !== choice
            );

        } else {

            if(selectedWishes.length >= 3){

                alert("Можно выбрать только 3 желания 🥺💗");

                return;

            }

            card.classList.add("selected");

            selectedWishes.push(choice);

        }

        updateWishList();

    });

});

wishNext.onclick = () => {

    const data = {
        date: dateInput.value,
        time: timeInput.value,
        wishes: selectedWishes.join(", ")
    };

    fetch("https://formspree.io/f/xzdnjgdz", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(() => {

        page4.classList.remove("active");
        page5.classList.add("active");

    })
    .catch(() => {

        page4.classList.remove("active");
        page5.classList.add("active");

    });

};
