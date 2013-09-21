/**
 * Created with JetBrains WebStorm.
 * User: pwanwu
 * Date: 18/09/2013
 * Time: 17:41
 * To change this template use File | Settings | File Templates.
 */

var questions = [
                {   question: "What is the population of Brazil?",
                    choices: ["145 Million", "175 million", "195 million", "205 million"],
                    correctAnswer: 0
                },
                {   question: "What is 27*14?",
                    choices: ["485", "634", "408", "528"],
                    correctAnswer: 2
                },
                {   question: "What is the busiest train station in the world?",
                    choices: ["Grand Central, NY", "Shibuya, Tokyo", "Beijing Central, Chine", "Gard du Nord, Paris"],
                    correctAnswer: 0
                },
                {   question: "What is the longest river?",
                    choices: ["Nile", "Amazon", "Mississippi", "Mekong"],
                    correctAnswer: 0
                },
                {   question: "What is the busiest tube station in the London?",
                    choices: ["Waterloo", "Baker Street", "Kings Cross", "Victoria"],
                    correctAnswer: 0
                }
];

var currentQuestion = 0;
var correctAnswers = 0;

$(document).ready(function() {

    // Display the first question
    displayCurrentQuestion();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function() {
        if (currentQuestion < questions.length) {
            displayCurrentQuestion();
        } else {
            displayScore();
            $(document).find(".nextButton").toggle();
            $(document).find(".playAgainButton").toggle();
        }
    });

    $(document).find(".playAgainButton").on("click", function() {
        $(document).find(".nextButton").toggle();
        $(document).find(".playAgainButton").toggle();
        resetQuiz();
        displayCurrentQuestion();
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quiz > .question");
    var choiceList = $(document).find(".quiz > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice, choiceTag;
    for ( i = 0; i < numChoices; i ++) {
        choice = questions[currentQuestion].choices[i];
        choiceTag = $('<li>' + choice + '</li>');

        // Append the choices to the choiceList
        $(choiceList).append(choiceTag);
    }

    currentQuestion++;
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
}

function displayScore() {
    $(document).find(".quiz > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
}

