/**
 * Created with JetBrains WebStorm.
 * User: pwanwu
 * Date: 18/09/2013
 * Time: 17:41
 * To change this template use File | Settings | File Templates.
 */

var questions = [
                {   question: "What is the population of Brazil?",
                    choices: ["145 million", "199 million", "182 million", "205 million"],
                    correctAnswer: 1
                },
                {   question: "What is 27*14?",
                    choices: ["485", "634", "408", "528"],
                    correctAnswer: 2
                },
                {   question: "What is the busiest train station in the world?",
                    choices: ["Grand Central, NY", "Shibuya, Tokyo", "Beijing Central, Chine", "Gard du Nord, Paris"],
                    correctAnswer: 1
                },
                {   question: "What is the longest river?",
                    choices: ["Nile", "Amazon", "Mississippi", "Yangtze"],
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
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function() {

        value = $("input[type='radio']:checked").val();

        if(value == undefined) {
            $(document).find(".quizMessage").text("Please select an answer");
            $(document).find(".quizMessage").show();
        }
        else {
            // TODO: Remove any message -> not sure if this is efficient to call this each time....
            $(document).find(".quizMessage").hide();

            if (value == questions[currentQuestion].correctAnswer) {
                correctAnswers++;
            }

            currentQuestion++; // Since we have already displayed the first question on DOM ready
            if (currentQuestion < questions.length) {
                displayCurrentQuestion();
            } else {
                displayScore();
                $(document).find(".nextButton").toggle();
                $(document).find(".playAgainButton").toggle();
            }
        }
    });

    // Set up event for the playAgain button and also toggle the nextButton
    // TODO: Just change the button text instead to refactor button appropriately
    $(this).find(".playAgainButton").on("click", function() {
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
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quiz > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quiz > .result").show();
}

function hideScore() {
    // TODO: Doesn't work...
    $(document).find(".result").hide();
}

