let photo = document.getElementById("image-container");
let storageRef = storage.ref();
let fileRef;

document.getElementById("filetoRead").addEventListener("change",function(){
    let file = this.files[0];

    console.log(file.name);
    
    if (file) {
        if ((file.type == 'image/png') || (file.type == 'image/jpg') || (file.type == 'image/jpeg')) {
        
            fileRef = storageRef.child("Images/" + file.name);

            uploadImage(file);

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


function uploadImage(f) {
    fileRef.put(f).then(function() {
        console.log("uploaded file");
    })
}