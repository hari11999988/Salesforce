public class StringArrayTest {
    public static List<String> generateStringArray(integer n){
        List<String> lst = new List<String>();
        for(integer i=0; i<n;i++){
            lst.add('Test '+i);
        }
        return lst;
    }

}