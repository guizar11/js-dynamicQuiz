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

// This displays the current question AND the choices

// TODO: Clean up the js stuff. We should not be referring to document
// TODO: Find the right node and ensure you adding <li> properly
// TODO: Delete all nodes before you go to the next question
// TODO: refactor it all in jQuery
// TODO: do a version using Pure JS - no jQuery
// TODO: Add clean CSS and style it nicely

function displayCurrentQuestion() {
    var question = questions[currentQuestion].question;
    console.log(question);
    $(document).find(".question").text(question);

    var numChoices = questions[currentQuestion].choices.length;
    for ( i = 0; i < numChoices; i ++) {

        var choice = questions[currentQuestion].choices[i];
        var choiceTag = $('<li>' + choice + '</li>');
        console.log(choice);

        $(document).find("ul").append(choiceTag);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    quizScore = 0;
}

function displayScore() {
    resetQuiz();
}

