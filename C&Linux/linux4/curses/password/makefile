password:password.o
	gcc -o password ./password.o -L/usr/lib -lncurses
password.o:password.c 
	gcc -c ./password.c -o  password.o -I/usr/include
clean:
	rm -f ./*.o
