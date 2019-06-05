#!/bin/sh

trap "clear"  INT
dialog   --title "experiment of dialog" --ok-label "wangzhen" --begin 10 20 --no-shadow --backtitle "hello world" --msgbox  "bill of book" 20 30 
exit 0 
