import {makePost, setActivity} from"./utils.js";


var accelerometer = new LinearAccelerationSensor({frequency: 1});

function start(){

    let at = document.getElementById("at").value;
    let url = "http://iot.imei.uz.zgora.pl/dashboard/45efc6e0-d302-11ec-ac8e-9594c052208d?publicId=025efec0-d305-11ec-ac8e-9594c052208d" + at + "/telemetry";


    accelerometer.start();


    accelerometer.onreading = () => {
        let x = Number(accelerometer.x.toFixed(5));
        let y = Number(accelerometer.y.toFixed(5));
        let z = Number(accelerometer.z.toFixed(5));

        document.getElementById("x").innerHTML = x;
        document.getElementById("y").innerHTML = y;
        document.getElementById("z").innerHTML = z;
        
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

document.getElementById("Start").addEventListener("click",start,false);
document.getElementById("stop").addEventListener("click",stop,false)