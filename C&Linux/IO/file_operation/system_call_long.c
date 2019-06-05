#include <unistd.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdlib.h>

int main(){
    char buf[1024];
    int in,out,nread;
    in = open("./file_in",O_RDONLY);
    out = open("./file_out",O_WRONLY | O_CREAT,S_IRUSR | S_IWUSR);
    while((nread = read(in,buf,1024)) > 0){
        write(out,buf,nread);
    }
    exit(0);
}
