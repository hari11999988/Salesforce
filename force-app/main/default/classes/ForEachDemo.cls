public class ForEachDemo
{
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccountRecord()
    {
        return [SELECT id,Name from Account];
    }
}