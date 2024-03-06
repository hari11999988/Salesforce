public class AggrigateQuery {
   
    @AuraEnabled
    public static List<AggregateResult> getAllObject(){
    //     List<Schema.SObjectType> objList = Schema.getGlobalDescribe().Values();     
    //     List<String> objNames = new List<String>();
    //    // objNames.add(new SelectOption('','-- Select --'));
    //     for(Schema.SObjectType obj : objList)
    //     {
    //         objNames.add(String.valueOf(new SelectOption(obj.getDescribe().getName(),obj.getDescribe().getLabel())));
    //     }
    //     objNames.sort();
    //     return objNames;

           return [SELECT SObjectType FROM ObjectPermissions GROUP BY SObjectType ORDER BY SObjectType ASC];
    }

    @AuraEnabled
    public static List<FieldDefinition> getRecord(String obj){
        System.debug('obj'+obj);
        System.debug('query==>'+[SELECT  QualifiedApiName FROM FieldDefinition WHERE EntityDefinition.QualifiedApiName =: obj]);
       return [SELECT  QualifiedApiName FROM FieldDefinition WHERE EntityDefinition.QualifiedApiName =: obj];
    }
}