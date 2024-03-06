/*Handler class of Opportunity Object
 * Date-24 aug 2022
 * Name-Hari
 * Description-  On Opportunity  insert/update/delete the amount should be added or subtracted from specific account. 
 */

public class OpportunityTriggerHandler 
{
    //Method for after insert Opp. amount it should reflact in related account Opp_Sum__c custom field
    
    public static void isInsert1(List<Opportunity> newList)
    {
       List<Opportunity> accList = new List<Opportunity>();
        Set<id> idSet=new Set<id>();
       for(Opportunity eachOpp : newList)
       {
           idSet.add(eachOpp.AccountId);
       }
        List<account> accountList=[select ID,Opp_Sum__c from account WHERE Id in : idSet];
        for(Opportunity eachListObj : newList)
        {
            if(eachListObj.AccountId != null)
            {
                accList.add(eachListObj);
          
            }
        }
        List<Account> finalAcc= new List<Account>();
        for(account accountObj : accountList)
        {
           // Decimal amm = accountObj.Opp_Sum__c;
            for(Opportunity eachId : accList)
            {
                if(eachId.Amount != null )
                {
                    if(accountObj.Id == eachId.AccountId)
                    {
                        accountObj.Opp_Sum__c = eachId.Amount + accountObj.Opp_Sum__c;
                        finalAcc.add(accountObj);
                    }
                }
            }
        }
        update finalAcc;
       
    }
    
    //After update Acc. Id in Opp. it should update in respected Acc 
    
    public static void isUpdateOpp(List<Opportunity> newList , Map<Id, Opportunity> oldMap)
    {
        List<Account> accountList= new List<Account>([SELECT id,Opp_Sum__c FROM account]);
        List<Account> finalAccList = new List<Account>(); 
       
        List<Account> accountFinal = new List<Account>();
       
       
        for(Opportunity eachListObj : newList)
        {
            
            if(oldMap.containsKey(eachListObj.Id) && oldMap.get(eachListObj.Id).Accountid != eachListObj.AccountId)
            {
                
                for(Account eachAccObj : accountList)
                {
                    
                    if(eachListObj.AccountId == eachAccObj.Id)
                    {
                        eachAccObj.Opp_Sum__c = eachListObj.Amount + eachAccObj.Opp_Sum__c;
                        system.debug('Hii !!');
                        
                        finalAccList.add(eachAccObj);
                    }
                }
                
            }
        }
        update finalAccList;
    
    }
    
    //After change the Acc id from Opp the amount should substract from old Acc
    
  public static void isUpdateOpp1(List<Opportunity> newList , Map<id, Opportunity> oldMap)
     {
         List<Opportunity> oldAccountObj = new List<Opportunity>();
         
         List<Account> finalAcc = new List<Account>();
         
         List<Account> relatedAccountList = new List<Account>([SELECT id ,Opp_Sum__c FROM account ]);
         
         for(Opportunity eachOppObj : oldMap.values())
         {
            for(Account eachAcc : relatedAccountList)
            {
                if( eachOppObj.AccountId == eachAcc.id )
                {
                    eachAcc.Opp_Sum__c = eachAcc.Opp_Sum__c - eachOppObj.Amount;
                    finalAcc.add(eachAcc);
                }
            }
         }
         update finalAcc;
         
         
     }
    //when we update amount with same account id
      public static void isUpdateAmount(List<Opportunity> newList , Map<id, Opportunity> oldMap)
      {
          List<Account> accList = new List<Account>();
          for(Opportunity eachMap : oldMap.values())
          {
              accList = [SELECT Id , Opp_Sum__c FROM Account ];
          }

          List<Account> finalAccList = new List<Account>();
          System.debug(accList);
         
          for(Opportunity eachOppObj : newList)
          {
              if( eachOppObj.Amount != oldMap.get(eachOppObj.Id).Amount &&  eachOppObj.AccountId == oldMap.get(eachOppObj.Id).AccountId )
              {
                   System.debug('Inside 1st if');
                  
                  for(Account eachOppMapObj : accList)
                  { 
                      if(eachOppobj.AccountId == eachOppMapObj.Id)
                      {
                      //eachOppMapObj.Opp_Sum__c = eachOppMapObj.Opp_Sum__c - oldMap.get(eachOppObj.Id).Amount;
                      System.debug('Inside 2st if');
                      eachOppMapObj.Opp_Sum__c = eachOppMapObj.Opp_Sum__c + eachOppObj.Amount;
                      finalAccList.add(eachOppMapObj);
                      }
                  
                  } 
              }
             
          }
          update finalAccList;
          
      }
    
    // After delete the ammount should be substract from related Acc
    
   public static void isDeleteOpp(Map<Id, Opportunity> oldMap)
   {
       List<Account> accountList= new List<Account>([SELECT id,Opp_Sum__c FROM account]);
       
       
       
       for(Opportunity eachOppObj : oldMap.values())
       {
           for(Account eachAccountObj : accountList)
           {
               if( eachOppObj.AccountId == eachAccountObj.id )
               {
                   eachAccountObj.Opp_Sum__c = eachAccountObj.Opp_Sum__c - eachOppObj.Amount;
                   update eachAccountObj;
               }
           }
       }
       
   }

}