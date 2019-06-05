base: base.o 
	gcc -o base base.o -L/usr/lib -lgdbm

base.o: base.c
	gcc -o base.o -c ./base.c -I/usr/include

clean: 
	rm -f *.o