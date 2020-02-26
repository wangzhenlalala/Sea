

# CPPFLAGS -I标记非标准头文件存放路径
# LDFLAGS  -L标记非标准库存放路径

CPP = g++
CPPFLAGS = -std=c++11 \
	       -Wall \
		   -Werror
LDFLAGS = 
SOURCES = main.cpp
OBJECTS = main.o

# $@ is the target of a rule
main: $(OBJECTS)
	$(CPP) -o $@ $(CPPFLAGS) -pthread $(OBJECTS)

.PHONY : clean
clean:
	-rm  $(OBJECTS) main
	# 而在 rm 命令前面加了一个小减号的 意思就是，也许某些文件出现问题，但不要管，继续做后面的事。




# objects = main.o kbd.o command.o display.o \
# insert.o search.o files.o utils.o

# edit : $(objects)
#     cc -o edit $(objects)

# main.o : defs.h
# kbd.o : defs.h command.h
# command.o : defs.h command.h
# display.o : defs.h buffer.h
# insert.o : defs.h buffer.h
# search.o : defs.h buffer.h
# files.o : defs.h buffer.h command.h
# utils.o : defs.h