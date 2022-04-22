function preload(){
classifier = ml5.imageClassifier("DoodleNet");
}
function setup(){
canvas = createCanvas(350, 400);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
synth = window.speechSynthesis;
}
function draw(){
strokeWeight(13);
stroke(0);
if (mouseIsPressed) {
    line(pmouseX,pmouseY,mouseX,mouseY);
}
}
function clearcanvas(){
    background("white");
}
function classifyCanvas(){
    classifier.classify(canvas,gotresults);
}
function gotresults(error, results){
    if (error) {
        console.error(error);
    } else {
        console.log(gotresults);
        document.getElementById("sketch").innerHTML = "Sketch: " + results[0].label;
        document.getElementById("confidence").innerHTML = "Confidence: " + Math.round(results[0].confidence*100)+"%";
        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}