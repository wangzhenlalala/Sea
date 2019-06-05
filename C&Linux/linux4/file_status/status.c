#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>

int main(){
    struct stat statBuf;
    mode_t mode;
    int code = 0;

    code = stat("./statusTest.txt",&statBuf);
    if(code == 0){
        mode = statBuf.st_mode;
        if(S_ISREG(mode)){
            write(1,"regular file\n",13);
            if((mode & S_IWUSR) != 0){
                write(1,"user write\n",11);
            }
        }
    }else{
        write(2,"stat error",10);
    }
    return 0;
}
