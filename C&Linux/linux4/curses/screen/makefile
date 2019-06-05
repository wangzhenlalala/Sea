screen:screen.o
	gcc -o screen ./screen.o -L/usr/lib -lncurses
screen.o:screen.c 
	gcc -c ./screen.c -o  screen.o -I/usr/include
clean:
	rm -f ./*.o
