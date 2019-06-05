#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

int main(int argc,char *argv[]){
    int result;
    while((result = getopt(argc,argv,":na:s")) != -1){
        switch(result){
            case 'n':
            case 's':
                printf("open option: %c \n",result);
                break;
            case 'a':
                printf("address is: %s\n",optarg);
                break;
            case ':':
                printf("you should give argument for %s\n",argv[optind-1]);
                break;
            case '?':
                printf("unknown option %c\n",optopt);
                break;
            default:
                break;
        }
    }
    while(optind < argc){
        printf("rest option: %s\n",argv[optind]);
        optind++;
    }
    exit(0);
}
