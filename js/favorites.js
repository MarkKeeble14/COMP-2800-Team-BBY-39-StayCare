let back = document.getElementById("back");

//Goes back to home page on "home" button click.
back.onclick = function () {
    location.href = "index.html";
}

//holds all favorite objects.
let favorites = [];

document.getElementById("addFav").onclick = function () {
    let favoriteObj = {
        email: "hahaha@test123.com",
        name: "TestFavorite"
    }

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user.uid);
            db.collection("users").doc(user.uid)
                .collection("favorites")
                .add(favoriteObj);
        }
    })
}

//retrieves favorite objects from database, creates table with rows corresponding to favorites, according to a forEach loop.
function display() {
    var table = document.createElement("table");
    table.id = "favorites";

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user.displayName);
            db.collection("users").doc(user.uid)
                .collection("favorites").get().then(function (snap) {
                    console.log(snap);
                    snap.forEach(function (doc) {
                        favorites.push(doc.data());
                    });
                }).then(function () {

                    var tr = document.createElement('tr');
                    tr.id = "row1";

                    var td1 = document.createElement('td');
                    td1.id = "cell1";
                    var td2 = document.createElement('td');
                    td2.id = "cell2";

                    var text1 = document.createTextNode("Name");
                    var text2 = document.createTextNode("Email");

                    td1.appendChild(text1);
                    td2.appendChild(text2);

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    table.appendChild(tr);

                    for (let i = 0; i < favorites.length; i++) {

                        var tr = document.createElement('tr');
                        tr.id = "row1";

                        var td1 = document.createElement('td');
                        td1.id = "cell1";
                        var td2 = document.createElement('td');
                        td2.id = "cell2";

                        var text1 = document.createTextNode(favorites[i].name);
                        var text2 = document.createTextNode(favorites[i].email);

                        td1.appendChild(text1);
                        td2.appendChild(text2);

                        tr.appendChild(td1);
                        tr.appendChild(td2);
                        table.appendChild(tr);
                    }
                })
            document.body.appendChild(table2);
            document.body.appendChild(table);
        }
    })
}
display();