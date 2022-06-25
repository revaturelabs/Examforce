import { LightningElement, wire, api } from 'lwc';
import getfetchExam from '@salesforce/apex/fetchExam.fetchExam';

export default class Exam extends LightningElement {
    questionData;
    questionBody;
    position = 0;
    currentQuestion = this.position + 1;
    ExamLength;
    @wire(getfetchExam)

    handleExam({error, data}){
        if(data){
            this.ExamLength = data.length;
            this.questionData = data[this.position];
            this.questionBody = this.questionData.Body__c;
            console.log(this.questionData);
        } else if (error){
            console.log(error);
        } 
    }
    
}