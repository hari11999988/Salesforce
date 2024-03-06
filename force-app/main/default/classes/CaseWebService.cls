@RestResource(urlMapping='/caseinfo/*')
    global with sharing class CaseWebService {
        @HttpGet
        global static Case getCaseInfo() {
            RestRequest req = RestContext.request;
            RestResponse res = RestContext.response; 
            String urlId = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
            Case caseDetails = [SELECT Id, CaseNumber from Case WHERE CaseNumber =: urlId];
            return caseDetails;
        }
    
        @HttpPost
        global static void updateCase(String jsonString) {
            List<Case> cases = (List<Case>) System.JSON.deserialize(jsonString, List<Case>.class);
            update cases;
        }
    
        /*@HttpDelete
        global static void deleteCase(Id caseId) {
            delete [SELECT Id FROM Case WHERE Id = :caseId];
        }*/
    }