CC = gcc
INCLUDE += -I../utils/include
LIBS += -L../utils/ -lutils


OBJS = reap_children_no_order.o

# vpath %.h ../utils/include

PWD := $(shell pwd)

%.o: %.c
	$(CC) -c $(INCLUDE) $< -o $@

main: $(OBJS)
	echo $(pwd)
	# $(CC) $<  $(INCLUDE) $(LIBS) -o $@
	# the order of .o is important!! $(OBJS) depends on libutils.a
	# so $(OBJS) must come before libutils.a
	$(CC) $< $(LIBS) -o $@
	 

clean:
	rm -f ./*.o main