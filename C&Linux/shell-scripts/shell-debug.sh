#!/bin/sh

mydebug()
{
	[ "$_DEBUG" = "on" ] && $@ || true
}

for i in 1 2 3 4 5 6
	do
	mydebug  "echo $i"
	done
echo "finished"

exit 0
