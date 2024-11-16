import { api, LightningElement, track } from 'lwc';
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
import { OmniscriptActionCommonUtil } from "vlocity_ins/omniscriptActionUtils";

export default class DbaApplication extends OmniscriptBaseMixin(LightningElement) {
     _actionUtil;

    //collect All Data from Submit Form
    @track inputData = {}

    //All Prime section object to store Prime Data
    @track primeInsureData = {};
    @track brokerInformationData = {};
    @track primeContractData = {};
    @track primeREInformationData = {};
    @track ACInformationData = {};
    @track requestedDocuments = [];
    @track spinner = false;
    @track errorMessage;

    //RecordType
    @track additionalMemberId;
    @track contractId;
    @track locationId;

    //addtional Insure 
    @track insuredTableVisible = false; 
    @track addInsuredModal = false;
    @track addInsuredEnable = true;
    @track updateInsuredEnable = false;
    @track insuredDeleteModal = false;
    @track additionalInsuredData = [];
    @track updateadditionalInsuredData = [];
    @track currentInsured = [];
    @track allAdditionalInsuredData;
    @track selectedInsuredIndex;
    @track organizeName = '';
    @track yearInBusiness = '';
    @track address = '';
    @track addressLine1 = '';
    @track city = '';
    @track state = '';
    @track country = '';
    //@track defaultCountry; 
    @track typeofOrganization = '';
    @track otherTypeofOrganization = '';

    //addtional Contract
    @track contractTableVisible = false; 
    @track addContractModal = false;
    @track addContractEnable = true;
    @track updateContractEnable = true;
    @track contractDeleteModal = false;
    @track additionalContractData = [];
    @track currentContract = [];
    @track allAdditionalContractData;
    @track selectedContractIndex;
    @track proposedEffectiveDate = '';
    @track requestedQuoteDate = '';
    @track contractValue = '';
    @track contractNumber = '';
    @track contractLength = '';
    @track typeofContract = '';
    @track otherTypeofContract = '';
    @track contractCountry = '';
    @track specific_Contracts_as_Listed = true;
    @track All_Contracts = false;

    //additional Countries 
    @track countriesTableVisible = false;
    @track addCountriesModal = false;
    @track addCountriesEnable = true;
    @track updateCountriesEnable = true;
    @track countriesDeleteModal = false;
    @track additionalCountriesData = [];
    @track currentCountry = [];
    @track allAdditionalCountriesData;
    @track selectedCountryIndex;
    @track countryOfOperation = '';
    @track jobDescription = '';
    @track USNationalIsChecked = false;
    @track numberOfUSN = '';
    @track totalRemunerationUSN = '';
    @track ThirdCountryNationalIsChecked = false;
    @track numberOfTCN = '';
    @track totalRemunerationTCN = '';
    @track LocalNationalIsChecked = false;
    @track numberLN = '';
    @track totalRemunerationLN = '';

    //Requested Documents
    @track selectedRDTypeOfOrganization = '';
    @track fileErrorMessage;
    @track copyoftheUSGovernmentFile;
    @track yearLosshistoryforDBAFile;
    @track contractListingFile;
    @track remunerationListingFile;

    @track USGovernmentValid = false;
    @track YLHforDBAValid = false;
    @track CLValid = false;
    @track RLValid = false;

    //Show and Hide Compoents
    @track showHideDetails = {};

    //progress bar track variables
    @track InsuredColorChange = false;
    @track brokerColorChange = false;
    @track ContractColorChange = false;
    @track RemunerationColorChange = false;
    @track AdditionalColorChange = false;
    @track RequestedColorChange = false;
    
    //form submit
    @track formSubmitSuccess = false;

    //Set Date and radom number for File
    @track fileEncryptedToken;  

    //images 
    @track signalLogo = 'data:@file/png;base64,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';
    @track rightLogo = 'data:image/png;base64,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';


    @track countriesList = [
        {label: "None", value: ""},
    ];

    @track allStateList = [];
    @track stateList = [
        {label:"None", value:""}
    ]
    @track addtionalStateList = [
        {label:"None", value:""}
    ]

    @track organizationList = [];
    @track contractList= [];
    @track SecurityLocationList= [];
    @track translatorList= [];
		
		@track contentVersionIds=[];
		@track deleteContentVersionIds=[];

    

    connectedCallback() {
         this._actionUtil = new OmniscriptActionCommonUtil();
         var today = new Date();
         //var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
         const milliSecond = today.getTime();
         const randomNo = Math.floor(Math.random()*90000) + 10000;
         this.fileEncryptedToken = milliSecond.toString() + randomNo.toString();
        console.log('this.fileEncryptedToken',this.fileEncryptedToken);
         this.ACInformationData['Exclusively_military_or_embassy__c'] = true;
         this.primeContractData['specific_Contracts_as_Listed'] = true;
         //set default toggle
         this.showHideDetails = {
            'Exclusively_military_or_embassy__c' : true,
         };
         
        //get GlobalValueSet List
        const globalValuesetParams = {
            input: JSON.stringify({}),
            sClassName: 'DBAApplicationCtrl',
            sMethodName: 'getGlobalValueset',
            options: '{}'
        };
        this.omniRemoteCall(globalValuesetParams, true).then((response) => {
            var countryResult = JSON.parse(response.result.countriesSuccess);
            var stateResult = JSON.parse(response.result.statesSuccess);
            var organizationResult = JSON.parse(response.result.organizationSuccess);
            var contractResult = JSON.parse(response.result.contractSuccess);
            var SecurityLocationResult = JSON.parse(response.result.securityLocationSuccess);
            var translatorResult = JSON.parse(response.result.translatorSuccess);
            //Countries
            for(var i=0;i<countryResult.length;i++){
                this.collectCountries = {
                'label': countryResult[i].label,
                'value': countryResult[i].value
               };
               this.countriesList = [...this.countriesList, this.collectCountries];
            }
            //State
            for(var i=0;i<stateResult.length;i++){
                this.collectStates = {
                    'label': stateResult[i].label,
                    'value': stateResult[i].value
                   };
                   this.allStateList = [...this.allStateList, this.collectStates];
                   this.stateList = this.allStateList;
                   this.addtionalStateList = this.allStateList;
            }
            //Organization
            for(var i=0;i<organizationResult.length;i++){
                this.collectOrganization = {
                    'label': organizationResult[i].label,
                    'value': organizationResult[i].value
                   };
                   this.organizationList = [...this.organizationList, this.collectOrganization];
            }
            //Contract
            for(var i=0;i<contractResult.length;i++){
                this.collectContract = {
                    'label': contractResult[i].label,
                    'value': contractResult[i].value
                   };
                   this.contractList = [...this.contractList, this.collectContract];
            }
            //SecurityLocation
            for(var i=0;i<SecurityLocationResult.length;i++){
                this.collectSecurityLocation = {
                    'label': SecurityLocationResult[i].label,
                    'value': SecurityLocationResult[i].value
                   };
                   this.SecurityLocationList = [...this.SecurityLocationList, this.collectSecurityLocation];
            }
            //translatorList
            for(var i=0;i<translatorResult.length;i++){
                this.collectTranslator = {
                    'label': translatorResult[i].label,
                    'value': translatorResult[i].value
                   };
                   this.translatorList = [...this.translatorList, this.collectTranslator];
            }
            console.log('organizationResult->',this.organizationList); 
            console.log('contractResult->',this.contractList); 
            console.log('SecurityLocationResult->',this.SecurityLocationList); 
            console.log('translator->',this.translatorList); 

        }).catch((error) => {
            console.log('error:: ', error);
        });

         //get RecordType
         const recordTypeParams = {
            input: JSON.stringify({}),
            sClassName: 'DBAApplicationCtrl',
            sMethodName: 'getRecordTypeIds',
            options: '{}'
        };
        this.omniRemoteCall(recordTypeParams, true).then((response) => {
            this.additionalMemberId = response.result.additionalMemberId;
            this.contractId = response.result.contractId;
            this.locationId = response.result.locationId;
        }).catch((error) => {
            console.log('error::-> ', error);
        });
    }

    //Progress bar Tracker
    get Insuredcolorclass() {
        return this.InsuredColorChange ? 'progresColor' : 'progres_bar_list_left'
    }
    get Brokercolorclass() {
        return this.brokerColorChange ? 'progresColor' : 'progres_bar_list_left'
    }
    get Contractcolorclass() {
        return this.ContractColorChange ? 'progresColor' : 'progres_bar_list_left'
    }
    get Remunerationcolorclass() {
        return this.RemunerationColorChange ? 'progresColor' : 'progres_bar_list_left'
    }
    get Additionalcolorclass() {
        return this.AdditionalColorChange ? 'progresColor' : 'progres_bar_list_left'
    }
    get Requestedcolorclass() {
        return this.RequestedColorChange ? 'progresColor' : 'progres_bar_list_left'
    }

    // get organizationOptions() {
    //     return [
    //         { label: 'Ind', value: 'Ind' },
    //         { label: 'Corporate', value: 'Corporate' },
    //         { label: 'Partnership Joint venture', value: 'Partnership Joint venture' },
    //         { label: 'LLC', value: 'LLC' },
    //         { label: 'Other', value: 'Other' },
    //     ];
    // }

