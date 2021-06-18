//Initialization of constants
const rootDiv = document.querySelector('#dishes-cards')
const searchDiv = document.getElementById('search-cards')

const smallCardBreakfast = document.querySelector('#small-cards-1')
const smallCardDinner = document.querySelector('#small-cards-2')

const searchInput = document.getElementById('search-field')
const searchButton = document.getElementById('search-icon')

//Render big card
function renderBigCard(doc, elementId){
   
    let bigCardImg = document.createElement('div');
    bigCardImg.classList.add("big-card-img");
    let bigCardTextBlock = document.createElement('div');
    bigCardTextBlock.classList.add("big-card-text-block");
    let bigCardTextInside = document.createElement('p');
    bigCardTextInside.classList.add("big-card-text-inside");
    let imageTime = document.createElement('img');
    imageTime.src = "./img/time.svg";
    let timeTextBig = document.createElement('p');
    timeTextBig.classList.add("time-text-big");

    bigCardTextBlock.appendChild(bigCardTextInside);
    bigCardTextBlock.appendChild(imageTime);
    bigCardTextBlock.appendChild(timeTextBig);
    bigCardImg.appendChild(bigCardTextBlock);

    bigCardTextInside.textContent = doc.data().dishName;
    timeTextBig.textContent = doc.data().dishTotalTime;

    var httpsReference = storage.refFromURL(doc.data().dishImageURL);
    console.log(httpsReference);
    httpsReference.getDownloadURL().then(function(url) {
        console.log('Got download URL');
        console.log(url);
        bigCardImg.style.backgroundImage = "url(" + url + ")";
    });
    let div = document.getElementById(elementId)
    div.appendChild(bigCardImg);
}

//Render small cards
function renderSmallCard(doc) {

    let smallCard = document.createElement('div');
    smallCard.classList.add("small-card-1");
    let smallCardTextBlock = document.createElement('div');
    smallCardTextBlock.classList.add("small-card-text-block");
    let smallCardTextInside = document.createElement('p');
    smallCardTextInside.classList.add("small-card-text-inside");
    let imageTime = document.createElement('img');
    imageTime.src = "./img/time.svg";
    let timeTextSmall = document.createElement('p');
    timeTextSmall.classList.add("time-text");

    smallCard.appendChild(smallCardTextBlock);

    smallCardTextBlock.appendChild(smallCardTextInside);
    smallCardTextBlock.appendChild(imageTime);
    smallCardTextBlock.appendChild(timeTextSmall);

    smallCardTextInside.textContent = doc.data().dishName;
    timeTextSmall.textContent = doc.data().dishTotalTime;

    var httpsReference = storage.refFromURL(doc.data().dishImageURL);
    console.log(httpsReference);
    httpsReference.getDownloadURL().then(function(url) {
        console.log('Got download URL');
        console.log(url);
        smallCard.style.backgroundImage = "url(" + url + ")";
    });
    if (doc.data().dishRation == "Dinner") {
        smallCardDinner.appendChild(smallCard);
    } else {
        smallCardBreakfast.appendChild(smallCard);
    }
}

//Get a big card from the database
db.collection('PublicDishes')
    .limit(1)
    .get()
    .then((snapshot) => { snapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        renderBigCard(doc, "big-card");
    });
    }).catch(err => {
        console.log(err);
    });

//Get a small card for Dinner from the database    
db.collection('PublicDishes')
    .limit(3)
    .where("dishRation", "==", "Dinner")
    .get()
    .then((snapshot) => { snapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        renderSmallCard(doc);
    });
    }).catch(err => {
        console.log(err);
    });
    
//Get a small card for Breakfast from the database 
db.collection('PublicDishes')
    .limit(3)
    .where("dishRation", "==", "Breakfast")
    .get()
    .then((snapshot) => { snapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        renderSmallCard(doc);
    });
    }).catch(err => {
        console.log(err);
    });

//Search 
searchButton.addEventListener("click",function(){
    
    console.log( searchInput.textContent);
    db.collection('PublicDishes')
    .limit(3)
    .where("dishName", ">=", searchInput.value)
    .where("dishName", "<=",  searchInput.value + "z")
    .get()
    .then((snapshot) => { 

        rootDiv.style.display = "none";
        searchDiv.style.display = "flex";

        document.querySelectorAll('.big-card-img').forEach(e => e.remove());
        
        snapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        console.log("Pereferct Search");
        
        renderBigCard(doc, "search-cards");
    });
    }).catch(err => {
        console.log(err);
    });
});
