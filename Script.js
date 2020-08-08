var canavas = document.getElementById("Ingenerka");
var vision = canavas.getContext("2d");
var personager = document.getElementById("protivnik3");
var dx = 3;
var right = false;
var left = false;
var persX = canavas.height/2+50;
var lazerY = canavas.height - 80;
var xforbullet;
var protivnik =document.getElementById("personag");
var lazerX = persX + 25;
var space = false;
var popadane = true;
var enemyes = [];
var dopschetx = 0;
var dopschety = 0;
var ddopx = 2;
var eban=[1,1,1,1,1,1,1,1,1,1,1];

document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("keydown",keyDownHandler,false);

function personag(){
  vision.beginPath();
  vision.clearRect(persX-5,canavas.height-50,10,50);
  vision.clearRect(persX+45,canavas.height-50,10,50);
  vision.drawImage(personager,persX,canavas.height-50,50,50);

  vision.closePath();
}
function dwigatel(){
  personag(persX);
  drawenemy(dopschetx,dopschety,enemyes);
  if(left && persX >= 0){
    persX-=3;
  }
  else if(right && persX+50<=canavas.height+200){
    persX +=3;
  }
  bullets.forEach(bullet => bullet.draw());
  if(space){
    if(popadane){
    new Bullet();
    popadane=false;
  }
  }
  requestAnimationFrame(dwigatel);
}

function drawenemy(){
  for(let i =0;i<11;i++){
    enemyes[i]=[];
    for(let j=0;j<8;j++){
      enemyes[i][j]={x:0,y:0,status:eban[i][j]};
    }
  }

for(let c=0;c<11;c++){
  for(let k=0;k<8;k++){
    if(enemyes[c][k].status===1){
      var enemyX = (c * (20 + 30)) + 30  + dopschetx;
      var enemyY = (k * (20+10)) + 30  + dopschety;
      enemyes[c][k].x=enemyX;
      enemyes[c][k].y=enemyY;
      vision.beginPath();
      vision.clearRect(enemyes[c][k].x-5,enemyes[c][k].y-6,30,30);
      vision.drawImage(protivnik,enemyes[c][k].x,enemyes[c][k].y,20,20);
      vision.closePath();
    }
  }
}


if(dopschetx>250 || dopschetx<-30){
  ddopx=-ddopx;
  dopschety+=10;
  dopschetx+=ddopx
}else dopschetx+=ddopx;
}

function keyUpHandler(e){
  if(e.keyCode==39){
    right  = false;
  }
  else if(e.keyCode == 37){
    left = false;
  }
  else if(e.keyCode == 32){
    space  = false;
  }
}
function keyDownHandler(e){
  if(e.keyCode==39){
    right  = true;
  }
  else if(e.keyCode == 37){
    left = true;
  }
  else if(e.keyCode == 32){
    space = true;
  }
}
const bullets = [];
class Bullet {
    constructor(){
      this.x = persX+25;
      this.y = lazerY;
      bullets.push(this);
    }
    draw(){
      this.y-=5;
      if(this.y<0){
        bullets.splice(bullets.indexOf(this));
        popadane = true;
        vision.clearRect(0,0,800,800);
      }
      vision.fillStyle = 'red';
      vision.clearRect(this.x,this.y,5,10);
      vision.fillRect(this.x,this.y,5,5);
      for(let c=0;c<11;c++){
        eban[c]=[];
        for(let k=0;k<8;k++){
      if(this.y<enemyes[c][k].y+30 && this.x>enemyes[c][k].x && this.x<enemyes[c][k].x+30 && this.y>enemyes[c-1][k].y ){
        bullets.splice(bullets.indexOf(this));
        vision.clearRect(0,0,800,800);
        popadane = true;
        eban[c][k].status = 0;
      }
    }
      }
    }
}
dwigatel();
//статус не статусит
