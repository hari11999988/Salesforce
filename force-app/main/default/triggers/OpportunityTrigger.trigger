trigger OpportunityTrigger on Opportunity (before insert, before update, before delete, after insert, after update, after delete) 
{
    if(Trigger.isAfter && Trigger.isInsert)
    {
        OpportunityTriggerHandler.isInsert1(Trigger.new);
    }
    else if(Trigger.isBefore && Trigger.isUpdate)
    {
        OpportunityTriggerHandler.isUpdateOpp(Trigger.new , Trigger.oldMap);
        OpportunityTriggerHandler.isUpdateOpp1(Trigger.new , Trigger.oldMap);
        OpportunityTriggerHandler.isUpdateAmount(Trigger.new , Trigger.oldMap);
    }
    
    else if(Trigger.isBefore && Trigger.isDelete)
    {
        OpportunityTriggerHandler.isDeleteOpp(Trigger.oldMap);
    }

}