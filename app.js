let gameSeq = [];
let UserSeq = [];
let started  = false;
let level =  0;
let btns = ["red","yellow","green","purple"];
let body = document.querySelector("body");
let highScore = 0;
let hs = document.querySelector("h3");


document.addEventListener("keypress",function(event){
    if(started == false){
        started = true;
        hs.innerText = `The High Score is:  ${highScore}`;
        levelUp();
    }
});

function btnFlash (btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash (btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}
function gameOvrFlash (){
    body.classList.add("gameOvr");
    setTimeout(function(){
        body.classList.remove("gameOvr");
    },250);
}

function levelUp (){
    UserSeq = [];
    level++;
    document.querySelector("h2").innerText = `level ${level}`;
    // flash random button
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)
    btnFlash(randBtn);
    gameSeq.push(randColor);
}

function checkAns(idx) {
    if(UserSeq[idx] === gameSeq[idx]){
        if(UserSeq.length==gameSeq.length){
            setTimeout(levelUp,900);
        }
    }else{
        document.querySelector(".h2").innerHTML = `Game Over ! Your Score is :<b>${level}</b> <br> Press Any key to Start again!`;
        gameOvrFlash();
        highScores();
        reset();
    }
}
function highScores(){
    if(level>highScore){
        highScore = level;
    }
}
function btnPress(){
   let btn = this;
   userFlash(this);
   userColor = btn.getAttribute("id");
   UserSeq.push(userColor); 

   checkAns(UserSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    UserSeq = [];
    level = 0 ;
}