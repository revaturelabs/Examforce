import { LightningElement, wire } from 'lwc';
import getFirstName from '@salesforce/apex/userHelper.getUserName'
// import getExam from '@salesforce/apex/userHelper.getExam';
//console.log(examName);

export default class Main extends LightningElement {
    //@api makes property public to parent component
    //@api let's parent component utilize child methods

    //data = [];
    //columns = columns;

    

    //@api propertyName;

    //@wire Brings apex into LWC
    //Referencing userHelper method getUserName
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