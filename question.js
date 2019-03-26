function Question(id, text, choices, answer) {
    this.id= id
    this.text = text;
    this.choices = choices;
    this.selectedAnswer = answer;
}

Question.prototype.setSelectedOption = function(choice) {
    this.selectedAnswer = choice;
    return true;
}

Question.prototype.selectedOption = function(choice) {
    return this.selectedAnswer
}
