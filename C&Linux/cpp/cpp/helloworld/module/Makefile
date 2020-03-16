main: Vector.o
	g++ -o main main.cpp ./Vector/Vector.o -I./Vector

Vector.o:
	g++ -c ./Vector/Vector.cpp -o ./Vector/Vector.o

clean:
	rm ./main \
	   ./Vector/Vector.o