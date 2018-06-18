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

    //counter variable to be iterated through
    i: 0,

    //variable for user answer to be stored in through each iteration
    answer: undefined,

    //variable for timer so that timer can be cleared if necessary
    timer: undefined,

    //initialize secondary timer variables
    timer2: undefined,

    timer3: undefined,

    //gamestart method to start game and initialize variables
    gameStart: function(i, answer, timer, timer2, timer3) {

        //clear everything from screen if game is being restarted from previous iteration
        $("#q").empty()
        $("#a").empty()
        $("#s").empty()
        $("#m").empty()
        $("#t").empty()

        //Add in game start button
        $("#a").html("<button id='s'>Click To Start</button>");
        
        //call the next function in the game sequence to print questions
        $("#s").on("click", function() {trivia.printQuestion(i, answer, timer, timer2, timer3)});
    },   

    //printQuestion method to print each question in the questions property
    printQuestion: function(i, answer, timer, timer2, timer3) {

        //print question referencing the current iteration of the gameplay sequence
        $("#q").text(trivia.q[i]);

        //display true/false buttons for user response
        $("#a").html("<button id='true'>True</button> <button id='false'>False</button>");

        //call next function in game sequence to start timer, and receive user answer
        trivia.startTimer(i, answer, timer, timer2, timer3);
    },

    startTimer: function(i, answer, timer, timer2, timer3) {

        //start timer to call next function in thirty seconds if user does not respond in time
        timer = setTimeout(function () {trivia.printMessage(i, answer, timer, timer2, timer3)}, 1000*30);
        
        //print start timer to screen
        $("#t").html("00:30");

        //intialize clock
        var clock = 29;

        //show clock so user knows remaining time left to answer question
        timer2 = setInterval(function() {

            if (clock > 9) {
                $("#t").html("00:" + clock);
            }

            else if(clock <=9) {
                $("#t").html("00:0" + clock);
            }

            clock--;

        }, 1000);

        //receive user answer, disable buttons and call next function
        $("button").on("click", function() {
            $("#true").attr("disabled", "disabled");
            $("#false").attr("disabled", "disabled");
            answer = event.target.id;
            clearTimeout(timer);
            clearInterval(timer2);
            trivia.printMessage(i, answer, timer, timer2, timer3);
        });
    
    },

    printMessage: function(i, answer, timer, timer2, timer3) {
        //clear timers from last function just in case
        clearInterval(timer2);
        clearTimeout(timer);
        
        //disable buttons while message is displayed
        $("#true").attr("disabled", "disabled");
        $("#false").attr("disabled", "disabled");

        //print start timer to screen
        $("#t").html("00:03");

        //initialize timer
        var clock2 = 2;

        //display timer to show when next question will be displayed
        timer3 = setInterval(function() {
            $("#t").html("00:0" + clock2);
            clock2--;
        }, 1000);

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

        //call next function in gameplay sequence on timer so user can read message and prepare for next question
        timer = setTimeout(function () {
            clearInterval(timer3);
            trivia.reset(i, answer, timer, timer2, timer3)
        }, 3*1000);
    },

    reset: function(i, answer, timer, timer2, timer3) {

        //clearTimeout from function call
        clearTimeout(timer);

        //clear answer value for next iteration
        answer = undefined;

        //clear message for next question
        $("#m").empty()

        //determine if game should be iterated with next question or ended
        if (i === trivia.q.length - 1) {

            //print game over message
            $("#m").text(trivia.messages[3]);

            //print reset button
            $("#a").html("<button id='r'>Reset</button>");

            //reset game when button clicked
            $("#r").on("click", function () {

                //reinitialize game input variables
                i = 0;
                answer = undefined;
                timer = undefined;
                timer2 = undefined;
                timer3 = undefined;

                //call function to restart the game
                trivia.gameStart(trivia.i, trivia.answer, trivia.timer, trivia.timer2, trivia.timer3);
            });
        }

        else if (!(i === trivia.q.length)) {
            i++;
            trivia.printQuestion(i, answer, timer, timer2, timer3);
        }
    }
}

trivia.gameStart(trivia.i, trivia.answer, trivia.timer, trivia.timer2, trivia.timer3);