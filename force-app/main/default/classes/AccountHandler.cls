public class AccountHandler {
    public static Account insertNewAccount(String Acc){
        Account a = new Account();
        a.Name = acc;
        try{
            insert a;
            return a;
        }catch(Exception e){
            return null;
        }
        
    }

}