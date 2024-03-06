global  class DailyLeadProcessor implements Schedulable
{
    global void execute(SchedulableContext sc)
    {
        List<Lead> listoflead = [SELECT Id from Lead where LeadSource = null Limit 200];
        List<Lead>  listofupdatedlist = new List<Lead>();
        if(!listoflead.isEmpty())
        {
            for(Lead ld : listoflead)
            {
                ld.LeadSource = 'Dreamforce';
                listofupdatedlist.add(ld);
                
                
            }
            update listofupdatedlist;
        }
        
    }

}