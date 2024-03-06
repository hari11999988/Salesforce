public class PeginationConta 
{
    public List<contact> contactList{get;set;}
    public Integer offSetLimit = 0;
    public string searchText{get;set;}
    public Integer pageSize{get;set;}
    public Integer recCount;
    
    public boolean dis{get;set;}
     public boolean disEnd{get;set;}
    public boolean disNext{get;set;}
    public boolean disPre{get;set;}
    
    public PeginationConta()
    {
        pageSize = 5;
        disNext = false;
        disPre = true;
        dis = true;
        disEnd = false;
        contactList=[SELECT Name,Email,Phone,AccountId FROM Contact limit : pageSize offset : offSetLimit];
    }
    
     Public void Next()
     {
         recCount = [SELECT count() FROM Contact];
         offSetLimit = offSetLimit + pageSize;
         contactList=[SELECT Name,Email,Phone,AccountId FROM Contact limit : pageSize offset : offSetLimit];
         dis=false;
         disPre = false;
         
         Integer pagesTotal =  (Integer) Math.ceil(recCount / pageSize);
         Integer pagesCurrent =  (Integer) Math.floor(offSetLimit / pageSize) + 1;
         
         if(pagesTotal == pagesCurrent)
         {
             
             disEnd = true;
             disNext =true;
         }
         else
         {
             disEnd = false;
             disNext =false;
             
         }
         
     }
     
     Public void Previous(){
         if(offSetLimit > 0)
         {
             offSetLimit = offSetLimit - pageSize;
             contactList=[SELECT Name,Email,Phone,AccountId FROM Contact limit : pageSize offset : offSetLimit];
             disEnd = false;
             disNext =false;
             dis=false;
             disPre = false;
              if(offSetLimit==0)
             {
                 
                 dis=true;
                 disPre = true;
             }
             else
             {
                 dis=false;
                 disPre = false;
                 
             }
         }
         
        
     }
    
    Public void start()
    {
         
             offSetLimit = 0;
             contactList=[SELECT Name,Email,Phone,AccountId FROM Contact limit : pageSize offset : offSetLimit];
             dis = true;
             disEnd = false;
             disNext =false;
             disPre = true; 
        
     }
    
     Public void End()
    {
        recCount = [SELECT count() FROM Contact];
        
        offSetLimit = recCount - math.mod(recCount, pageSize);
        contactList=[SELECT Name,Email,Phone,AccountId FROM Contact limit : pageSize offset : offSetLimit];
        disEnd = true;
        dis = false;
        disNext =true;
        disPre = false;
        
     }
    
    public void search()
     {
         searchText='%'+searchText+'%';
         contactList=[SELECT Name,Email,Phone,AccountId FROM Contact WHERE Name like : searchText or Email Like : searchText limit : pageSize offset : offSetLimit];
         searchText='';
     }
    public void onChange()
    {
         contactList=[SELECT Name,Email,Phone,AccountId FROM Contact limit : pageSize offset : offSetLimit];
    }

}