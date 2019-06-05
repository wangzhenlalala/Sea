#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h> //write read
#include <fcntl.h> //open 
#include <string.h> //strlen
#include <stdlib.h> //exit
#include <stdio.h>

int main(){
    //we can also use newline notation to move to next line with write sys call!!!
    char *to_write = "hello world linux\n";
    char *wrong_write = "somthing went wrong with writing system call\n";
    char read_buf[200];
    int num_write = 0;
    int num_read = 0;
    int filedesc = -1;
    num_write = write(1,to_write,strlen(to_write));
    if(num_write != strlen(to_write)){
        write(2,wrong_write,strlen(wrong_write));
        exit(2);
     }
     //sleep(1);
     num_read = read(0,read_buf,200);
     if(num_read == -1){
        write(2,"read error",10);
        exit(1);
     }
     if(write(1,read_buf,strlen(read_buf)) < strlen(read_buf)){
        write(2,"write error",10);
        exit(2);
     }
     //if file is going to create has already exited , then open call failed!!j
     filedesc = open("./open_create.txt",O_RDWR|O_APPEND | O_CREAT ,S_IRUSR | S_IWUSR | S_IROTH);
     if(-1 == filedesc ){
        write(2,"open error",10);
     }
     printf("%d\n",(int)filedesc);
     write(filedesc,"hello\n",6);
     write(1,"write open\n",11);
     close(filedesc);
     exit(0);
}
