let photo = document.getElementById("image-container");

document.getElementById("filetoRead").addEventListener("change",function(){
    let file = this.files[0];
    
    if (file) {
        if ((file.type == 'image/png') || (file.type == 'image/jpg') || (file.type == 'image/jpeg')) {
            
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