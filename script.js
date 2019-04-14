//alert();
let textBox ;
let timeInterval;
let arrForStorage = [];
let objForSore = {};
let status = true;

let divMain = document.getElementById("list");
let xx = document.createElement("UL");

xx.setAttribute("id","ul");
xx.setAttribute("class","collection");
divMain.appendChild(xx);

let myId  = 0;

//clearData();
createListFromStorage();
//console.log("xx "+ xx.children);
let btnApply = document.getElementById("btnApply");
btnApply.addEventListener("click",evokeNotification1);
timeInterval = setInterval(evokeNotification,1000);

function evokeNotification1() {
    clearInterval(timeInterval);
    timeInterval = setInterval(evokeNotification,1000);
    createListOfNotification();
    //retriveData();
    //clearData();

    //evokeNotification();
    //timeInterval = setInterval(evokeNotification,1000);
}
function evokeNotification(){
    if (arrForStorage === null){
        clearInterval(timeInterval);
        return;
    }
    if (arrForStorage.length === 0){
        clearInterval(timeInterval);
    }
    if (arrForStorage.length>0){
        let aaarr = [];
        for (let i=0;i<arrForStorage.length;i++){
            if (arrForStorage[i].status === true){
                aaarr.push(arrForStorage[i]);
            }
        }
        if (aaarr.length === 0){
            clearInterval(timeInterval);
        }
    }
    //existing date and time
    //alert(new Date());
    console.log("Now Time" + new Date().getTime() );
    let nowTime = new Date().getTime();
    //input date and time
    /*let ttstr = document.getElementById("inputDateBox").value;
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
    //storing Data
    //storeData(inputTime);
    createTemplate(xx ,inputTime,getMessage());*/
    for (let i=0;i<arrForStorage.length;i++){
       let  inputTime = arrForStorage[i].time;
        if (nowTime>inputTime){
            if (arrForStorage[i].status === true){
                setTimeout(myNotefication,1000);
                //clearInterval(timeInterval);
                arrForStorage[i].status = false;
                storeData(arrForStorage);
                update(i);
            }

        } else {
            console.log("wait for time to pass");
        }
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
function createTemplate(el,str,message,stat) {
    myId++;
    let yy = document.createElement("LIST");
    yy.setAttribute("class","myList");
    el.appendChild(yy);
    yy.innerHTML = `
                        <span class="timeStamp collection1">${str}</span> 
                        <span class="message collection1">&nbsp  ${ message} </span>
                        <span class="status" id="bull${myId}" > &nbsp ${stat}</span>
                        <input type="button" class="collection1" value="x" id="crossBtn${myId}"><br>
                        
                   `;
}
function createObj(aa,bb,cc){
    return {
        time: aa,
        msg: bb,
        status:cc,
    };
}

function storeData(data) {
    console.log("check updated array "+data);
    localStorage.set('myKey',data);
    console.log("value" + localStorage.keys());
    console.log("get" + localStorage.getItem("myKey"));
}
function retriveData(){
    var getArr = localStorage.getItem("myKey");
    console.log("what got "+getArr);
}
function clearData() {
    localStorage.clear();
    console.log("Data Length " +localStorage.length );
}

///////////////////create list of notification /////////////////
function createListOfNotification() {
    let mes = getMessage();

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
    console.log("input myTime" + inputTime +" mes "+mes);
    let newObj = createObj(inputTime,mes,status);
    if (arrForStorage === null){
        arrForStorage = [];
    }
    arrForStorage.push(newObj);
    console.log("arrForStorage time "+ arrForStorage[0].time + " msg "+
                arrForStorage[0].msg);
    storeData(arrForStorage);
    createTemplate(xx,inputTime,mes,status);
}

function createListFromStorage(){
    arrForStorage = [];
    let storageLen = localStorage.length;
    console.log("storage len " + storageLen);
    if (storageLen === 0){
        console.log("nothing in storage forlist");
        return ;
    }
    let hh = localStorage.getItem("myKey");
    arrForStorage = JSON.parse(hh);
    console.log( "arr " +arrForStorage.length);
    if ( arrForStorage.length === 0){
        console.log("array is null");return;
    }
    console.log("get item array time " + arrForStorage[0].time + " msg "+arrForStorage[0].msg);
    for (let i=0;i<arrForStorage.length;i++){
        createTemplate(xx,arrForStorage[i].time,arrForStorage[i].msg,arrForStorage[i].status);
    }

}
////////////
//remove item from the list
let xxxx = document.getElementById("ul");
for (let i=0;i< xxxx.children.length;i++){
    console.log("xxxx child tag " + xxxx.children[i].children[3].tagName);
    let jjj = document.getElementById(xxxx.children[i].children[3].id);
    jjj.addEventListener("click",function () {
        console.log("click " + i);
        jjj.parentNode.remove(jjj);
        arrForStorage.splice(i,1);
        storeData(arrForStorage);

    });
}
/////////////////
function update(i){
    let xxxx = document.getElementById("ul");
    //for (let i=0;i< xxxx.children.length;i++){
        console.log("xxxx child tag " + xxxx.children[i].children[2].tagName);
        let jjj = document.getElementById(xxxx.children[i].children[2].id);
        jjj.innerText = false;
    //}
}
