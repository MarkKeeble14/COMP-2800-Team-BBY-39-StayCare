let activities = [];

// Load all signed up activities from user database
window.onload = function () {

    $("<div class='myActivity'></div>").appendTo("#myActivitiesDiv");
    $(".myActivity").css("width", "80%");
    $(".myActivity").css("margin", "5% auto");
    $(".myActivity").css("padding", "5%");
    $("<div class='myActivity-body'></div>").appendTo(".myActivity");

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            db.collection("users").doc(user.uid).get().then(function (snap) {
                snap.data().myActivities.forEach(function (myActivity) {
                    appendToActivities(myActivity);
                })
            })

        }
    })

}

document.getElementById("loadActivities").onclick = function () {
    activities.forEach(activity => showMyActivity(activity));
}

function appendToActivities(activity) {
    $("<h4 class='myActivity-title'>" + activity.title + "</h4>").appendTo(".myActivity-body");
    $("<p class='myActivity-text'>" + activity.description + "</p>").appendTo(".myActivity-body");

    let scheduledTime = getWrittenDate(activity.time);
    let timeHtml = "<p class='myActivity-text'>Scheduled for: " + scheduledTime.time + " on " + scheduledTime.date + "</p>";
    $(timeHtml).appendTo(".myActivity-body");

    $("<p class='myActivity-text'>Room Size: " + activity.size + " spots</p>").appendTo(".myActivity-body");
}

function getWrittenDate(dateString) {


    let hour = parseInt(dateString.substr(0, 1));
    let ampm = "AM";
    if (hour > 12) {
        hour -= 12;
        ampm = "PM";
    }
    let minutes = dateString.substr(3, 3);
    let time = hour + ":" + minutes + " " + ampm;

    let monthNum = parseInt(dateString.substr(6, 7));
    const MONTHS = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let monthName = MONTHS[monthNum - 1];

    let day = parseInt(dateString.substr(9, 10));

    let year = parseInt(dateString.substr(12, 15));

    let date = monthName + " " + day + ", " + year;


    return {
        date: date,
        time: time
    }

}