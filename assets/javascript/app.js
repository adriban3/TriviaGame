//define game object
var trivia = {

    //define questions sub-object
     qA: {
        q1: "question 1",
        a1: "answer 1",
        q2: "question 1",
        a2: "answer 1",
        q3: "question 1",
        a3: "answer 1",
        q4: "question 1",
        a4: "answer 1",
        q5: "question 1",
        a5: "answer 1",
        q6: "question 1",
        a6: "answer 1",
        q7: "question 1",
        a7: "answer 1",
        q8: "question 1",
        a8: "answer 1",
        q9: "question 1",
        a9: "answer 1",
        q10: "question 1",
        a10: "answer 1",
    }

    //define gameplay object
    gameplay: function() {

        for (i = 0; i < qA.length; i++) {
            $("qA").html(qA.q1);
            setTimeOut()
        }
    }
}