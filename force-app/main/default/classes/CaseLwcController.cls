public class CaseLwcController 
{
    @auraEnabled
    public static List<string> getCaseRequest()
    {
        List<Schema.PicklistEntry> entries =  case_request__c.category__c.getDescribe().getPickListValues();
        
        
        List<String> activeEntries = new List<String>();
        for (Schema.PicklistEntry entry : entries) 
        {
            if (entry.isActive()) 
            {
                activeEntries.add(entry.getValue());
            }
    	}
        system.debug('activeEntries==>'+activeEntries);
        return activeEntries;
        
    }
    
    @auraEnabled
    public static List<case_request_template__c> getCaseRequestTemplate(String caserequest)
    {
        List<case_request_template__c> caseList = [SELECT Name FROM case_request_template__c WHERE category__c =:caserequest];
        
        system.debug('caseList=>'+caseList);
        
        return caseList;
        
    }
    
    @auraEnabled
    public static case_request_template__c getEmail(Id value)
    {
        case_request_template__c caseList = [SELECT Email__c FROM case_request_template__c WHERE Id=:value];
        
        system.debug('caseList=>'+caseList);
        
        return caseList;
        
    }

}