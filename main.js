NoseX = 0;
NoseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);
    
    canvas = createCanvas(550, 550);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    background('#969A97');
    fill('#F90093');
    stroke('#F90093');
    square(NoseX, NoseY, difference);

    document.getElementById("square_size").innerHTML = difference + "px";
}

function modelLoaded() {
    console.log("model loaded!");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        NoseX = results[0].pose.nose.x;
        NoseY = results[0].pose.nose.y;

        console.log("NoseX = " + NoseX + " NoseY = " + NoseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);

        console.log("LeftWristX = " + leftWristX + " RightWristX = " + rightWristX + " difference = " + difference);
    }
}