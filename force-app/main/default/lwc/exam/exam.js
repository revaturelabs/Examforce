/*
exam.js
Developer: Trenton & Kory 
Date Created: 06/22/22
Last Modified: 06/25/22
Description: To be rendered when AssignedExam is clicked, display questions associted with assigned exam
*/
import { LightningElement, wire, api } from 'lwc';
import getfetchExam from '@salesforce/apex/fetchExam.fetchExam';
import EmailPreferencesStayInTouchReminder from '@salesforce/schema/User.EmailPreferencesStayInTouchReminder';

export default class Exam extends LightningElement {
    questionArray = [];
    // answered = [correct, picked, stat];
    // answer = {correct: 'c', picked: empty , }
    //pciekd answer
    //correct answer
    // answered.forEach(element => {
    //     total score = this.examData.length
    //     [0]==[1] = correct answered
    //     totalscore++ 


    // });

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
    //wire for apex
    @wire(getfetchExam)
    //handleExam will handle the data or exam assigned
    handleExam({error, data}){
        if(data){
            this.Examinfo = data;
            this.ExamLength = data.length;
            this.examData();
            this.createAnswer(this.Examinfo, this.ExamLength);
            console.log(data);
            //console.log(this.questionData);
        } else if (error){
            console.log(error);
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
            this.position = this.position + 1;
            this.currentQuestion = this.currentQuestion + 1;
            this.examData();
        }
    }

    //next button to navigate through questions
    previous() {
        if(this.currentQuestion == 1){
            //do nothing
        } else {
            this.position = this.position - 1;
            this.currentQuestion = this.currentQuestion - 1;
            this.examData();
        }
    }
    questionNav(){
        const nav = this.template.querySelector('.list');
        nav.innerHTML = ``;
        for(let i=0; i<this.ExamLength; i++) {
            let div = document.createElement('lightning-button');
            div.classList.add('navButton');
            div.title = (i+1);
            
            div.innerText = div.title;
            div.onclick = () => {
                this.position = i;
                console.log(this.position);
                this.currentQuestion = div.title;
                console.log(this.currentQuestion);
                console.log(this.Examinfo);
                this.examData();
            };
            nav.appendChild(div);
        }
    };
    ExamQuestion(questionNum, correct, picked, stat){
        return {
            questionNum,
            correct,
            picked,
            stat       }
    }
    createAnswer(examInfo, length) {
        for(let i=0;i<length;i++){
            console.log('works');
            let questionNum= (i+1);
            let correct = examInfo[i].Correct_Answer__c;
            let picked = null;
            let stat = 'unanswered';
            let question = this.ExamQuestion(questionNum, correct, picked, stat);
            this.questionArray.push(question);
        }

        console.log(this.questionArray[0].questionNum);
        console.log(this.questionArray[0].correct);
        console.log(this.questionArray[0].picked);
        console.log(this.questionArray[0].stat);
    }
    renderedCallback() {
        this.questionNav();
    }
    
}