import { LightningElement } from 'lwc';

export default class AppContainer extends LightningElement {
    main = true;
    caseMgmt = false;
    accountMgmt = false;

    navigate(e){
        console.log(e.detail);
        switch(e.detail){
            case 'Home' :
                this.main = true;
                this.caseMgmt = false;
                this.accountMgmt = false;
                break;
            case 'Account Management':
                this.main = false;
                this.caseMgmt = false;
                this.accountMgmt = true;
                break;
            case 'Case Management':
                this.main = false;
                this.caseMgmt = true;
                this.accountMgmt = false;
                break;
        }
    }
}