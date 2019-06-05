dbmc:dbmc.o
	gcc -o dbmc dbmc.o -lgdbm -lgdbm_compat

dbmc.o:dbmc.c 
	gcc -o dbmc.o -c dbmc.c -I/usr/include/gdbm-ndbm

clean:
	rm -f dbmc.o