    // get contractOptions() {
    //     return [
    //         { label: 'DOD', value: 'DOD' },
    //         { label: 'DOS', value: 'DOS' },
    //         { label: 'FEMA', value: 'FEMA' },
    //         { label: 'Other', value: 'Other' },
    //     ];
    // }

    // get workOption() {
    //     return [
    //         { label: 'Transcription', value: 'Transcription' },
    //         { label: 'Translation', value: 'Translation' },
    //         { label: 'Interrogation', value: 'Interrogation' },
    //         { label: 'Other', value: 'Other' },
    //     ];
    // }

    // get providingSecurityOption() {
    //     return [
    //         { label: 'Base', value: 'Base' },
    //         { label: 'Embassy', value: 'Embassy' },
    //         { label: 'Mobile', value: 'Mobile' },
    //         { label: 'Other', value: 'Other' },
    //     ];
    // }

    get requiredTypeOrganization() {
        return [
            { label: 'Copy of the US Government', value: 'copyoftheUSGovernment' },
            { label: '5-7 Year Loss history for DBA', value: 'yearLosshistoryforDBA' },
            { label: 'Contract Listing', value: 'contractListing' },
            { label: 'Remuneration Listing', value: 'remunerationListing' },
        ];
    }

    
    //Insured CountriesHandle 
    // InsuredCountriesHandle(event){
    //     this.primeInsureData[event.target.name] = event.target.value;
    // }

    //contract CountriesHandle 
    // contractCountriesHandle(event){
    //     this.primeContractData[event.target.name] = event.target.value;
    // }

    //contract modal CountriesHandle 
    // additionalContractCountriesHandle(event){
    //     this.additionalContractData[event.target.name] = event.target.value;
    // }


    //Remuneration / Employee Information Country picklist handle
    // primeREHandle(event) {
    //     this.primeREInformationData[event.target.name] = event.target.value;
    //     if (this.primeREInformationData.Country_Of_Operation__c && this.primeREInformationData.Job_Description__c) {
    //         this.RemunerationColorChange = true;
    //     }
    //     else {
    //         this.RemunerationColorChange = false;

    //     }
    //     console.log('primeREInformationData->', this.primeREInformationData);
    // }

    
    //Get Prime Insured Data
    primeInsuredSave(event) {
        this.primeInsureData[event.target.name] = event.target.value;
        if (this.primeInsureData.primeOrganizeName && this.primeInsureData.primeAddress && this.primeInsureData.primeTypeofOrganization && this.primeInsureData.primeFirstName && this.primeInsureData.primeLastName && this.primeInsureData.primeContactEmail && this.primeInsureData.primeContactPhone) {
            this.InsuredColorChange = true;
        }
        else{
            this.InsuredColorChange = false;
        }
        if(this.primeInsureData['PrimeCountry']=='US'){
            this.stateList = this.allStateList;
        }
        else if(this.primeInsureData['PrimeCountry'] != 'US' && this.primeInsureData['PrimeCountry']!= undefined){
            this.stateList = [{'label':'None','value':''}, 
                            ];
            this.primeInsureData['primeState'] = '';
         }
         else{}
         console.log(' this.stateList-->', this.stateList);
        console.log('primeInsureData->', this.primeInsureData);
    }
    //Prime Insute type of Organize picklist handle
    typeOfOrganizationHandle(event) {
        let name = event.target.name;
        let value = event.target.value;
        if (value == 'Yes' || value == 'Other' || event.target.checked) {
            this.showHideDetails[name] = true;
            this.primeInsureData[event.target.name] = event.target.value;
        } else {
            this.primeInsureData[event.target.name] = event.target.value;
            if (this.primeInsureData['primeTypeofOrganization'] != 'Other') {
                this.primeInsureData['primeOthertypeofOrganization'] = '';
            }
            this.showHideDetails[name] = false;
        }
        if (this.primeInsureData.primeOrganizeName && this.primeInsureData.primeAddress && this.primeInsureData.primeTypeofOrganization && this.primeInsureData.primeFirstName && this.primeInsureData.primeLastName && this.primeInsureData.primeContactEmail && this.primeInsureData.primeContactPhone) {
            this.InsuredColorChange = true;

        }
        else {
            this.InsuredColorChange = false;

        }
        console.log('Prime InsuredData->', this.primeInsureData);
        console.log(this.showHideDetails);
    }

    //Get Broker Broker Information
    brokerInformationSave(event) {
        this.brokerInformationData[event.target.name] = event.target.value;
        if (this.brokerInformationData.brokerIAB || this.brokerInformationData.brokerTitle || this.brokerInformationData.brokerFirstName || this.brokerInformationData.brokerLastName || this.brokerInformationData.brokerEmail || this.brokerInformationData.brokerPhone ) {
            this.brokerColorChange = true;
        }
        else {
            this.brokerColorChange = false;
        }
        console.log('brokerInformationData->', this.brokerInformationData);
    }

    //Get Prime Contract Information
    primeContractSave(event) {
        this.primeContractData[event.target.name] = event.target.value;
        if (this.primeContractData.primeEffectiveDate && this.primeContractData.primeTypeofContract && this.primeContractData.primeContractNumber && this.primeContractData.primeContractCountry && this.primeContractData.Description_of_operations__c) {
            this.ContractColorChange = true;
        }
        else {
            this.ContractColorChange = false;
        }
        console.log('primeContractData->', this.primeContractData);
    }
    //Prime Contract type of Contract & Country picklist handle
    typeOfContractHandle(event) {
        let name = event.target.name;
        let value = event.target.value;
        if (value == 'Yes' || value == 'Other' || event.target.checked) {
            this.showHideDetails[name] = true;
            this.primeContractData[event.target.name] = event.target.value;
        } else {
            this.primeContractData[event.target.name] = event.target.value;
            if (this.primeContractData['primeTypeofContract'] != 'Other') {
                this.primeContractData['primeOthertypeofContract'] = '';
            }
            this.showHideDetails[name] = false;
        }
        if (this.primeContractData.primeEffectiveDate && this.primeContractData.primeTypeofContract && this.primeContractData.primeContractCountry ) {
            this.ContractColorChange = true;
        }
        else {
            this.ContractColorChange = false;
        }
        console.log('Prime primeContractData->', this.primeContractData);
        console.log(this.showHideDetails);
    }

    //Get Prime Remuneration / Employee Information
    primeREInformationSave(event) {
        this.primeREInformationData[event.target.name] = event.target.value;
        /* this.primeREInformationData.US_National__c
            || this.primeREInformationData.Number_US_national__c || this.primeREInformationData.Total_Remuneration_USN__c ||  this.primeREInformationData.ThirdCountry_National__c
            || this.primeREInformationData.Number_ThirdCountry_National__c || this.primeREInformationData.Total_Remuneration_TCN__c || this.primeREInformationData.Local_National__c
            || this.primeREInformationData.Number_Local_National__c || this.primeREInformationData.Total_Remuneration_LN__c*/
        if (this.primeREInformationData.Country_Of_Operation__c || this.primeREInformationData.Job_Description__c ) {
            this.RemunerationColorChange = true;
        }
        else {
            this.RemunerationColorChange = false;
        }
        console.log('primeREInformationData->', this.primeREInformationData);
    }
    //Handle All true false condition for addtional Countries
    modalHandleCheckboxChange(event) {
        let name = event.target.name;
        const isChecked = event.target.checked;
       
        // additiopnal Remuneration / Employee true/false
        if (name == 'US_National__c' || name == 'ThirdCountry_National__c' || name == 'Local_National__c') {
            this.additionalCountriesData[event.target.name] = isChecked;

            if (event.target.checked) {
                console.log('inside true');
                if (name == 'US_National__c') {
                    this.USNationalIsChecked = true;
                }
                if (name == 'ThirdCountry_National__c') {
                    this.ThirdCountryNationalIsChecked = true;
                }
                if (name == 'Local_National__c') {
                    this.LocalNationalIsChecked = true;
                }
                //this.additionalCountriesShowHide[name] =  true; 
            } else {
                console.log('inside false');
                if (name == 'US_National__c') {
                    this.USNationalIsChecked = false;
                    this.numberOfUSN = '';
                    this.totalRemunerationUSN = '';
                    this.additionalCountriesData['Number_US_national__c'] = '';
                    this.additionalCountriesData['Total_Remuneration_USN__c'] = '';
                }
                if (name == 'ThirdCountry_National__c') {
                    this.ThirdCountryNationalIsChecked = false;
                    this.numberOfTCN = '';
                    this.totalRemunerationTCN = '';
                    this.additionalCountriesData['Number_ThirdCountry_National__c'] = '';
                    this.additionalCountriesData['Total_Remuneration_TCN__c'] = '';
                }
                if (name == 'Local_National__c') {
                    this.LocalNationalIsChecked = false;
                    this.numberLN = '';
                    this.totalRemunerationLN = '';
                    this.additionalCountriesData['Number_Local_National__c'] = '';
                    this.additionalCountriesData['Total_Remuneration_LN__c'] = '';
                }
                //this.additionalCountriesShowHide[name] =  false;
            }
            console.log('primeREInformationData->', this.additionalCountriesData);
        }

    }

