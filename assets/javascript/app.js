//define game object
var trivia = {

    //define questions sub-object
    q: [
        "1. According to Prison Mike, dementors are the worst thing about prison.  True or false?",
        "2. Michael's online dating profile username is 'LittleKidLover.'  True or false?",
        "3. Jan's child's name is Assturd.  True or false?",
        "4. Senor Loadenstein was the name of Dunder Mifflin's first customer.  True or false?",
        "5. 'Break me off a piece of that football cream,' is the slogan for a well known candybar.  True or false?",
        "6. Jim puts Dwight's stapler in jello.  True or false?",
        "7. Kevin Malone won an event in the World Series of Poker.  True or false?",
        "8. The battle of Shrute forms was the northernmost battle of the civil war.  True or false?",
        "9. Black bears are the best type of bear.  True or false?",
        "10. Pam suffers from spontaneous dental hydroplosion which causes her teeth to turn into liquid and drip down her throat.  True or false?",
    ],

    //define answers sub-object
    a: [
        "true",
        "true",
        "false",
        "false",
        "false",
        "true",
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

    //empty arr to store correct or incorrect for each question
    ansArr: [],

    //gamestart method to start game and initialize variables
    gameStart: function(i, answer, timer, timer2, timer3, ansArr) {

        //clear everything from screen if game is being restarted from previous iteration
        $("#q").empty()
        $("#a").empty()
        $("#s").empty()
        $("#m").empty()
        $("#t").empty()

        //game start message
        $("#q").html("<h1>Click The Button To Start</h1>")
        //Add in game start button
        $("#a").html("<button id='s' class='btn btn-primary'>Click To Start</button>");
        
        //call the next function in the game sequence to print questions
        $("#s").on("click", function() {trivia.printQuestion(i, answer, timer, timer2, timer3, ansArr)});
    },   

    //printQuestion method to print each question in the questions property
    printQuestion: function(i, answer, timer, timer2, timer3, ansArr) {

        //print question referencing the current iteration of the gameplay sequence
        $("#q").text(trivia.q[i]);

        //display true/false buttons for user response
        $("#a").html("<button id='true' class='btn btn-success'>True</button> <button id='false' class='btn btn-danger'>False</button>");

        //call next function in game sequence to start timer, and receive user answer
        trivia.startTimer(i, answer, timer, timer2, timer3, ansArr);
    },

    startTimer: function(i, answer, timer, timer2, timer3, ansArr) {

        //start timer to call next function in thirty seconds if user does not respond in time
        timer = setTimeout(function () {trivia.printMessage(i, answer, timer, timer2, timer3, ansArr)}, 1000*30);
        
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
            trivia.printMessage(i, answer, timer, timer2, timer3, ansArr);
        });
    
    },

    printMessage: function(i, answer, timer, timer2, timer3, ansArr) {
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
            ansArr.push("x");
            $("#m").css({"color" : "red"});
            $("#m").text(trivia.messages[2]);
        }

        //if correct answer print correct answer message
        else if (answer === trivia.a[i]) {
            ansArr.push("c");
            $("#m").css({"color" : "green"});
            $("#m").text(trivia.messages[0]);
        }

        //if incorrect answer print incorrect answer message
        else if (answer && !(answer === trivia.a[i])) {
            ansArr.push("x");
            $("#m").css({"color" : "red"});
            $("#m").text(trivia.messages[1]);
        }

        //call next function in gameplay sequence on timer so user can read message and prepare for next question
        timer = setTimeout(function () {
            clearInterval(timer3);
            trivia.reset(i, answer, timer, timer2, timer3, ansArr)
        }, 3*1000);
    },

    reset: function(i, answer, timer, timer2, timer3, ansArr) {

        //clearTimeout from function call
        clearTimeout(timer);

        //clear answer value for next iteration
        answer = undefined;

        //clear message for next question
        $("#m").empty()

        //determine if game should be iterated with next question or ended
        if (i === trivia.q.length - 1) {

            //Empty DOM, print "Results" title
            $("#a").empty();

            $("#t").empty();

            $("#q").html("Results");

            //counter for number of correct answers
            var c = 0;

            //add list of questions and whether correct or incorrect
            trivia.q.forEach(function(item, index) {
                if (ansArr[index] === "x") {
                    $("#a").append("<div class='x'>" + trivia.q[index] + ": " + trivia.a[index] + "</div><br>");
                    $(".x").css({"color": "red", "text-decoration": "line-through red"});
                }

                else if (ansArr[index] === "c") {
                    $("#a").append("<div class='c'>" + trivia.q[index] + ": " + trivia.a[index] + "</div><br>");
                    $(".c").css({"color": "green"});
                    c++
                }
            })

            //Users Score
            $("#a").append("<div id='score'>Score " + c + "/10</div><br>");

            //print reset button
            $("#a").append("<button id='r' class='btn btn-primary'>Reset</button>");

            //reset game when button clicked
            $("#r").on("click", function () {

                //reinitialize game input variables
                i = 0;
                answer = undefined;
                timer = undefined;
                timer2 = undefined;
                timer3 = undefined;
                ansArr = [];

                //call function to restart the game
                trivia.gameStart(i, answer, timer, timer2, timer3, ansArr);
            });
        }

        else if (!(i === trivia.q.length)) {
            i++;
            trivia.printQuestion(i, answer, timer, timer2, timer3, ansArr);
        }
    }
}

trivia.gameStart(trivia.i, trivia.answer, trivia.timer, trivia.timer2, trivia.timer3, trivia.ansArr);