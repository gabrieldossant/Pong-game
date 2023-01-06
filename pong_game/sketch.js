//ball variables
let xBall = 100;
let yBall = 200;
let diameter = 15;
let rays = diameter / 2;

//ball speed
let xVelocity = 5;
let yVelocity = 5;

//racket variables
let xRacket = 5;
let yRacket = 150;
let racketLength = 10;
let racketHeight = 90;

//oponents variables
let xRacketOponent = 585;
let yRacketOponent = 150;
let speedYoponent;

let myPoints = 0;
let oponentsPoints = 0;

let racketSound;
let pointSound;
let soundtrack;

let directionRacketOponent = 1;

let collided = false;

    function preload() {
        soundtrack = loadSound("trilha.mp3");
        racketSound = loadSound("raquetada.mp3");
        pointSound = loadSound("ponto.mp3");
    }

    function setup() {
        createCanvas(600, 400);
        soundtrack.loop();
    }
    function draw() {
        background(0);
        showBall();
        ballMovement();
        ballCheck();    
        showRacket(xRacket, yRacket);
        moveMyRacket();
        CheckCollisionRacket();
        showRacket(xRacketOponent, yRacketOponent);
        moveRacketOponent();
        CheckCollisionRacketOponent(); 
        includeScoreBoard();
        scorePoints();
        ballDoesNotGetStuck();
    }
    function ballDoesNotGetStuck() {
        if(xBall + rays < 0) {
            console.log("ball got stuck");
            xBall = 300;
        }
    }
    function showBall() {
        circle(xBall, yBall, diameter);
    }
    function ballMovement() {
        xBall += xVelocity;
        yBall += yVelocity;
    }
    function ballCheck() {
        if(xBall + rays > width || xBall - rays < 0) {
            xVelocity *= -1;
        }
        if(yBall + rays > height || yBall - rays < 0) {
            yVelocity *= -1;
        }
    }
    function showRacket(x, y) {
        rect(x, y, racketLength, racketHeight);
    }
    function moveMyRacket() {
        if(keyIsDown(UP_ARROW)) {
            yRacket -= 10;
        }
        if(keyIsDown(DOWN_ARROW)) {
            yRacket += 10;
        }
    }
    function CheckCollisionRacket() {
        if(xBall - rays < xRacket + racketLength && yBall - rays < yRacket + racketHeight && yBall + rays > yRacket){
            xVelocity *= -1;
            racketSound.play();
        }
    }
    function CheckCollisionRacketOponent() {
        if(xBall + rays > xRacketOponent && yBall + rays < yRacketOponent + racketHeight && yBall + rays > yRacketOponent){
            xVelocity *= -1;
            racketSound.play();
        }
    }
    function moveRacketOponent() {
        const averageYball = yBall + rays;
        const averageYballOponent = yRacketOponent + (racketHeight/2);
        
        if(averageYball > averageYballOponent) {
          directionRacketOponent = 1;
        } else {
          directionRacketOponent = -1;
        }
        yRacketOponent += 5 *random(0.6, 0.95) * directionRacketOponent;
        
    }
    function includeScoreBoard() {
        stroke(255);
        textAlign(CENTER);
        textSize(15);
        fill(color(25, 25, 112));
        rect(150, 10, 40, 20);
        fill(255);
        text(myPoints, 170, 26);
        fill(color(25, 25, 112));
        rect(420, 10, 40, 20);
        fill(255);
        text(oponentsPoints, 440, 26);
    }
    function scorePoints() {
        if(xBall > 590) {
            myPoints += 1;
            pointSound.play();
        }
        if(xBall < 10) {
            oponentsPoints += 1;
            pointSound.play();
        }
    }