    //Get Addtional Contract Information (section)
    ACInformationSave(event) {
        this.ACInformationData[event.target.name] = event.target.value;
        // if (this.ACInformationData.Firearms_details__c) {
        //     this.AdditionalColorChange = true;
        // }
        // else {
        //     this.AdditionalColorChange = false;
        // }
        console.log('primeACInformationData->', this.ACInformationData);
    }
    //SecurityLocation and Translstor Picklist Handle
    ACInformationhandle(event) {
        let name = event.target.name;
        let value = event.target.value;
        if (value == 'Yes' || value == 'Other' || event.target.checked) {
            this.showHideDetails[name] = true;
            this.ACInformationData[event.target.name] = event.target.value;
        } else {
            this.ACInformationData[event.target.name] = event.target.value;
            if (this.ACInformationData['Translator_type__c'] != 'Other') {
                this.ACInformationData['Translator_other_type__c'] = '';
            }
            if (this.ACInformationData['Security_location__c'] != 'Other') {
                this.ACInformationData['Other_security_location__c'] = '';
            }
            this.showHideDetails[name] = false;
        }
        console.log('ACInformationData->', this.ACInformationData);
        console.log(this.showHideDetails);
    }

    //picklist handler values and "other" type for All Insure, Contract , Countries
   modalShowHidehandle(event) {
    let name = event.target.name;
    let value = event.target.value;

    if (value == 'Yes' || value == 'Other' || event.target.checked) {
        if (this.addInsuredModal) {
            this.showHideDetails[name] = true;
            this.additionalInsuredData[event.target.name] = event.target.value;
        }
        if (this.addContractModal) {
            this.showHideDetails[name] = true;
            this.additionalContractData[event.target.name] = event.target.value;
        }
        if (this.addCountriesModal) {
            this.showHideDetails[name] = true;
            this.additionalCountriesData[event.target.name] = event.target.value;
        }
    } else {

        if (this.addInsuredModal) {
            this.additionalInsuredData[event.target.name] = event.target.value;
            if (this.additionalInsuredData['typeofOrganization'] != 'Other') {
                this.additionalInsuredData['otherTypeofOrganization'] = '';
                this.showHideDetails[name] = false;
            }
        }
        if (this.addContractModal) {
            this.additionalContractData[event.target.name] = event.target.value;
            if (this.additionalContractData['typeofContract'] != 'Other') {
                this.additionalContractData['otherTypeofContract'] = '';
                this.showHideDetails[name] = false;
            }
        }

        if (this.addCountriesModal) {
            this.additionalCountriesData[event.target.name] = event.target.value;
            this.showHideDetails[name] = false;
        }

    }
    console.log(this.showHideDetails);
    console.log('data of additionalInsuredData->', this.additionalInsuredData);
    console.log('data of additionalContractData->', this.additionalContractData);
    console.log('data of additionalCountriesData->', this.additionalCountriesData);

    }

    //Picklist handler for Contract , Remuneration / Employee , Addtional Contract Information

    /*    specific_Contracts_as_Listed (event) {
    this.specific_Contracts_as_Listed = event.target.checked;
    if (this.specific_Contracts_as_Listed) {
      this.All_Contracts = false;
    }
  }

  All_Contracts(event) {
    this.All_Contracts = event.target.checked;
    if (this.All_Contracts) {
      this.specific_Contracts_as_Listed = false;
    }
  }
*/



    handleCheckboxChange(event) {
        let name = event.target.name;
        const isChecked = event.target.checked;
        console.log('name is', name);
        console.log('is checked', isChecked);
        //this.All_Contracts = false;
        //this.specific_Contracts_as_Listed = true;

        //Only one radio button can be selected at a time Logic
        if (name == 'specific_Contracts_as_Listed') {
            if (isChecked) {
                console.log(' inside specific_Contracts_as_Listed is true');
                this.specific_Contracts_as_Listed = true;
                this.All_Contracts = false;
                this.primeContractData['primeEffectiveDate'] = '';
                this.primeContractData['primeContractCountry'] = '';
                this.primeContractData['primeContractLength'] = '';
                this.primeContractData['primeContractNumber'] = '';
                this.primeContractData['primeContractValue'] = '';
                this.primeContractData['primeOthertypeofContract'] = '';
                this.primeContractData['primeRequestedQuoteDate'] = '';
                this.primeContractData['primeTypeofContract'] = '';
            } else {
                console.log(' inside specific_Contracts_as_Listed is false');
                this.specific_Contracts_as_Listed = false;
            this.All_Contracts = true;
             }
        }
        if (name == 'All_Contracts') { 
            if (isChecked) {
                console.log(' inside All_Contracts is true');
                this.All_Contracts = true;
                this.specific_Contracts_as_Listed = false;

                this.primeContractData['primeEffectiveDate'] = '';
                this.primeContractData['primeContractCountry'] = '';
                this.primeContractData['primeContractLength'] = '';
                this.primeContractData['primeContractNumber'] = '';
                this.primeContractData['primeContractValue'] = '';
                this.primeContractData['primeOthertypeofContract'] = '';
                this.primeContractData['primeRequestedQuoteDate'] = '';
                this.primeContractData['primeTypeofContract'] = '';
            } else { 
                console.log(' inside All_Contracts is false');
                this.All_Contracts = false;
                this.specific_Contracts_as_Listed = true;
                this.showHideDetails['Carry_firearms__c'] = false;
                console.log('Carry_firearms__c@@@@----', this.showHideDetails['Carry_firearms__c']);
            }
            
        }
        console.log('@@@All_Contracts ',this.All_Contracts);
        console.log('###specific_Contracts_as_Listed ',this.specific_Contracts_as_Listed);
        
        //else { this.specific_Contracts_as_Listed = true;}

        //this.specific_Contracts_as_Listed = false;
        //console.log('toogle value', this.specific_Contracts_as_Listed);
        //contract true/false
        if (name == 'Prime_contractor__c' || name == 'Previous_dba_coverage__c' || name == 'Under_or_above_ground_work__c' || name == 'Subcontractors_used__c' || name == 'specific_Contracts_as_Listed' || name == 'All_Contracts') {
            this.primeContractData[event.target.name] = isChecked;
            if (event.target.checked) {
                this.showHideDetails[name] = true;
                if(name == 'specific_Contracts_as_Listed'){
                    this.primeContractData['All_Contracts'] = false;
                }
                if(name == 'All_Contracts'){
                    this.primeContractData['specific_Contracts_as_Listed'] = false;
                }
            } else {
                if (name == 'Under_or_above_ground_work__c') {
                    this.primeContractData['Work_environment_description__c'] = '';
                }
                if (name == 'Subcontractors_used__c') {
                    this.primeContractData['Subcontractors_vetting_process__c'] = '';
                }
                this.showHideDetails[name] = false;
            }
            console.log('primeContractData->', this.primeContractData);
        }

        //Remuneration / Employee true/false
        if (name == 'US_National__c' || name == 'ThirdCountry_National__c' || name == 'Local_National__c') {
            this.primeREInformationData[event.target.name] = isChecked;
            this.RemunerationColorChange = true;
            if (event.target.checked) {
                this.showHideDetails[name] = true;
            } else {
                if (name == 'US_National__c') {
                    this.primeREInformationData['Number_US_national__c'] = '';
                    this.primeREInformationData['Total_Remuneration_USN__c'] = '';
                }
                if (name == 'ThirdCountry_National__c') {
                    this.primeREInformationData['Number_ThirdCountry_National__c'] = '';
                    this.primeREInformationData['Total_Remuneration_TCN__c'] = '';
                }
                if (name == 'Local_National__c') {
                    this.primeREInformationData['Number_Local_National__c'] = '';
                    this.primeREInformationData['Total_Remuneration_LN__c'] = '';
                }
                this.showHideDetails[name] = false;
            }
            console.log('primeREInformationData->', this.primeREInformationData);
        }

        //Addtional Contract Information true/false
        if (name == 'Tenured_employees__c' || name == 'Employees_retained_post_contract__c' || name == 'Subcontractors_used__c' ||
            name == 'Physicals_provided__c' || name == 'Psychiatric_prescreening__c' || name == 'Post_deployment_screenings__c' ||
            name == 'Exclusively_military_or_embassy__c' || name == 'Nonworkrelated_medical_insurance__c' || name == 'Housed_on_base__c' ||
            name == 'Flight_contractor__c' || name == 'Helicopter__c' || name == 'Aircraft_service__c' || name == 'Security_contractor__c' ||
            name == 'Armed_employees__c' || name == 'Security_Body_armour_required__c' || name == 'Translator_contractor__c' ||
            name == 'Forward_operating_units__c' || name == 'Translator_Body_armour_required__c' || name == 'Carry_firearms__c') {
            this.ACInformationData[event.target.name] = isChecked;
            this.AdditionalColorChange = true;
            if (event.target.checked) {
                if (name == 'Exclusively_military_or_embassy__c') {
                    this.ACInformationData['Describe_non_military_or_embassy_work__c'] = '';
                }
                
                this.showHideDetails[name] = true;
            } else {
                if (name == 'Carry_firearms__c') {
                    this.ACInformationData['Firearms_details__c'] = '';
                }
                if (name == 'Subcontractors_used__c') {
                    this.ACInformationData['Subcontractors_vetting_process__c'] = '';
                }
                if (name == 'Physicals_provided__c') {
                    this.ACInformationData['Physicals_provided_description__c'] = '';
                }
                if (name == 'Psychiatric_prescreening__c') {
                    this.ACInformationData['Psychiatric_prescreening_description__c'] = '';
                }
                if (name == 'Post_deployment_screenings__c') {
                    this.ACInformationData['Post_deployment_screenings_description__c'] = '';
                }
                if (name == 'Housed_on_base__c') {
                    this.ACInformationData['Type_of_housing__c'] = '';
                    this.ACInformationData['Transport_to_work__c'] = '';
                    this.ACInformationData['Distance_to_work__c'] = '';
                    this.ACInformationData['Transportation_concentration__c'] = '';
                    this.ACInformationData['Transport_security__c'] = '';
                }
                if (name == 'Flight_contractor__c') {
                    this.ACInformationData['Helicopter__c'] = false;
                    this.ACInformationData['Aircraft_service__c'] = false;
                    this.ACInformationData['Flight_aircraft_type__c'] = '';
                    this.ACInformationData['Flight_crew__c'] = '';
                    this.ACInformationData['Number_of_flights__c'] = '';
                    this.ACInformationData['Location_of_base_for_flights__c'] = '';
                    this.ACInformationData['Flight_destination__c'] = '';
                }
                if (name == 'Security_contractor__c') {
                    this.ACInformationData['Armed_employees__c'] = false;
                    this.ACInformationData['Security_Body_armour_required__c'] = false;
                    this.ACInformationData['Security_Body_armour_description__c'] = '';
                    this.ACInformationData['Security_Mobile_work__c'] = '';
                    this.ACInformationData['Security_location__c'] = '';
                    this.ACInformationData['Other_security_location__c'] = '';
                }
                if (name == 'Translator_contractor__c') {
                    this.ACInformationData['Translator_type__c'] = '';
                    this.ACInformationData['Translator_other_type__c'] = '';
                    this.ACInformationData['Forward_operating_units__c'] = false;
                    this.ACInformationData['Translator_Mobile_work__c'] = '';
                    this.ACInformationData['Translator_Body_armour_required__c'] = false;
                    this.ACInformationData['Translator_Body_armour_description__c'] = '';
                }
                if (name == 'Security_Body_armour_required__c') {
                    this.ACInformationData['Security_Body_armour_description__c'] = '';
                }
                if (name == 'Forward_operating_units__c') {
                    this.ACInformationData['Translator_Mobile_work__c'] = '';
                }
                if (name == 'Translator_Body_armour_required__c') {
                    this.ACInformationData['Translator_Body_armour_description__c'] = '';
                }
                this.showHideDetails[name] = false;
            }
            console.log('ACInformationData->', this.ACInformationData);
        }
    }

