cd_program:cd_program.o
	gcc -o ./bin/cd_program ./cd_program.o -L/usr/lib -lncurses
cd_program.o:cd_program.c 
	gcc -c ./cd_program.c -o  ./obj/cd_program.o -I/usr/include
clean:
	rm -f ./**/*.o
