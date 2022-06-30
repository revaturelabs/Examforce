/*
exam.js
Developer: Trenton & Kory 
Date Created: 06/22/22
Last Modified: 06/25/22
Description: To be rendered when AssignedExam is clicked, display questions associted with assigned exam
*/
import { LightningElement, wire, api } from 'lwc';
import getfetchExam from '@salesforce/apex/fetchExam.fetchExam';
// import examDuration from '@salesforce/apex/examDuration.examDuration';

export default class Exam extends LightningElement {
    // examid = 'a028Z00000ZvgokQAB';
    @api examid;
    questionArray = [];

    //Exam info to store data from the apex class that does a SOQL(fetchExam) to get the questions
    Examinfo;
    //Question Data holds question possible answers
    //Question body is the body of the current question
    questionData;
    questionBody;
    //postion is the position in the current array of questions this referes to position 0 as the start
    //current questions is the position that will display on the exam
    //exam length will display exam length
    position = 0;
    currentQuestion = (this.position + 1);
    ExamLength;

    ExamName;
    ExamTime;
    countDownDate;
    timer = '0:0:0';
    remainingTime = 0;

    //hold current user's answer and previous answer
    userAnswer;

    //question type
    multipleChoice = true;
    //handleExam will handle the data or exam assigned
    // @wire(examDuration)
    
    // handleDuration({error, data}){
    //     if(data){
    //         this.ExamTime = data[0].Exam__r.Duration__c;
    //         this.ExamName = data[0].Exam__r.Name;
    //         this.startExam();
    //     } else if (error){
    //         console.log(error);
    //     } 
    // }
    //wire for apex
    // @wire(getfetchExam)
    @wire(getfetchExam,{q : '$examid'})
    //handleExam will handle the data or exam assigned
    handleExam({error, data}){
        if(data){
            console.log(this.examid);
            console.log(data);
            this.Examinfo = data;
            this.ExamLength = data.length;
            this.examData();
            this.createAnswer(data);
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
            // console.log(this.questionArray[this.position].picked);
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
    timeout(){

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
    isFlagged = false;
    flaggedQuestion;
    submitPopUp = false;
    scorePopUp = false;
    questionsMarkedForReview = 0;
    questionsUnanswered = 0;
    totalScore = 0;
    passFail = 'failed';
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
        for(let i =0; i< this.questionArray.length; i++){
            if (this.questionArray[i].correct == this.questionArray[i].picked) {
                this.totalScore++;
            }
        }
    }
    exitSubmit() {
        this.questionsMarkedForReview = 0;
        this.questionsUnanswered = 0;
        this.submitPopUp = false;
        this.scorePopUp = false;
    }
    renderedCallback() {
        this.questionNav();
    }
    
}