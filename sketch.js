var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;
var mejorDistancia;
mejorDistancia= 0;
var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;
var reset, resetImg;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("depositphotos_184889030-stock-illustration-horizontal-asphalt-roads.jpg");
  mainRacerImg1 = loadAnimation("png-transparent-hand-painted-cartoon-bike-ride-people-cycling-hand-painted-bike-bike-picture-1.png");
  mainRacerImg2= loadAnimation("png-transparent-hand-painted-cartoon-bike-ride-people-cycling-hand-painted-bike-bike-picture-1.png");
  
  oppPink1Img = loadAnimation("png-transparent-hand-painted-cartoon-bike-ride-people-cycling-hand-painted-bike-bike-picture.png");
  oppPink2Img = loadAnimation("kisspng-transportation-trivia-test-walkbike-info-5bd0eb807719e2.5575642915404184324879.jpg");
  
  oppYellow1Img = loadAnimation("4680.png_860.png");
  oppYellow2Img = loadAnimation("3214.png_860.png");
  
  oppRed1Img = loadAnimation("3214.png_860.png");
  oppRed2Img = loadAnimation("25959570-ilustración-vectorial-de-dibujos-animados-ciclista-1.jpg");
  
  resetImg = loadImage ("up-arrow-google.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// Fondo en movimiento
path=createSprite(0,150);
path.addImage(pathImg);
path.velocityX = -5;
path2=createSprite(400,150);
path2.addImage(pathImg);
path2.velocityX = -5;
path3=createSprite(800,150);
path3.addImage(pathImg);
path3.velocityX = -5;
path4=createSprite(1200,150);
path4.addImage(pathImg);
path4.velocityX = -5;

//crear el niño que corre
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
mainCyclist.setCollider("circle",30,30);
//establece el colisionador para el mainCyclist

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
  reset = createSprite (650,200,20,20);
  reset.addImage (resetImg, "resetear");
  reset.scale = 0.3
  reset.visible = false;
  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distancia: "+ distance,200,30);
  textSize(20);
  fill(255);
  text("Distancia: "+ mejorDistancia,350,30);
  
  if(gameState===PLAY){
    gameOver.visible = false;
    reset.visible = false;
   distance = distance + Math.round(getFrameRate()/50);
    path.velocityX = -(6 + 2*distance/150);
    path2.velocityX = -(6 + 2*distance/150);
    path3.velocityX = -(6 + 2*distance/150);
    path4.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //código para reiniciar el fondo
  if(path.x < 0 ){
    path.x = 200
  }
  if(path2.x < 300 ){
    path2.x = 400;
  }
  if(path3.x < 700 ){
    path3.x = 800;
  }
  if(path4.x < 1100 ){
    path4.x = 1200;
  }
    
    //código para reproducir el sonido de la campana del ciclista
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //crear jugadores oponentes de forma continua
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    //Agrega aquí el código para mostrar la instrucción de reinicio del juego, en forma de texto
  
  
    path.velocityX = 0;
    path2.velocityX = 0;
    path3.velocityX = 0;
    path4.velocityX = 0;
  
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
   
  reset.visible = true;

    if(mousePressedOver (reset)){
      reseteo();
    }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function reseteo (){
      gameState= PLAY;
  pinkCG.destroyEach ();
  yellowCG.destroyEach();
  redCG.destroyEach();
  mainCyclist.addAnimation("ok",mainRacerImg1);
  if (distance > mejorDistancia ) {
    mejorDistancia = distance;
  }
  distance = 0;
  
}





