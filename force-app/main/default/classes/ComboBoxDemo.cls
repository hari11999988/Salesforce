public class ComboBoxDemo 
{
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccount()
    {
        return [SELECT id,Name from Account];
    }

}