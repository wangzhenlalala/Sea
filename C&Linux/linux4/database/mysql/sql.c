#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <mysql.h>

typedef struct  {
	char *name;
	unsigned long length;
} field_type, *field_type_pointer;

int insert(MYSQL * , char* , char* , int);
int update_age(MYSQL*, char*, char*, int);
void action_error(MYSQL*, char*);
void retrieve_by_age_by_all(MYSQL*, char*, int);
void retrieve_by_age_one_by_one(MYSQL*, char*, int);
void display_row(MYSQL*, MYSQL_ROW, field_type_pointer);
field_type_pointer display_header(MYSQL_RES* ,int*);


int main(){
	//MYSQL *conn_ptr;
	MYSQL connection;
	int res;
	field_type_pointer base; //
	if( !mysql_init(&connection) ){
		fprintf(stderr,"mysql_init failed \n");
		return EXIT_FAILURE;
	}
	//(connection pointer, ip address, user name, password, database_name, port_number, socket_name, flag);

	//if( !mysql_real_connect(&connection, "localhost","wangzhen","wangzhen","family",0,NULL,0) ){
	//if you delete from a table,with a where clause. mysql_affected_rows will give you the correct results
	//but if you don't provide a where clause to delete from a table, mysql_affected_rows will give you ZERO,	UNLESS we set CLIENT_FOUND-ROWS，in mysql_real_connect
	if( !mysql_real_connect(&connection, "localhost","wangzhen","wangzhen","family",0,NULL,CLIENT_FOUND_ROWS) ){
		printf("Connection failed\n");
		fprintf(stderr,"error is %d--%s\n",mysql_errno(&connection), mysql_error(&connection) );
		return EXIT_FAILURE;
	}else{
		printf("Connection success\n");

		// printf("begin to insert one line \n");
		// insert(&connection,"member", "wang xiaohua", 6);

		// printf("begin to update:\n");
		// update_age(&connection, "member", "xiaohua", 250);

		printf("begin to retrieve data\n");
		//retrieve_by_age_by_all(&connection, "member", 5);
		retrieve_by_age_one_by_one(&connection, "member", 5);
	}

	mysql_close(&connection);
	return EXIT_SUCCESS;
}

int insert(MYSQL * connection_ptr, char* table_name, char* member_name, int member_age){
	int res ;
	char* temp_pointer = malloc(1024);
	if(!temp_pointer){
		return EXIT_FAILURE;
	}
	//don't forget to add single quote around member_name!!! sql receives string type....
	sprintf(temp_pointer,"INSERT INTO %s(name, age) VALUES('%s', %d)", table_name, member_name, member_age);
	res = mysql_query(connection_ptr, temp_pointer);
	if(res){
		action_error(connection_ptr, "INSERT");
		free(temp_pointer);
		return EXIT_FAILURE;
	}else{
		printf("INSERT %lu rows\n", (unsigned long)mysql_affected_rows(connection_ptr) );
	}
	free(temp_pointer);
	return 0;
}

int update_age(MYSQL* connection_ptr, char* table_name, char* name, int age){
	int res;
	char* temp_pointer = malloc(1024);
	//memset(temp_pointer,'\0', 1024);
	sprintf(temp_pointer, "UPDATE  %s SET age=%d WHERE name='%s'", table_name, age, name );
	//the compiler expects a string literal to be the first argument !!!  not a dynamic allocted char sequence!!
	printf( "%s\n", temp_pointer);
	res = mysql_query(connection_ptr,temp_pointer);
	if(res){
		action_error(connection_ptr,"UPDATE");
		free(temp_pointer);
		return EXIT_FAILURE;
	}else{
		printf("Updated %lu rows\n", (unsigned long)mysql_affected_rows(connection_ptr));
	}
	free(temp_pointer);
	return 0;
}

void action_error(MYSQL* connection_ptr,char* action){
	fprintf(stderr,"%s Error: %d -- %s", action, mysql_errno(connection_ptr), mysql_error(connection_ptr));
	return;
}

void retrieve_by_age_by_all(MYSQL* connection_ptr, char* table_name, int age ){
	int res;
	MYSQL_RES *result;
	MYSQL_ROW sqlrow;
	my_ulonglong total_rows;

	char *temp_ptr = malloc(1024);
	sprintf(temp_ptr, "SELECT number,name,age,gender FROM %s WHERE age=%d ", table_name, age);	
	res = mysql_query(connection_ptr, temp_ptr);
	if(res){
		action_error(connection_ptr, "SELECT");
		free(temp_ptr);
		return;
	}
	free(temp_ptr);
	result = mysql_store_result(connection_ptr);
	if(!result){
		action_error(connection_ptr,"mysql_store_data");
		return;
	}

	total_rows = mysql_num_rows(result);
	printf("we got %lu rows\n", (unsigned long)total_rows);
	while( ( sqlrow = mysql_fetch_row(result) ) != NULL  ){
		printf("fetched data\n");
		display_row(connection_ptr, sqlrow,NULL); //will be wrong 
	};
	if(mysql_errno(connection_ptr)){
		//error
		action_error(connection_ptr, "mysql_fetch_row");
		mysql_free_result(result);
		return;
	}
	mysql_free_result(result);
	return ;
} 

