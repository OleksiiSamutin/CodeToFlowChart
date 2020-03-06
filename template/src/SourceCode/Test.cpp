#include <stdio.h>
using namespace std;

int a = 10;

int main()
{
    double c = 1.256;

    double b = c + a;

    a = 0;

    printf("b = %f\n", b);

    if (a == 0)
    {
        printf("It's Work!");
    }

    a = 5;

    return 0;
}