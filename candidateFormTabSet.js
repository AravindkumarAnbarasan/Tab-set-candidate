import { LightningElement, track, wire } from 'lwc';
import canName from '@salesforce/schema/Candidate_Information__c.Name';
import canPhone from '@salesforce/schema/Candidate_Information__c.Mobile_Number__c';
import canAltPhone from '@salesforce/schema/Candidate_Information__c.Alternative_Number__c';
import canEmail from '@salesforce/schema/Candidate_Information__c.Email__c';
import canAge from '@salesforce/schema/Candidate_Information__c.Age__c';
import canQualification from '@salesforce/schema/Candidate_Information__c.Highest_Qualification__c';
import canGender from '@salesforce/schema/Candidate_Information__c.Gender__c';
import canTechnology from '@salesforce/schema/Candidate_Information__c.Domain_Technology__c';
import canOtherQualification from '@salesforce/schema/Candidate_Information__c.Other_Qualification__c';
import canSkills from '@salesforce/schema/Candidate_Information__c.Primary_Skills__c';
import canLocation from '@salesforce/schema/Candidate_Information__c.Location__c';
import canIdProof from '@salesforce/schema/Candidate_Information__c.ID_Proof__c';
import canIdProofNum from '@salesforce/schema/Candidate_Information__c.ID_Number__c';
import canPassport from '@salesforce/schema/Candidate_Information__c.Passport__c';
import canPassportNum from '@salesforce/schema/Candidate_Information__c.Passport_Number__c';
import canPrevEmpCit from '@salesforce/schema/Candidate_Information__c.Previous_Employee_of_CIT__c';
import canPrevEmpId from '@salesforce/schema/Candidate_Information__c.Employee_ID__c';
import canEmpStatus from '@salesforce/schema/Candidate_Information__c.Current_Employment_Status__c';
import canJobMode from '@salesforce/schema/Candidate_Information__c.Job_Mode_Preference__c';
import canAddress from '@salesforce/schema/Candidate_Information__c.Address__c';
import canExp from '@salesforce/schema/Candidate_Information__c.Experience__c';
import canStartDate from '@salesforce/schema/Candidate_Information__c.Available_Start_Date__c';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import canObject from '@salesforce/schema/Candidate_Information__c';
import CanempStatusValue from '@salesforce/schema/Candidate_Information__c.Current_Employment_Status__c';
import canIdProofValue from '@salesforce/schema/Candidate_Information__c.ID_Proof__c';
import canGenderValue from '@salesforce/schema/Candidate_Information__c.Gender__c';
import canQualificationValue from '@salesforce/schema/Candidate_Information__c.Highest_Qualification__c';
import canJobModeValue from '@salesforce/schema/Candidate_Information__c.Job_Mode_Preference__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import uploadFile from '@salesforce/apex/CandidateInsert.uploadFile'

export default class CandidateFormTabSet extends LightningElement {

    activeTab = '1';
    handleEmpIdHide = false;
    handlePassportNumHide = false;
    handleIdProofNumHide = false;
    handleOtherQualificationHide = false;
    fileData;

    @track getCanDetails = {Name:canName, Mobile_Number__c:canPhone, Email__c:canEmail, Age__c:canAge, ID_Proof__c:canIdProof,
        Highest_Qualification__c:canQualification, Alternative_Number__c:canAltPhone,
        Location__c:canLocation, Other_Qualification__c:canOtherQualification,
        ID_Number__c:canIdProofNum, Passport__c:canPassport, Passport_Number__c:canPassportNum,
        Previous_Employee_of_CIT__c:canPrevEmpCit, Employee_ID__c:canPrevEmpId, Job_Mode_Preference__c:canJobMode,
        Current_Employment_Status__c:canEmpStatus, Gender__c:canGender, Address__c:canAddress, Experience__c:canExp,
        Available_Start_Date__c:canStartDate
    };

    @wire(getObjectInfo, { objectApiName: canObject }) canObjectInfo;

    @wire(getPicklistValues, { recordTypeId: '$canObjectInfo.data.defaultRecordTypeId', fieldApiName: CanempStatusValue})
    empStatusValues;

    @wire(getPicklistValues, { recordTypeId: '$canObjectInfo.data.defaultRecordTypeId', fieldApiName: canIdProofValue})
    idProofValues;

    @wire(getPicklistValues, { recordTypeId: '$canObjectInfo.data.defaultRecordTypeId', fieldApiName: canGenderValue})
    genderValues;

    @wire(getPicklistValues, { recordTypeId: '$canObjectInfo.data.defaultRecordTypeId', fieldApiName: canQualificationValue})
    qualificationValues;

