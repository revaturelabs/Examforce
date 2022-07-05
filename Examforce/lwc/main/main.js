/*
exam.js
Developer: Yura & Kory & Trenton
Date Created: 06/22/22
Last Modified: 07/1/22
Description: To be rendered when main is clicked, display questions associted with assigned exam
*/
import { LightningElement, wire } from 'lwc';
import getExam from '@salesforce/apex/userHelper.getExamInfo'; 
import getLogoutUrl from '@salesforce/apex/applauncher.IdentityHeaderController.getLogoutUrl'; 
import basePath from "@salesforce/community/basePath";
import firstName from '@salesforce/apex/getName.getFirstName';

export default class Main extends LightningElement {
    examList = true;
    renderExam = false;
    examId;
    assingedid;
    duration;
    exam;
    @wire(getExam)
    examName;

    @wire(firstName)
    firstName;

    startExam(e){
        //on click of exam send the details of the exam to the exam component
        this.examList = false;
        this.renderExam = true;
        this.examId = this.createObj(e.target.value,e.target.assigned,e.target.duration,e.target.name);
    }
    createObj(examid,assignedid,duration,name) {
        //this is a factory function to create an object to send to the exam component, Exam__C.id Assigned_Exam__c.id Duration__c.id and Exam__c.name
        return {
            examid,
            assignedid,
            duration,
            name
        }
    }
    closeExam(event){
        this.examList = true;
        this.renderExam = false;
        this.examId = '';
    }
    get logoutLink() { 
        const sitePrefix = basePath.replace(/\/s$/i, "");
    return sitePrefix + "/secur/logout.jsp"; 
}
    renderedCallback(){
    }

}