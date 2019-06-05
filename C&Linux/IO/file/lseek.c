#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>

int main(){
	off_t offvalue;
	if((offvalue = lseek(STDIN_FILENO,0,SEEK_CUR)) == -1){
		printf("\ncat't seek\n");
	}else{
		printf("\nseek successfully\n");
	}

	
	return 0;
}
