public class ContactHandler {
    public static void beforeInsert(List<Contact> newList)
    {
        for(Contact eachCon : newList)
        {
            if(eachCon.Checkbox__c == false)
            {
                eachCon.addError('Checkbox is mendotory!!');
            }
            eachCon.Description = Userinfo.getName();
        }
    }

}