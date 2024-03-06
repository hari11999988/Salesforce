public class AccountTriggerHandlerForTask
{
    //Method for checking all necessaey condition
    public static void isCheckingAllCondition(    List<Account> newList)
    {
        for(Account eachAccount : newList)
        {
            if( eachAccount.Start_Date__c != Null)
            {
                if(eachAccount.End_date__c == Null)
                {
                    eachAccount.addError('End date must needed!!');
                }
                if(eachAccount.Start_Date__c > eachAccount.End_date__c )
                {
                    eachAccount.addError('End date must greater!!'); 
                    
                }
            }
        }
    }
    
    
    public static void isMappingField(List<Account> newList)
    {
        List<Task> taskList = new List<Task>();
        
        for(Account eachAccountObj : newList)
        {
            integer monthbw = eachAccountObj.Start_Date__c.monthsBetween(eachAccountObj.End_date__c);
            System.debug(monthbw);
            
            for(Integer i = 1 ; i <= monthbw ; i++)
            {
                Task taskObj = new Task();
                taskObj.Status = 'Not Started';  
                taskObj.WhatId = eachAccountObj.Id; 
                taskObj.OwnerId = userinfo.getUserId();
                taskObj.Subject = 'Email';
                taskObj.ActivityDate = eachAccountObj.Start_Date__c.addMonths(i);
                
                
                    Date d = taskObj.ActivityDate;
                    Datetime dt = (DateTime)d;
                    String dayOfWeek = dt.format('EEEE');
               
                 if(dayOfWeek =='saturday')
                   {
                      taskObj.ActivityDate = taskObj.ActivityDate.addDays(2);
                    }
                
                   else if(dayOfWeek =='Sunday')
                   {
                     taskObj.ActivityDate = taskObj.ActivityDate.addDays(1);
                   }
                
                taskList.add(taskObj);
            }
        }
        insert taskList;
        
    }
    
     public static void isDeleteTask(List<Task> oldList , boolean del)
     {     
         
         List<Account> lstAccsToupdate = new List<Account>();
            
            Set<Id> setAccountIds = new Set<Id>();
            
            if (del)
            {
              for (Task t : oldList) 
              {
                   String whatId;
                   if(t.WhatId != null)
                   {
                       whatId = t.WhatId;
                   }
                       
            
                   if (whatId.startsWith('001')) 
                   {
                       setAccountIds.add(whatId);
                   }
              }
                
                
              for (Account a : [select Id from Account where Id in :setAccountIds]) 
              {
                  
              
              }
            
              if (!lstAccsToupdate.isEmpty()) update lstAccsToupdate;
            }
                     
         
     }
    
    
}