    //Requested Documents selectedRDTypeOfOrganization picklist handle
    requestedtypeOfOrganizationHandle(event) {
        this.selectedRDTypeOfOrganization = event.target.value;
        console.log("this.selectedRDTypeOfOrganization",this.selectedRDTypeOfOrganization);
        if (this.selectedRDTypeOfOrganization) {
            console.log("triue");
            this.RequestedColorChange = true;            
        }
        else {
            this.RequestedColorChange = false;            

        }
        console.log('requestedDocuments->', this.selectedRDTypeOfOrganization);
    }

    //Close all Modals
    closeModal() {
        this.addInsuredModal = false;
        this.insuredDeleteModal = false;
        this.addContractModal = false;
        this.contractDeleteModal = false;
        this.addCountriesModal = false;
        this.countriesDeleteModal = false;
        document.body.classList.remove('slds-scrollable_none');
        document.body.classList.add('desktop');
    }

    //Open additional Insure Modal 
    addAdditionalInsured() {
        this.addInsuredModal = true;
        document.body.classList.add('slds-scrollable_none');
        document.body.classList.remove('desktop');

        this.addInsuredEnable = true;
        this.updateInsuredEnable = false;

        //clear cashe Data
        this.organizeName = '';
        this.yearInBusiness = '';
        this.address = '';
        this.addressLine1 = '';
        this.city = '';
        this.state = '';
        this.country = 'US';
        //set default country
        this.additionalInsuredData['country'] = 'US';
        this.typeofOrganization = '',
        this.showHideDetails['typeofOrganization'] = false;
        this.otherTypeofOrganization = '';
    }
    
    //Get additional Insured data
    additionalInsuredSave(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.additionalInsuredData[event.target.name] = event.target.value;
        //while update field as a blank
        if( name == 'yearInBusiness' && value == ''){
            this.yearInBusiness = '';
        }
        if(name == 'addressLine1' && value == ''){
            this.addressLine1 = '';
        }
        if(name == 'city' && value == ''){
            this.city = '';
        }
        if(name == 'state' && value == ''){
            this.state = '';
        }
        // else{}
        //set Default states
        if(this.additionalInsuredData['country']=='US'){
            this.addtionalStateList = this.allStateList;
        }
        else if(this.additionalInsuredData['country'] != 'US' && this.additionalInsuredData['country']!= undefined){
            this.addtionalStateList = [{'label':'None','value':''}, 
                            ];
            this.additionalInsuredData['state'] = '';
         }
         else{}
        console.log('additionalInsuredData', this.additionalInsuredData);
    }

    //Add additional Insured record
    addInsured() {
        //Check all Required Fields
        const isIsuredCorrect = [...this.template.querySelectorAll('.organizeNameValid,.addressValid,.typeofOrganizationValid,.otherTypeofOrganizationValid')]
        .reduce((validSoFar, inputField) => {
            inputField.reportValidity();
            if (!inputField.checkValidity()) {
                inputField.focus(); // Set focus on the first invalid input field
            }
            return validSoFar && inputField.checkValidity();
        }, true);
        if (isIsuredCorrect) {
            this.datamaster = {}
            Object.keys(this.additionalInsuredData).forEach(key => {
                this.datamaster[key] = this.additionalInsuredData[key];
            });

            this.allAdditionalInsuredData = this.additionalInsuredData;
            this.currentInsured.push(this.datamaster)
            this.allAdditionalInsuredData = this.currentInsured.map((row, index) => {
                return {
                    organizeName: row.organizeName,
                    yearInBusiness: row.yearInBusiness,
                    address: row.address,
                    addressLine1: row.addressLine1,
                    city: row.city,
                    state: row.state,
                    country: row.country,
                    typeofOrganization: row.typeofOrganization,
                    otherTypeofOrganization: row.otherTypeofOrganization,
                    //recordTypeId: this.additionalMemberId
                };
            });
            this.addInsuredModal = false;
            document.body.classList.remove('slds-scrollable_none');
            document.body.classList.add('desktop');
            this.insuredTableVisible = true;
            this.additionalInsuredData['organizeName'] = '';
            this.additionalInsuredData['yearInBusiness'] = '';
            this.additionalInsuredData['address'] = '';
            this.additionalInsuredData['addressLine1'] = '';
            this.additionalInsuredData['city'] = '';
            this.additionalInsuredData['state'] = '';
            this.additionalInsuredData['country'] = 'US';
            this.additionalInsuredData['typeofOrganization'] = '';
            this.additionalInsuredData['otherTypeofOrganization'] = '';
            console.log("all data", this.allAdditionalInsuredData);
        }
    }

    //Edit Additinoal Insured record
    editInsuredAction(event) {
        this.addInsuredEnable = false;
        this.updateInsuredEnable = true;
        
        this.selectedInsuredIndex = parseInt(event.target.dataset.index);;
        let row = this.allAdditionalInsuredData[this.selectedInsuredIndex];
        console.log('selected additinal',row);
        this.organizeName = row.organizeName;
        this.yearInBusiness = row.yearInBusiness;
        this.address = row.address;
        this.addressLine1 = row.addressLine1;
        this.city = row.city;
        this.state = row.state;
        this.country = row.country;
        this.typeofOrganization = row.typeofOrganization,
        this.otherTypeofOrganization = row.otherTypeofOrganization;
        if(this.typeofOrganization == 'Other'){
        this.showHideDetails['typeofOrganization'] = true;    
        }else{
            this.showHideDetails['typeofOrganization'] = false;     
        }
        this.addInsuredModal = true;
        document.body.classList.add('slds-scrollable_none');
        document.body.classList.remove('desktop');
    }

