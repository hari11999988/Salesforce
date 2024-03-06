public class ProjectTriggerHandler 
{
    public static void createProjectTask(List<Project__c> newList)
    {
        id temp;
        List<Project_Task__c> taskList = new List<Project_Task__c>();
        List<Schema.PicklistEntry> entries =  Project_Task__c.Type__c.getDescribe().getPickListValues();
        List<String> option = new List<String>();
        for (Schema.PicklistEntry entry : entries) 
        {
            if (entry.isActive()) 
            {
                option.add(entry.getValue());
            }
    	}
        for(String eachEntry : option)
        {
            
            Project_Task__c task = new Project_Task__c();
            task.Type__c = eachEntry;
            if(temp != null)
            {
                task.Previous_Task__c = temp;
                system.debug('temp==>'+temp);
            }
            
            for(Project__c eachList : newList)
            {
                task.Project__c = eachList.Id;
               
            }
            taskList.add(task);
        }
        insert taskList;
        
    }

}