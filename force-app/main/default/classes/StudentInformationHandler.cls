public class StudentInformationHandler {
    public static void sendEmail(List<StudentInformation__C> stdList){
         List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
		system.debug('inside method');
        for (StudentInformation__C record : stdList) {
            // Customize the recipient email address
            system.debug('record ->'+record);
            String toAddress = record.Email__c;
    
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            email.setToAddresses(new String[] { toAddress });
    
            // Set the email subject
            email.setSubject('IBS University admission form applied successfully');
    
            // Construct the email body
            String emailBody = 'Hi '+record.Name__c+'\n';
            emailBody += 'Your application for '+ record.Course__c +' with '+record.Stream__c+' stream has been submitted successfully.'  + '\n';
            emailBody += 'Application no -  ' + record.Name + '\n';
            emailBody += '\n';
            emailBody += 'Regards';
    		system.debug('Email body ->'+emailBody);
            system.debug('Email body ->'+toAddress);
            // Set the email body
            email.setPlainTextBody(emailBody);
    
            emailList.add(email);
            system.debug('Email  ->'+email);
        }
    
        // Send the emails
        system.debug('emailList  ->'+emailList);
        //Messaging.sendEmail(emailList);
    }
}