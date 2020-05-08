// was making an error (profile-pic image onclick='toggle()' calls this function)
/*function toggle() {
    var signup = document.getElementById('signupForm');
    signup.classList.toggle('active');
}*/

let registration = document.getElementById("worker-img-container");
let storageReference = storage.ref();
let fileRefererence;
let newfile;
let fullfilepath;

//uploadImage function is already defined on post.js
/*
function uploadImage(newfile) {
    fileReference.put(newfile).then(function() {
        console.log("uploaded file");
    })
}*/

document.getElementById("workerImg").addEventListener("change",function(){
    newfile = this.files[0];
    //if a file was chosen   
    if (newfile) {
        //if the file chosen is an image
        if ((newfile.type == 'image/png') || (newfile.type == 'image/jpg') || (newfile.type == 'image/jpeg')) {       
            fullfilepath = "Images/certificates/" + postId + newfile.name;
            fileReference = storageReference.child(fullfilepath);

            let reader = new FileReader();
            // show the image in the form
            reader.onload = function (e) {
                registration.style.backgroundImage = "url('" + e.target.result + "')";
            };
            reader.onerror = function (e) {
                console.error("An error ocurred reading the file", e);
            };        
            reader.readAsDataURL(newfile);            
        } else {
            alert("Please provide a png or jpg image.");
            return false;
        }
    }
}, false);




document.getElementById("worker-post").onclick = function () {
    let workerName = document.getElementById("worker-name").value;
    let workerEmail = document.getElementById("worker-email").value;

    const MESSAGE = {
        IMAGE: "Please add an image.", 
        NAME: "Please add your name.",
        EMAIL: "Please add a valid email."
    }

    let shouldipost = true;

    if (!newfile) {
        $("#imageError").remove();
        $("<p id='imageError'>" +   MESSAGE.IMAGE + "</p>").insertAfter("#workerImg");
        $("#imageError").css("color", "red");
        $("#imageError").css("font-size", "80%");

        shouldipost = false;
    } else {
        $("#imageError").remove();
    }

    if (!workerName || workerName === "") {
        $("#titleError").remove();
        $("<p id='titleError'>" + MESSAGE.NAME + "</p>").insertAfter("#worker-name");
        $("#titleError").css("color", "red");
        $("#titleError").css("font-size", "80%");

        shouldipost = false;
    } else {
        $("#titleError").remove();
    }

    if (!workerEmail || workerEmail === "" || !workerEmail.includes("@") || !workerEmail.includes(".")) {
        $("#emailError").remove();
        $("<p id='emailError'>" + MESSAGE.EMAIL + "</p>").insertAfter("#worker-email");
        $("#emailError").css("color", "red");
        $("#emailError").css("font-size", "80%");

        shouldipost = false;
    } else {
        $("#emailError").remove();
    }

    if (shouldipost) {
        db.collection("workerRegistration").doc(postId).set({
            "name": workerName,
            "email": workerEmail,
            "image": fullfilepath

        }).then(function () {
            if (newfile) {
                uploadImage(newfile, fileReference);        
            }
            refreshSearchResults();
            $("#worker-registration-form").hide();
            $("#featuredActivities").show();
        });        
    } else {
        console.log("error. did not upload");
    }


}