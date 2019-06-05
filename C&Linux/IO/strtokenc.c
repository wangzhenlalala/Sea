/*the function strtok() can split a string into a serial of substring according to a delimeter 
 string.
 you should rethink why a pointer array is used here rather than a **array ???   */
#include<stdio.h>
#include<string.h>
#define  MAX_NUM  100

int main(){
	int loop;
	char str[]="hello everyone! this is wangzhen speaking to you in a c program";
	char *array[MAX_NUM];
	
	array[0]=strtok(str," ");

	if(!array[0])
		exit(0);

	for(loop=1;loop<MAX_NUM;loop++){
		if(!(array[loop]=strtok(NULL," ")))
			break;
	}

        for(loop=0;loop<MAX_NUM;loop++){
		if(array[loop]) 
		        printf("%s\n",array[loop]);
		else
			break;
	}

	return 0;
}
