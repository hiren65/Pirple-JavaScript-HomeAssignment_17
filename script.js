//alert();
let textBox ;
let timeInterval;

let btnApply = document.getElementById("btnApply");
btnApply.addEventListener("click",evokeNotification1);


function evokeNotification1() {
    timeInterval = setInterval(evokeNotification,1000);
}
function evokeNotification(){
    //existing date and time
    //alert(new Date());
    console.log("Time" + new Date().getTime());
    let nowTime = new Date().getTime();
    //input date and time
    let ttstr = document.getElementById("inputDateBox").value;
    console.log(ttstr);
    if (ttstr === ""){
        alert("please select date");
        clearInterval(timeInterval);
        return;
    }
    //alert("input time " + ttstr);
    let ttstr1 = document.getElementById("inputHoursBox").value;
    //alert("input time " + ttstr1);
    console.log("vvvvvv "+ ttstr1);
    if (ttstr1 === ""){
        alert("please select time and am/pm");
        clearInterval(timeInterval);
        return;
    }
    let temp =  ttstr1.split(":");
    console.log(temp[0]);


    let inputTime =  srtringToTimeStemp(ttstr,temp[0],temp[1]);
    console.log("myTime" + inputTime);

    if (nowTime>inputTime){
        setTimeout(myNotefication,1000);
        clearInterval(timeInterval);
    } else {
        console.log("wait for time to pass");
    }


}

function getMessage (){
    let tt = document.getElementById("inputBox");
    textBox = tt.value;
    if (textBox === ""){
        console.log("No input content!!");
        textBox = "No Input Content";
    }
    return textBox;
}

function myNotefication(){
    // Gets permission for notification and creates notification
    Notification.requestPermission().then(function (result) {
        console.log(result);
        //alert("Got Notification Permission");
        var notification = new Notification(getMessage());
        if (Notification.permission === "granted"){
            //alert("yes");
        }
    }).catch(function (err) {
        alert("See "+ err);
    });
}
function srtringToTimeStemp(str,hr,min) {

    let tt = new Date(str);
    let dd = tt.getDate();
    let mm = tt.getMonth();
    let yy = tt.getFullYear();
    let hh = hr;
    let mints = min;
    let ss = tt.getSeconds();
    // inbuilt function
    //var d = new Date(yy, mm, yy, hh, mints, ss, 0);
    var d1 = new Date(yy, mm, dd, 15, mints, ss, 0);
    console.log(d1);

    return d1.getTime();
}



