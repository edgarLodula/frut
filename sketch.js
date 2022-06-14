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

function preload(){
  room=loadImage("background.png");
  melon=loadImage("melon.png");
  rabbit=loadImage("Rabbit-01.png");

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  eat.looping=false
  sad.looping=false
}

function setup(){
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  cut=createImg("cut_btn.png")
  cut.position(220,190)
  cut.size(60,60)
  cut.mouseClicked(drop)
  blink.frameDelay= 10
  eat.frameDelay=20
  sad.frameDelay=20
  rabbit2=createSprite(250,620,20,20)
  rabbit2.addAnimation('blinking',blink);  // começa com essa! 
  rabbit2.addAnimation('eating',eat);
  rabbit2.addAnimation('crying',sad);
  rabbit2.scale= 0.2  
  
  corda= new Rope(7,{x:250,y:200})
  fruta=Bodies.circle(250,350,15)
  Matter.Composite.add(corda.body,fruta)
  link=new frut (corda,fruta)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER)
  textSize(50);
}

function draw() {
  background(51);
  image(room,250,350,500,700);
  drawSprites();

  ground.show();
  corda.show();
  if(fruta!=null){
  image(melon,fruta.position.x,fruta.position.y,60,60);
}
  if(touch(fruta,rabbit2)){
    rabbit2.changeAnimation("eating")
  }
  if(touch(fruta,ground.body)){
    rabbit2.changeAnimation("crying")
  }
  Engine.update(engine);
}

function drop(){
  corda.break()
  link.Break()
  link=null
}
function touch(frut,sprite){
if(frut!=null){
  var d=dist(frut.position.x,frut.position.y, sprite.position.x,sprite.position.y)
if(d<=80){
  World.remove(world,frut)
  fruta=null
  return true
}else{
  return false
}
}
}
