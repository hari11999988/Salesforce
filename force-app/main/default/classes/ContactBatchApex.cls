public class ContactBatchApex implements Database.Batchable<sObject> , Database.Stateful
{
    //System.debug('inside class');
    public List<Contact> contactList = new List<Contact>();
    public Database.QueryLocator start(Database.BatchableContext bc)
    {
        String query = 'SELECT Id ,Email ,LastName , Birthdate FROM Contact WHERE Birthdate != Null';
        
        System.debug('Inside start');
        // collect the batches of records or objects to be passed to execute
        return Database.getQueryLocator(query);
    }
    public void execute(Database.BatchableContext bc, List<Contact> recordList)
    {
        System.debug('inside execute');
        // process each batch of records
        for(Contact eachRecordObj : recordList)
        {
            system.debug('inside execute for loop');
            Date birthDateStr = eachRecordObj.Birthdate;
            Integer day = birthDateStr.Day();
            Integer month = birthDateStr.month();
            
            Date todayDate = System.today();
            Integer todayDay = todayDate.day();
            Integer todayMonth = todayDate.month();
            System.debug('Inside execute before if');
            if(todayDay == day && todayMonth == month) 
            {
                System.debug('Inside execute if');
                contactList.add(eachRecordObj);
            }
        }
        System.debug(contactList);
    }
    public void finish(Database.BatchableContext bc)
    {
        system.debug('inside execute');
        // execute any post-processing operations
        for(Contact eachCont :  contactList)
        {
            system.debug('inside finish for loop');
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            String[] toAddresses = new String[] {'sodesaideep@gmail.com','patilshubham2999@gmail.com' /*eachCont.Email*/ };
            mail.setToAddresses(toAddresses);
            mail.setSubject('Happy Birthday!! ');
            mail.setPlainTextBody('congratulation!!  you got lunched today');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        }
    }
}