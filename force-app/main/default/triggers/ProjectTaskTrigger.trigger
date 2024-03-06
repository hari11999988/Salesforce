trigger ProjectTaskTrigger on Project_Task__c (before insert , before update , before delete , after insert , after update ) 
{
    if(trigger.isBefore)
    {
        if(trigger.isUpdate)
        {
            ProjectTaskTriggerHandler.taskUpdate(trigger.new);
            
        }
    }

}