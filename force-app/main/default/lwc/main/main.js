import { LightningElement, wire } from 'lwc';
import getFirstName from '@salesforce/apex/userHelper.getUserName'
// import getExam from '@salesforce/apex/userHelper.getExam';
//console.log(examName);

export default class Main extends LightningElement {

    examList = true;
    renderExam = false;
    examId;
    @wire(getFirstName)
    examName;

    startExam(e){
        this.examList = false;
        this.renderExam = true;
        this.examId = e.target.value;
    }
    closeExam(){
        this.renderExam = false;
        this.examId = '';
    }
    renderedCallback(){
        console.log(this.examName);
    }

}