    //Update Additinoal Insured
    updateInsured() {

        //Check all Required Fields
        const isIsuredCorrect = [...this.template.querySelectorAll('.organizeNameValid,.addressValid,.otherTypeofOrganizationValid')]
        .reduce((validSoFar, inputField) => {
            inputField.reportValidity();
            if (!inputField.checkValidity()) {
                inputField.focus(); // Set focus on the first invalid input field
            }
            return validSoFar && inputField.checkValidity();
        }, true);
        if (isIsuredCorrect) {
            for (let i = 0; i < this.currentInsured.length; i++) {
                const element = this.currentInsured[i];
                if (i === this.selectedInsuredIndex) {
                    //element.organizeName = this.additionalInsuredData.organizeName;
                    if (this.additionalInsuredData['organizeName'] != '') {
                        
                        element.organizeName = this.additionalInsuredData.organizeName;
                    } else {
                        element.organizeName = this.organizeName;
                    }
                    //element.yearInBusiness = this.additionalInsuredData.yearInBusiness;
                    if (this.additionalInsuredData['yearInBusiness'] != '') {
                        element.yearInBusiness = this.additionalInsuredData.yearInBusiness;
                    } else {
                        element.yearInBusiness = this.yearInBusiness;
                    }
                    //element.address = this.additionalInsuredData.address;
                    if (this.additionalInsuredData['address'] != '') {
                        element.address = this.additionalInsuredData.address;
                    } else {
                        element.address = this.address;
                    }
                    //element.addressLine1 = this.additionalInsuredData.addressLine1;
                    if (this.additionalInsuredData['addressLine1'] != '') {
                        element.addressLine1 = this.additionalInsuredData.addressLine1;
                    } else {
                        element.addressLine1 = this.addressLine1;
                    }
                    //element.city = this.additionalInsuredData.city;
                    if (this.additionalInsuredData['city'] != '') {
                        element.city = this.additionalInsuredData.city;
                    } else {
                        element.city = this.city;
                    }
                    //element.state = this.additionalInsuredData.state;
                    if (this.additionalInsuredData['state'] != '') {
                        element.state = this.additionalInsuredData.state;
                    } else {
                        element.state = this.state;
                    }
                    //element.country = this.additionalInsuredData.country;
                    if (this.additionalInsuredData['country'] != '') {
                        element.country = this.additionalInsuredData.country;
                    } else {
                        element.country = this.country;
                    }
                    //element.otherTypeofOrganization = this.additionalInsuredData.otherTypeofOrganization;
                    if (this.additionalInsuredData['otherTypeofOrganization'] != '' ) {
                        element.otherTypeofOrganization = this.additionalInsuredData.otherTypeofOrganization;
                    } else {
                        element.otherTypeofOrganization = this.otherTypeofOrganization;
                    }
                    //element.typeofOrganization = this.additionalInsuredData.typeofOrganization,
                    if (this.additionalInsuredData['typeofOrganization'] != '') {
                        element.typeofOrganization = this.additionalInsuredData.typeofOrganization;
                        if(this.additionalInsuredData['typeofOrganization'] != 'Other'){
                            element.otherTypeofOrganization = '';
                        }
                    } else {
                        element.typeofOrganization = this.typeofOrganization;
                    }
                    
                }
            }
            this.allAdditionalInsuredData = this.currentInsured.map((row, index) => {
                return {
                    organizeName: row.organizeName,
                    yearInBusiness: row.yearInBusiness,
                    address: row.address,
                    addressLine1: row.addressLine1,
                    city: row.city,
                    state: row.state,
                    country: row.country,
                    typeofOrganization: row.typeofOrganization,
                    otherTypeofOrganization: row.otherTypeofOrganization
                };              
            });
            this.addInsuredModal = false;
            document.body.classList.remove('slds-scrollable_none');
            document.body.classList.add('desktop');
            this.additionalInsuredData['organizeName'] = '';
            this.additionalInsuredData['yearInBusiness'] = '';
            this.additionalInsuredData['address'] = '';
            this.additionalInsuredData['addressLine1'] = '';
            this.additionalInsuredData['city'] = '';
            this.additionalInsuredData['state'] = '';
            this.additionalInsuredData['country'] = 'US';
            this.additionalInsuredData['typeofOrganization'] = '';
            this.additionalInsuredData['otherTypeofOrganization'] = '';
            console.log("all data", this.allAdditionalInsuredData);
        }
    }

    //Delete action on additional Insured
    deleteInsuredAction(event) {
        this.insuredDeleteModal = true;
        this.selectedInsuredIndex = parseInt(event.target.dataset.index);;
    }

    //confirm delete additional Insured
    deleteInsuredYes() {
        this.allAdditionalInsuredData.splice(this.selectedInsuredIndex, 1);
        this.currentInsured.splice(this.selectedInsuredIndex, 1);

        this.currentInsured = JSON.parse(JSON.stringify(this.currentInsured))
        this.allAdditionalInsuredData = JSON.parse(JSON.stringify(this.allAdditionalInsuredData));

        this.selectedInsuredIndex = '';
        this.insuredDeleteModal = false;
        if(this.allAdditionalInsuredData.length === 0){
         this.insuredTableVisible = false;
    }
        console.log("all data", this.allAdditionalInsuredData);
    }


    //Open additional Contract Modal
    addAdditionalContract() {
        this.addContractModal = true;
        document.body.classList.add('slds-scrollable_none');
        document.body.classList.remove('desktop');

        this.addContractEnable = true;
        this.updateContractEnable = false;

        //clear cashe data
        this.proposedEffectiveDate = '';
        this.requestedQuoteDate = '';
        this.contractValue = '';
        this.contractNumber = '';
        this.contractLength = '';
        this.typeofContract = '';
        this.showHideDetails['typeofContract'] = false;
        this.otherTypeofContract = '';
        this.contractCountry = '';
    }

    //Get additional Contract Record
    additionalContractSave(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.additionalContractData[event.target.name] = event.target.value;
        //while update field as a blank
        if(name == 'requestedQuoteDate' && value == ''){
            this.requestedQuoteDate = '';
        }
        if(name == 'contractValue' && value == ''){
            this.contractValue = '';
        }
        if(name == 'contractLength' && value == ''){
            this.contractLength = '';
        }
        console.log('additionalContractData', this.additionalContractData)
    }

    //Add additional Contract Record
    addContract() {
        //Check all Required Fields
        const isContractCorrect = [...this.template.querySelectorAll('.proposedEffectiveDateValid,.typeofContractValid,.otherTypeofContractValid,.contractNumberValid,.contractCountryValid')]
        .reduce((validSoFar, inputField) => {
            inputField.reportValidity();
            if (!inputField.checkValidity()) {
                inputField.focus(); // Set focus on the first invalid input field
            }
            return validSoFar && inputField.checkValidity();
        }, true);
        if (isContractCorrect) {
            this.datamaster = {}
            Object.keys(this.additionalContractData).forEach(key => {
                this.datamaster[key] = this.additionalContractData[key];
            });

            this.allAdditionalContractData = this.additionalContractData;
            this.currentContract.push(this.datamaster)
            this.allAdditionalContractData = this.currentContract.map((row, index) => {
                return {
                    proposedEffectiveDate: row.proposedEffectiveDate,
                    requestedQuoteDate: row.requestedQuoteDate,
                    contractValue: row.contractValue,
                    contractNumber: row.contractNumber,
                    contractLength: row.contractLength,
                    typeofContract: row.typeofContract,
                    otherTypeofContract: row.otherTypeofContract,
                    contractCountry: row.contractCountry,
                    //recordTypeId: this.contractId
                };
            });
            this.addContractModal = false;
            document.body.classList.remove('slds-scrollable_none');
            document.body.classList.add('desktop');
            this.contractTableVisible = true;
            this.additionalContractData['proposedEffectiveDate'] = '';
            this.additionalContractData['requestedQuoteDate'] = '';
            this.additionalContractData['contractValue'] = '';
            this.additionalContractData['contractNumber'] = '';
            this.additionalContractData['contractLength'] = '';
            this.additionalContractData['typeofContract'] = '';
            this.additionalContractData['otherTypeofContract'] = '';
            this.additionalContractData['contractCountry'] = '';

            console.log("all data", this.allAdditionalContractData);
        }
    }

    //Edit Additinoal Contract Record
    editContractAction(event) {
        this.addContractEnable = false;
        this.updateContractEnable = true;
        
        this.selectedContractIndex = parseInt(event.target.dataset.index);;
        let row = this.allAdditionalContractData[this.selectedContractIndex];
            this.proposedEffectiveDate = row.proposedEffectiveDate,
            this.requestedQuoteDate = row.requestedQuoteDate,
            this.contractValue = row.contractValue,
            this.contractNumber = row.contractNumber,
            this.contractLength = row.contractLength,
            this.typeofContract = row.typeofContract,
            this.otherTypeofContract = row.otherTypeofContract,
            this.contractCountry = row.contractCountry
            if(this.typeofContract == 'Other'){
                this.showHideDetails['typeofContract'] = true;    
                }else{
                    this.showHideDetails['typeofContract'] = false;     
                }

        this.addContractModal = true;
        document.body.classList.add('slds-scrollable_none');
        document.body.classList.remove('desktop');
        
    }

