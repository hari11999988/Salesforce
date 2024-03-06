public class RandomContactFactory 
{
      public static List<Contact>generateRandomContacts(Integer num,string lastname)
    {
        List<Contact> con = new List<Contact>();
        for(Integer i=0;i<num;i++)
        {
            Contact conlist = new Contact(FirstName='Test'+i,LastName = lastname);
            con.add(conlist);
        }
        return con;
    }

}