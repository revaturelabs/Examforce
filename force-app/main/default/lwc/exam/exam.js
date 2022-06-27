/*
exam.js
Developer: Trenton & Kory 
Date Created: 06/22/22
Last Modified: 06/25/22
Description: To be rendered when AssignedExam is clicked, display questions associted with assigned exam
*/
import { LightningElement, wire, api, track } from 'lwc';
import getfetchExam from '@salesforce/apex/fetchExam.fetchExam';

export default class Exam extends LightningElement {
    questionArray = [];

    //Exam info to store data from the apex class that does a SOQL to get the questions
    Examinfo;
    //Question Data holds question possible answers
    questionData;
    //Question body is the body of the current question
    questionBody;
    //postion is the position in the current array of questions this referes to position 0 as the start
    position = 0;
    //current questions is the position that will display on the exam
    currentQuestion = (this.position + 1);
    //exam length will display exam length
    ExamLength;

    userAnswer;

    multipleChoice = true;

    //wire for apex
    @wire(getfetchExam)
    //handleExam will handle the data or exam assigned
    handleExam({error, data}){
        if(data){
            this.Examinfo = data;
            this.ExamLength = data.length;
            this.examData();
            this.createAnswer(data);
            console.log(data);
        } else if (error){
            console.log(error);
        } 
    }
    setAnswer(event){
        this.userAnswer = event.target.value;
        this.questionArray[this.position].picked = this.userAnswer;
        if(this.questionArray[this.position].stat = 'unanswered'){
            this.questionArray[this.position].stat = 'answered';
        }
    }
    //this updates the exam info when next or previous is selected
    examData(){
        this.questionData = this.Examinfo[this.position];
        this.questionBody = this.questionData.Body__c;

    }
    //next button to navigate through questions
    next() {
        if(this.currentQuestion >= this.ExamLength){
            //submit function
        } else {
            console.log(this.questionArray[this.position].picked);
            this.userAnswer = '';
            this.position = (this.position + 1);
            this.currentQuestion++;
            this.updateQuestion();
        }
    }
    //next button to navigate through questions
    previous() {
        if(this.currentQuestion == 1){
            //do nothing
        } else {
            this.position = (this.position - 1);
            this.currentQuestion--;
            if (this.questionArray[this.position].picked == null){
                this.userAnswer = '';
            }
            this.updateQuestion();
        }
    }
    questionNav(){
        const nav = this.template.querySelector('.list');
        nav.innerHTML = ``;
        for(let i=0; i<this.ExamLength; i++) {
            let div = document.createElement('lightning-button');
            div.classList.add('navButton');
            //look to status in question array and apply class for key
            switch(this.questionArray[i].stat) {
                case 'review':
                    div.classList.remove('answered');
                    div.classList.remove('flagged');
                    div.classList.add('review');
                    div.classList.remove('unanswered');
                  break;
                case 'answered':
                    div.classList.add('answered');
                    div.classList.remove('flagged');
                    div.classList.remove('reivew');
                    div.classList.remove('unanswered');
                  break;
                  case 'flagged':
                    div.classList.remove('answered');
                    div.classList.add('flagged');
                    div.classList.remove('reivew');
                    div.classList.remove('unanswered');
                  break;
                default:
                    div.classList.remove('answered');
                    div.classList.remove('flagged');
                    div.classList.remove('reivew');
                    div.classList.add('unanswered');
              }
            div.title = (i+1);
            
            div.innerText = div.title;
            div.onclick = () => {
                this.position = i;
                // console.log(this.position);
                this.currentQuestion = div.title;
                // console.log(this.currentQuestion);
                // console.log(this.Examinfo);
                this.updateQuestion();
            };
            nav.appendChild(div);
        }
    };
    //factory function to create js objects to store question/answer information
    ExamQuestion(questionNum, correct, picked, stat){
        return {
            questionNum,
            correct,
            picked,
            stat       }
    }
    createAnswer(examInfo) {
        for(let i=0;i<examInfo.length;i++){
            let questionNum= (i+1);
            let correct = examInfo[i].Correct_Answer__c;
            let picked = null;
            let stat = 'unanswered';
            let question = this.ExamQuestion(questionNum, correct, picked, stat);
            this.questionArray.push(question);
        }

        // console.log(this.questionArray[0].questionNum);
        // console.log(this.questionArray[0].correct);
        // console.log(this.questionArray[0].picked);
        // console.log(this.questionArray[0].stat);
    }
    updateQuestion(){
        if(this.questionArray[this.position].picked != null) {
            this.userAnswer = this.questionArray[this.position].picked;
        }
        this.examData();
    }
    submitExam(){
        //submit logic
    }
    markForReview(){
        this.questionArray[this.position].stat = 'review';
        this.questionNav();
    }
    flagQuestion(){

    }
    get options() {
        if (this.questionData == undefined){
            return [
                { label: '', value: 'A' },
                { label: '', value: 'B' },
                { label: '', value: 'C' },
                { label: '', value: 'D' },
            ];
        }
        return [
            { label: this.questionData.Answer_A__c, value: 'A' },
            { label: this.questionData.Answer_B__c, value: 'B' },
            { label: this.questionData.Answer_C__c, value: 'C' },
            { label: this.questionData.Answer_D__c, value: 'D' },
        ];
    }


    renderedCallback() {
        this.questionNav();
    }
    
}