var ball ={
  // xPointer = 10,
  // yPointer = 10,
  // vx = 1,//x轴运动方向速度
  // vy = 0.1,//y轴运动方向速度
  // x = 1, //1表示正方向，-1表现反方向
  // y = -1,
  // color:'blue',
  // radius:10
},
canvas,ctx,
ballArr = [];//定义小球数组
canvas = document.querySelector('canvas');
ctx = canvas.getContext("2d");
//随机获取小球运动方向
function getIndex(){
  var index,
  arr = [0,1],
  len= arr.length;
  index = Math.floor(Math.random()*len);
  if( 0 === index) index = -1;
  return index;
}
//初始化生成60个小球
// var ballProperty = {};
function initBall(){

  for(var i = 0; i < 60; i++){
    var ball = {};
    ball.xPointer = getRadom(20,980);
    ball.yPointer = getRadom(20,340);
    ball.vx = getIndex();
    ball.vy = getIndex();
    ball.x = Math.random();
    ball.y = Math.random();
    ball.radius = 2;
    // ball.color = '#' + (('00000' + ((Math.random() * 16777215 + 0.5) >> 0).toString(16).slice(-6);
    ball.color = "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
    ballArr.push(ball)
  }
}
//获取两个数值中的任意值
function getRadom(first,last){
    var choice = last - first + 1;
    return Math.random()*choice + first;
}

//绘制小球
function draw(){
  //绘制之前先清空画布
  ctx.clearRect(0, 0, 1000, 360);
  //遍历画圆
  for(var i = 0,len = ballArr.length; i < len; i++ ){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = ballArr[i].color;
    ctx.arc(ballArr[i].xPointer, ballArr[i].yPointer,ballArr[i].radius, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

// 小球之间连线
function drawLine(){
  for(var i = 0,len = ballArr.length; i < len; i++){
    for(var j = 0; j < len; j++ ){
       var xx = Math.pow(ballArr[i].xPointer - ballArr[j].xPointer,2);
       var yy = Math.pow(ballArr[i].yPointer - ballArr[i].yPointer,2);
       var zz = Math.sqrt(xx + yy);
       //两个小球距离在20和100 之间绘制一条直线
       if(zz <= 100 && zz >= 20){
          ctx.save();
          ctx.beginPath();
          ctx.lineWidth = 0.1;
          // ctx.strokeStyle = '#999';
          ctx.strokeStyle = '#' + ('00000' + (Math.random() * 16777215 >> 0).toString(16)).slice(-6);
          ctx.moveTo(ballArr[i].xPointer, ballArr[i].yPointer);
          ctx.lineTo(ballArr[j].xPointer, ballArr[j].yPointer);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
       }
    }
  }
}
// 修改小球状态，让小球动起来
function update(){
  for(var i = 0,len = ballArr.length; i < len; i++ ){
     ballArr[i].xPointer += ballArr[i].x * ballArr[i].vx;
     ballArr[i].yPointer += ballArr[i].y * ballArr[i].vy;
     //小球运动到画布边缘，改变运动方向
     //x轴方向碰撞检测
     if((ballArr[i].xPointer + ballArr[i].radius * 0.5) >= canvas.width || (ballArr[i].xPointer - ballArr[i].radius * 0.5 < 0)){
        ballArr[i].vx = ballArr[i].vx*(-1);
     }
     //y轴方向碰撞检测
     if((ballArr[i].yPointer + ballArr[i].radius * 0.5) >= canvas.height || (ballArr[i].yPointer - ballArr[i].radius * 0.5 < 0)){
        ballArr[i].vy = ballArr[i].vy*(-1);
     }
  }
};
!function(){

    initBall();
    setInterval(function(){
        draw();
        update();
        drawLine();
    }, 24)
}()

