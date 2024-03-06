public with sharing class DataImportComponentHandler {
   @AuraEnabled
   public static List<Allobjects__c> getObjectName(){
    try {
        return [ SELECT Id, Name FROM Allobjects__c];
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
   @AuraEnabled
   public static void insertRecords(String value , List<Object> data){
    System.debug('o');
    try {
        System.debug('inside insert');
        System.debug('value' + value);
        for(Object eachdata : data) {
            System.debug('eachdata' +eachdata);   
            
        }
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
}