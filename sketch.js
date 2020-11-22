var ghost, ghostJump, ghostIdle;
var back, backgroundImg, backMusic;
var climber, climberImage;
var door,doorImage;
var doorGroup,climberGroup, invisibleBlock, invisibleGroup;
var gameState = "play"

function preload(){
  ghostJump = loadImage("ghost-standing.png");
  ghostIdle= loadImage("ghost-jumping.png");
  backgroundImg= loadImage("tower.png");
  climberImage= loadImage("climber.png");
  doorImage= loadImage("door.png");
}

function setup() {
  createCanvas(600,600)
  back = createSprite(300,20,20,20)
  back.addImage("backgroundImg", backgroundImg)
back.velocityY = 2;
  
  invisibleGroup = new Group();
  climberGroup = new Group();
  doorGroup = new Group();
  
  ghost = createSprite(300,350,20,20)
  ghost.addImage ("ghost",ghostIdle);
  ghost.scale = 0.4

}

function draw() {
  
     background("black")
  
  if (gameState === "play"){
    spawnDoors();
    
    if(keyDown("space")){
    ghost.velocityY = -8;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(keyDown("RIGHT_ARROW")){
    ghost.x = ghost.x + 10
  }
  
  if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x - 10
  }
  
    console.log(ghost.velocityY)
    
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
   }
    
    if(invisibleGroup.isTouching(ghost)){
      gameState = "end"
      ghost.destroy();
    }
    
  if (back.y>400 ){
    back.y = 20
  }
  
  }
  if(gameState === "end"){
   
    text("Game Over",300,500);
 
  }
  
  drawSprites();
}

function spawnDoors(){
  if(frameCount % 250 === 0){
      
    door = createSprite(Math.round(random(100,450)),20,20)
  door.depth = ghost.depth
    ghost.depth = ghost.depth + 1

    door.addImage("door",doorImage);
    door.velocityY = 2;
    climber= createSprite(door.x,65,20,20);
    climber.addImage("climber",climberImage)
    climber.velocityY = 2;
    invisibleBlock = createSprite(door.x,75,20,3)
    invisibleBlock.visible = false
    invisibleBlock.velocityY = 2;
    doorGroup.add (door);
    climberGroup.add(climber);
    invisibleGroup.add(invisibleBlock)
  }
  
}