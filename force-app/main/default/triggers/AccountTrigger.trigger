trigger AccountTrigger on Account (before insert /*, before update ,before delete, after insert/*, after update, after delete*/) 
{
    
    
    if(Trigger.isBefore && Trigger.isInsert)
    {
        AccountTriggerHandler.CreateAccounts(Trigger.new);
        
        //AccountTriggerHandlerForTask.isCheckingAllCondition(Trigger.new);
        
    }

   /*  if((Trigger.isBefore && Trigger.isInsert) || (Trigger.isBefore && Trigger.isUpdate) )
    {
        
       // AccountTriggerHandler.isCheckDuplicateAccountNumber(Trigger.new );
        
    }
    
     if(Trigger.isAfter && Trigger.isInsert)
     {
        //AccountTriggerHandler.isMappingField(Trigger.new);
        //AccountTriggerHandlerForTask.isMappingField(Trigger.new);
        //TriggerHandlerForOpportunity.createOpportunity(Trigger.new);
        //AccountTriggerHandler.checkAccountName(Trigger.new);
         System.debug('After method call');
     }
    
    else if(Trigger.isBefore && Trigger.isDelete)
    {
       // AccountTriggerHandler.isDelete(Trigger.old);
    }*/
    
}