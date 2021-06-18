
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

db.collection('PublicDishes').get().then((snapshot) => {
    snapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    });
   }).catch(err => {
     console.log(err);
   });
