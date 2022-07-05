/*
exam.js
Developer: Kathryn & Matt
Date Created: 06/22/22
Last Modified: 07/1/22
Description: To be rendered when true false question is true
*/
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