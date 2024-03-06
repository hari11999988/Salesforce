trigger SendEmailNotification on StudentInformation__c (after insert) {
    if(trigger.isInsert && trigger.isAfter){
        system.debug('inside trigger');
        StudentInformationHandler.sendEmail(trigger.new);
    }

}