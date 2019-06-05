#!/bin/sh

dialog --title "show calendar" --calendar "my date" 0 0 2>$(tty) 
exit 0
