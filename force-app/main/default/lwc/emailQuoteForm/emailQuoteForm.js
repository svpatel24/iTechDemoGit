import { LightningElement } from 'lwc';

export default class EmailQuoteForm extends LightningElement {
    // Dynamic values for form fields
    face = '$100,000';
    classType = 'SENN';  // "class" is a reserved keyword, so using "classType"
    waiver = 'No';
    rating = '0';
    state = 'MA';
    age = '52';
    childRider = '$0';
    flatExtra = '$0.00 for 0 year(s)';

    // Form input fields
    sendToName = '';
    sendToEmail = '';
    includeCoverLetter = false;
    personalizedMessage = '';
    viewBy = 'Modal';

    // Radio group options
    get viewByOptions() {
        return [
            { label: 'Modal', value: 'Modal' },
            { label: 'UW Class', value: 'UW Class' }
        ];
    }

    // Handle changes in text inputs and text area
    handleInputChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
    } 

    // Handle checkbox change
    handleCheckboxChange(event) {
        this.includeCoverLetter = event.target.checked;
    }

    // Handle radio button change
    handleViewByChange(event) {
        this.viewBy = event.detail.value;
    }

    // Function to handle email send action
    sendEmail() {
        // This is where you would add your email sending logic
        alert(`Email sent to ${this.sendToName} at ${this.sendToEmail}`);
    }
}