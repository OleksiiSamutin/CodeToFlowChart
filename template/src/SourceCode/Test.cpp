#include <stdio.h>
using namespace std;

int a = 10;

int main()
{
    double c = 1.256;

    double b = c + a;

    a = 0;

    a = 5;

    printf("b = %f\n", b);

    if (a == 0)
    {
        printf("It's Work!");
        if (b == 0)
        {
            printf("This is not good!!");
        }
    }
    else
    {
        printf("It's not Working!!!");
    }

    if (a == 0)
    {
        printf("It's Work!");
        if (b == 0)
        {
            printf("This is not good!!");
        }
    }

    return 0;
}
