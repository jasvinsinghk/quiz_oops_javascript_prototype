function Quiz(questions) {
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestion = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.answerSelected = function(answer) {
    this.getQuestion().setSelectedOption(answer)
    
}

Quiz.prototype.next = function() {
    this.questionIndex++;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questionIndex;
}

Quiz.prototype.prev = function(answer) {
    if(this.questionIndex-1 > -1){
        --this.questionIndex
        return true;
    } 
    return false;
}
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

Quiz.prototype.isLast = function() {
    return this.questionIndex === this.questions.length-1;
}