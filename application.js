/**
 * User: pwanwu
 * Date: 18/09/2013
 * Time: 17:41
 */

//var questions = [
//                {   question: "What is the population of Brazil?",
//                    choices: ["145 million", "199 million", "182 million", "205 million"],
//                    correctAnswer: 1,
//                    userAnswer: null
//                },
//                {   question: "What is 27*14?",
//                    choices: ["485", "634", "408", "528"],
//                    correctAnswer: 2,
//                    userAnswer: null
//                },
//                {   question: "What is the busiest train station in the world?",
//                    choices: ["Grand Central, NY", "Shibuya, Tokyo", "Beijing Central, Chine", "Gard du Nord, Paris"],
//                    correctAnswer: 1,
//                    userAnswer: null
//                },
//                {   question: "What is the longest river?",
//                    choices: ["Nile", "Amazon", "Mississippi", "Yangtze"],
//                    correctAnswer: 0,
//                    userAnswer: null
//                },
//                {   question: "What is the busiest tube station in the London?",
//                    choices: ["Waterloo", "Baker Street", "Kings Cross", "Victoria"],
//                    correctAnswer: 0,
//                    userAnswer: null
//                }
//];

var questions = {};
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function() {

    // Read JSON file: See http://stackoverflow.com/questions/2792423/using-jquery-to-get-json-objects-from-local-file
    readJsonFile().done(function (data) {
        // questions = data;
        console.log("Questions read from JSON file: " + questions);
    });

    console.log("Question 1: " + questions[0].question);

    $(this).find(".quizMessage").hide();
    $(this).find(".backButton").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function() {
        if (! quizOver ) {

            value = $("input[type='radio']:checked").val();

            if(value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            }
            else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                // Store the user's answer in case they want to go back
                questions[currentQuestion].userAnswer = value;

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                $(document).find(".backButton").show();
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
//                    $(document).find(".nextButton").toggle();
//                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });


    $(this).find(".backButton").on("click", function() {
        currentQuestion--;
        displayCurrentQuestion();
    });

    $(this).find(".writeJsonFile").on("click", createJsonFile);

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice, tag, userAnswer;
    for ( i = 0; i < numChoices; i ++) {
        choice = questions[currentQuestion].choices[i];
        userAnswer = questions[currentQuestion].userAnswer;

        // If we already have a user answer for this choice then check the radio button
        if ( i == userAnswer ) {
            tag = '<li><input type="radio" value=' + i + ' checked=true name="dynradio" />' + choice + '</li>';
        } else {
            tag = '<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>';
        }
        $(tag).appendTo(choiceList);

    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {

    numQuestions = questions.length;
    while ( numQuestions -- ) {
        if ( questions[numQuestions].userAnswer == questions[numQuestions].correctAnswer ) {
            correctAnswers++;
        }
    }

    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    // TODO: Not sure why this works as I don't think hide is defined method!
    $(document).find(".result").hide();
}
function createJsonFile() {
    // some jQuery to write to file
    $.ajax({
        type : "POST",
        url : "json.php",
        dataType : 'json',
        data : {
            json : questions
        }
    });
    console.log("Wrote the JSON file OK! ")
};

function readJsonFile() {
    return $.getJSON("questions.json").then(function (data) {
        questions = data;
        return data;
    });
};

