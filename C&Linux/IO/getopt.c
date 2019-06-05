#include <stdio.h>
#include <unistd.h>

int main(int argc,char *argv[]){
	int tar;
        puts("\n");
	puts("\n");
	while((tar=getopt(argc,argv,":w:djs"))!= -1){
		switch(tar){
			case 'w' :
				printf("%s------%s\n\n","wangzhen",optarg);
				break;       

	                case 'd' :
				printf("D-----%s\n\n","dahen-xuliangzhou");
				break;       
	                case 'j' :
				printf("J-----%s\n\n","juhua-huwenjiang");
				break;       
	                case 's' :
				printf("S-----%s\n\n","sanpang-donghao");
				break;       
			case ':' :
				printf("sorry!  please follw  << w >> a argument\n\n");
				break;       
                	case '?' :
				printf("%s------> : %c\n","sorry,unrecognized parameter",optopt);
				break;       
		}

	}

        puts("\n");
	puts("\n");
	return 0;
}

