public with sharing class SearchContactHandler {
    public SearchContactHandler() {

    }
    @AuraEnabled
    public static List<Contact> contactDetails(Integer limits){
           //System.debug('limits=>'+limits);
            return [select Id,Name,Email,Phone,Account.Name from contact limit :limits];
      
    }

    @AuraEnabled
    public static List<Contact> searchContact(String searchKey, Integer limits){
        String s = '%'+searchKey+'%';
        return [select Id,Name,Email,Phone,Account.Name from contact where Name like :s or Email like :s limit :limits];
    }

    @AuraEnabled
    public static List<Contact> fetchContacts(){

        return [select Id,Name,Email,Phone,Account.Name from contact];
       
    }
}