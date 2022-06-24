import { LightningElement } from 'lwc';
import { getPicklistValues } from 'ExamObject';
 
export default class ConditionalRendering extends LightningElement {
    
    //Default to false
    displayDetails = false;
 
    handleClick() {
        //Toggle display details attribute
        this.displayDetails = !this.displayDetails;
    }
 
}
export default class Flagged extends LightningElement {
    @wire(getPicklistValues, {
        recordTypeId: 'ExamObject', // Default record type Id
        fieldApiName: QUESTION_FIELD
    })
    getIndustryPicklistValues({ error, data }) {
        if (data) {
            /*
            Do something with data.defaultValue and data.values[]
            Values are represented as objects like this:
            {
                attributes: null,
                label: "Agriculture",
                validFor: [],
                value: "Agriculture"
            }
            */
        } else if (error) {
            // Handle error
        }
    }
}