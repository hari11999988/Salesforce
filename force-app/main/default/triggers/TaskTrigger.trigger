trigger TaskTrigger on Task (after delete) 
{
    if(Trigger.isAfter && Trigger.isDelete)
    {
        AccountTriggerHandlerForTask.isDeleteTask(Trigger.old , Trigger.isDelete);
    }

}