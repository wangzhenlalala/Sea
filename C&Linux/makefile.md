# gcc options
source files:
    1. input.c
output file:
    1. input

## preprocessed file
> gcc -E input.c    
> input.i

## assemble code
> gcc -S input.c   
> input.s

## object file
> gcc -c input.c    
> input.o

## target
> gcc -o input input.c   
> input

## link with shared library(l)
we have libmath.a | math.dll | libmath.so  in the standard path
>gcc -o input input.c -lmath   
> input

## specify shared libray path(captial L)
we have /home/mylib/libmath.a
> gcc -o input input.c -L/home/mylib -lmath   

## specify header-file path (capital I)
we have /path/myheader/coolheader.h and was included in some files
> gcc input.c -I/path/myheader/   

## compile with macros
> gcc input.c  -DDEVELOPMENT
> It is equivalent to add to the code (#define DEVELOPMENT)



``` make deduce
objects = main.o kbd.o command.o display.o \
          insert.o search.o files.o utils.o

edit : $(objects)
        cc -o edit $(objects)

main.o : defs.h
kbd.o : defs.h command.h
command.o : defs.h command.h
display.o : defs.h buffer.h
insert.o : defs.h buffer.h
search.o : defs.h buffer.h
files.o : defs.h buffer.h command.h
utils.o : defs.h

.PHONY : clean
clean :
    -rm edit $(objects)
```