function Question(text,options,answer){
    this.text=text;
    this.options=options;
    this.answer=answer;
}

function Quiz(questions){
    this.score=0;
    this.questions=questions;
    this.questionIndex=0;
}

Quiz.prototype.getElementByIndex=function(){
    return this.listofquestions[this.currentquestionIndex]
}

Quiz.prototype.checkAnswer = function (ans) {//validates answer selected by the user with the actual answer
    if (this.getQuestionByIndex().answer === ans) {
        this.score++;
    }
    this.currentQuestionIndex++;
}

Quiz.prototype.isEnded = function () {//checks if the quiz is completed or not
    return this.currentQuestionIndex == this.listOfQuestions.length;
}

let listofquestions=[
new Question("Javascript supports", ["Functiuons", "XHTML", "CSS", "HTML"], "Functiuons"),
new Question("Which language used for styling web pages", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
new Question("Which is not Javascript Framework ", ["Python", "JQuery", "DJango", "NodeJS"], "DJango"),
new Question("Which is used to connect with Database ", ["PHP", "HTML", "JS", "All"], "PHP"),
new Question("Javascript is a", ["Language", "Programming Language", "Development", "All"], "Programming Language")


];

let quiz = new Quiz(listOfQuestions);//create a new quiz object populated with the given questions

function displayQuestions() {//loads the questions on the screen

    if (quiz.isEnded()) {
        showScores();
    } else {
        let questionElement = document.getElementById('question');
        questionElement.innerHTML = quiz.getQuestionByIndex().text

        let choices = quiz.getQuestionByIndex().options;
        for (let i = 0; i < choices.length; i++) {
            let elem = document.getElementById("choice" + i);
            elem.innerHTML = choices[i];
            handeClick('btn' + i, choices[i]);
        }
        showProgress();
    }
};

function showProgress() {
    /* shows the question current question number with the total number of questions to display the user's progress in the quiz. Example : if the user is currently at question 1 it wil show "Question 1 of 5". */

    let curr = quiz.currentQuestionIndex + 1;
    let elem = document.getElementById('progress');
    elem.innerHTML = `Question ${curr} of ${quiz.listOfQuestions.length}`
}

function handeClick(id, choice) {//event handling when the user click's on an option
    let buttonElement = document.getElementById(id);
    buttonElement.onclick = function(){
        quiz.checkAnswer(choice);
        displayQuestions();
    }
};

function showScores() {//shows score after the quiz is completed
    let result = `<h1>Result</h1><h2 id="score"> YOUR SCORE : ${quiz.score}.<br> YOUR  PERCENTAGE : 
    ${(quiz.score / listOfQuestions.length) * 100}% </h2>`;
    let quizEle = document.getElementById('quiz');
    quizEle.innerHTML = result;
}

displayQuestions();