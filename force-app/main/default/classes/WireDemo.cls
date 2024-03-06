public class WireDemo {
    
    @AuraEnabled(cacheable = true)
    
    public static List<Account> getAccountRecord()
    {
        return [SELECT Id,Name FROM Account];
    }

}