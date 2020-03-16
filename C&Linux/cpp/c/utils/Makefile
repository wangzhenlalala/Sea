CC = gcc
OBJS = utils.o
INCLUDES = -I./inlcude

%.o: ./src/%.c 
	$(CC) $(INCLUDES) -c -o $@ $<

# static lib's name must have be lib***.a ?????????????????
libutils.a: $(OBJS)
	ar rv $@ $^
	# make clean

clean:
	rm -f *.o

