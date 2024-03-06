public class LeadBatchApex implements Database.Batchable<sObject> , Database.Stateful
{
    
    Public Set<Lead> uniqueEmail = new Set<Lead>();
    public Database.QueryLocator start(Database.BatchableContext BC) 
    {
        String query = 'SELECT Id, Name, Email FROM Lead WHERE Email !=Null';
        return Database.getQueryLocator(query);
    }
    
    public void execute(Database.BatchableContext BC, List<Lead> recordList) 
    {
        //Set<String> emailSet = new Set<String>();
        List<String> emailString = new List<String>();	
       // Map<String,Lead> emailMap = new Map<String,Lead>(); 
        for(Lead eachRecordObj : recordList)
        {
           // emailMap.put(eachRecordObj.Email , eachRecordObj);
            emailString.add(eachRecordObj.Email);
            System.debug('Inside start after for loop');
        }
        
        
       
        
        List<Lead> emailStr = [SELECT Email FROM Lead WHERE Email in : emailString];
                            
        for(Lead eachRecord :  recordList)   
        {
            for(Lead eachEmailStr : emailStr)
            {
                if(eachRecord.Email == eachEmailStr.Email )
                {
                    System.debug('inside for after if');
                    uniqueEmail.add(eachRecord);
                }
            }
        }
   
    }
    
    public void finish(Database.BatchableContext BC) 
    {
       
         for(Lead eachUniqueEmail : uniqueEmail) 
         {
            
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            String[] toAddresses = new String[] {'harinarayanghosh1998@gmail.com' /*eachUniqueEmail.Email*/ };
            mail.setToAddresses(toAddresses);
            mail.setSubject('Duplicate Lead fount!! ');
            mail.setPlainTextBody('You have duplicate account!!');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
            System.debug('Mail send succesful!!');
         }
    }
    
}