stat = "";
song = "";
objects = [];

function preload() {
    song = loadSound("song.mp3");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 420);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";

}

function modelLoaded() {
    console.log("Model Loaded");
    stat = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);

    objects = results;

}

function draw() {

    image(video, 0, 0, 640, 420);


    if (stat != "") {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("#FF0000");
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person"){
                document.getElementById("baby_status").innerHTML = "Baby found!";
                song.stop();
            }
            else{
                document.getElementById("baby_status").innerHTML = "Baby not found!";
                song.play();
            }
           
           

        }
       
      
    }

}