public class LeadVFpageController {
 
    
    public Lead leadList{ get; set;}
    
    Public Boolean showNew{get;set;}
    Public Boolean showDetail{get;set;}

    public LeadVFpageController()
    {
        
        leadList = new Lead();
        showNew = true;
        showDetail = false;
    }


    public void Edit() 
    {
      // Save();
        showNew = true;
           showDetail = false;
    }


    public  Void Save() 
    {
           if(leadList.id == Null)
           {
               insert leadList;
               showNew = false;
               showDetail = true;
           }
           if(leadList.id != Null)
           {
              update leadList; 
               showNew =false;
               showDetail= true;
           }
      
    }


}