    @wire(getPicklistValues, { recordTypeId: '$canObjectInfo.data.defaultRecordTypeId', fieldApiName: canJobModeValue})
    jobModeValues;
    
    handleNameChange(event) {
        this.getCanDetails.Name = event.target.value;
    }

    handlePhoneChange(event) {
        this.getCanDetails.Mobile_Number__c = event.target.value;
    }

    handleMailChange(event) {
        this.getCanDetails.Email__c = event.target.value;   
    }

    handleAgeChange(event) {
        this.getCanDetails.Age__c = event.target.value;  
    }

    handleGenderChange(event) {
        this.getCanDetails.Gender__c = event.detail.value;
        
    }

    handleLocationChange(event) {
        this.getCanDetails.Location__c = event.target.value;
    }

    handleQualificationChange(event) {
        this.getCanDetails.Highest_Qualification__c = event.target.value; 
        if(this.getCanDetails.Highest_Qualification__c == 'Other') {
            this.handleOtherQualificationHide = true;
        }  else {
            this.handleOtherQualificationHide = false;
        }
    }

    handleOtherQualificationChange(event) {
        this.getCanDetails.Other_Qualification__c = event.target.value;  
    }

    handleTechnologyChange(event) {
        this.getCanDetails.Domain_Technology__c = event.target.value;   
    }

    handleSkillChange(event) {
        this.getCanDetails.Primary_Skills__c = event.target.value;  
    }

    handleAlternatePhoneChange(event) {
        this.getCanDetails.Alternative_Number__c = event.target.value;  
    }

    handleIdProofChange(event) {
        this.getCanDetails.ID_Proof__c = event.target.value;  
        if(this.getCanDetails.ID_Proof__c == 'SSN' || this.getCanDetails.ID_Proof__c == 'Aadhaar Card') {
            this.handleIdProofNumHide = true;
        } else {
            this.handleIdProofNumHide = false;
        }
    }

    handleIdProofNumChange(event) {
        this.getCanDetails.ID_Number__c = event.target.value;  
    }

    handlePassportChange(event) {
        this.getCanDetails.Passport__c = event.target.checked;  
        if(this.getCanDetails.Passport__c == true) {
            this.handlePassportNumHide = true;
        } else {
            this.handlePassportNumHide = false;
        }
    }

    handlePassportNumChange(event) {
        this.getCanDetails.Passport_Number__c = event.target.value; 
    }

    handlePrevEmpCitChange(event) {
        this.getCanDetails.Previous_Employee_of_CIT__c = event.target.checked; 
        if(this.getCanDetails.Previous_Employee_of_CIT__c == true) {
            this.handleEmpIdHide = true;
        } else {
            this.handleEmpIdHide = false;
        }
    }

    handleCitEmpIdChange(event) {
        this.getCanDetails.Employee_ID__c = event.target.value;  
    }

    handleJobModeChange(event) {
        this.getCanDetails.Job_Mode_Preference__c = event.target.value;  
    }

    handleEmpStatusChange(event) {
        this.getCanDetails.Current_Employment_Status__c = event.target.value;  
    }

    handleAddressChange(event) {
        this.getCanDetails.Address__c = event.target.value;  
    }

    handleExperienceChange(event) {
        this.getCanDetails.Experience__c = event.target.value;  
    }

    handleStartDateChange(event) {
        this.getCanDetails.Available_Start_Date__c = event.target.value;  
    }

    get disablePrev() {
        return Number(this.activeTab) == 1 ? true : false;
    }

    get disableNext() {
        return Number(this.activeTab) == 4 ? true : false;
    }
    
    handleActive(event) {
     this.activeTab = event.target.value;
    }
    
    goToPrev() {
        let activeTabValue = Number(this.activeTab) - 1;
        this.activeTab = activeTabValue.toString();
    }

    goToNext() {
      let activeTabValue = Number(this.activeTab) + 1;
      this.activeTab = activeTabValue.toString();
    }

    openfileUpload(event) {
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64,
            }
        }
        reader.readAsDataURL(file)
    }

    handleSubmit() {
        console.log('CAndidate ' +JSON.stringify(this.getCanDetails));
        const {base64, filename } = this.fileData
        uploadFile({ base64, filename , candidateRecord:this.getCanDetails })
        .then(result=>{
            this.fileData = null
            let title = 'Application Submitted successfully!!'
            let variant = 'success';
            this.toast(title,variant)
        })
    }

    toast(title,variant){
        const toastEvent = new ShowToastEvent({
            title, 
            variant 
        })
        this.dispatchEvent(toastEvent)
        window.location.reload();
    }
}