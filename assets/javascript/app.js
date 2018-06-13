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

    gamelogic: function(i) {

        //create empty variable to hold event target
        var eti;

        //adding each question to questions div in HTML
        $("#q").html(trivia.q[i]);

        //create true and false buttons for user to select answer
        $("#a").html("<button id=true>True</button> <button id=false>False</button>");

        //if statements to check if user selected true or false and whether or not chosen answer is correct
        $(document).on("click", "button", function() {

            //printing right answer message (ram) if correct answer chosen
            eti = event.target.id;
            if (trivia.a[i] === eti) {
                $("#m").html(trivia.messages[0]);

                //appending final answer message prompting user to restart the game, clearing interval to stop game from running again once all questions have been asked
                if (i === trivia.q.length) {
                    $("#m").append(trivia.messages[3]);
                    clearInterval();
                }
            }

            //printing wrong answer message (wam) if incorrect answer chosen
            else if (!(trivia.a[i] === eti) && eti) {
                $("#m").html(trivia.messages[1]); 
                
                if (i === trivia.q.length) {
                    $("#m").append(trivia.messages[3]);
                    clearInterval();
                }
            }
        })

            //printing times out message (tom) if no answer chosen
        if (!eti) {
            $("#m").html(trivia.messages[2]);

            if (i === trivia.q.length) {
                $("#m").append(trivia.messages[3]);
                clearInterval();
            }
        }

        //iterate counter to move onto next question/answer pair
        i++;
    },

    //define gameplay method
    gameplay: function() {

        //run game for first question before timer starts
        trivia.gamelogic(0);

        //create counter equal to question and answer number
        var i = 1;

        //set interval for game to run on
        setInterval( trivia.gamelogic(i), 3000)
    }
}

//run game when page is fully loaded
$(document).ready(trivia.gameplay());