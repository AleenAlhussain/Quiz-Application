let start_btn=document.querySelector(".start_btn button");
let info_box=document.querySelector(".info_box");
let exit_btn=info_box.querySelector(".buttons .quit");
let continueButton=info_box.querySelector(".buttons .restart");
let quiz_box=document.querySelector(".quiz-box");
let option_list=document.querySelector(".option_list");
let timeCount=document.querySelector(".timer .time_sec");
let timeLine=document.querySelector("header .time_line");
let timeOff=document.querySelector("header .time_text");

start_btn.onclick=()=>{
    info_box.classList.add("activeInfo");
}
exit_btn.onclick=()=>{
    info_box.classList.remove("activeInfo");
}

continueButton.onclick=()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count=0;
let que_numb=1;
let counter;
let counterLine;
let timeValue=15;
let widthValue=0;
let userScore=0;
let next_btn=quiz_box.querySelector(".next_btn");
let result_box=document.querySelector(".result_box");
let restartQuiz=result_box.querySelector(".buttons .restart");
let quitQuiz=result_box.querySelector(".buttons .quit");

restartQuiz.onclick=()=>{
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
    let que_count=0;
    let que_numb=1;
    let timeValue=15;
    let widthValue=0;
    let userScore=0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display="none";
}

quitQuiz.onclick=()=>{
    window.location.reload();
}

next_btn.onclick=()=>{
    if(que_count<questions.length){
        que_count++;
        que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display="none";
    timeOff.textContent="Time Left";

    }
    else{
        clearInterval(counter);
    clearInterval(counterLine);
        console.log("Question Complete");
        showResultBox();
    }
    
}
function showQuestions(index){
    let que_text=document.querySelector(".que_text");
    let queTag='<span>'+ questions[index].numb + "." + questions[index].Quiz+'</span>';
    let optionTag=' <div class="option">'+ questions[index].options[0]+'<span></span></div>'
    +'  <div class="option">'+ questions[index].options[1]+'<span></span></div>'
    +'  <div class="option">'+ questions[index].options[2]+'<span></span></div>'
    +' <div class="option">'+ questions[index].options[3]+'<span></span></div>';
    que_text.innerHTML=queTag;
    option_list.innerHTML=optionTag;
    let option=option_list.querySelectorAll(".option");

    for(let i=0;i<option.length;i++)
    {
        option[i].setAttribute("onClick","optionSelected(this)");
    }
}
let tickIcon='<div class="icon tick"><i class="fa fa-check"></i></div>';
let crossIcon='<div class="icon cross"><i class="fa fa-times"></i></div>';

function optionSelected(answer)
{
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns=answer.textContent;
    let correctAns=questions[que_count].answer;
    let allOption=option_list.children.length;
  
    if(userAns==correctAns)
    {   userScore+=1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is Corret");
    answer.insertAdjacentHTML("beforeend",tickIcon);
    }else{
            answer.classList.add("incorrect");
            console.log("Answer is Wrong");
            answer.insertAdjacentHTML("beforeend",crossIcon);

            for(let i = 0;i < allOption ;i++)
            {
                if(option_list.children[i].textContent == correctAns)
                {
                    option_list.children[i].setAttribute("class","option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
                }
            }
        }

        for(let i=0;i<allOption;i++)
    {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display="block";
   
}
function queCounter(index){
    let bottom_que=quiz_box.querySelector(".total-que");
    let totalQue=' <span><p>'+ index+'</p><p>of</p><p>'+ questions.length+'</p> Question</span>';
    bottom_que.innerHTML=totalQue;
}


function startTimer(time){
counter=setInterval(timer,1000);
function timer(){
    timeCount.textContent=time;
    time--;
    if(time<9)
    {
        let addZero= timeCount.textContent;
        timeCount.textContent="0"+addZero;
    }
    if(time<0)
    {
        clearInterval(counter);
        timeCount.textContent="00";
        timeOff.textContent="Time Off";
        let correctAns=questions[que_count].answer;
        let allOption=option_list.children.length;
        for(let i = 0;i < allOption ;i++)
        {
            if(option_list.children[i].textContent == correctAns)
            {
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
        }

        for(let i=0;i<allOption;i++)
        {
            option_list.children[i].classList.add("disabled");
        }
        next_btn.style.display="block";
    }
}
}

function startTimerLine(time){
    counterLine=setInterval(timer,29);
    function timer(){
        time+=1;
        timeLine.style.width=time+"px";
        if(time>549)
        {
            clearInterval(counterLine);
        }
    }
    }
   function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");

    let scoreText=result_box.querySelector(".score_text");
    if(userScore>7){
    let scoreTag=' <span>and Congrate! ,you got only <p>'+ userScore+'</p>out of <p>'+ questions.length+'</p></span>'; 
    scoreText.innerHTML=scoreTag;
    }
    else if(userScore>5){
        let scoreTag=' <span>and nice! ,you got only <p>'+ userScore+'</p>out of <p>'+ questions.length+'</p></span>'; 
        scoreText.innerHTML=scoreTag;
            }
          else{
                let scoreTag=' <span>and Sorry! ,you got only <p>'+ userScore+'</p>out of <p>'+ questions.length+'</p></span>'; 
                scoreText.innerHTML=scoreTag;
                    }
    }