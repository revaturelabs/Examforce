import { LightningElement, api, wire, track } from 'lwc';

export default class TrueFalseQuestion extends LightningElement {

    @api question;
    // @api possibleAnswers; Not really needed
    @api correctAnswer;
    
    userAnswer;

    // Placeholder Values for @api variables | Will be deleted at implementation
    question = "Is Kat and Matt's component pretty awesome?"
    correctAnswer = true;

    logToConsole() {
        console.log(this.userAnswer);
    }

}