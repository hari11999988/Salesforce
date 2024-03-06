public class ContactVFpageController 
{
    
    public List<String> contactList {get;set;}
    public id contactId{get;set;}
    
    List<contact> conList =  [SELECT Id, Name, Email, Phone, MailingStreet, MailingCity, MailingState FROM Contact WHERE Createddate = THIS_MONTH];
    
  
    public List<WrapperClass> WrapperClassList {get; set;}

    public ContactVFpageController() 
    {
        
        
        
        //contactList = [SELECT Id, Name, Email, Phone, MailingStreet, MailingCity, MailingState FROM Contact WHERE CreatedDate = THIS_MONTH];
         
        if(WrapperClassList == Null)
        {
            
            WrapperClassList = new List<WrapperClass>();
            for(Contact con:conList)
            {
                WrapperClassList.add(new WrapperClass(con));
            }
        }
        
        
    }
   
    public pagereference editRec()
    {
        
        system.debug(contactId);
        String url = 'https://ibirdssoftwareservicepvtl-a-dev-ed.lightning.force.com/lightning/r/Contact/'+contactId+'/view' ;
        
        pagereference pgref = new pagereference(url);
        pgref.setRedirect(true);
        return pgref;
    }
    
   public void deleteRec()
    {
       // System.debug('inside delete method');
        contact con1 = [SELECT Id FROM Contact WHERE id =:contactId];
        delete con1;
        //System.debug('After delete');
        
        WrapperClassList.clear();
         
       List<contact> conListNew =  [SELECT Id, Name, Email, Phone, MailingStreet, MailingCity, MailingState FROM Contact WHERE Createddate = THIS_MONTH ];

        
           
            for(Contact con:conListNew)
            {
                //System.debug('Inside for loop');
                WrapperClassList.add(new WrapperClass(con));
                //.debug('After calling wrapper class');
            }
        
       
    }
     
    public class WrapperClass
    {
        
         public Contact cont {get; set;}
         public string mailingAddress{get;set;}
        
        
        public WrapperClass(Contact con)
        {
            
            cont = con ;
             if(cont.MailingStreet == null)
                {
                   cont.MailingStreet = ' '; 
                }
                if(cont.MailingCity == null)
                {
                   cont.MailingCity = ' '; 
                }
                if(cont.MailingState == null)
                {
                   cont.MailingState = ' '; 
                }
             mailingAddress = cont.MailingStreet + ' '+ cont.MailingCity+' ' + cont.MailingState;
             
        
            
            
        }
    }
  
}