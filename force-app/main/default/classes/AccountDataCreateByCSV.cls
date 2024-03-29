public class AccountDataCreateByCSV {
    /**
    * @description create account records by CSV file.
    * @author techdicerkeeplearning@gmail.com | 05-27-2023 | Story Number
    * @param base64Data
    * @return List<Account> returns the provided list of accounts
    **/
    @AuraEnabled
    public static List<Account> createAccountRecords(String base64Data) {
        String data = JSON.deserializeUntyped(base64Data).toString();
        List<Account> accList = new List<Account>();
        List<String> lstCSVLines = data.split('\n');
        for(Integer i = 1; i < lstCSVLines.size(); i++){
            Account acc = new Account();
            String csvLine = lstCSVLines[i];
            String prevLine = csvLine;
            Integer startIndex;
            Integer endIndex;
            
            while(csvLine.indexOf('"') > -1){
                if(startIndex == null){
                    startIndex = csvLine.indexOf('"');
                    csvLine = csvLine.substring(0, startIndex) + ':quotes:' + csvLine.substring(startIndex+1, csvLine.length());
                }else{
                    if(endIndex == null){
                        endIndex = csvLine.indexOf('"');
                        csvLine = csvLine.substring(0, endIndex) + ':quotes:' + csvLine.substring(endIndex+1, csvLine.length());
                    }
                }
                
                if(startIndex != null && endIndex != null){
                    String sub = csvLine.substring(startIndex, endIndex);
                    sub = sub.replaceAll(',', ':comma:');
                    csvLine = csvLine.substring(0, startIndex) + sub + csvLine.substring(endIndex, csvLine.length());
                    startIndex = null;
                    endIndex = null;
                }
            }
            
            List<String> csvRowData = new List<String>();
            for(String column : csvLine.split(',')){
                column = column.replaceAll(':quotes:', '').replaceAll(':comma:', ',');
                csvRowData.add(column);
            }
            acc.Name = csvRowData[0];
            acc.Phone = csvRowData[1];
            acc.AccountNumber = csvRowData[2];
            accList.add(acc);
        }
        if(!accList.isEmpty()){
            insert accList;
        }
        return accList;
    }
}