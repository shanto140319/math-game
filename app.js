let playing = false;
let score;
let action;
let timer;
let correctAnswer;
let i;

const startReset = document.getElementById("startreset");
const scoreValue = document.getElementById("scorevalue");
const timeRemaining = document.getElementById("timeremaining");
const timeremainingvalue = document.getElementById("timeremainingvalue");
const gameOver = document.getElementById("gameOver");
const question = document.getElementById("question");

startReset.addEventListener('click', function(){
    if(playing){
        location.reload();
    }else{
        playing = true;
        score = 0;
        scoreValue.innerHTML = score;
        timeRemaining.style.display = "block";
        timer = 60;
        timeremainingvalue.innerHTML = timer;
        gameOver.style.display = "none";


        startReset.innerHTML = "Reset Game";
        startCountdown();
        generateQA();
    }

})

//checking on an answer box

for(i=1; i<5;i++){
    document.getElementById("box"+i) .addEventListener('click',function(){
        if(playing){
            if(this.innerHTML == correctAnswer){
                score++;
                scoreValue.innerHTML = score;
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000)
                generateQA();
            }else{
                show("wrong");
                document.getElementById("wrong").innerHTML = "wrong! Correct answer is " + correctAnswer;
                setTimeout(function(){
                    hide("wrong");
                },2000)
                generateQA();
            }
        }
    })
}


function startCountdown(){
    action = setInterval(function(){
        timer--;
        timeremainingvalue.innerHTML = timer;
        if(timer == 0){
            stopCountdown();
            gameOver.style.display = "block";
            gameOver.innerHTML = "<p>Game Over!</p> <p> Your score is "+score + ".</p>";
            timeRemaining.style.display = "none";
            playing = false;
            startReset.innerHTML = "Start Game";
        }
    }, 1000)
}
function stopCountdown(){
    clearInterval(action);
}
function hide(id){
    document.getElementById(id).style.display = "none";
}
function show(id){
    document.getElementById(id).style.display = "block";
}

function generateQA(){
    let x = Math.round(Math.random() * 9) +1;
    let y = Math.round(Math.random() * 9) +1;
    correctAnswer = x*y;
    question.innerHTML = x + "X" + y;
    let correctPosition =  Math.round(Math.random() * 3) +1;

    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;

    //fill other boxex with wrong answer
    let answers = [correctAnswer];
    for(i=1; i<5; i++){
        if(i!== correctPosition){
            var wrongAnswer;
            do{
              wrongAnswer = ( Math.round(Math.random() * 9) +1)*( Math.round(Math.random() * 9) +1);
            }while(answers.indexOf(wrongAnswer)>-1);
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
    
}