


function toggle() {
    var signup = document.getElementById('signupForm');
    signup.classList.toggle('active');
}

var workerReg = firebase.database().ref('workerReg');

//This is writing to the database
document.getElementById('workerReg').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    
    var name = getInputVal('name');
    var email = getInputVal('email');
    var img = getInputVal('img');

    saveReg(name, email, img);

}

function getInputVal(id) {
    return document.getElementById(id).value;
}

//Saves to firebase
function saveReg(name, email, img) {
    var newWorkerReg = workerReg.push();
    newWorkerReg.set({
        name: name,
        email: email,
        img: img
    });
}