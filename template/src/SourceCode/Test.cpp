#include <stdio.h>
using namespace std;

int a = 10;

int main()
{
    double c = 1.256;

    double b = c + a;

    a = 0;

    printf("b = %f\n", b);

    for (int i = 0; i < 10; i++)
    {
        printf("Hello world!");
    }

    while (a < 1510)
    {
        a = 0;
    }

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

    a = 5;

    return 0;
}
