#!/bin/bash

if [ $# -ne 1 ]
then
    echo "Usage is : $0 basepath"
    return 1
fi

declare -A file_type_num

while read item
do
    type=$(file -b $item)
    ##let ${file_type_num[$type]}++
    let file_type_num["$type"]++
done < <(find "$1" -type f -print)

#for item in ./*
#do
#    type=$(file -b $item)
#    ##let ${file_type_num[$type]}++
#    let file_type_num["$type"]++
#done

for ele in  "${!file_type_num[@]}"
do
    echo Type "$ele" : ${file_type_num["$ele"]}
done

echo ${file_type__num[@]} xx

cat > ./hello.c << end_of_file
    #include <stdio.h>
    int main(){
        printf("%s\n","hello world");
        return 0;
    }
end_of_file

gcc -o ./hello ./hello.c

if [ $? = 0 ]
then
    ./hello
else
    echo 'compile wrong'
fi
exit 0
