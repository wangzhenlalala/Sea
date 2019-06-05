multiWindow:multiWindow.o
	gcc -o multiWindow ./multiWindow.o -L/usr/lib -lncurses
multiWindow.o:multiWindow.c 
	gcc -c ./multiWindow.c -o  multiWindow.o -I/usr/include
clean:
	rm -f ./*.o
