#include<stdio.h>
#include<string.h>

typedef unsigned char* CHAR_POINTER;

void print_hex(CHAR_POINTER base, int length){
	CHAR_POINTER current = base;
	int i = 0;
	printf("0x");
	for(i=0; i<length; i++){
		printf("%.2x",*( current + i ));
	}
	printf("\n");
}

void int_hex(void *number, char* type){
	if(strstr(type, "unsigned")){
		printf("%20s %10u : ", type,  *(unsigned int *)number);
	}else{
		printf("%20s %10d : ", type,  *(int *)number);
	}
	print_hex( (CHAR_POINTER)number, sizeof(int));
}

void char_hex(void *pointer, char* type){
	if(strstr(type, "unsigned")){
		//when %c is specified, it wants a int argument and its argument will be first converted to unsinged char
		printf("%20s %10u : ", type, *(unsigned char*)pointer );
	}else{
		printf("%20s %10d : ", type, *(char*)pointer);
	}
	print_hex( (CHAR_POINTER)pointer, sizeof(char));
}
int main(){
	unsigned  int num = 17;
	int num2 = 17;
	int num3 =  134528;
	signed char ch1 = -17;
	unsigned char ch2 = 24;

	int_hex(&num,"unsigned int");
	int_hex(&num2,"signed int");
	int_hex(&num3,"signed int");
	char_hex(&ch1, "signed char");
	char_hex(&ch2, "unsigned char");
	return 0;
}
