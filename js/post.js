let photo = document.getElementById("image-container");
let storageRef = storage.ref();
let fileRef;
let file;
let fullPath;
let newPostId = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9) + "/";
};
let postId = newPostId();

function uploadImage(file) {
    fileRef.put(file).then(function() {
        console.log("uploaded file");
    })
}


document.getElementById("filetoRead").addEventListener("change",function(){
    file = this.files[0];   
    if (file) {
        if ((file.type == 'image/png') || (file.type == 'image/jpg') || (file.type == 'image/jpeg')) {       
            fullPath = "Images/" + postId + file.name;
            fileRef = storageRef.child(fullPath);

            let reader = new FileReader();
            reader.onload = function (e) {
                photo.style.backgroundImage = "url('" + e.target.result + "')";
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




document.getElementById("post").onclick = function () {
    uploadImage(file);
    
    let activityName = document.getElementById("activityName").value;
    let desc = document.getElementById("description").value;
    db.collection("activities").doc(fullPath).set({
        "title": activityName,
        "description": desc,
        "image": fullPath
    }).then(function () {
        setTimeout(function () {
            refreshSearchResults();
            hideElement("post-form");
            console.log("successfully added");            
        }, 4000)

    });
}

document.getElementById("testButton").onclick = function () {
    let postId = newPostId();
    console.log(postId);
}

function refreshSearchResults() {
    clearSearchResults();
    getSearchResults(["activities"]);
    autocomplete(document.getElementById("myInput"), search);
    
}

document.getElementById("post-link").onclick = function () {
    clearForm();
    hideElement("featuredActivities");
    showElement("post-form");
}

function clearForm() {
    photo.style.backgroundImage = "url('images/img_placeholder.png')";
    document.getElementById("activityName").value = "";
    document.getElementById("description").value = "";
}