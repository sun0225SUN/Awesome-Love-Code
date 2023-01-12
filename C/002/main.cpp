#include<stdio.h>
#include<math.h>
int main()
{
	float y, x, z;

	printf("那一天\n");
	printf("第一次遇见你\n");
	printf("忘不了\n");
	printf("你的容颜\n");
	printf("若轻云之蔽月,如流风之回雪\n");
	printf("\n\n\n");
	printf("其实\n");
	printf("有一句话\n");
	printf("我一直想对你说:\n");

	for (double y = 2.5; y >= -1.6; y = y - 0.2)
	{
		for (double x = -3; x <= 4.8; x = x + 0.1)
		{
			(pow((x * x + y * y - 1), 3) <= 3.6 * x * x * y * y * y
				|| (x > -2.4 && x < -2.1 && y<1.5 && y>-1)
				|| (((x < 2.5 && x>2.2) || (x > 3.4 && x < 3.7)) && y > -1 && y < 1.5)
				|| (y > -1 && y < -0.6 && x < 3.7 && x>2.2)) ? printf("*") : printf(" ");
		}

		printf("\n");
	}

	getchar();
}
