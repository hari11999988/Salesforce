public class Demo 
{
    public static integer getAccount()
    {
        list<Account> accountList = [SELECT id,Name from Account];
        List<Integer> avgList = new List<Integer>();
        for(Account eachAccount : accountList)
        {
            Contact conList = [SELECT createddate,lastmodifieddate FROM contact WHERE AccountId =: eachAccount.id];
            
            Integer avg = (Date.valueOf(conList.createddate)).daysbetween(Date.valueOf(conList.lastmodifieddate))/2;
            
            avgList.add(avg);
           
        }
        
        integer sum = 0;
        integer count = avgList.size();
        for(integer each : avgList)
        {
            sum = sum+each;
        }
        return sum;
        
       }

}