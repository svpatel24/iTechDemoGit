import { LightningElement,api, track } from 'lwc';
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
import {NavigationMixin} from 'lightning/navigation';
import { OmniscriptActionCommonUtil } from "vlocity_ins/omniscriptActionUtils";
export default class QuoteDocumentPreview extends OmniscriptBaseMixin(NavigationMixin(LightningElement)) {
    _actionUtil;

//@api documentId;
@api jobId;
@track documentId;
@track spinner = true;
@track isSuccess = false;
@api respo = 'test';
@track responseContentVersionId; 
    connectedCallback(){
        //this.previewHandler();
    //window.clearTimeout(this.delayTimeout);
    //this.delayTimeout = setTimeout(() => {
        console.log('Connected callback called');
        this.previewHandler();
   // },30000);
    }
    
    previewHandler(){
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
        this._actionUtil = new OmniscriptActionCommonUtil();
        const params = {
            input: ({'jobId':this.jobId}),
            sClassName: 'DocumentGenerationProcessCtrl',
            sMethodName: 'getContentVersion',
            options: '{}'
        };
        if(!this.isSuccess){
            //this.spinner = true;
            this.omniRemoteCall(params, true).then((response) => {
                console.log('Result from Document',response);
                var Result  = JSON.parse(response.result.success);
                this.documentId = Result.ContentDocumentId;
                if(Result.status == 'success'){
                    this.responseContentVersionId = Result.contentVersionId;
                    this.sendtoOmniscript();
                    console.log('Result of responseContentVersionId',this.responseContentVersionId);
                    this.isSuccess  = true;
                    this.spinner = false;
                    this.omniNextStep();
                }else{
                    this.previewHandler();
                }
            }).catch((error) => {
                console.log('error::-> ', error);
            }); 
        }
        // if(this.documentId != null && this.documentId !=undefined && this.isSuccess == true){                    
        //     this[NavigationMixin.Navigate]({ 
        //         type:'standard__namedPage',
        //         attributes:{ 
        //             pageName:'filePreview'
        //         },
        //         state:{ 
        //             selectedRecordId: this.documentId
        //         }
        //     })
        // }
            },5000);
    }
    sendtoOmniscript() {
        //var Final = {}
        //Final['responseContentVersionId'] = {"responseContentVersionId":this.responseContentVersionId};
        this.omniApplyCallResp({"responseContentVersionId":this.responseContentVersionId});
    }

    callQuoteURL(){
        this.omniNextStep();
    }
}