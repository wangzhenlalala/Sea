SHELL = /bin/sh
CC=g++
CFLAGS=-I.
DEPS = settings.h
OBJ = settings.o tomato.o
EXDIR = $(ROOT_TOMATO)/bin
OBJDIR = $(ROOT_TOMATO)/obj

$(OBJDIR)/%.o: %.cpp $(DEPS)
    $(CC) -c -o $@ $<

$(EXDIR)/tomato: $(OBJ)
    $(CC) -o $@ $^ $(CFLAGS)

clean:
    rm -f a.out *.o

all: tomato