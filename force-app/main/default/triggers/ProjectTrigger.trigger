trigger ProjectTrigger on Project__c (before insert, before update , before delete , after insert , after update) 
{
    if(trigger.isAfter)
    {
        if(trigger.isInsert)
        {
            ProjectTriggerHandler.createProjectTask(trigger.new);
        }
    }

}