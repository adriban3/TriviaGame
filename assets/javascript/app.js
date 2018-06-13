//define game object
var trivia = {

    //define questions sub-object
    q: {
        q0: "question 0",
        q1: "question 1",
        q2: "question 2",
        q3: "question 3",
        q4: "question 4",
        q5: "question 5",
        q6: "question 6",
        q7: "question 7",
        q8: "question 8",
        q9: "question 9",
    },

    //define answers sub-object
    a: {
        a0: "true",
        a1: "false",
        a2: "true",
        a3: "false",
        a4: "true",
        a5: "false",
        a6: "true",
        a7: "false",
        a8: "true",
        a9: "false",
    },

    //define messages sub-object
    messages: {
        ram: "Correct!  Prepare for next question",
        wam: "Incorrect idiot.  Prepare for next question",
        tom: "Time is up, too slow dork.  Prepare for next question",
        fam: "Game over, see results below.  Would you like to play again?",
    },

    //Method displays appropriate message when user runs out of time
    timeUp: function() {
        $("#m").html(this.messages.tom);
    },

    //define gameplay method
    gameplay: function() {

        //loop through all questions in question object
        for (i = 0; i < q.length; i++) {

            //adding each question to questions div in HTML
            $("#q").html(this.q["q" + i]);

            //create true and false buttons for user to select answer
            $("#a").html("<button class=true>True</button> <button class=false>False</button>");

            //start timer for thirty seconds after question is printed on screen; calls timeUp method if time runs out
            setTimeOut(function() { this.timeUp() }, 1000 * 30);

            //if statements to check if user selected true or false and whether or not chosen answer is correct
            if ($("true").click()) {

                //printing right answer message (ram) if correct answer chosen
                if (this.a[i] === "true") {
                    $("#m").html(this.messages.ram);

                    //appending final answer message prompting user to restart the game
                    if (i === q.length -1) {
                        $("#m").append(this.messages.fam);
                    }
                }

                //printing wrong answer message (wam) if wrong answer chosen
                else {
                    $("#m").html(this.messages.wam);

                    if (i === q.length -1) {
                        $("#m").append(this.messages.fam);
                    }
                }
            }

            else if ($("false").click()) {

                if (this.a[i] === "false") {
                    $("#m").html(this.messages.ram); 
                    
                    if (i === q.length -1) {
                        $("#m").append(this.messages.fam);
                    }
                }

                else {
                    $("#m").html(this.messages.wam);

                    if (i === q.length -1) {
                        $("#m").append(this.messages.fam);
                    }
                }
            }
        }
    }
}

//run game when page is fully loaded
$(document).ready(trivia.gameplay());