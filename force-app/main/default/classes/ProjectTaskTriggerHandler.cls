public class ProjectTaskTriggerHandler 
{
    public id temp;
    public static void taskUpdate(List<Project_Task__c> newList)
    {
        List<Project_Task__c> toUpdate = new List<Project_Task__c>();
        ProjectTaskTriggerHandler obj = new ProjectTaskTriggerHandler();
        for(Project_Task__c eachList : newList)
        {
            Project_Task__c task = new Project_Task__c();
            if(obj.temp != null)
            {
                task.Previous_Task__c = obj.temp;
            }
            
            obj.temp = eachList.Id;
            toUpdate.add(task);
            
        }
        update toUpdate;
        
    }

}