public class ContactAndLeadSearch {
    public static List<List< sObject>> searchContactsAndLeads(String value){
        String searchQuery = 'FIND \'' + value + '\' IN ALL FIELDS RETURNING  Contact(FirstName,LastName),Lead(FirstName,LastName,Name)';
        List<List< sObject>> returnList = search.query(searchQuery);
        return returnList;
    } 

}