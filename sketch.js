PLAY = 1;
END = 0;
gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage,f1,f2,f3, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime;

var restart,restartImage;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 f1 = loadImage("fruit1.png")
  f2 = loadImage("fruit2.png")
  f3 = loadImage("fruit3.png")
  
  restartImage = loadImage("restart.png")
  }



function setup() {
  createCanvas(600,200)

  ground = createSprite(10,200,900,10)
  ground.velocityX = -5
  
  
  monkey  = createSprite(100,150)
  monkey.addAnimation("running",monkey_running)
  monkey.scale =0.05
  
  
  survivalTime = 0;
  score = 0;

  
  restart  = createSprite(300,100.10,10)
  restart.addImage(restartImage)
  
  foodsGroup  = createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
  
  background("green");
  console.log(monkey.scale)
  if(gameState === PLAY){
  stroke("white")
  textSize(20)
  fill("white")
  
  stroke("black")
  textSize(20)
  fill("black")
    
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
    restart.visible = false;
      text("Survival Time "+survivalTime,200,20)
  text("Score "+score,400,20)
    
    
  if(keyDown("space")&&monkey.y >= 150 ){
    monkey.velocityY = -13;
  }
  
  if(ground.x>0){
    ground.x = ground.width/2
  }
  
  if(foodsGroup.isTouching(monkey)){
    score = score +1;
    monkey.scale += 0.01
    foodsGroup.destroyEach()
  }
  
   foods();
  obstacles();
     monkey.velocityY = monkey.velocityY + 0.8
  }
 
  if(obstaclesGroup.isTouching(monkey)){
    gameState = END;
  }
  if (gameState === END){
    monkey.visible = false;
    ground.velocityX = 0;
    obstaclesGroup.destroyEach();
    foodsGroup.destroyEach();
    obstaclesGroup.setVelocityXEach(0);
    foodsGroup.setVelocityXEach(0);
    restart.visible = true;
    text("Game Over",250,30,textSize(20),fill("black"))
  }
  
  if(mousePressedOver(restart)){
    reset();
  }
  monkey.collide(ground)
 
  
  
  drawSprites();
}

function foods(){
 if(frameCount % 120===0){ food = createSprite(610,50,10,10)
 food.velocityX = -4 
r = Math.round(random(1,4))
  if(r == 1){
 food.addImage(f1)
    food.scale = 0.1
  }
  
  if(r === 2){
    food.addImage(bananaImage)
    food.scale = 0.1
  }
  
  if(r===3){
    food.addImage(f2)
    food.scale = 0.2
  }
  
  if(r === 4){
    food.addImage(f3)
    food.scale = 0.2
  }
  
  food.y = Math.round(random(50,100))
  food.lifetime =160;
    foodsGroup.add(food)
 }
}

function obstacles(){
 if(frameCount%300===0){ 
   obstacle = createSprite(630,190,10,10)
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.1;
  obstacle.velocityX = -7;
   obstacle.lifetime = 300;
   
   obstaclesGroup.add(obstacle)
   }
}

function reset(){
  gameState = PLAY;
  
  obstaclesGroup.destroyEach();
  foodsGroup.destroyEach();
  
  monkey.visible = true;
  
  score = 0;
  survivalTime = 0;
}

