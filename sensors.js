import {makePost, setActivity} from"./utils.js";


var accelerometer = new LinearAccelerationSensor({frequency: 1});

function start(){

    let at = document.getElementById("at").value;
    let url = "http://iot.imei.uz.zgora.pl:80/api/v1/" + at + "/telemetry";


    accelerometer.start();


    accelerometer.onreading = () => {
        let x = Number(accelerometer.x.toFixed(5));
        let y = Number(accelerometer.y.toFixed(5));
        let z = Number(accelerometer.z.toFixed(5));

        document.getElementById("x").innerHTML = x;
        document.getElementById("y").innerHTML = y;
        document.getElementById("z").innerHTML = z;
        
        let telemetry = {x: x, y:y, z:z };
        let activity = setActivity(x,y,z);
        let status = {edgeStatus: activity};
        
        makePost(url, JSON.stringify(telemetry));

        makePost(url, JSON.stringify(status));
        document.getElementById("status").innerHTML = activity;
    };


    accelerometer.onerrror = (event) => {

        console.log(event.error.name, event.error.message);
        document.getElementById("error_name").innerHTML = 
        "Error Name: " + event.error.name;
        document.getElementById("error_message").innerHTML = 
        "Error Message" + event.error.message;
    };

}

function stop(){
    accelerometer.stop();
}

var startbtn = document.getElementById('start');
if(startbtn){
    startbtn.addEventListener('click', start, false);
}

var stopbtn = document.getElementById('stop');
if(startbtn){
    startbtn.addEventListener('click', stop, false);
}
