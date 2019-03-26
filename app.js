function populate() {
    if(quiz.isEnded()) {
        var element = document.getElementById("question");
        showEnd();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestion().text;
        var next = document.getElementById("nextButton");
        next.setAttribute("disabled", true);
        // show options
        var choices = quiz.getQuestion().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("option_" + i);
            var radioElement = document.getElementById("choice_" + i);
            radioElement.setAttribute("name", quiz.getQuestion().id)
            radioElement.setAttribute("value", quiz.getQuestion().id+"_"+i)
            element.innerHTML = choices[i];
            if(quiz.getQuestion().selectedAnswer){
               console.log("callll")
                var selectedOption = document.querySelector('input[value='+quiz.getQuestion().selectedAnswer+']')
                console.log(selectedOption)
                if(selectedOption) {
                    selectedOption.checked = true;
                    var next = document.getElementById("nextButton");
                    next.removeAttribute("disabled");
                }
            }
            radioElement.onclick = function() {
                this.setAttribute("checked", true);
                quiz.answerSelected(this.value)
                activeNextButton(quiz.getQuestion())
            }
            activePrevButton(i)
        }
        showProgress();
    }
};

function activeNextButton() {
    var next = document.getElementById("nextButton");
    next.removeAttribute("disabled");
    next.onclick = function() {
        var selectedOption = document.querySelector('input[type=radio]:checked');
        if(!selectedOption) {
            next.removeAttribute("disabled");
        }
        quiz.next();
    	selectedOption.checked = false;
        populate();
    }
};


function activePrevButton(index) {
    var prev = document.getElementById("prevButton");
    if(quiz.getQuestionIndex()){
        prev.classList.remove("hide");
    }
    prev.onclick = function() {
        var res = quiz.prev();
        populate();
    }
};

function showEnd(index) {
    var end = document.getElementById("endContainer");
    var qc = document.getElementById("quizContainer");
    qc.classList.add("hide");
    end.classList.remove("hide");
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
var questions=[
	{id:'Q-101', title:'What is India\'s capital', type:'radiogroup', options:['Delhi','Mumbai','Kolkatta','Pune']},
	{id:'Q-102', title:"Grand Central Terminal, Park Avenue, New York is the world's", type:'radiogroup', options:['largest railway station','highest railway station','longest railway station','None of the above']},
	{id:'Q-103', title:'Entomology is the science that studies', type:'dropdown', options:['Behavior of human beings','Insects','The origin and history of technical and scientific terms','The formation of rocks']}
]

var questionsToLoad =   questions.map(function(question,index){
    return new Question(question.id, question.title, question.options)
});

var quiz = new Quiz(questionsToLoad);

populate();