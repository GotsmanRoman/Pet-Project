let cellCount = 16;
let divCell;
let divGrid = document.querySelector(".grid__container");
let imgArray = [];
let template = document.querySelector("template").innerHTML;
for (let i = 1; i <= cellCount / 2; i++){
    imgArray.push(`url(./img/${i}.jpg)`);
    imgArray.push(`url(./img/${i}.jpg)`);
}

imgArray.sort(() => (Math.random() > .5) ? 1 : -1);

for (let i = 0; i < cellCount; i++){
    let random = Math.floor(Math.random() * imgArray.length);
    divCell = document.createElement("div");
    // divCell.classList.add("card__front");
    // divCell.style.backgroundImage = imgArray[random];
    
    let div = {
        class: "card__front",
        image: imgArray[random],
        dataImage: imgArray[random],
    }
    
    let data = Mustache.render(template, div)
    divGrid.insertAdjacentHTML("beforeend", data);
    imgArray.splice(random, 1)
}

let cards = document.querySelectorAll(".card");
let scoreText = document.querySelector(".score__text");
let firstCard = null;
let secondCard = null;
let wait = false;
let tryCount = 0;
scoreText.innerHTML = tryCount;
[...cards].forEach((card)=>{
    card.addEventListener('click', function (e) {
    if(wait) return   
        
        if (firstCard === null && secondCard === null) firstCard = e.target.nextElementSibling;
        else if (secondCard === null) {
            secondCard = e.target.nextElementSibling
            wait = true;
            scoreText.innerHTML = ++tryCount;
            if (firstCard.getAttribute("data-image") === secondCard.getAttribute("data-image")) {
                firstCard.parentNode.parentNode.style.opacity = 0;
                secondCard.parentNode.parentNode.style.opacity = 0;
                firstCard.parentNode.parentNode.style.visibility = "hidden";
                secondCard.parentNode.parentNode.style.visibility = "hidden";
                secondCard = null;
                firstCard = null;
                wait = false;
            }
            else {
                setTimeout(()=>{
                    secondCard.parentNode.classList.toggle('is-flipped');
                    firstCard.parentNode.classList.toggle('is-flipped');
                    secondCard = null;
                    firstCard = null;
                    return wait = false;
                },1000)
            }
        } 
        card.classList.toggle('is-flipped');
    });
});