    //Update Additinoal Contract
    updateContract() {
        //Check all Required Fields
        const isContractCorrect = [...this.template.querySelectorAll('.proposedEffectiveDateValid,.typeofContractValid,.otherTypeofContractValid,.contractCountryValid')]
        .reduce((validSoFar, inputField) => {
            inputField.reportValidity();
            if (!inputField.checkValidity()) {
                inputField.focus(); // Set focus on the first invalid input field
            }
            return validSoFar && inputField.checkValidity();
        }, true);
        if (isContractCorrect) {
            for (let i = 0; i < this.currentContract.length; i++) {
                const element = this.currentContract[i];
                if (i === this.selectedContractIndex) {
                        //element.proposedEffectiveDate = this.additionalContractData.proposedEffectiveDate,
                        if (this.additionalContractData['proposedEffectiveDate'] != '') {
                            element.proposedEffectiveDate = this.additionalContractData.proposedEffectiveDate;
                        } else {
                            element.proposedEffectiveDate = this.proposedEffectiveDate;
                        }
                        //element.requestedQuoteDate = this.additionalContractData.requestedQuoteDate,
                        if (this.additionalContractData['requestedQuoteDate'] != '') {
                            element.requestedQuoteDate = this.additionalContractData.requestedQuoteDate;
                        } else {
                            element.requestedQuoteDate = this.requestedQuoteDate;
                        }
                        //element.contractValue = this.additionalContractData.contractValue,
                        if (this.additionalContractData['contractValue'] != '') {
                            element.contractValue = this.additionalContractData.contractValue;
                        } else {
                            element.contractValue = this.contractValue;
                        }
                        //element.contractNumber = this.additionalContractData.contractNumber,
                        if (this.additionalContractData['contractNumber'] != '') {
                            element.contractNumber = this.additionalContractData.contractNumber;
                        } else {
                            element.contractNumber = this.contractNumber;
                        }
                        //element.contractLength = this.additionalContractData.contractLength,
                        if (this.additionalContractData['contractLength'] != '') {
                            element.contractLength = this.additionalContractData.contractLength;
                        } else {
                            element.contractLength = this.contractLength;
                        }
                        //element.otherTypeofContract = this.additionalContractData.otherTypeofContract,
                        if (this.additionalContractData['otherTypeofContract'] != '') {
                            element.otherTypeofContract = this.additionalContractData.otherTypeofContract;
                        } else {
                            element.otherTypeofContract = this.otherTypeofContract;
                        }
                        //element.typeofContract = this.additionalContractData.typeofContract,
                        if (this.additionalContractData['typeofContract'] != '') {
                            element.typeofContract = this.additionalContractData.typeofContract;
                            if(this.additionalContractData['typeofContract'] != 'Other'){
                                element.otherTypeofContract = '';
                            }
                        } else {
                            element.typeofContract = this.typeofContract;
                        }

                        //element.contractCountry = this.additionalContractData.contractCountry
                        if (this.additionalContractData['contractCountry'] != '') {
                            element.contractCountry = this.additionalContractData.contractCountry;
                        } else {
                            element.contractCountry = this.contractCountry;
                        }
                }
            }
            this.allAdditionalContractData = this.currentContract.map((row, index) => {
                return {
                    proposedEffectiveDate: row.proposedEffectiveDate,
                    requestedQuoteDate: row.requestedQuoteDate,
                    contractValue: row.contractValue,
                    contractNumber: row.contractNumber,
                    contractLength: row.contractLength,
                    typeofContract: row.typeofContract,
                    otherTypeofContract: row.otherTypeofContract,
                    contractCountry: row.contractCountry
                };
            });
            this.addContractModal = false;
            document.body.classList.remove('slds-scrollable_none');
            document.body.classList.add('desktop');
            this.additionalContractData['proposedEffectiveDate'] = '';
            this.additionalContractData['requestedQuoteDate'] = '';
            this.additionalContractData['contractValue'] = '';
            this.additionalContractData['contractNumber'] = '';
            this.additionalContractData['contractLength'] = '';
            this.additionalContractData['typeofContract'] = '';
            this.additionalContractData['otherTypeofContract'] = '';
            this.additionalContractData['contractCountry'] = '';

            console.log("all data", this.allAdditionalContractData);
        }
    }

    //Delete action on additional Contract
    deleteContractAction(event) {
        this.contractDeleteModal = true;
        this.selectedContractIndex = parseInt(event.target.dataset.index);;
    }

    //Confirm delete additional Contract
    deleteContractYes() {
        this.allAdditionalContractData.splice(this.selectedContractIndex, 1);
        this.currentContract.splice(this.selectedContractIndex, 1);

        this.currentContract = JSON.parse(JSON.stringify(this.currentContract))
        this.allAdditionalContractData = JSON.parse(JSON.stringify(this.allAdditionalContractData));

        this.selectedContractIndex = '';
        this.contractDeleteModal = false;

        if(this.allAdditionalContractData.length === 0){
            this.contractTableVisible = false;
        }
        console.log("all data", this.allAdditionalContractData);
    }

    //Open additional Countries Modal
    addAdditionalCountries() {
        this.addCountriesModal = true;
        document.body.classList.add('slds-scrollable_none');
        document.body.classList.remove('desktop');

        this.addCountriesEnable = true;
        this.updateCountriesEnable = false;

        //clear cashe data
        this.countryOfOperation = '';
        this.jobDescription = '';
        this.USNationalIsChecked = false;
        this.numberOfUSN = '';
        this.totalRemunerationUSN = '';
        this.ThirdCountryNationalIsChecked = false;
        this.numberOfTCN = '';
        this.totalRemunerationTCN = '';
        this.LocalNationalIsChecked = false;
        this.numberLN = '';
        this.totalRemunerationLN = '';
        
    }

    //Get additional Countries Record
    additionalCountriesSave(event) {
        let name = event.target.name;
        let value = event.target.value;

        this.additionalCountriesData[event.target.name] = event.target.value;
        //while update field as a blank
        if( name == 'jobDescription' && value == ''){
            this.jobDescription = '';
        }
        if( name == 'Number_US_national__c' && value == ''){
            this.numberOfUSN = '';
        }
        if( name == 'Total_Remuneration_USN__c' && value == ''){
            this.totalRemunerationUSN = '';
        }
        if( name == 'Number_ThirdCountry_National__c' && value == ''){
            this.numberOfTCN = '';
        }
        if( name == 'Total_Remuneration_TCN__c' && value == ''){
            this.totalRemunerationTCN = '';
        }
        if( name == 'Number_Local_National__c' && value == ''){
            this.numberLN = '';
        }
        if( name == 'Total_Remuneration_LN__c' && value == ''){
            this.totalRemunerationLN = '';
        }
        console.log('additionalContractData', this.additionalCountriesData)
    }

    //Add additional Contract Record
    addCountries() {

        const isCountryCorrect = [...this.template.querySelectorAll('.countryOfOperationValid')]
        .reduce((validSoFar, inputField) => {
            inputField.reportValidity();
            if (!inputField.checkValidity()) {
                inputField.focus(); // Set focus on the first invalid input field
            }
            return validSoFar && inputField.checkValidity();
        }, true);
        if (isCountryCorrect) {
                this.datamaster = {}
                Object.keys(this.additionalCountriesData).forEach(key => {
                this.datamaster[key] = this.additionalCountriesData[key];
                });

            this.allAdditionalCountriesData = this.additionalCountriesData;
            this.currentCountry.push(this.datamaster)
            this.allAdditionalCountriesData = this.currentCountry.map((row, index) => {
                return {
                    countryOfOperation: row.countryOfOperation,
                    jobDescription: row.jobDescription,
                    US_National__c: row.US_National__c != undefined?row.US_National__c:false,
                    Number_US_national__c: row.Number_US_national__c,
                    Total_Remuneration_USN__c: row.Total_Remuneration_USN__c,
                    ThirdCountry_National__c: row.ThirdCountry_National__c != undefined?row.ThirdCountry_National__c:false,
                    Number_ThirdCountry_National__c: row.Number_ThirdCountry_National__c,
                    Total_Remuneration_TCN__c: row.Total_Remuneration_TCN__c,
                    Local_National__c: row.Local_National__c != undefined?row.Local_National__c:false,
                    Number_Local_National__c: row.Number_Local_National__c,
                    Total_Remuneration_LN__c: row.Total_Remuneration_LN__c,
                    //recordTypeId: this.locationId
                };
            });
            this.addCountriesModal = false;
            document.body.classList.remove('slds-scrollable_none');
            document.body.classList.add('desktop');
            this.countriesTableVisible = true;
            this.additionalCountriesData['countryOfOperation'] = '';
            this.additionalCountriesData['jobDescription'] = '';
            this.additionalCountriesData['US_National__c'] = false;
            this.additionalCountriesData['Number_US_national__c'] = '';
            this.additionalCountriesData['Total_Remuneration_USN__c'] = '';
            this.additionalCountriesData['ThirdCountry_National__c'] = false;
            this.additionalCountriesData['Number_ThirdCountry_National__c'] = '';
            this.additionalCountriesData['Total_Remuneration_TCN__c'] = '';
            this.additionalCountriesData['Local_National__c'] = false;
            this.additionalCountriesData['Number_Local_National__c'] = '';
            this.additionalCountriesData['Total_Remuneration_LN__c'] = '';
            }
            console.log("all data", this.allAdditionalCountriesData);
    }

    //Edit Additinoal Countries Record
    editCountryAction(event) {
        this.addCountriesEnable = false;
        this.updateCountriesEnable = true;
        
        this.selectedCountryIndex = parseInt(event.target.dataset.index);;
        let row = this.allAdditionalCountriesData[this.selectedCountryIndex];

            this.countryOfOperation = row.countryOfOperation,
            this.jobDescription = row.jobDescription,
            this.USNationalIsChecked = row.US_National__c,
            this.numberOfUSN = row.Number_US_national__c,
            this.totalRemunerationUSN = row.Total_Remuneration_USN__c,
            this.ThirdCountryNationalIsChecked = row.ThirdCountry_National__c,
            this.numberOfTCN = row.Number_ThirdCountry_National__c,
            this.totalRemunerationTCN = row.Total_Remuneration_TCN__c,
            this.LocalNationalIsChecked = row.Local_National__c,
            this.numberLN = row.Number_Local_National__c,
            this.totalRemunerationLN = row.Total_Remuneration_LN__c
            //this.additionalCountriesData = [];
        this.addCountriesModal = true;
        document.body.classList.add('slds-scrollable_none');
        document.body.classList.remove('desktop');
    }

