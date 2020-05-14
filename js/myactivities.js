let activities = db.collection("activities");
let users = db.collection("users");
let myActivities = [];

function Activity(description, image, size, time, title) {
    this.description = description,
    this.image = image,
    this.size = size,
    this.time = time,
    this.title = title
    //this.id = id //Maybe create an id using the random generator and add the id to firebase?
}

//SUPER INEFFICIENT FUCKKKKKKKKK
document.getElementById("signUp").onclick = function () {

    activities.get().then((querySnapshot) => {
        myActivities = querySnapshot.docs.map(doc => doc.data());
        console.log(myActivities); //Show activities as an array

        firebase.auth().onAuthStateChanged(function (user) {

            if (user) {
                console.log(user.uid); //Confirm user
                users.doc(user.uid)
                    .collection("myActivities")
                    .add(myActivities[0]);
            }

        })
    })
}

