#include <stdio.h>
#include <stdlib.h>
#include <mysql.h>


int main(){
	MYSQL *connect,connect1;
	my_ulonglong res;
	MYSQL_RES *myres;
	MYSQL_ROW myrow;
	MYSQL_FIELD *myfield;
	

	connect = mysql_init(&connect1);

	if(!connect){
		printf("sorry !! something is wrong!\n");
		exit(EXIT_FAILURE);	
	}

/*connect = mysql_real_connect(connect,"localhost","wangzhen","wang111zhen","class",0,NULL,0);
	if() printf();
	else 
		fprintf();


		if i write like this ,error can't be captured.
*/


if(mysql_real_connect(connect,"localhost","wangzhen","wangzhen","class",0,NULL,0)){
	       	printf("connect successfully!!\n");
//	res=mysql_query(connect,"INSERT INTO classmates(name,age) values('liping',23)");
//		res = mysql_query(connect,"UPDATE classmates set age=22 where sex='male'");
		
		res = mysql_query(connect,"select * from classmates");

		if(!res){
		//	printf("change:%lu  lines successfully!\n",(unsigned long)mysql_affected_rows(connect));
			

			if(myres=mysql_store_result(connect)){

				while(myfield=mysql_fetch_field(myres)){
					printf("%s\t",myfield->name);
					printf("%s\t",myfield->table);
				}	
				puts("\n");

				while(myrow=mysql_fetch_row(myres)){
					printf("\t%s\n",myrow[1]);
				}
			}else{
				printf("mysql_store_result errors have occured!!!");
			}

		 }else
			fprintf(stderr,"error is : %s\n",mysql_error(connect));
		
}else {
	printf("can't connect to server!!\n");
	fprintf(stderr,"error is %d : %s",mysql_errno(connect),mysql_error(connect));
}

	mysql_close(connect);

	exit(EXIT_SUCCESS);
}

