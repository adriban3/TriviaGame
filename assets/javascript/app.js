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

    //Method displays appropriate message when user runs out of time
    timeUp: function() {
        $("#m").html(this.messages[2]);
    },

    //define gameplay method
    gameplay: function() {

        //loop through all questions in question object
        for (var i = 0; i < this.q.length; i++) {

            //adding each question to questions div in HTML
            $("#q").html(this.q[i]);

            //create true and false buttons for user to select answer
            $("#a").html("<button class=true>True</button> <button class=false>False</button>");

            //start timer for thirty seconds after question is printed on screen; calls timeUp method if time runs out
            setTimeout(function() { trivia.timeUp() }, 1000 * 30);

            //if statements to check if user selected true or false and whether or not chosen answer is correct
            if ($(".true").click()) {

                //printing right answer message (ram) if correct answer chosen
                if (this.a[i] === "true") {
                    $("#m").html(this.messages[0]);

                    //appending final answer message prompting user to restart the game
                    if (i === q.length - 1) {
                        $("#m").append(this.messages[3]);
                    }
                }

                //printing wrong answer message (wam) if wrong answer chosen
                else {
                    $("#m").html(this.messages[1]);

                    if (i === q.length -1) {
                        $("#m").append(this.messages[3]);
                    }
                }
            }

            else if ($(".false").click()) {

                if (this.a[i] === "false") {
                    $("#m").html(this.messages[0]); 
                    
                    if (i === q.length -1) {
                        $("#m").append(this.messages[3]);
                    }
                }

                else {
                    $("#m").html(this.messages[1]);

                    if (i === q.length -1) {
                        $("#m").append(this.messages[3]);
                    }
                }
            }
        }
    }
}

//run game when page is fully loaded
$(document).ready(trivia.gameplay());