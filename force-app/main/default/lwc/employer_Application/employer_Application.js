import { LightningElement,track } from 'lwc';

export default class Employer_Application extends LightningElement {
    @track value = [];
    @track businessvalue = [];
    @track membervalue = [];
    @track employvalue = [];  
    @track coveragevalue = [];
    @track borrowvalue = [];
    @track crewvalue = [];
    @track performvalue = [];
    @track contractorvelue = [];

    @track otherBusiness = false;
    get options() {
        return [
            { label: 'Stevedoring/Terminal', value: 'Stevedoring_Terminal' },
            { label: 'Shipbuilding / Ship Repair', value: 'Shipbuilding_ShipRepair' },
            { label: 'Offshore', value: 'Offshore' },
            { label: 'Marine Construction', value: 'Marine_Construction' },
            { label: 'Professional/Technical', value: 'Professional_Technical' }
            
        ];
    }


    get businessoptions() {
        return [
            { label: 'New Business', value: 'NewBusiness' },
            { label: 'Newly Acquired Business', value: 'Newly_Acquired_Business' },
            { label: 'Change in business operations', value: 'Change_in_business_operations' },
            { label: 'Parent Company or Subsidiary Operation', value: 'Parent_Company_or_Subsidiary_Operation' }
            
        ];
    }

    get mainmember() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
            
            
        ];
    }

    get relatedemploy() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
            
            
        ];
    }

    get statecoverage() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
            
            
        ];
    }

    get charterborrow() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
            
            
        ];
    }

    get MasterMember() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
            
            
        ];
    }

    get performwork() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
            
            
        ];
    }

    get maritimecoverages() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
            
            
        ];
    }

    
    handleChange(event){
        this.value = event.detail.value; 
        console.log('selected values',this.value);    
    }

    businesshistory(event){
        this.businessvalue = event.detail.value; 
        console.log('selected values',this.businessvalue);    
    }

    member(event){
        this.membervalue = event.detail.value; 
        console.log('selected values',this.membervalue);    
    }

    employemployer(event){
        this.employvalue = event.detail.value; 
        console.log('selected values',this.employvalue);    
    }

    coverage(event){
        this.coveragevalue = event.detail.value; 
        console.log('selected values',this.coveragevalue);    
    }

    charterorborrow(event){
        this.borrowvalue = event.detail.value; 
        console.log('selected values',this.borrowvalue);    
    }

    MastetMembercrew(event){
        this.crewvalue = event.detail.value; 
        console.log('selected values',this.crewvalue);    
    }

    performanywork(event){
        this.performvalue = event.detail.value; 
        console.log('selected values',this.performvalue);    
    }

    maritimecoveragescontractor(event){
        this.contractorvelue = event.detail.value; 
        console.log('selected values',this.contractorvelue);    
    }
}