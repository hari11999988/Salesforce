public class SearchContact 
{
     @AuraEnabled(Cacheable = true)
    public static list<Contact> getAccountData(String textkey) {
        textkey = '%' + textkey + '%';
         list<Contact> accLst = [SELECT  Id, Name, Email From Contact WHERE Email LIKE :textkey];
        
        if(accLst.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return accLst; 
    }
    
    
     @AuraEnabled(Cacheable = true)
     public static list<Contact> getContactData( ) 
     {
         return [SELECT  Id, Name, Email From Contact];
     }
    

}