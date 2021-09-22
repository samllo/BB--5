// variables and gsap setup
const appHeight = 600;
const appWidth = 600;
const radius = 30;
let velocity = 2;
gsap.registerPlugin();
gsap.registerEffect({});

// canvas setup
const app = new PIXI.Application({
  width: appWidth,
  height: appHeight,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0xeeeeee
});

document.getElementById("screen").appendChild(app.view);
const stage = app.stage;

// Global ticker and empty variable for classes
let ticker = PIXI.Ticker.shared;
let v;
let x;
let y;
let gravity = 0.1;
let ballSpeed = 10;

//Ball creation class, random number generation dictates xy direction and position
//TweenMax.to(ball, 2, {pixi:{scaleX:2, scaleY:2}});  ballTL.reverse()
let ballTL = gsap.timeline({pixi:{scaleX:2, scaleY:2}});

class Circle {
  constructor(radius, x = Math.random() * appWidth , y = Math.random() * appHeight, colour ) {
      const ball = new PIXI.Graphics();
      ball.lineStyle(0); 
      ball.beginFill(colour, 1);
      ball.drawCircle( 0, 0, radius);
      this.radius = radius;
      ball.endFill();
      ball.pivot.x = radius/2;
      ball.pivot.y =  radius/2;
      ball.x =  x;
      ball.y =  y;
      ball.velocityx = Math.random() < 0.5 ? -ballSpeed  : ballSpeed;
      ball.velocityy = Math.random() < 0.5 ? -ballSpeed  : ballSpeed;
      app.stage.addChild(ball);
      TweenMax.to(ball, 1, {pixi:{fillColor:"0xDE3249"}});
      this.ball= ball;
  }
  update() {
    if (this.ball.y + radius >= appHeight ) {
      this.ball.velocityy = -this.ball.velocityy
      this.ball.y = appHeight  - radius
    }
    // top 
    if (this.ball.y - radius <= 0) {
      this.ball.velocityy = -this.ball.velocityy
      this.ball.y = radius
    }
  
    // left 
    if (this.ball.x - radius <= 0) {
      this.ball.velocityx = -this.ball.velocityx
      this.ball.x = radius
    }
    
    // right 
    if (this.ball.x + radius >= appWidth) {
      this.ball.velocityx= -this.ball.velocityx
      this.ball.x = appWidth - radius
    }
    this.ball.velocityy += gravity; // gravity add
    this.ball.x += this.ball.velocityx;
    this.ball.y += this.ball.velocityy;
  }

  removeball(){
    app.stage.removeChild(this.ball);
}

//Extends ball creation class with a method thatn can be updated using update loop set of by ticker

// x/y direction is reveresed when balls anchor reaches limits of appheight and width


//For loop places 25 balls into circle array
let Circlearray=[];
for (let i = 0; i < 25; i++) {
  Circlearray.push(new Circle(radius,x ,y, 0xeeeeee));
}



// ticker triggers update() method of CIRCLES

let delta = 1;

ticker.add((delta) => {
  Circlearray.forEach(c => {
    c.update();
  });
}


// Buttons

/* Buttons images for pressed unpressed*/
const textureButton = PIXI.Texture.from('images/bluebut.png');
const textureButtonDown = PIXI.Texture.from('images/redbut.png');


/// button class 
class BUTTONS {
  constructor(moveX,y,butDOWN,butUP?) {
      const but = new PIXI.Sprite(textureButton);
      but.anchor.set(0.5);
      but.x = -200;
      but.y = y;
      // interactive
      but.interactive = true;
      but.buttonMode = true;
      this.button = but;
      but;
      but.scale.set(0.1);
      app.stage.addChild(but);
      but.on('mousedown', buttonsDOWN);
      but.on('mousedown', butDOWN);
      but.on('mouseup', buttonsUP);
      if(butUP){but.on('mouseup', butUP)}; // can bypass if optional parameter not included
      but.on('mouseover', movebutton);
      but.on('mouseout', movebuttonback);
      TweenMax.to(but, 1.5, {pixi:{ x:moveX}});
  }
}


/* Removed for loop in favour of using BUTTONS constructor to build individual button functions into each instance */
const buttonArray=[];
buttonArray.push(new BUTTONS(100,500,but0D,but0U);
buttonArray.push(new BUTTONS(200,500,but1D,);
buttonArray.push(new BUTTONS(300,500,but2D,);
buttonArray.push(new BUTTONS(400,500,but3D,);
buttonArray.push(new BUTTONS(500,500,but4D,but4U);

// button 1 - GRAVITY
function but0D(){
  gravity = 1.2;
}
function but0U(){
  gravity = 0.1;
}
// button 2 - ADD BALL
function but1D(){
  let randColour = '0x'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');) // Random colour generator for new balls
  Circlearray.push(new Circle (radius,x ,y,randColour))
}
// no up function but-2

// button 3 - START
function but2D(){
  ticker.start();
}
// no up function but-3

// Button 4 - STOP
function but3D(){
  ticker.stop();
}
// no up funciton but-4

// Button 5 - ADD BALL
let z = 0;
function but4D(){
  Circlearray[z].removeball();
}

function but4U(){
  z++;
}


// universal button functions
function buttonsDOWN(){
  this.texture = textureButtonDown;
  this.alpha = 1;
  this.isdown = true;
}

function buttonsUP(){
  this.texture = textureButton;
  this.isdown = false;
}

function movebutton() {
  this.scale.set(0.12);
}
function movebuttonback() {
  this.scale.set(0.1);
}




//new- Cleaned up text with Text Class 
class TEXT {
  constructor(x,text,) {
      const text = new PIXI.Text(text);;
      text.anchor.set(0.5);
      text.x = x;
      text.y = 800;
      // interactive
      text.style = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 20,
        fontFamily: "Orbitron"
      })
      app.stage.addChild(text);
      TweenMax.to(text, 1.5, {pixi:{ y:550}});
  }
}


new TEXT(100,"Gravity")
new TEXT(200,"Add")
new TEXT(300,"Start")
new TEXT(400,"Stop")
new TEXT(500,"Remove")


const test = new PIXI.Graphics();
      test.lineStyle(0); 
      test.beginFill(, 1);
      test.drawCircle( 0, 0, 40);
      test.endFill();
      test.x =  200;
      test.y =  200;
      app.stage.addChild(test);






TweenMax.to(test, 2, {pixi:{ x:100}});