    //Update Additinoal Countries record
    updateCountries() {
        for (let i = 0; i < this.currentCountry.length; i++) {
            const element = this.currentCountry[i];
            if (i === this.selectedCountryIndex) {
                if (this.additionalCountriesData['countryOfOperation'] != '') {
                    element.countryOfOperation = this.additionalCountriesData.countryOfOperation;
                } else {
                    element.countryOfOperation = this.countryOfOperation;
                }
                if (this.additionalCountriesData['jobDescription'] != '') {
                    element.jobDescription = this.additionalCountriesData.jobDescription;
                } else {
                    element.jobDescription = this.jobDescription;
                }

                element.US_National__c = this.USNationalIsChecked;
                if (this.additionalCountriesData['Number_US_national__c'] != '') {
                    element.Number_US_national__c = this.additionalCountriesData.Number_US_national__c;
                } else {
                    element.Number_US_national__c = this.numberOfUSN;
                }
                if (this.additionalCountriesData['Total_Remuneration_USN__c'] != '') {
                    element.Total_Remuneration_USN__c = this.additionalCountriesData.Total_Remuneration_USN__c;
                } else {
                    element.Total_Remuneration_USN__c = this.totalRemunerationUSN;
                }
                element.ThirdCountry_National__c = this.ThirdCountryNationalIsChecked;
                if (this.additionalCountriesData['Number_ThirdCountry_National__c'] != '') {
                    element.Number_ThirdCountry_National__c = this.additionalCountriesData.Number_ThirdCountry_National__c;
                } else {
                    element.Number_ThirdCountry_National__c = this.numberOfTCN;
                }
                if (this.additionalCountriesData['Total_Remuneration_TCN__c'] != '') {
                    element.Total_Remuneration_TCN__c = this.additionalCountriesData.Total_Remuneration_TCN__c;
                } else {
                    element.Total_Remuneration_TCN__c = this.totalRemunerationTCN;
                }
                element.Local_National__c = this.LocalNationalIsChecked;
                if (this.additionalCountriesData['Number_Local_National__c'] != '') {
                    element.Number_Local_National__c = this.additionalCountriesData.Number_Local_National__c;
                } else {
                    element.Number_Local_National__c = this.numberLN;
                }
                if (this.additionalCountriesData['Total_Remuneration_LN__c'] != '') {
                    element.Total_Remuneration_LN__c = this.additionalCountriesData.Total_Remuneration_LN__c;
                } else {
                    element.Total_Remuneration_LN__c = this.totalRemunerationLN;
                }
            }
        }
        this.allAdditionalCountriesData = this.currentCountry.map((row, index) => {
            return {
                countryOfOperation: row.countryOfOperation,
                jobDescription: row.jobDescription,
                US_National__c: row.US_National__c,
                Number_US_national__c: row.Number_US_national__c,
                Total_Remuneration_USN__c: row.Total_Remuneration_USN__c,
                ThirdCountry_National__c: row.ThirdCountry_National__c,
                Number_ThirdCountry_National__c: row.Number_ThirdCountry_National__c,
                Total_Remuneration_TCN__c: row.Total_Remuneration_TCN__c,
                Local_National__c: row.Local_National__c,
                Number_Local_National__c: row.Number_Local_National__c,
                Total_Remuneration_LN__c: row.Total_Remuneration_LN__c,
            };
        });
        this.addCountriesModal = false;
        document.body.classList.remove('slds-scrollable_none');
        document.body.classList.add('desktop');
        this.additionalCountriesData['countryOfOperation'] = '';
        this.additionalCountriesData['jobDescription'] = '';
        this.additionalCountriesData['US_National__c'] = false;
        this.additionalCountriesData['Number_US_national__c'] = '';
        this.additionalCountriesData['Total_Remuneration_USN__c'] = '';
        this.additionalCountriesData['ThirdCountry_National__c'] = false;
        this.additionalCountriesData['Number_ThirdCountry_National__c'] = '';
        this.additionalCountriesData['Total_Remuneration_TCN__c'] = '';
        this.additionalCountriesData['Local_National__c'] = false;
        this.additionalCountriesData['Number_Local_National__c'] = '';
        this.additionalCountriesData['Total_Remuneration_LN__c'] = '';
        
        console.log("all data", this.allAdditionalCountriesData);
    }

    //Delete action on additional Countries
    deleteCountryAction(event) {
        this.countriesDeleteModal = true;
        this.selectedCountryIndex = parseInt(event.target.dataset.index);;
    }

    //Confirm delete additional Countries
    deleteCountryYes() {
        this.allAdditionalCountriesData.splice(this.selectedCountryIndex, 1);
        this.currentCountry.splice(this.selectedCountryIndex, 1);

        this.currentCountry = JSON.parse(JSON.stringify(this.currentCountry))
        this.allAdditionalCountriesData = JSON.parse(JSON.stringify(this.allAdditionalCountriesData));

        this.selectedCountryIndex = '';
        this.countriesDeleteModal = false;

        if(this.allAdditionalCountriesData.length === 0){
            this.countriesTableVisible = false;
        }

        console.log("all data", this.allAdditionalCountriesData);
    }

    //Requested Documents
    openfileUpload(event) {
        console.log('selected file', this.selectedRDTypeOfOrganization);

        const file = event.target.files[0];
        const acceptedTypes = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf","image/jpeg", "image/jpg"];
        if (!acceptedTypes.includes(file.type)) {
          event.preventDefault();
          //alert('File type not supported. Please select a file of type: ' + acceptedTypes.join(', '));
          console.log('file type not support');
          this.fileErrorMessage = 'Please Upload Valid Document';
          return;
        }
        this.fileErrorMessage = ''
        
        //copyoftheUSGovernmentFile
        if (this.selectedRDTypeOfOrganization == 'copyoftheUSGovernment') {
            const file = event.target.files[0]
            var reader = new FileReader()
            reader.onload = () => {
                var base64 = reader.result.split(',')[1]
                this.copyoftheUSGovernmentFile = {
                    'filename': file.name,
                    'base64': base64,
                    //'recordId': this.recordId
                }
                this.USGovernmentValid = true;
                console.log('copyoftheUSGovernmentFile', this.copyoftheUSGovernmentFile)
                this.requestedDocuments['copyoftheUSGovernment'] = this.copyoftheUSGovernmentFile;
                console.log('requestedDocuments', this.requestedDocuments)
            }
            reader.readAsDataURL(file)
            this.RequestedColorChange = true;
        }

        //yearLosshistoryforDBAFile
        if (this.selectedRDTypeOfOrganization == 'yearLosshistoryforDBA') {
            const file = event.target.files[0]
            var reader = new FileReader()
            reader.onload = () => {
                var base64 = reader.result.split(',')[1]
                this.yearLosshistoryforDBAFile = {
                    'filename': file.name,
                    'base64': base64,
                    //'recordId': this.recordId
                }
                this.YLHforDBAValid = true;
                console.log('yearLosshistoryforDBAFile', this.yearLosshistoryforDBAFile)
                this.requestedDocuments['yearLosshistoryforDBA'] = this.yearLosshistoryforDBAFile;
                console.log('requestedDocuments', this.requestedDocuments)
            }
            reader.readAsDataURL(file)
            this.RequestedColorChange = true;
        }

        //contractListingFile
        if (this.selectedRDTypeOfOrganization == 'contractListing') {
            const file = event.target.files[0]
            var reader = new FileReader()
            reader.onload = () => {
                var base64 = reader.result.split(',')[1]
                this.contractListingFile = {
                    'filename': file.name,
                    'base64': base64,
                    //'recordId': this.recordId
                }
                this.CLValid = true;
                console.log('contractListingFile', this.contractListingFile)
                this.requestedDocuments['contractListing'] = this.contractListingFile;
                console.log('requestedDocuments', this.requestedDocuments)
            }
            reader.readAsDataURL(file)
            this.RequestedColorChange = true;
        }

        //remunerationListingFile
        if (this.selectedRDTypeOfOrganization == 'remunerationListing') {
            const file = event.target.files[0]
            var reader = new FileReader()
            reader.onload = () => {
                var base64 = reader.result.split(',')[1]
                this.remunerationListingFile = {
                    'filename': file.name,
                    'base64': base64,
                    //'recordId': this.recordId
                }
                this.RLValid = true;
                console.log('remunerationListingFile', this.remunerationListingFile)
                this.requestedDocuments['remunerationListing'] = this.remunerationListingFile;
                console.log('requestedDocuments', this.requestedDocuments)
            }
            reader.readAsDataURL(file)
            this.RequestedColorChange = true;
        }

    }

    get encryptedToken() {
        console.log('Uniquenumber is @@->',this.fileEncryptedToken+' '+this.selectedRDTypeOfOrganization);
        return this.fileEncryptedToken+' '+this.selectedRDTypeOfOrganization;
    }

    get acceptedFormats() {
        return ['.xlsx','.xls','.csv','.jpg','.jpeg', '.png', '.doc', '.docx','.pdf'];
    }

