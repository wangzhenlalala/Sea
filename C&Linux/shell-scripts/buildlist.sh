#!/bin/sh
dialog --title "buildlist" --separator "$"  --visit-items  --buildlist "hello buildlist" 0 0 0  1 "wangzhen" "on" 2 "tutu" off 3 "fanghua" off 4 "mama" on 5 "father" on 2>./buildlist.txt

exit 0
