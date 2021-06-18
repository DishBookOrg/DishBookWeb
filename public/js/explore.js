
// var docRef = db.collection("PublicDishes").doc("7rs3yWNwDiP35leNpUSJ");
//     docRef.get().then((doc) => {
//         if (doc.exists) {
//             console.log("Document data:", doc.data());
//         } else {
//             // doc.data() will be undefined in this case
//             console.log("No such document!");
//         }
//      }).catch((error) => {
//     console.log("Error getting document:", error);
// });

//second version
// db.collection('PublicDishes').get().then((snapshot) => {
//     console.log(snapshot.docs);
// })

// db.collection("PublicDishes").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);
//     });
// });

const tryItDiv = document.querySelector('#dishes-cards')

function renderBigCard(doc){
   
    let bigCard = document.createElement('div');
    bigCard.classList.add("big-card");
    let bigCardText = document.createElement('p');
    bigCardText.classList.add("big-card-text");
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

    bigCardText.textContent = "Try it!";

    bigCardTextBlock.appendChild(bigCardTextInside);
    bigCardTextBlock.appendChild(imageTime);
    bigCardTextBlock.appendChild(timeTextBig);
    bigCardImg.appendChild(bigCardTextBlock);

    bigCard.appendChild(bigCardText);
    bigCard.appendChild(bigCardImg);

    bigCardTextInside.textContent = doc.data().dishName;
    timeTextBig.textContent = doc.data().dishTotalTime;

    var httpsReference = storage.refFromURL(doc.data().dishImageURL);
    console.log(httpsReference);
    httpsReference.getDownloadURL().then(function(url) {
        console.log('Got download URL');
        console.log(url);
        bigCardImg.style.backgroundImage = "url(" + url + ")";
    });
    tryItDiv.appendChild(bigCard);
}

db.collection('PublicDishes')
    .limit(1)
    .get()
    .then((snapshot) => { snapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        renderBigCard(doc);
    });
    }).catch(err => {
        console.log(err);
    });
