/*
exam.js
Developer: Trenton & Kory 
Date Created: 06/22/22
Last Modified: 07/1/22
Description: To be rendered when AssignedExam is clicked, display questions associted with assigned exam
*/
import { LightningElement, wire, api } from 'lwc';
import getfetchExam from '@salesforce/apex/fetchExam.fetchExam';
import examDML from "@salesforce/apex/answeredQCreator.AnsweredQCreator";
import Description from '@salesforce/schema/Case.Description';
import Subject from '@salesforce/schema/Case.Subject';

export default class Exam extends LightningElement {
    @api examid;
    @api recordId;
    @api objectApiName;
    assignedExamid;
    questionArray = [];
    caseSubject = Subject;
    caseDescription = Description;


    Examinfo;     //Exam info to store data from the apex class that does a SOQL(fetchExam) to get the questions


    questionData;     //Question Data holds question possible answers
    questionBody;     //Question body is the body of the current question
    position = 0;     //postion is the position in the current array of questions this referes to position 0 as the start
    currentQuestion = (this.position + 1);     //current questions is the position that will display on the exam
    ExamLength;     //current questions is the position that will display on the exam

    ExamName;
    ExamTime;
    countDownDate;
    timer = '0:0:0';
    remainingTime = 0;
    isFlagged = false;
    flaggedQuestion;
    submitPopUp = false;
    scorePopUp = false;
    questionsMarkedForReview = 0;
    questionsUnanswered = 0;
    totalScore = 0;
    passFail = 'failed';
    userAnswer;     //hold current user's answer and previous answer

    multipleChoice = true;     //question type

    apexWireId;     //variable wire for apex

    @wire(getfetchExam,{q : '$apexWireId'})
    handleExam({error, data}){     //handleExam will handle the data or exam assigned
        if(data){
            this.ExamName = this.examid.name;
            this.ExamTime = this.examid.duration;
            this.assignedExamid = this.examid.assignedid;
            this.Examinfo = data;
            this.ExamLength = data.length;
            this.examData();
            this.createAnswer(data);
            this.startExam();
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
        this.questionBody = this.questionData.Question__r.Body__c;

    }
    //next button to navigate through questions
    next() {
        if(this.currentQuestion >= this.ExamLength){
            //submit function
        } else {
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
                this.currentQuestion = div.title;
                this.updateQuestion();
            };
            nav.appendChild(div);
        }
    };
    //factory function to create js objects to store question/answer information
    ExamQuestion(assignedExamId,questionId,questionNum, correct, picked, stat){
        return {
            assignedExamId,
            questionId,
            questionNum,
            correct,
            picked,
            stat       }
    }
    createAnswer(examInfo) {
        let assignedExamId = this.assignedExamid;
        for(let i=0;i<examInfo.length;i++){
            let questionId = examInfo[i].Question__r.Id;
            let questionNum= (i+1);
            let correct = examInfo[i].Question__r.Correct_Answer__c;
            let picked = null;
            let stat = 'unanswered';
            let question = this.ExamQuestion(assignedExamId,questionId,questionNum, correct, picked, stat);
            this.questionArray.push(question);
        }
    }
    startExam() {
        var parentThis = this;
        //console.log(this.ExamTime);
        this.remainingTime = (this.ExamTime * 60) * 1000;
        // Run timer code in every 100 milliseconds
        this.countDownDate = setInterval(function() {
  
            // Time calculations for hours, minutes, seconds and milliseconds
            var hours = Math.floor((parentThis.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((parentThis.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((parentThis.remainingTime % (1000 * 60)) / 1000);
            
            // Output the result in the timeVal variable
            parentThis.timer = hours + ":" + minutes + ":" + seconds ;
            parentThis.remainingTime -= 1000;
            if (hours == 0 && minutes == 0 && seconds ==0) {
                    parentThis.submitExam();
            }
            if (hours <= 0 && minutes <= 0 && seconds <=0) {
                parentThis.timer = '0:0:0';
            }
        }, 1000);
    }

    updateQuestion(){
        if(this.questionArray[this.position].picked != null) {
            this.userAnswer = this.questionArray[this.position].picked;
        }
        this.examData();
    }

    markForReview(){
        this.questionArray[this.position].stat = 'review';
        this.questionNav();
    }
    switchIsFlagged(){
        this.flaggedQuestion = this.questionData.Question__c;
        //this.flaggedQuestion = this.examInfo[this.position].Question__r.id;
        this.isFlagged = !this.isFlagged;
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
            { label: this.questionData.Question__r.Answer_A__c, value: 'A' },
            { label: this.questionData.Question__r.Answer_B__c, value: 'B' },
            { label: this.questionData.Question__r.Answer_C__c, value: 'C' },
            { label: this.questionData.Question__r.Answer_D__c, value: 'D' },
        ];
    }
    checkQuestions(){
        this.submitPopUp = true;
        for(let i =0; i< this.questionArray.length; i++){
            if(this.questionArray[i].stat == 'unanswered'){
                this.questionsUnanswered = this.questionsUnanswered + 1;
            }   
            if(this.questionArray[i].stat == 'review'){
                this.questionsMarkedForReview = this.questionsMarkedForReview + 1;
            }   
        }
        if (this.questionsMarkedForReview == 0 && this.questionsUnanswered == 0) {
            this.scorePopUp = true;
            this.submitPopUp = false;
            this.submitExam();
        }
    }
    submitExam(){
        this.submitPopUp = false;
        this.scorePopUp = true;
        this.totalScore = 0;
        for(let i =0; i< this.questionArray.length; i++){
            if (this.questionArray[i].correct == this.questionArray[i].picked) {
                this.totalScore = this.totalScore + 1;
            }
        }
        this.totalScore = Math.floor((this.totalScore / this.questionArray.length) * 100);
        if (this.totalScore > 70) {
            this.passFail = 'passed'
        }
        this.dml();
    }
    exitSubmit() {
        this.questionsMarkedForReview = 0;
        this.questionsUnanswered = 0;
        this.submitPopUp = false;
        this.scorePopUp = false;
    }
    dml(){
        let qArray = [];

        function JsonFactory(Assigned_Exam__c,Question__c,Answered_Correctly__c,User_Answer__c){
            return {
                Assigned_Exam__c,
                Question__c,
                Answered_Correctly__c,
                User_Answer__c
            }
        };
        for(let  i=0; i< this.questionArray.length; i++){
            let correct = false;
            if (this.questionArray[i].correct == this.questionArray[i].picked) {
                correct = true;
            }
            let Question = JsonFactory(this.questionArray[i].assignedExamId, this.questionArray[i].questionId, correct, this.questionArray[i].picked);
            qArray.push(Question);
        }
        examDML({s : JSON.stringify(qArray)})
    }

    close(){
        this.dispatchEvent(new CustomEvent ('close'));
    }
    renderedCallback() {
        this.apexWireId = this.examid.examid;
        this.questionNav();
    }
    
}