function toggle() {
    var signup = document.getElementById('signupForm');
    signup.classList.toggle('active');
}

let photo = document.getElementById("image-container");
let storageRef = storage.ref();
let fileRef;
let file;

function uploadImage(file) {
    fileRef.put(file).then(function() {
        console.log("uploaded file");
    })
}


document.getElementById("regSub").onclick = function () {
    if (file) {
        uploadImage(file);
    }
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    db.collection("workerRegistration").doc().set({
        "name": name.value,
        "email": email.value,
        "image": "Images/" + file.name
    });
}