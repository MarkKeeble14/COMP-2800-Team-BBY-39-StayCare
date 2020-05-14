function createUser() {

    // if the current user logged in user
    // is authenticated, then grab "uid" "displayName" and "email"
    // use "set()" with merge (if document did not exist it will be created)
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            db.collection("user").doc(user.uid).set(
                {
                "name":user.displayName,
                 "email":user.email,
                },{ merge: true });
            } else {
                console.log("no one signed in");
            }

    });
}



