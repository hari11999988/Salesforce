public class ContactSearch {
    public static List<Contact> searchForContacts(String str1, String str2){
        Return [Select id,Name from Contact Where Lastname =: str1 and MailingPostalCode =: str2];
    }

}