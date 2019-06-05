#!/bin/sh

while read www 
    do
       printf "%s\t" "$?"
       echo "this is :  $www"
    done < ./name_list
    
    echo "$?"
      
     IFS=,
    read va vb vc
    printf "%s\n%s\n%s\n" "$va" "$vb" "$vc"

    exit 0
    
