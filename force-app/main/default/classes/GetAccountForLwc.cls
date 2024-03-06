public class GetAccountForLwc {
    
    @Auraenabled(cacheable=true)
    public static List<Account> getAccount()
    {
        return [ SELECT Id,Name FROM Account];
    }
    @Auraenabled
    public static Account insertAccount(Account accountObj)
    {
        // if(accountObj.size()>0)
        // {
            try {
                System.debug('accountObj ->'+accountObj);
                insert accountObj;
                System.debug('accountObj ->'+accountObj.id);
                
            } catch (Exception ex) {
                 throw new AuraHandledException(ex.getMessage()); 
            }
        // }
        // Account a = new Account();
        // a.Name = accountObj['Name'];
        // a.BillingCity = accountObj['Billing city'];
        // a.Phone = parseInt(accountObj['Phone number']);
        // // insert accountObj;
        // // return a;
        // insert accountObj;
        // System.debug(accountObj.id);
        return accountObj;
    }
    @Auraenabled
    public static List<Account> getAccountDetails(List<id> idList)
    {
        return [SELECT Id,Name,Phone,BillingCity FROM Account WHERE Id in : idList];

    }
    @AuraEnabled
    public static void deleteAccount(id accId)
    {
        System.debug('accId ->'+accId);
        try {
            Account a = [SELECT Id FROM Account WHERE Id =: accId];
            System.debug('a ->'+a);
            delete a;
            System.debug('a ->'+a);
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}