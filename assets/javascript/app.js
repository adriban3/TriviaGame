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

    //define gameplay method
    gameplay: function() {

        //create counter equal to question and answer number
        var i = 1;

        //initial first question and buttons
        $("#q").html(trivia.q[0]);
        $("#a").html("<button id=true>True</button> <button id=false>False</button>")

        //set interval for game to run on
        setInterval( function() {

            //adding each question to questions div in HTML
            $("#q").html(trivia.q[i]);

            //create true and false buttons for user to select answer
            $("#a").html("<button id=true>True</button> <button id=false>False</button>");

            //if statements to check if user selected true or false and whether or not chosen answer is correct
            $(document).on("click", "button", function() {

                //printing right answer message (ram) if correct answer chosen
                if (trivia.a[i] === event.target.id) {
                    $("#m").html(trivia.messages[0]);

                    //appending final answer message prompting user to restart the game, clearing interval to stop game from running again once all questions have been asked
                    if (i === trivia.q.length) {
                        $("#m").append(trivia.messages[3]);
                        clearInterval();
                    }
                }

                else if (!(trivia.a[i] === event.target.id) && event.target.id) {
                    $("#m").html(trivia.messages[1]); 
                    
                    if (i === trivia.q.length) {
                        $("#m").append(trivia.messages[3]);
                        clearInterval();
                    }
                }

                else if (!event.target.id) {
                    $("#m").html(trivia.messages[2]);

                    if (i === trivia.q.length) {
                        $("#m").append(trivia.messages[3]);
                        clearInterval();
                    }
                }
            })
            
            //iterate counter to move onto next question/answer pair
            i++;

        }, 30000)
    }
}

//run game when page is fully loaded
$(document).ready(trivia.gameplay());