    //File Upload 
    handleUploadFinished(event){
        const uploadedFiles = event.detail.files;
        uploadedFiles.forEach(file => { 
						this.contentVersionIds.push(file.contentVersionId);
            this.collectFiels = {
                'filename':file.name,
                'encryptedToken': this.encryptedToken,
                'typeOfOrganization':this.selectedRDTypeOfOrganization,
								'versionId':file.contentVersionId
               };
               this.requestedDocuments = [...this.requestedDocuments, this.collectFiels];
         });
           console.log('All requested Documents',this.requestedDocuments);
        // //copyoftheUSGovernmentFile
        // if (this.selectedRDTypeOfOrganization == 'copyoftheUSGovernment') {
        //     uploadedFiles.forEach(file => { 
        //         this.copyoftheUSGovernmentFile = {
        //             'filename':file.name,
        //             'encryptedToken': this.encryptedToken
        //         }
        //         this.USGovernmentValid = true;
        //         console.log('copyoftheUSGovernmentFile', this.copyoftheUSGovernmentFile);
        //         this.requestedDocuments['copyoftheUSGovernment'] = this.copyoftheUSGovernmentFile;
        //         console.log('requestedDocuments', this.requestedDocuments);
        //         this.RequestedColorChange = true;
        // });
        // }

        // //yearLosshistoryforDBAFile
        // if (this.selectedRDTypeOfOrganization == 'yearLosshistoryforDBA') {

        //     uploadedFiles.forEach(file => { 
        //         this.yearLosshistoryforDBAFile = {
        //             'filename':file.name,
        //             'encryptedToken': this.encryptedToken
        //         }
        //         this.YLHforDBAValid = true;
        //         console.log('yearLosshistoryforDBAFile', this.yearLosshistoryforDBAFile);
        //         this.requestedDocuments['yearLosshistoryforDBA'] = this.yearLosshistoryforDBAFile;
        //         console.log('requestedDocuments', this.requestedDocuments)
    
        //         this.RequestedColorChange = true;
        // });
        // }

        // //contractListingFile
        // if (this.selectedRDTypeOfOrganization == 'contractListing') {
        
        //     uploadedFiles.forEach(file => { 
        //         this.contractListingFile = {
        //             'filename':file.name,
        //             'encryptedToken': this.encryptedToken
        //         }
        //         this.CLValid = true;
        //         console.log('contractListingFile', this.contractListingFile)
        //         this.requestedDocuments['contractListing'] = this.contractListingFile;
        //         console.log('requestedDocuments', this.requestedDocuments)
    
        //         this.RequestedColorChange = true;
        // });
        // }

        // //remunerationListingFile
        // if (this.selectedRDTypeOfOrganization == 'remunerationListing') {
            
        //     uploadedFiles.forEach(file => { 
        //         this.remunerationListingFile = {
        //             'filename':file.name,
        //             'encryptedToken': this.encryptedToken
        //         }
        //         this.RLValid = true;
        //         console.log('remunerationListingFile', this.remunerationListingFile)
        //         this.requestedDocuments['remunerationListing'] = this.remunerationListingFile;
        //         console.log('requestedDocuments', this.requestedDocuments)
    
        //         this.RequestedColorChange = true;
        // });
        // }

    }
@track collectRemoveFiles = [];
    //Remove File
    removeFile(event){
				 this.contentVersionIds.splice(parseInt(event.target.dataset.index), 1);
    //this.requestedDocuments[];
        // this.collectRemoveFiles = [event.target.dataset.filename];
        this.requestedDocuments.splice(parseInt(event.target.dataset.index), 1);
        this.requestedDocuments = JSON.parse(JSON.stringify(this.requestedDocuments));
        console.log('Remainig requested Documents',this.requestedDocuments);
    }


    //Remove uploaded File
    removeUSGovernmentFile() {
        this.USGovernmentValid = false;
        //this.requestedDocuments['copyoftheUSGovernment'] = '';
        delete this.requestedDocuments['copyoftheUSGovernment'];
        this.requestedDocuments = { ...this.requestedDocuments };
        if(Object.keys(this.requestedDocuments).length === 0){
            this.RequestedColorChange = false;   
        }
    }
    removeYLHforDBAFile() {
        this.YLHforDBAValid = false;
        //this.requestedDocuments['yearLosshistoryforDBA'] = '';
        delete this.requestedDocuments['yearLosshistoryforDBA'];
        this.requestedDocuments = { ...this.requestedDocuments };
        if(Object.keys(this.requestedDocuments).length === 0){
            this.RequestedColorChange = false;   
        }
    }
    removeCLFile() {
        this.CLValid = false;
        //this.requestedDocuments['contractListing'] = '';
        delete this.requestedDocuments['contractListing'];
        this.requestedDocuments = { ...this.requestedDocuments };
        if(Object.keys(this.requestedDocuments).length === 0){
            this.RequestedColorChange = false;   
        }
    }
    removeRLFile() {
        this.RLValid = false;
        //this.requestedDocuments['remunerationListing'] = '';
        delete this.requestedDocuments['remunerationListing'];
        this.requestedDocuments = { ...this.requestedDocuments };
        if(Object.keys(this.requestedDocuments).length === 0){
            this.RequestedColorChange = false;   
        }
    }

    //Submit Form
    submitForm() {
        
        const isAllInputsCorrect = [...this.template.querySelectorAll('.primeOrganizeNameValid,.primeAddressValid,.primeTypeofOrganizationValid,.primeOthertypeofOrganizationValid,.primeFirstNameValid,.primeLastNameValid,.primeContactEmailValid,.primeContactPhoneValid,.primeEffectiveDateValid,.primeTypeofContractValid,.primeOthertypeofContractValid,.primeContractNumberValid,.primeContractCountryValid,.descriptionOfOperationsValid')]
        .reduce((validSoFar, inputField) => {
            inputField.reportValidity();
            if (!inputField.checkValidity()) {
                inputField.focus(); // Set focus on the first invalid input field
            }
            return validSoFar && inputField.checkValidity();
        }, true);
        if (isAllInputsCorrect) {

            this.spinner = true;
            
            this.inputData = {
                'InputData': [
                    {
                        'primeInsuredInformation': this.primeInsureData,
                        'additionalInsured': this.allAdditionalInsuredData,
                        'brokerInformation': this.brokerInformationData,
                        'contractInformation': this.primeContractData,
                        'additionalContract': this.allAdditionalContractData,
                        'REInformation': this.primeREInformationData,
                        'additionalCountries': this.allAdditionalCountriesData,
                        'ACInformation': this.ACInformationData,
                        'requestedDocuments': this.requestedDocuments,
                        'additionalInsuredRecordType': this.additionalMemberId, 
                        'additionalContractRecordType': this.contractId,
                        'REInformationRecordType' : this.locationId,
                        'UniqueKey':this.fileEncryptedToken,
						'contentVersionIds':this.contentVersionIds
                    }
                ]
            }

            console.log('Prime InsuredData->', this.primeInsureData);
            console.log("all Additional Insured", this.allAdditionalInsuredData);
            console.log('brokerInformationData->', this.brokerInformationData);
            console.log('primeContractData->', this.primeContractData);
            console.log("all Additional Contract", this.allAdditionalContractData);
            console.log('primeREInformationData->', this.primeREInformationData);
            console.log("all Additional Countries", this.allAdditionalCountriesData);
            console.log('ACInformationData->', this.ACInformationData);
            console.log('All Inputs Correct', this.inputData);


            this._actionUtil = new OmniscriptActionCommonUtil();
            const options = {};
            const params = {
                input: JSON.stringify(this.inputData),
                sClassName: 'vlocity_ins.IntegrationProcedureService',
                sMethodName: "DbaApplication_Submit", // "integration_IPNAME"
                options: JSON.stringify(options)
            };
            this._actionUtil
                .executeAction(params, null, this, null, null)
                .then((response) => {
                    console.log('Ipresponse:: ', JSON.stringify(response.result));//response.result.IPResult.response
                    //if(response.result.IPResult.createdResponse.vlocity_ins__Application__c_1[0].Id != undefined){
                    //this.updateUploadedFile(response.result.IPResult.createdResponse.vlocity_ins__Application__c_1[0].Id);
                //}
                    
                    this.spinner = false;              
                    if(response.result.error == 'OK'){
                        this.formSubmitSuccess = true;
                        this.errorMessage='';
                     }
                     else
                     {
                        this.errorMessage = '!Opps Something Went Wrong';
                        console.log('error Not ok Ipresponse:: ', JSON.stringify(response.result));//response.result.IPResult.response
                     }
                })
                .catch((error) => {
                    this.spinner = false;
                    this.errorMessage = '!Opps Something Went Wrong';
                    console.error(error, "IpERROR");
                });

                
        }

    }

  //Update File With Application Id
//   updateUploadedFile(applicationId){
//                 if(applicationId != null && applicationId != undefined ){
//                 const documentUpload = {
//                     input: ({'ApplicationID':applicationId,'UniqueKey': this.fileEncryptedToken}),
//                     sClassName: 'UploadSiteDocument',
//                     sMethodName: 'createContentDocumentLinks',
//                     options: '{}'
//                 };
//                 this.omniRemoteCall(documentUpload, true).then((response) => {
//                     console.log('Result from Document',response);
//                 }).catch((error) => {
//                     console.log('error::-> ', error);
//                 });
//             }
//   }  
}