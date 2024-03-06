trigger ContactTrigger on Contact (before insert,before update,before delete,after insert,after update,after delete) 
{
    if(trigger.isInsert && trigger.isBefore)
    {
        ContactHandler.beforeInsert(trigger.new);
    }

}