all: server client

.c.o:
	gcc -c $<

server.o: server.c
client.o: client.c

server: server.o 
	gcc -o server ./server.c

client:
	gcc -o client ./client.c

clear: 
	rm -f ./*.o
	rm -f ./*_fifo
