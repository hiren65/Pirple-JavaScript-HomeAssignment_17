//alert();
let textBox ;
let timeInterval;

let divMain = document.getElementById("list");
let xx = document.createElement("UL");
xx.setAttribute("id","ul");
divMain.appendChild(xx);

let myId  = 0;


let btnApply = document.getElementById("btnApply");
btnApply.addEventListener("click",evokeNotification1);


function evokeNotification1() {
    /*let nowTime = new Date().getTime();
    console.log("Now Time" + nowTime );
    let input = srtringToTimeStemp();
    let ttstr = document.getElementById("inputDateBox").value;
    let ttstr1 = document.getElementById("inputHoursBox").value;
    let temp =  ttstr1.split(":");
    console.log(temp[0]);
    let inputTime =  srtringToTimeStemp(ttstr,temp[0],temp[1]);
    console.log("input myTime" + inputTime);*/
    evokeNotification();
    //timeInterval = setInterval(evokeNotification,1000);
}
function evokeNotification(){
    //existing date and time
    //alert(new Date());
    console.log("Now Time" + new Date().getTime() );
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
    console.log("input myTime" + inputTime);
    createTemplate(xx ,inputTime,getMessage());

    if (nowTime>inputTime){
        setTimeout(myNotefication,1000);
        clearInterval(timeInterval);
    } else {
        console.log("wait for time to pass");
    }


}
//get message from input text for notification
function getMessage (){
    let tt = document.getElementById("inputBox");
    textBox = tt.value;
    if (textBox === ""){
        console.log("No input content!!");
        textBox = "No Input Content";
    }
    return textBox;
}
//create notification function
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
//convert date string and hours:minutes in to time stamp
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
    var d1 = new Date(yy, mm, dd, hh, mints, ss, 0);
    console.log(d1);

    return d1.getTime();
}



// Creating List of timestamp for notification
function createTemplate(el,str,message) {
    myId++;
    let yy = document.createElement("LIST");
    yy.setAttribute("class","myList");
    el.appendChild(yy);
    yy.innerHTML = `
                        <span class="timeStamp">${str}</span> 
                        <span class="message">&nbsp  ${ message} </span>
                        <input type="button" value="x" id="crossBtn${myId}"><br>
                        
                   `;
}



