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
var rabbit,rabbit2
function preload(){
  room=loadImage("background.png")
  melon=loadImage("melon.png")
  rabbit=loadImage("Rabbit-01.png")
}
function setup() 
{

  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  cut=createImg("cut_btn.png")
  cut.position(220,190)
  cut.size(60,60)
  cut.mouseClicked(drop)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER)
  textSize(50)
rabbit2=createSprite(250,620,20,20)
rabbit2.addImage(rabbit)
rabbit2.scale= 0.2  
  corda= new Rope(7,{x:250,y:200})
  fruta=Bodies.circle(250,350,15)
  Matter.Composite.add(corda.body,fruta)
  link=new frut (corda,fruta)
}

function draw() 
{
  background(51);
  image(room,250,350,500,700)
  drawSprites()
  ground.show();
  corda.show();
  image(melon,fruta.position.x,fruta.position.y,60,60)
  Engine.update(engine);
  

 
   
}
function drop(){
  corda.break()
  link.Break()
  link=null
}
