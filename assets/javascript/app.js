//define game object
var trivia = {

    //define questions sub-object
    q: [
        "question 0",
        "question 1",
        "question 2",
        "question 3",
        "question 4",
        "question 5",
        "question 6",
        "question 7",
        "question 8",
        "question 9",
    ],

    //define answers sub-object
    a: [
        "true",
        "false",
        "true",
        "false",
        "true",
        "false",
        "true",
        "false",
        "true",
        "false",
    ],

    //define messages sub-object
    messages: [
        "Correct!  Prepare for next question",
        "Incorrect idiot.  Prepare for next question",
        "Time is up, too slow dork.  Prepare for next question",
        "Game over, see results below.  Would you like to play again?",
    ],

    //gamestart method to start game and initialize variables
    gameStart: function() {

        //counter variable to be iterated through
        var i = 0;

        //variable for user answer to be stored in through each iteration
        var answer;

        //variable for timer so that timer can be cleared if necessary
        var timer;

        //call the next function in the game sequence to print questions
        $("#a").on("click", function() {trivia.printQuestion(i, answer, timer)});
    },   

    //printQuestion method to print each question in the questions property
    printQuestion: function(i, answer, timer) {

        //print question referencing the current iteration of the gameplay sequence
        $("#q").text(trivia.q[i]);

        //display true/false buttons for user response
        $("#a").html("<button id='true'>True</button> <button id='false'>False</button>");

        //call next function in game sequence to start timer, and receive user answer
        trivia.startTimer(i, answer, timer);
    },

    startTimer: function(i, answer, timer) {

        //receive user answer
        $("button").on("click", function() {
            answer = event.target.id;
            clearTimeout(timer);
            trivia.printMessage(i, answer, timer);
        });
        
        //start timer to call next function in thirty seconds if user does not respond in time
        timer = setTimeout(function () {trivia.printMessage(i, answer, timer)}, 1000*30);
    },

    printMessage: function(i, answer, timer) {

        //if no answer chosen print times up answer message
        if (!answer) {
            $("#m").text(trivia.messages[2]);
        }

        //if correct answer print correct answer message
        else if (answer === trivia.a[i]) {
            $("#m").text(trivia.messages[0]);
        }

        //if incorrect answer print incorrect answer message
        else if (answer && !(answer === trivia.a[i])) {
            $("#m").text(trivia.messages[1]);
        }

        //clear answer value for next iteration
        answer = undefined;

        //call next function in gameplay sequence on timer so user can read message and prepare for next question
        setTimeout(function () {trivia.reset(i, answer, timer)}, 3*1000);
    },

    reset: function(i, answer, timer) {

        // //if on last question then reset game
        // if (i === trivia.q.length) {
        //     $("#m").text(trivia.messages[3]);
        //     setTimeout(trivia.gameStart(), 3*1000);
        // }
        // //if not on last question then call next question
        // else if (!(i === trivia.q.length)) {
        //     i++;
        //     trivia.printQuestion(i, answer, timer);
        // }
        //clear message for next question
        $("#m").empty()

        //determine if game should be iterated with next question or ended
        if (i === trivia.q.length) {
            $("#m").text(trivia.messages[3]);
        }

        else if (!(i === trivia.q.length)) {
            i++;
            trivia.printQuestion(i, answer, timer);
        }
    }
}

trivia.gameStart();