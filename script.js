const questions = [
    {
        question: "Which is largest animal in the world?",
        answers : [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },

    {
        question: "Which is the smallest continent in the world?",
        answers : [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    },

    {
        question: "What platform is the most often used for video game live streaming?",
        answers : [
            {text: "Twitch", correct: true},
            {text: "YouTube", correct: false},
            {text: "Facebook", correct: false},
            {text: "Vimeo", correct: false},
        ]
    },

    {
        question: "What feature did Instagram introduce in 2016 to compete with Snapchat?",
        answers : [
            {text: "Stories", correct: true},
            {text: "Reels", correct: false},
            {text: "IGTV", correct: false},
            {text: "Live Stream", correct: false},
        ]
    },

    {
        question: "What parent company owns both Instagram and WhatsApp?",
        answers : [
            {text: "Google", correct: false},
            {text: "Apple", correct: false},
            {text: "Amazon", correct: false},
            {text: "Facebook (Meta)", correct: true},
        ]
    },

    {
        question: "Which of these technologies help computers to behave like humans?",
        answers : [
            {text: "XBOX", correct: false},
            {text: "Artificial Intelligence", correct: true},
            {text: "Artificial Embryo", correct: false},
            {text: "3D Printing", correct: false},
        ]
    },

    {
        question: "Which of these is related to machine learning?",
        answers : [
            {text: "Cognitive Technology", correct: true},
            {text: "XBOX", correct: false},
            {text: "Artificial Intelligence", correct: false},
            {text: "Artificial Embryo", correct: false},
        ]
    },

    {
        question: "Which of these technologies is about language?",
        answers : [
            {text: "Google Translate", correct: true},
            {text: "Artificial Intelligence", correct: false},
            {text: "Internet of things", correct: false},
            {text: "Artificial Intelligence", correct: false},
        ]
    },

    {
        question: "Who invented the World Wide Web?",
        answers : [
            {text: "Bill Gates", correct: false},
            {text: "Tim Berners-Lee", correct: true},
            {text: "Steve Jobs", correct: false},
            {text: "Mark Zuckerberg", correct: false},
        ]
    },

    {
        question: "Which programming language is often used for websites?",
        answers : [
            {text: "Python", correct: false},
            {text: "Java", correct: false},
            {text: "JavaScript", correct: true},
            {text: "C++", correct: false},
        ]
    }

];


const questionElement = document.getElementById("question"); 
const answerButtons = document.getElementById("answer-buttons"); 
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();