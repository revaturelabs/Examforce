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
    @api examid; //this is an object from main.html/js that contains Exam__c.id Exam__c.duration Exam__c.name and Assigned_Exam__c.id
    @api recordId;
    @api objectApiName;
    assignedExamid; //set as id from (@api examid) object
    questionArray = []; //store objects from Examquestion factory function
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

    multipleChoice = false;     //question type
    multiSelect = false;
    matching = false;

    

    apexWireId;     //variable wire for apex

    @wire(getfetchExam,{q : '$apexWireId'})
    handleExam({error, data}){     //handleExam will handle the data or exam assigned only create data if the @wire is successful
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
        //set the userAnswer from the current question
        this.userAnswer = event.target.value;
        console.log(this.userAnswer);
        if (this.questionData.Question__r.Type__c == 'Multiple Select') {
            this.userAnswer = this.userAnswer.toString();
            this.userAnswer = this.userAnswer.replace(/,/g, ';');
        }
        this.questionArray[this.position].picked = this.userAnswer;
        //determine what status the question should have
        if(this.questionArray[this.position].stat != 'review'){
            console.log(this.questionArray[this.position].stat);
            if(this.questionArray[this.position].stat == 'unanswered'){
                this.questionArray[this.position].stat = 'answered';
            }
        }
    }
    //this updates the exam info when next or previous is selected
    examData(){
        //when run should update current question information
        this.questionData = this.Examinfo[this.position];
        this.questionBody = this.questionData.Question__r.Body__c;
        if (this.questionData.Question__r.Type__c == 'Multiple Select') {
            this.multiSelect = true;
            this.multipleChoice = false;
            this.matching = false;
        } else {
            this.multiSelect = false;
            this.multipleChoice = true;
            this.matching = false;
        }
    }
    //next button to navigate through questions
    next() {
        if(this.currentQuestion >= this.ExamLength){
            //submit function
        } else {
            //clear current answer and update position to the next question
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
            //inverse of next
            this.position = (this.position - 1);
            this.currentQuestion--;
            if (this.questionArray[this.position].picked == null){
                this.userAnswer = '';
            }
            this.updateQuestion();
        }
    }
    questionNav(){
        //dynamic boxes in the nav section - loop over every item in the question array and add a box to the nav with the question number inside
        const nav = this.template.querySelector('.list');
        nav.innerHTML = ``;
        if(this.questionArray[this.position].picked != null) {
            this.userAnswer = this.questionArray[this.position].picked;
        } else {
            this.userAnswer = '';
        }
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
                    div.classList.remove('review');
                    div.classList.remove('unanswered');
                  break;
                  case 'flagged':
                    div.classList.remove('answered');
                    div.classList.add('flagged');
                    div.classList.remove('review');
                    div.classList.remove('unanswered');
                  break;
                default:
                    div.classList.remove('answered');
                    div.classList.remove('flagged');
                    div.classList.remove('review');
                    div.classList.add('unanswered');
              }
            div.title = (i+1);
            
            div.innerText = div.title;
            div.onclick = () => {
                this.position = i;
                this.currentQuestion = div.title;
                this.updateQuestion();
            };
            //this only works due to lwc:dom=manual in the html
            nav.appendChild(div);
        }
    };
    //factory function to create js objects to store question/answer information
    ExamQuestion(assignedExamId,questionId,questionNum, correct, picked, stat){
        return {
            //these are keys in the objects and above are the parameters passed in, best way to create objects in JS
            assignedExamId,
            questionId,
            questionNum,
            correct,
            picked,
            stat       }
    }
    createAnswer(examInfo) {
        //this fills the question array with those Exam Question objects, this also stores all the correct answers and user answers 
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
        //this is a weird timer. the parentThis is needed and i couldn't change it to the 'this' keyword also for some reason the date functions wouldn't work
        //so this is just generated without dates
        var parentThis = this;
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
        //call this to update question body ans answers - also fills in previously answered questions
        if(this.questionArray[this.position].picked != null) {
            this.userAnswer = this.questionArray[this.position].picked;
        }
        this.examData();
    }

    markForReview(){
        //sets reivew status to supercede other statues
        if(this.questionArray[this.position].stat != 'review'){
            this.questionArray[this.position].stat = 'review';
        }
         else if (this.questionArray[this.position].picked != null) {
            this.questionArray[this.position].stat = 'answered';
        } else {
            this.questionArray[this.position].stat = 'unanswered';
        }
        this.questionNav();
    }
    switchIsFlagged(){
        //toggles flag on and gets the question ID
        this.flaggedQuestion = this.questionData.Question__c;
        if(this.questionArray[this.position].stat != 'review'){
            this.questionArray[this.position].stat = 'flagged';
        }
        //this.flaggedQuestion = this.examInfo[this.position].Question__r.id;
        this.isFlagged = !this.isFlagged;
    }
    get options() {
        //sets question options for multiple choice - there may need to be a large switch statement for the different questions
        if (this.questionData == undefined){
            return [
                { label: '', value: 'A' },
                { label: '', value: 'B' },
                { label: '', value: 'C' },
                { label: '', value: 'D' },
            ];
        }
        if (this.questionData.Question__r.Type__c == 'True False') {
            return [
                { label: this.questionData.Question__r.Answer_A__c, value: 'A' },
                { label: this.questionData.Question__r.Answer_B__c, value: 'B' },
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
        //this is the start of submit button, checks to see if any questions are unanswered or marked for review, if not it will submit exam
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
        //this is the final submit popup that shows score and pass/fail 
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
    //this calls an apexclass to do a dml statement to send answered questions to the answered question object
    dml(){
        //apex JSON needs the objects to be stored in an array
        let qArray = [];
        //another factory function to store objects
        function JsonFactory(Assigned_Exam__c,Question__c,Answered_Correctly__c,User_Answer__c){
            return {
                Assigned_Exam__c,
                Question__c,
                Answered_Correctly__c,
                User_Answer__c
            }
        };
        //check if answers are correct
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
    //closes the exam in the main component
    close(){
        this.dispatchEvent(new CustomEvent ('close'));
    }
    connectedCallback() {
        this.apexWireId = this.examid.examid;
    }
    //updates the question nav with the new status and inside quesiton nav it clears the old ones
    renderedCallback() {
        this.questionNav();
    }
    
}