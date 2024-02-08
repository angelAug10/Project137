objects=[];
status_1="";
function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
}

function start(){
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status:Detecting Objects";
object_name=document.getElementById("object_name").value;

}
function modelLoaded(){
console.log ("modelLoaded");
status_1=true;
}
function gotResult(error,results){
if(error){
console.log(error);
}
console.log (results);
objects=results;
}
function draw(){
image(video,0,0,480,380);
if(status_1!="")
{
objectDetector.detect(video,gotResult);
for(i=0;i<objects.length;i++){
document.getElementById("status").innerHTML="Status:Objects Detected";
document.getElementById("number_of_objects").innerHTML="Number of objects detected are:"+objects.length;
fill("#FF0000");
percent=floor(objects[i].confidence*100);
text(objects[i].label +" "+percent+"%",objects[i].x+15,objects[i].y+15);
noFill();
stroke("#FF0000");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

if(objects[i].label==object_name)
{
video.stop();
objectDetector.detect(gotResult);
document.getElementById("object_status").innerHTML=object_name+"Found";
syth=window.speechSynthesis;
utterThis=new SpeechSynthesisUtterance(object_name+"found");
syth.speak(utterThis);
}
else{
document.getElementById("object_status").innerHTML=object_name+"Not Found";

}
}
}
}
