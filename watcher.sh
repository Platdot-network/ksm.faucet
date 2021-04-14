#!/bin/bash

sec=60

while true
do
    ocrThread=`ps -ef | grep "backend" | grep -v "grep"`
    echo $ocrThread
    count=`ps -ef | grep "backend" | grep -v 'grep' | wc -l`
    echo $count

    if [ $count -eq 0 ];then
        echo "start process....."
        nohup yarn bot &
        nohup yarn backend &
    else
        echo "runing......"
    fi
    sleep $sec
done
