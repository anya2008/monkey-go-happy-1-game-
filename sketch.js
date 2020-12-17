
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var gameState ="PLAY";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
obstacleGroup = createGroup();
bananaGroup = createGroup();

  monkey = createSprite(80,330)  
  monkey.addAnimation("abc",monkey_running);
  monkey.scale = 0.2

   invisiGround = createSprite(300,385,600,7);
  invisiGround.visible = true;
}


function draw() {
  background(220);
  monkey.collide(invisiGround);
  
  text("SCORE :" + score , 300,50)
  
  if (gameState === "PLAY"){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/100);
    
    
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    
    if (monkey.isTouching(bananaGroup)){
      score++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = "END";
    }
    
  }
  
  if (gameState === "END"){
    invisiGround.velocityX = 0;
  
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }   
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      score = 0;
      gameState = "PLAY"; 
    }
    
    drawSprites();
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(400,120, 50, 50 )
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;     
    banana.velocityX = -5
    banana.lifetime = 220;
    bananaGroup.add(banana);
  

    
  }
  

  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(400,360,50,50);
    obstacle.addImage("rock", obstacleImage);
    
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -4;
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}


  
