let activityDocs = [];

function getActivities() {   
    db.collection("activities").get()
    .then(function (snap) {      
        snap.forEach(function (doc) {
            activityDocs.push(doc);
        });
    }).then(function () {  
        showFeaturedActivities();      
    })
}

function showFeaturedActivities() {
    for (let i = 0; i < 5; i++) {
        let id = "#featured" + (i + 1);
        let data = activityDocs[i].data();
        let path = data.image;
        let thisDate = getWrittenDate(data.time);
        let sched = "Scheduled for: " + thisDate.time + " on " + thisDate.date; 
        let size = "Room Size: " + data.size + " spots";
        storageRef.child(path).getDownloadURL().then(function(url) {
            $(id + " img").attr("src", url);
            $(id + " .activityInfo .title").text(data.title);
            $(id + " .activityInfo .description").text(data.description);
            $(id + " .activityInfo .schedule").text(sched);
            $(id + " .activityInfo .roomSize").text(size);
        }).catch(function(error) {
            console.log("error getting download url");
        });
    }
}



getActivities();

