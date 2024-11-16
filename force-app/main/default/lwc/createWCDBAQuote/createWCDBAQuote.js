import { LightningElement, api} from 'lwc';
import { OmniscriptBaseMixin } from "vlocity_ins/omniscriptBaseMixin";
import { OmniscriptActionCommonUtil } from "vlocity_ins/omniscriptActionUtils";

export default class CreateWCDBAQuote extends OmniscriptBaseMixin(LightningElement) {
    _actionUtil;
    //@api recordId;
    hidecomponent = false;
    inputData;
    _recordId;

    @api set recordId(value) {
    this._recordId = value;

    // do your thing right here with this.recordId / value
        console.log('recordId', this._recordId);
        this._actionUtil = new OmniscriptActionCommonUtil();
        this.inputData =
            {
            'InputData':   this._recordId
        }
        console.log('data',this.inputData);
        const options = {};
        const params = {
            input: JSON.stringify(this.inputData),
            sClassName: 'vlocity_ins.IntegrationProcedureService',
            sMethodName: "Create_WCDBAQuote", // "integration_IPNAME"
            options: JSON.stringify(options)
        };
        this._actionUtil
            .executeAction(params, null, this, null, null)
            .then((response) => {
                console.log('Ipresponse:: ', JSON.stringify(response.result));//response.result.IPResult.response
            })
            .catch((error) => {
            });
    }

    get recordId() {
    return this._recordId;
    }
}