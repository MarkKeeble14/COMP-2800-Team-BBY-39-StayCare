let activityDocs = [];

function getActivities() {   
    db.collection("activities").get()
    .then(function (snap) {      
        snap.forEach(function (doc) {
            activityDocs.push(doc);
        });
    }).then(function () {
        console.log(activityDocs[0].id)        
    })  
}

//getActivities();


/*
for (let i = 1; i <= 5; i++) {
    $(("featured" + i) > img).attr("src", "first.jpg")
}*/