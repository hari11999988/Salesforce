public class ContactController 
{
    public list<Contact> conList {get; set;}
    public boolean checkBox{get;set;}
    
    public ContactController()
    {
        checkBox = false;
        conList = [SELECT Id,Lastname,Email FROM Contact];
    }
    
     @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts()
    {
       // return [SELECT FirstName, LastName, Email FROM Contact];
         throw new AuraHandledException('Forced error');
    }
   

}