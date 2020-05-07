function toggle() {
    var signup = document.getElementById('signupForm');
    signup.classList.toggle('active');
}

let registration = document.getElementById("worker-img-container");
let storageReference = storage.ref();
let fileRefeference;
let newfile;

document.getElementById("workerImg").addEventListener("change",function(){
    file = this.files[0];
    console.log(file.name);   
    if (file) {
        if ((file.type == 'image/png') || (file.type == 'image/jpg') || (file.type == 'image/jpeg')) {       
            fileRef = storageReference.child("Images/" + file.name);

            let reader = new FileReader();
            reader.onload = function (e) {
                registration.style.backgroundImage = "url('" + e.target.result + "')";
            };
            reader.onerror = function (e) {
                console.error("An error ocurred reading the file", e);
            };        
            reader.readAsDataURL(file);            
        } else {
            alert("Please provide a png or jpg image.");
            return false;
        }
    }
}, false);



document.getElementById("worker-submit").onclick = function () {
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
    console.log("complteted write to firebase");
}