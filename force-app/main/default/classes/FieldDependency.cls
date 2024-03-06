public class FieldDependency 
{
    public List<String> fieldData = new List<String>();
    
    @AuraEnabled(Cacheable=true)
    Public static List<String> getFields()
    {
        List<Schema.PicklistEntry> entries =  Booking__c.State__c.getDescribe().getPickListValues();
        
         List<String> activeEntries = new List<String>();
        for (Schema.PicklistEntry entry : entries) 
        {
            if (entry.isActive()) 
            {
                activeEntries.add(entry.getValue());
            }
    	}
       // fieldData = activeEntries;
        system.debug('activeEntries==>'+activeEntries);
        return activeEntries;
        
    }
    
    
    @AuraEnabled(Cacheable=true)
    public static List<String> getCity(String state)
    {
        system.debug('state=>'+state);
         List<Schema.PicklistEntry> entries =  Booking__c.City__c.getDescribe().getPickListValues();
        
         List<String> activeEntries = new List<String>();
        for (Schema.PicklistEntry entry : entries) 
        {
            if (entry.isActive() && entry.getValue() == state ) 
            {
                if(entry.getValue() == 'Bhubaneswar' || entry.getValue() == 'Cuttack' || entry.getValue() == 'Baleswar')
                {
                    activeEntries.add(entry.getValue());
                }
                
            }
            
            else if (entry.isActive() && state == 'Jharkhand') 
            {
                if(entry.getValue() == 'Jhamshedpur' || entry.getValue() == 'Ranchi' || entry.getValue() == 'Ghatsila')
                {
                    activeEntries.add(entry.getValue());
                }
                
            }
            
            else if (entry.isActive() && state == 'West Bengal') 
            {
                if(entry.getValue() == 'Kolkata' || entry.getValue() == 'Kharagpur' || entry.getValue() == 'Mednipur')
                {
                    activeEntries.add(entry.getValue());
                }
                
            }
    	}
        system.debug('activeEntries==>'+activeEntries);
        return activeEntries;
        
       
    }
}