public class TriggerHandlerForOpportunity {
    
    public static void createOpportunity(List<Account> newList)
    {
        List<Opportunity> oppList = new List<Opportunity>(); 
        system.debug('inside method');
        for(Account eachObj : newList)
        {
             system.debug('inside for loop');
            Opportunity opp = new Opportunity();
            
            opp.Name = eachObj.Name;
            opp.CloseDate = System.Today();
            opp.StageName = 'Closed Lost';
            opp.AccountId = eachObj.Id;
            
            if( eachObj.Account_type__c == 'Null'  )
            {
                opp.Stage_Type__c = '0';
            }
            if( eachObj.Account_type__c == 'Reseller'  )
            {
                opp.Stage_Type__c = '10';
            }
            if( eachObj.Account_type__c == 'Buyer'  )
            {
                opp.Stage_Type__c = '25';
            }
            if( eachObj.Account_type__c == 'Current Customer'  )
            {
                opp.Stage_Type__c = '100';
            }
            oppList.add(opp);
        }
        insert oppList;
         system.debug('after insert');
    }

}