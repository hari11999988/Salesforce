@RestResource(urlMapping='/caseSearchinfo/*')
global class HttpCalloutDemo {
  
        @HttpGet
        global static Case getCaseInfo() {
            RestRequest req = RestContext.request;
            String urlId = RestContext.request.params.get('CaseNumber');
            System.debug('urlId==>'+urlId);
            RestResponse res = RestContext.response; 
            //String temp = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
            //String urlId= temp.get('CaseNumber');
            Case caseDetails = [SELECT Id,CaseNumber,Status,Priority from Case WHERE CaseNumber =: urlId];
            system.debug('caseDetails ->'+caseDetails);
            return caseDetails;
        }
        
       @HttpPatch  
       global static Case updateCase()
       {
           system.debug('inside updateCase');
           RestRequest request = RestContext.request;
           Case c = (Case)JSON.deserialize(request.requestBody.toString(), Case.Class);
           System.debug('c=='+c);
           System.debug('id=='+c.Id);
           Case caseObj = [SELECT Id,CaseNumber,Status,Priority FROM Case WHERE id =:c.Id];
           System.debug('caseObj'+caseObj);
           update c;
           return c;
           
       }
        
       @HttpDelete 
       global static void deleteCase()
       {
           system.debug('inside updateCase');
           RestRequest request = RestContext.request;
           String urlId = RestContext.request.params.get('CaseNumber');
           system.debug('urlId'+urlId);
           Case c = [SELECT Id From Case WHERE Id =:urlId];
           delete c;
           System.debug('c'+c);
       }
    
        
       
    }