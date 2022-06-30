import { LightningElement, wire } from 'lwc';
import getFirstName from '@salesforce/apex/userHelper.getUserName';
import getLogoutUrl from '@salesforce/apex/applauncher.IdentityHeaderController.getLogoutUrl'; 
import basePath from "@salesforce/community/basePath"; 

export default class Main extends LightningElement {
    examList = true;
    renderExam = false;
    examId;
    assingedid;
    duration;
    exam;
    @wire(getFirstName)
    examName;
    startExam(e){
        this.examList = false;
        this.renderExam = true;
        this.examId = this.createObj(e.target.value,e.target.assigned,e.target.duration,e.target.name);
        //console.log(this.examId);

        // this.examId = e.target.value;
        // this.assingedid = e.target.assigned;
        // this.duration = e.target.duration;
        // this.exam = e.target.name;
    }
    createObj(examid,assignedid,duration,name) {
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
    // site prefix is the site base path without the trailing "/s" 
    return sitePrefix + "/secur/logout.jsp"; 
}
    renderedCallback(){
        //console.log(this.examName);
    }

}