import { LightningElement, wire } from 'lwc';
import getFirstName from '@salesforce/apex/userHelper.getUserName'
import basePath from "@salesforce/community/basePath";
import getLogoutUrl from '@salesforce/apex/applauncher.IdentityHeaderController.getLogoutUrl';
import firstName from '@salesforce/apex/getName.getFirstName'
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

    @wire(firstName)
    firstName;


    get logoutLink() {
        const sitePrefix = basePath.replace(/\/s$/i, ""); // site prefix is the site base path without the trailing "/s"
        return sitePrefix + "/secur/logout.jsp";
    }

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
        console.log('Please respond');
    }


       //Storing the data within a property

    //Passing as a method
    // handleFirstName({error, data}){
    //     if(data){

    //     } else if (error){
    //         console.error(error.message());
    //     }
    // }

}