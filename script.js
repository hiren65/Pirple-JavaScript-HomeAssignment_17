//alert();
let textBox ;

let btnApply = document.getElementById("btnApply");
btnApply.addEventListener("click",evokeNotification);

function evokeNotification(){
    alert(new Date());
    console.log(new Date().getTime());
    let nowTime = new Date().getTime();
    
    setTimeout(myNotefication,2000);
}

function getMessage (){
    let tt = document.getElementById("inputBox");
    textBox = tt.value;
    return textBox;
}

function myNotefication(){
    // Gets permission for notification and creates notification
    Notification.requestPermission().then(function (result) {
        console.log(result);
        //alert("Got Notification Permission");
        var notification = new Notification(getMessage());
        if (Notification.permission === "granted"){
            alert("yes");
        }
    }).catch(function (err) {
        alert("See "+ err);
    });
}

