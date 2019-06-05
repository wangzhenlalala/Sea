#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <pwd.h>

int main(){
    char* pname;
    char name[L_tmpnam];
    uid_t uid;
    struct passwd *pw;
    pname = tmpnam(name);
    printf("temp file name is : %s\n",pname);
    uid = getuid();
    printf("uid is : %d\n",uid);
    pw = getpwuid(uid);
    printf("gid is %d\nhome is %s\nshell is %s\nlogin name is %s\n" ,\
            pw->pw_gid,\
            pw->pw_dir,\
            pw->pw_shell,\
            pw->pw_name);
    return 0;
}
