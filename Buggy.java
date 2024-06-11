import java.util.ArrayList;
import java.util.Random;

public class Buggy {
    public static void main(String[] args) {
        ArrayList<String> arr = new ArrayList<>(10000);
        for(int i = 0; i < arr.size(); i++) {
            Random k = new Random();
            int num = k.nextInt(10);
            System.out.println(num);
        }
        
        int m = 1;
        int res = 0;
        if(m == 1) {
            res = 1;
        }
        else if(m == 2) {
            res = 2;
        }
        else if(m == 3) {
            res = 3;
        }
        else if(m == 4) {
            res = 4;
        }
        else if(m == 5) {
            res = 5;
        }
        else if(m == 6) {
            res = 6;
        }
        else if(m == 7) {
            res = 7;
        }
        else {
            res = -1;
        }
        
        boolean a = true;
        boolean b = true;
        boolean c = true;
        int num2 = 1;
        if(a) {
            if(b) {
                if(c) {
                    num2 = -1;
                }
            }
        }
        
        System.out.println("Hello World\n");
        System.out.println("Hello World\n");
        System.out.println("Hello World\n");
        System.out.println("Hello World\n");
    }
}

