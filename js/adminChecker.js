

const post= document.getElementById("post-link");
var userRef = db.collection("users");

post.addEventListener('click', function() {
    var user = firebase.auth().currentUser;

    var userEmail = user.email;
    var worker = user.isWorker;

    db.collection("users").where("email", "==", userEmail)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var data = doc.data();
            var worker = data.isWorker;
            console.log(worker);

            if (worker == false) {
                location.replace("worker-sign-up.html");
            }
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
})