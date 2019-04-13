//alert();

let btnApply = document.getElementById("btnApply");
btnApply.addEventListener("click",evokeNotification);

function evokeNotification(){
    // Gets permission for notification and creates notification
    Notification.requestPermission().then(function (result) {
        console.log(result);
        //alert("Got Notification Permission");
        var notification = new Notification("Hi there! My First Sample Notification");
        if (Notification.permission === "granted"){
            alert("yes");
        }
    }).catch(function (err) {
        alert("See "+ err);
    });
}
