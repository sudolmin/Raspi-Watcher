# Raspberry Pi RTSP camera Project

## Description:
This project consists an Desktop application for viewing and recording live feed from raspberry pi camera using VLC API.

## Requirements:
1. Raspberry Pi with camera attached in the same network.
2. VLC media player installed in the client computer.

## Setting up server in Raspberry Pi:

### Updating Raspberry Pi OS
`
sudo apt-get update && sudo apt-get upgrade 
`
### Installing **v4l2rtspserver** package

`sudo apt-get install libv4l-dev liblog4cpp5-dev git cmake -y`
#### Once all the packages gets installed, run this command
`git clone https://github.com/mpromonet/v4l2rtspserver.git ; cd v4l2rtspserver/ ; cmake . ; make ; sudo make install`

Now you run your server using the command on the terminal

`pi@raspberrypi:~ $ v4l2rtspserver`

This command will run your server in default mode. For tinkering options like controlling height, width, FPS, Port you can run, to know more.

`pi@raspberrypi:~ $ v4l2rtspserver --help`

For eg, 

`pi@raspberrypi:~ $ v4l2rtspserver -W 1080 -H 720 -F 30 -P 8554 /dev/video0`

## Setting up client:

### Install VLC

[Download](http://https://www.videolan.org/vlc/ "download") and install vlc.

For windows computer, make sure your **vlc.exe** containing folder is in Environment PATH variable. You can check this by running 

In Powershell/CMD

`C:\Users\someuser> vlc `

or

`C:\Users\someuser> vlc.exe`

If VLC screen comes up, you are good to go, if not. Set your Environment Path Variable.

Now, you can install this software and use for surveillance or any other use case.
