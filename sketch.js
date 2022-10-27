
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


var bg_Img;
var ghost, ghostImg;
var happyImg;

var ground;

var candyImg;
var candy;

var star, starImg;
var starDisplay;
var emptyStardisplay, emptyStarImg;

var rope1, rope2;
var candy_con, candy_con2;

var button;


function preload() {
  bg_Img = loadImage("background_Img.jpg");
  ghostImg = loadImage("ghostImg.png");
  happyImg = loadImage("happy_ghostImg.png");
  candyImg = loadImage("candyImg.png");
  balloonImg = loadImage("balloonImg.png");
  emptyStarImg = loadImage("emptyStarImg.png");
  starImg = loadImage("starImg.png");

}

function setup() {
  createCanvas(600,600);

  engine = Engine.create();
  world = engine.world;
  
  //creating the buttons
  button1 = createImg('cutbtnImg.png');
  button1.position(20,170);
  button1.size(40,40);
  button1.mouseClicked(drop1);

  button2 = createImg('cutbtnImg.png');
  button2.position(350,170);
  button2.size(40,40);
  button2.mouseClicked(drop2);

  //creating the star display
  emptyStardisplay = createImg('emptyStarImg.png');
  emptyStardisplay.position(10,10);
  emptyStardisplay.size(55,55);

  //creating the ropes
  rope1 = new Rope(7,{x:35,y:180});
  rope2 = new Rope(8, {x:375,y:180});

  //creating the ground
  ground = new Ground(300,600,width,20);

  //creating the ghost
  ghost = Bodies.rectangle(450,530);

  //creating the star
  star = Bodies.rectangle(500,350);

  //creating the candy
  candy = Bodies.circle(200,200,20)
  Matter.Composite.add(rope1.body,candy);

  candy_con = new Link(rope1,candy);
  candy_con2 = new Link(rope2,candy);

  //creating balloon
  balloon = createImg('balloonImg.png');
  balloon.position(40,400);
  balloon.size(60,60);
  balloon.mouseClicked(air);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

}

function draw()
{
  background(51);
  image(bg_Img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(candy!=null){
    image(candyImg,candy.position.x,candy.position.y,60,60);
  }
  image(ghostImg,ghost.position.x,ghost.position.y,125,125);
  image(starImg,star.position.x,star.position.y,50,50);
  pop();


  rope1.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  //collision of candy and ghost
  if(collide(candy,ghost,70)==true)
  {
    World.remove(engine.world,candy);
    World.add(engine.world, ghost);
    candy = null;
    happyGhost = createImg('happy_ghostImg.png');
    happyGhost.position(400,465);
    happyGhost.size(140,140);
  }

  //collision of candy and star
  if(collide(candy,star,40)==true)
  {
    World.add(engine.world, star);
    emptyStardisplay.remove();
    starDisplay = createImg('starImg.png');
    starDisplay.position(10,10);
    starDisplay.size(55,55);
  }

  
}

//collision function
function collide(bodyA,bodyB,x)
{
  if(bodyA!=null)
        {
         var d = dist(bodyA.position.x,bodyA.position.y,bodyB.position.x,bodyB.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

//breaking the 1st rope
function drop1() {
  rope1.break();
  candy_con.dettach();
  candy_con = null; 
}

//breaking the 2nd rope
function drop2() {
  rope2.break();
  candy_con2.dettach();
  candy_con2 = null;
}

function air() {
  Matter.Body.applyForce(candy,{x:0,y:0},{x:0.05,y:0});
}
