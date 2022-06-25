import { LightningElement, api } from 'lwc';

export default class RadioGroupBasic extends LightningElement {
    

    get options() {
        if (this.value == undefined){
            return [
                { label: 'Sales', value: 'option1' },
                { label: 'Force', value: 'option2' },
                { label: 'Good', value: 'option3' },
                { label: 'Burger', value: 'option4' },
            ];
        }
        return [
            { label: this.value.Answer_A__c, value: 'option1' },
            { label: this.value.Answer_B__c, value: 'option2' },
            { label: this.value.Answer_C__c, value: 'option3' },
            { label: this.value.Answer_D__c, value: 'option4' },
        ];
    }

    @api value;
  
}