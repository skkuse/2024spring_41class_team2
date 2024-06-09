import java.util.ArrayList;
import java.util.Random;

public class Fixed {

    public static void main(String[] args) {
        ArrayList<String> arr = new ArrayList<>();
        int arrSize = arr.size();

        Random k = new Random();
        for(int i = 0; i < arrSize; i++) {
            int num = k.nextInt(10);
            System.out.println(num);
        }

        
        int m = 1;
        int res = 0;
        switch(m) {
            case 1:
                res = 1;
                break;
            case 2:
                res = 2;
                break;
            case 3:
                res = 3;
                break;
            case 4:
                res = 4;
                break;
            case 5:
                res = 5;
                break;
            case 6:
                res = 6;
                break;
            case 7:
                res = 7;
                break;
            default :
                res = -1;
                break;
        }

        
        boolean a = true;
        boolean b = true;
        boolean c = true;
        int num2 = 1;
        if((a && b) && c) {

            num2 = -1;

        }

        
        //System.out.println("Hello World\n");
        //System.out.println("Hello World\n");
        //System.out.println("Hello World\n");
        //System.out.println("Hello World\n");
    }
}


