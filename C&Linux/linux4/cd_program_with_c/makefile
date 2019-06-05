cd_program:cd_program.o
	gcc -o cd_program ./cd_program.o -L/usr/lib -lncurses
cd_program.o:cd_program.c 
	gcc -c ./cd_program.c -o  cd_program.o -I/usr/include
clean:
	rm -f ./*.o
