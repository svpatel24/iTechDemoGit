import { LightningElement,track } from 'lwc';

export default class BusinessApplication extends LightningElement {
    @track businessValue = [];
    @track industryValue = [];
    @track ecRequireValue = [];
    @track actCoverageValue;

    @track otherBusiness = false;
    @track ecRequire = false;

    get options() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
        ];
    }

    get businessOptions() {
        return [
            { label: 'Individual', value: 'individual' },
            { label: 'Partnership', value: 'partnership' },
            { label: 'Corporation', value: 'corporation' },
            { label: 'Subchapter “S” Corp', value: 'subchapterSCorp' },
            { label: 'Limited Corp', value: 'limitedCorp' },
            { label: 'Other', value: 'other' },
        ];
    }

    get industryOptions() {
        return [
            { label: 'Stevedoring/Terminal', value: 'StevedoringTerminal' },
            { label: 'Shipbuilding / Ship Repair', value: 'ShipbuildingShipRepair' },
            { label: 'Offshore', value: 'offshore' },
            { label: 'Marine Construction', value: 'MarineConstruction' },
            { label: 'Professional/Technical', value: 'ProfessionalTechnical' }
            
        ];
    }

    get ecRequireOptions(){
        return [
            { label: 'Waiver of Subrogation', value: 'waiverofSubrogation' },
            { label: '30 Day Notice of Cancellation', value: '30DayNoticeofCancellation' },
            { label: 'Alternate Employer', value: 'alternatEemployer' },
            { label: 'IN REM', value: 'inrem' },
            { label: 'Outer Continental Shelf Lands Act (OCSLA)', value: 'outerContinentalShelfLandsActOCSLA' },
            { label: 'Defence Base Act (DBA)', value: 'defenceBaseActDBA' },
            { label: 'Voluntary Comp', value: 'voluntaryComp' },
            { label: 'Other', value: 'other' }
            
        ];
    }

    businessHandleChange(event){
        this.businessValue = event.detail.value; 
        if(this.businessValue.includes('other')){
            this.otherBusiness = true;
        }else{
            this.otherBusiness = false;
        }
    }

    industryHandleChange(event){
        this.industryValue = event.detail.value; 
    }

    ecRequireHandleChange(event){
        this.ecRequireValue = event.detail.value; 
        if(this.ecRequireValue.includes('other')){
            this.ecRequire = true;
        }else{
            this.ecRequire = false;
        }
    }
}