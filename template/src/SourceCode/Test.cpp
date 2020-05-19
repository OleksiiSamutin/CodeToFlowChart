#include <stdio.h>
using namespace std;

int a = 10;

int main()
{

    double b = c + a;

<<<<<<< HEAD
=======
    a = 0;

    a = 5;

>>>>>>> 704753c40bf0129d31d237f0fc5ae8ee1cdc1eea
    printf("b = %f\n", b);

    if (a == 0)
    {
        printf("It's Work!");
        if (b == 0)
        {
            printf("This is not good!!");
        }
    }


    if (a == 0)
    {
        printf("It's Work!");
        for(int i=0; i<5; i++){
            a = 11;
            if(i == 3){
                a = a + i;
        }
    }
    }
    else
    {
        printf("It's not Working!!!");
    }


    for(int i=0; i<5; i++){
        a = 11;
        if(i == 3){
            a = a + i;
        }
    }

<<<<<<< HEAD
    while (a<5){
       printf(c);
        a -= 1;
    }

    c = 5;

=======
>>>>>>> 704753c40bf0129d31d237f0fc5ae8ee1cdc1eea
    return 0;
}
