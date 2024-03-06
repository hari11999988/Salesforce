/*Handler class of AccountTrigger Object
* Date-22 aug 2022
* Name-Hari
* Description-  Logic 1: 
*               On Account insert Auto_Create_Contact__c is true and Contact_Count__c is null then show the error
*               Logic 2: 
*               On Account insert/update if the Account.AccountNumber exists in other account throw error 
*               Logic 3: 
*               On Account Insert if Auto_Create_Contact__c is true and Contact_Count__c is > 0 create those much of contacts
*               Logic 4: 
*               Whenever the Account is deleted and Account.ParentId != null then all the realted contacts should be parented to the 
*               Account's Parent.
*
*============================================================================================================================================
*/
public class AccountTriggerHandler 
{
    // Method for showing Error when Auto_Create_Contact__c(Account object) == true and eachAccount.Contact_Count__c(Account object) == null
   
   /* public static void isCheckContactCount(List<Account> newList)
    {
        for(Account eachAccount : newlist)
        {
            if(eachAccount.Auto_Create_Contact__c == true &&  eachAccount.Contact_Count__c == null  )
            {
                eachAccount.addError('You must enter the contact count to auto-create contacts !!');
                
            }
            else if(eachAccount.Contact_Count__c <= 0)
            {
                eachAccount.addError('Contact count should not be 0 or less then');
            }
        }
        
    }
  
    //Method for showing error When we update or insert duplicate accountnumber   
 
  public static void isCheckDuplicateAccountNumber(List<Account> newList) 
    {          
        Set<String> accountNumberSet = new Set<String>();
        
        for(Account acc : newList)
        {
            if(acc.AccountNumber != null)
            {
                accountNumberSet.add(acc.AccountNumber);
            }
            
        }
        
        Map<String,Account> duplicateMap = new Map<String,Account>();
        
        for(Account account: [Select id, AccountNumber from Account where AccountNumber =: accountNumberSet and id not in: newList])
        {
            duplicateMap.put(account.AccountNumber, Account);
        }
        
        for(Account acc1:newList)
        {
            
            if(acc1.AccountNumber != null && duplicateMap.containsKey(acc1.AccountNumber))
            {
                
                acc1.addError('Duplicate account found');
            }
        }  
        
        
        
    }  
  // On Account Insert if Auto_Create_Contact__c is true and Contact_Count__c is > 0 
  // create those much of contacts with the following field mapping   
 
    public static void isMappingField(List<Account> newList )
    {
        
        
        List<Contact> con=new List<Contact>();
        
        for(Account eachList : newList)
        {
            if(eachList.Auto_Create_Contact__c == true && eachList.Contact_Count__c > 0)
            {
                for(Integer i=1 ; i<=eachList.Contact_Count__c ; i++ ) 
                {
                    contact conn=new contact();
                    
                    conn.LastName = eachList.Name+' child contact '+i;
                    conn.MailingStreet = eachList.shippingStreet;
                    // con.add(conn);
                    conn.AccountId = eachList.Id;
                    conn.MailingState = eachList.ShippingState;
                    conn.MailingCity = eachList.ShippingCity;
                    conn.MailingCountry = eachList.ShippingCountry;
                    conn.MailingPostalCode = eachList.ShippingPostalCode;
                    conn.Grant_Parent_Account__c = eachList.ParentId;
                    // system.debug(eachList.Contact_Count__c);
                    // system.debug('update');
                    con.add(conn);
                }
                insert con;  
                
            }
        }
    }
    
    
  // Whenever the Account is deleted and Account.ParentId != null
  //  then all the realted contacts should be parented to the Account's Parent.  
   
    public static void isDelete(List<Account> oldList)
    {
        for(Account eachAcc: oldList )
        {
            if(eachAcc.ParentId == null)
            {
                return;
            }
        }
        List<Contact> relatedContact = new List<Contact>();
        
        Map<Id,Id> accountId = new Map<Id, Id>();
        
        List<Contact> newList = new List<Contact>();
        
        for(Account eachList : oldList)
        {
            accountId.put(eachList.Id, eachList.ParentId);
        }
        
        relatedContact=[select AccountId from Contact ];
        
        for(Contact eachCont : relatedContact)
        {
            // if(eachCont.Grant_Parent_Account__c != null)
            //{
            if(accountId.containsKey(eachCont.AccountId))
            {
                eachCont.AccountId=accountId.get(eachCont.AccountId);
                newList.add(eachCont);
            }
            //}
            
        }	
        update newList;
        
        
        
    }
    
    
    //with the same account name is already inserted
    public static void checkAccountName(List<Account> newList)
    {
        System.debug('inside checkAccountName');
        Set<String> nameList = new Set<String>();
        for(Account eachList : newList)
        {
            nameList.add(eachList.Name);
        }
        System.debug('nameList ->'+nameList);
        List<Account> accountList = [SELECT Id, Name From Account WHERE Name in: nameList AND Id Not in :newList limit 1];
        System.debug('accountList ->'+accountList);
        List<Contact> conList  = [SELECT Id,AccountId FROM Contact WHERE AccountId in : accountList];
        Map<String,Account> accMap = new Map<String,Account>();
        for(Account acc : accountList)
        {
              accMap.put(acc.Name,acc);
        }
        
        Map<id,contact> conMap = new Map<id,contact>();
        for(contact con : conList)
        {
              conMap.put(con.AccountId,con);
        }
        List<Contact> insertCon = new List<Contact>();
        for(Account acc : newList)
        {
            if(accMap.containsKey(acc.Name))
            {
               if(conMap.containsKey(accMap.values().Id))
               {
                   conMap.values().AccountId = acc.Id;
               }
            }
            contact con = new contact();
            con.Lastname = acc.Name;
            con.AccountId = acc.Id;
            insertCon.add(con);
        }
        System.debug('accountList ->'+accountList);
        System.debug('newList ->'+newList);
        System.debug('conMap.values() ->'+conMap.values());
         if(conMap.size()>0)
        {
            update conMap.values();
        }
        if(accountList.size()>0)
        {
             delete accountList;
        }
        insert insertCon;
        
        List<Account> lstAccToUp = [SELECT Id ,Name ,Client_Contact__c,(SELECT Id FROM Contacts) FROM Account where id In :newList ];
        
        Map<Id ,Contact> mapAccToUp = new Map<Id,Contact>();
                
        for(Contact eachCon : insertCon)
        {
            if(eachCon.AccountId != null)
            mapAccToUp.put(eachCon.Accountid,eachCon);
        }
        
        for(Account eachAcc : lstAccToUp)
        {
				eachAcc.Client_Contact__c = mapAccToUp.get(eachAcc.Id).Id;
            system.debug('conId--> '+mapAccToUp.get(eachAcc.Id).Id);
        }
        update lstAccToUp;
        
    }*/
    
    public static void CreateAccounts(List<Account> newLst){
        
        for(Account acc: newLst){
            if(acc.ShippingState != acc.BillingState ){
                acc.ShippingState = acc.BillingState;
            }
        } 
    }
    
    
}