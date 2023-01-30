// 게임을 만들때 생각해야할것
// 1. 네모그리면 됩니다.(캐릭터)
// 2. 코드를 1초에 60번 실행하면 애니메이션 만들 수 있음

// canvas 사용시 
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let img2 = new Image();
img2.src = 'dinosaur.png';

// 캐릭터 - 그릴 캐릭터의 정보를 미리 object자료로 정리
let dino = {
  x : 10,
  y : 200,
  width : 50,
  height :50,
  // 네모를 그리는 함수
  draw(){
    // 앞에 10 은 좌표 x,y 뒤에 100 은 가로,세로  = 왼쪽 위에서부터 10,10에서 100,100를 그려주세요
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img2, this.x, this.y)
  }
}

// 장애물 이미지
let img1 = new Image();
img1.src = 'cactus.png';


// 장애물 - 그릴 장애물의 정보를 미리 object자료로 정리
class Cactus {
  constructor(){
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw(){
    // 앞에 10 은 좌표 x,y 뒤에 100 은 가로,세로  = 왼쪽 위에서부터 10,10에서 100,100를 그려주세요
    ctx.fillStyle = 'red';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y)
  }
}

// 시간
let timer = 0;

// 장애물을 arr에 담아서 관리
let cactusArr = [];

// 스페이스바를 눌럿을때 점프에 높이를 정하기위함
let jumpTimer = 0;

// 스페이스바를 눌럿을때 점프하는 이벤트
let swich = false;
document.addEventListener('keydown', function(e){
  if(e.code === 'Space'){
    swich = true;
  }
})


let animation;
// 1초에 60번 실행하는 함수 (requestAnimationFrame(함수이름))
function frameStart(){
  animation = requestAnimationFrame(frameStart)

  timer++;
  // 캔버스 지우는법
  ctx.clearRect(0,0, canvas.width, canvas.height)
  // 자기프레임 한번이 1초 라고 생각하고 60프레임을 120으로 했을때는 2초
  // 120 프레인마다 장애물 하나 생성
  if(timer % 200 === 0){
    // 장애물 뽑아낼때
    let cactus = new Cactus();
    // 120 프레인마다 장애물 하나씩 생성
    cactusArr.push(cactus);    
  }
  // cactusArr에 있는 것을 drow()해준다.
  cactusArr.forEach((a, i, o) => {
    // x좌표가 0미만이면 제거
    if(a.x < 0){
      o.splice(i, 1)
    }
    a.x--;
    충돌하냐(dino,a)
    a.draw();
  })
  
  // 스페이스바 누르면 점프
  if(swich === true){
    dino.y--;
    jumpTimer++;
  }
  if(swich == false){
    if (dino.y < 200){
      dino.y++;
    }    
  }
  if (jumpTimer > 100){
    swich = false;
    jumpTimer = 0
  }
  // 1초에 모니터 프레임만큼 코드 실행
  dino.draw();
}
frameStart();

// 충돌확인

function 충돌하냐(dino, cactus){
  let x축차이 = cactus.x - (dino.x + dino.width);
  let y축차이 = cactus.y - (dino.y + dino.height);
  if(x축차이 < 0 && y축차이 < 0){
    // 캔버스가 클리어가 됨
    ctx.clearRect(0,0, canvas.width, canvas.height)
    cancelAnimationFrame(animation)
  }
}