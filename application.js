/**
 * Created with JetBrains WebStorm.
 * User: pwanwu
 * Date: 18/09/2013
 * Time: 17:41
 * To change this template use File | Settings | File Templates.
 */

var questions = [
                {   question: "What is the population of Brazil?",
                    choice: ["145 Million", "175 million", "195 million", "205 million"],
                    correctAnswer: 0
                },
                {   question: "What is 27*14?",
                    choice: ["485", "634", "408", "528"],
                    correctAnswer: 2
                },
                {   question: "What is the busiest train station in the world?",
                    choice: ["Grand Central, NY", "Shibuya, Tokyo", "Beijing Central, Chine", "Gard du Nord, Paris"],
                    correctAnswer: 0
                },
                {   question: "What is the longest river?",
                    choice: ["Nile", "Amazon", "Mississippi", "Mekong"],
                    correctAnswer: 0
                },
                {   question: "What is the busiest tube station in the London?",
                    choice: ["Waterloo", "Baker Street", "Kings Cross", "Victoria"],
                    correctAnswer: 0
                }
];

var currentQuestion = 0;

$(document).ready(function() {

    // Display the first question
    displayCurrentQuestion();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function() {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayCurrentQuestion();
        } else {
            displayScore();
        }
    });
});

function displayCurrentQuestion() {
    var question = questions[currentQuestion].question;
    console.log(question);
    $(document).find(".question").text(question);
}

function resetQuiz() {
    currentQuestion = 0;
    quizScore = 0;
}

function displayScore() {
    resetQuiz();
}

