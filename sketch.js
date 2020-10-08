var player,player_running;
var backImage,backgr;
var bananaImg;
var obstacleImg;
var score=0;
var obstacleGroup;
var foodGroup;


function preload(){
player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
   
  backImage=loadImage("jungle.jpg");

  bananaImg=loadImage("banana.png");
  
  obstacleImg=loadImage("stone.png");
  
}

function setup() {
  createCanvas(800, 400);
  backgr=createSprite(0,0,800,400);
  backgr.addImage("background",backImage);
  player=createSprite(100,350,20,50);
  player.addAnimation("player",player_running);
  player.scale=0.1;
  score=0;
  foodGroup=new Group();
  obstaclesGroup=new Group();
  ground=createSprite(400,390,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
}

function draw() {
  background(220); 
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 200,50);
  if(ground.x<0){
     ground.x=ground.width/2;
  }
   if(backgr.x<100){
     backgr.x=backgr.width/2;
  }
  backgr.velocityX=-(6+3*score/100);
  if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score = score + 2;
    var rand = Math.round(random(1,6));
    switch(score) {
     case 10: player.scale=0.2;
              break;
     case 20: player.scale=0.4;
               break;
       case 30: player.scale=0.16;
               break;
       case 40: player.scale=0.18;
              break;
       case 50:player.scale=0.20;
               break;
       case 60: player.scale=0.22;
               break;
       default: break;
     }
  }
   if(keyDown("space")) {
    player.velocityY = -12;
  }
   player.velocityY = player.velocityY + 0.8
   if (backgr.x < 0){
    backgr.x = backgr.width/2;
  }
  spawnFood();
  spawnObstacles();
  if(obstaclesGroup.isTouching(player)){
   player.scale=0.08; 
  }
  if(obstaclesGroup.isTouching(player)){
   backgr.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0); 
     obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);  
  }
player.debug=true;
  player.collide(ground);
drawSprites();                        
}
function spawnFood () {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var food= createSprite(600,280,40,10);
    food.y = Math.round(random(80,120));
    food.addImage(bananaImg);
    food.scale = 0.05  ;
    food.velocityX = -3;
    //generate random food
    
    //assign lifetime to the variable
    food.lifetime = 200;
    //add each cloud to the group
    foodGroup.add(food);
 }
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,350,10,40);
    obstacle.addImage("obstacle",obstacleImg);
    obstacle.velocityX = -4;
    obstacle.scale=0.2 ;
    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}