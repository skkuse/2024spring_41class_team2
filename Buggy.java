import java.util.ArrayList;
import java.util.Random;

public class Buggy {
    public static void main(String[] args) {
        ArrayList<String> arr = new ArrayList<>();
        int s = arr.size();
        for(int i = 0; i < arr.size(); i++) {
            Random k = new Random();
            int num = k.nextInt(10);
            System.out.println(num);
        }

        boolean a = true;
        boolean b = true;
        boolean c = true;
        int num = 1;
        if(a) {
            if(b) {
                if(c) {
                    num = -1;
                }
            }
        }

        int k = 1;
        int res = 0;
        if(k == 1) {
            res = 1;
        }
        else if(k == 2) {
            res = 2;
        }
        else if(k == 3) {
            res = 3;
        }
        else if(k == 4) {
            res = 4;
        }
        else if(k == 5) {
            res = 5;
        }
        else if(k == 6) {
            res = 6;
        }
        else if(k == 7) {
            res = 7;
        }
        else {
            res = -1;
        }

        System.out.println("Hello World\n");
        System.out.println("Hello World\n");
        System.out.println("Hello World\n");
        System.out.println("Hello World\n");
    }
}

