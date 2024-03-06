public class GetContactForLwc {
    
    
    @Auraenabled(cacheable=true)
    public static List<Contact> getContact(String AccountId)
    {
        return [ SELECT Id,Name,AccountId FROM Contact WHERE AccountId =: AccountId];
    }



}