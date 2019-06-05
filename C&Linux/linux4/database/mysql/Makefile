sql: sql.o
	gcc -o sql sql.o -L/usr/lib -lmysqlclient

sql.o: 
	gcc -o sql.o -c sql.c -I/usr/include/mysql
clean: 
	rm -f *.o
