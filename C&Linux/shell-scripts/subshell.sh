#!/bin/bash
# if you make the first line this "#!/bin/sh" then line 10 "read -n 1" will be illegal !!!
# different shells differs a little bit with another;;;; pay attention !!!

echo 
pwd
(cd /bin/;pwd)
pwd

read -n 1 -s wang
[ -z $wang ] && exit 1
while [ "$wang" != "q" ] ; do
echo $wang
read -n 1 -s wang
done 
while read -u30 one && read -u40 two ;do
	echo $one +++ $two
	done 30<./name_list 40<./name_list_copy
exit 0
