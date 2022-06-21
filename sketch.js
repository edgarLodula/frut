const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var corda;
var fruta;
var link
var room;
var melon;
var cut;
var rabbit,rabbit2;
var blink,eat,sad;

var bk_song;  // SOM DO BG
var cut_sound;  // SOM CORTANTO A CORDA
var sad_sound;  // SOM TRISTE
var eating_sound; // SOM COMENDO
var air;  /// SOM DO AR

var balao
var mute
var corda2
var botao2
var link2

var canH, canW

function preload(){
  room=loadImage("background.png");
  melon=loadImage("melon.png");
  rabbit=loadImage("Rabbit-01.png");

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  eat.looping=false
  sad.looping=false
}

function setup(){
  //createCanvas(500,700);
  var mobile= /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(mobile){
    createCanvas(displayWidth+80,displayHeight)
    canH=displayHeight
  }
  else{
    createCanvas(windowWidth,windowHeight)
    canH=windowHeight
  }
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH-40,600,20);

  blink.frameDelay= 10;
  eat.frameDelay=20;
  sad.frameDelay=20;
  rabbit2=createSprite(400,canH-160,20,20);
  rabbit2.addAnimation('blinking',blink);  // começa com essa! 
  rabbit2.addAnimation('eating',eat);
  rabbit2.addAnimation('crying',sad);
  rabbit2.scale= 0.2; 
  
  //botão 1
  cut=createImg("cut_btn.png");
  cut.position(220,190);
  cut.size(60,60);
  cut.mouseClicked(drop);
  //botão 2
  botao2=createImg("cut_btn.png");
  botao2.position(50,190);
  botao2.size(60,60);
  botao2.mouseClicked(drop2);
  //balão
  balao= createImg("balloon.png");
  balao.position(50,350);
  balao.size(100,100);
  balao.mouseClicked(vento);
  //mute
  mute=createImg("mute.png");
  mute.position(400,50);
  mute.size(50,50);
  mute.mouseClicked(playPl);
  
  corda= new Rope(7,{x:250,y:200});
  corda2= new Rope(4,{x:90,y:210});
  
  fruta=Bodies.circle(250,350,15);
  Matter.Composite.add(corda.body,fruta);

  link=new frut (corda,fruta);
  link2= new frut (corda2,fruta);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);
}

function draw() {
  background(51);
  image(room,250,350,displayWidth+80,displayHeight);
  drawSprites();

  ground.show();
  corda.show();
  corda2.show();
  if(fruta!=null){
    image(melon,fruta.position.x,fruta.position.y,60,60);
  }
  if(touch(fruta,rabbit2)){
    rabbit2.changeAnimation("eating");
    eating_sound.play();
  }
  //if(touch(fruta,ground.body)){
    if(fruta!=null && fruta.position.y>=650) {
    rabbit2.changeAnimation("crying");
    fruta=null;
    sad_sound.play();
    sad_sound.setVolume(0.5);
  }
  Engine.update(engine);

}

function drop(){
  corda.break();
  link.Break();
  link=null;
  cut_sound.play();
}

function drop2(){
  corda2.break();
  link2.Break();
  link2=null;
  cut_sound.play();
}

function touch(frut,sprite){
  if(frut!=null){
    var d=dist(frut.position.x,frut.position.y, sprite.position.x,sprite.position.y)
    if(d<=80){
      World.remove(world,frut);
      fruta=null;
      return true;
    }else{
      return false;
    }
  }
}

function vento(){
  Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.02,y:0})
  air.play();
}

function playPl(){
  if(bk_song.isPlaying()){
    bk_song.stop();
  }
  else{
    bk_song.play();
  }
}