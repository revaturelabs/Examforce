import { LightningElement } from 'lwc';
export default class shortAnswer extends LightningElement {

    //@api question;
    // @api possibleAnswers; Not really needed
    //@api correctAnswer;    
    
    //variable used to store Test takers input into the text area
    shortAnswer;

        //take input from textArea and update shortAnswer variable
        updateAnswer () {
            let textarea = this.template.querySelector('lightning-textarea');
            this.shortAnswer = textarea.value;
            console.log(textarea.value + '  Console test');
        }
}