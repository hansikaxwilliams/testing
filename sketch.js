const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var snowman,snowfalkes;
var backgroundImg,platform;
var slingshot;

var gameState = "onSling";
var bg = "snow1.jpg";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = Engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    snowflake1 = new Box(700,320,70,70);
    snowflake2 = new Box(920,320,70,70);
    snowflake3 = new Pig(810, 350);
    snowflake4 = new Log(810,260,300, PI/2);

    snowflake5 = new Box(700,240,70,70);
    snowflake6 = new Box(920,240,70,70);
    snowflake7 = new Pig(810, 220);

    snowflake8 =  new Log(810,180,300, PI/2);

    snowflake9 = new Box(810,160,70,70);
    snowflake10 = new Log(760,120,150, PI/7);
    snowflake11 = new Log(870,120,150, -PI/7);

    snowman = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    snowflake1.display();
    snowflake2.display();
    ground.display();
    snowflake3.display();
    snowflake4.score();
    snowflake5.display();

    snowflake6.display();
    snowflake7.display();
    snowflake8.display();
    snowflake9.score();
    snowflake10.display();

    snowflake11.display();
    snowflake12.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
if (gameState!=="launched"){
        Matter.Body.setPosition(snowman.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && snowman.body.speed < 1){
        snowman.trajectory=[];
        Matter.Body.setPosition(snowman.body,{x:200,y:50});
       slingshot.attach(snowman.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "snow1.jpg";
    }
    else{
        bg = "snow2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}