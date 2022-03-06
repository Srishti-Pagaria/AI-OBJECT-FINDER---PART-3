status = "";
video = "";
objects = [];
input = "";
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}
function draw(){
    image(video, 0, 0, 480, 380);
        if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i=0; i<objects.length; i++){
            percent = floor(objects[i].confidence*100);
            label = objects[i].label;           fill("#FF0000");
            text(objects[i].label + "" + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            }
        }
    }

function start(){
    input = document.getElementById("input").value;
    if(label==input){
    video.stop();
    objectDetector.detect(gotResults);
    document.getElementById("number_of_objects").innerHTML = "Number of objects detected = " + objects.length;
    document.getElementById("status").innerHTML = input + "Found";
    synth = window.SpeechSynthesis;
    speak_data = input
    utterThis = new SpeechSynthesisUtterance(speak_data);
    speak(utterThis);
    
    }
    else{
    document.getElementById("status").innerHTML = "Object mentioned not found";
    objectDetector.detect(video, gotResults);
    document.getElementById("number_of_objects").innerHTML = "Number of objects detected = " + objects.length;
    }
    
   
}
function modelLoaded(){
    console.log("Model loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}