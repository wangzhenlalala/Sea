/*this program is to demostrate the user's simple information that written in the file /etc/passwd.
  */
#include <stdio.h>
#include <sys/types.h>
#include <pwd.h>



int main(){
	uid_t uid;  // it can be printed in the type int .
	struct passwd *pw;

	uid=getuid();
	printf("user id is : %d\n",uid);
        
	printf("%s\n",getlogin());  //getlogin() to get current user's login-name;

	//pw=getpwuid(getuid());   //you can get info with parameter  uid ;
	pw=getpwnam("itachi");     //also  you can do it with     user's login_name ;

	printf("%s\n%s\n%s\n",pw->pw_name,pw->pw_shell,pw->pw_gecos);	

	printf("%s","-------------------------------------------------------------------");
	puts("\n\n\n");


	while((pw=getpwent())!=NULL)                   //getpwent() to scan /etc/passwd  and fet                                                       //ch one line each time;
		printf("%s\n",pw->pw_name);

	return 0;

}