void retrieve_by_age_one_by_one(MYSQL* connection_ptr, char* table_name, int age ){
	int res;
	int result_len;
	int i = 0;
	MYSQL_RES *result;
	MYSQL_ROW sqlrow;
	my_ulonglong total_rows;
	field_type_pointer fields_simplify;
	char *temp_ptr = malloc(1024);
	sprintf(temp_ptr, "SELECT * FROM %s WHERE age=%d ", table_name, age);	
	res = mysql_query(connection_ptr, temp_ptr);
	if(res){
		action_error(connection_ptr, "SELECT");
		free(temp_ptr);
		return;
	}
	free(temp_ptr);
	result = mysql_use_result(connection_ptr);
	if(!result){
		action_error(connection_ptr,"mysql_use_data");
		return;
	}
	//because mysql_use_result will retrieve all matched rows one by one with every request to mysql_fetch_row() 
	//by sending a network request. so we can not get the actual rows now!!!!

	//total_rows = mysql_num_rows(result);
	//printf("we got %lu rows\n", (unsigned long)total_rows);
	fields_simplify = display_header(result, &result_len);
	//printf("\n%s \t%lu \t%d\n",fields_simplify[0].name, fields_simplify[0].length, result_len);
	while(i < result_len){
		printf("%*s", fields_simplify[i].length, fields_simplify[i].name);
		i++;
	}
	printf("\n");
	i=0;	
	while( ( sqlrow = mysql_fetch_row(result) ) != NULL  ){
		display_row(connection_ptr, sqlrow, fields_simplify);
	};
	if(mysql_errno(connection_ptr)){
		//error
		action_error(connection_ptr, "mysql_fetch_row");
		mysql_free_result(result);
		return;
	}
	free(fields_simplify);
	mysql_free_result(result);
	return ;
} 


void display_row(MYSQL* connection_ptr, MYSQL_ROW sqlrow, field_type_pointer fp){
	int field_count = 0;
	int i = 0;
	field_count = mysql_field_count(connection_ptr);
	while( i < field_count){
		printf("%*s", fp[i].length, sqlrow[i]);
		i++;
	}
	printf("\n");
}

field_type_pointer display_header(MYSQL_RES* res_ptr,int *len){
	MYSQL_FIELD* field_ptr;
	field_type_pointer fields_base;
	field_type temp_field;
	int length = 0;
	mysql_field_seek(res_ptr, 0); //every time ,the move to the begining of fields;
	printf("Colunm detail: \n");
	//field_ptr = mysql_fetch_fields(res_ptr);
	length = mysql_num_fields(res_ptr);
	// printf("field number: %d\n", length);
	

	fields_base = ( field_type_pointer )malloc( length * sizeof( field_type ) );
	length = 0;

	while( (field_ptr = mysql_fetch_field(res_ptr) ) != NULL){
		// printf("\tName: %s\n", field_ptr->name);
		// printf("\tType: ");
		// if(IS_NUM( field_ptr->type)){
		// 	printf("Numeric field\n");
		// }else{
		// 	switch(field_ptr->type){
		// 		case FIELD_TYPE_LONG:
		// 			printf("Long\n");
		// 			break;
		// 		case FIELD_TYPE_VAR_STRING:
		// 			printf("VARCHAR\n");
		// 			break;
		// 		default:
		// 			printf("is %d, check in mysql.com.h\n",field_ptr->type); //type is %d
		// 	}
		// }

		// printf("\tWidth %ld\n", field_ptr->length);
		// printf("\tMax-length %ld\n", field_ptr->max_length); //If you use mysql_use_result(), the value of this variable is zero.
		// if(field_ptr->flags & AUTO_INCREMENT_FLAG){
		// 	printf("\tAuto increments\n");
		// }
		printf("%s  %lu\n", field_ptr->name, field_ptr->length);
		temp_field.name = field_ptr->name;
		temp_field.length = field_ptr->length;


		fields_base[length] = temp_field;
		length++;
		// printf("\n");
	}
	*len = length;
	return fields_base;
}