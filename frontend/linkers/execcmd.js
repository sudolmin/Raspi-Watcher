const { exec } = require('child_process');
const {getLocalItem, setLocalItem} = require('./storageHandler');
const {logging, getcurrenttimedate} = require('./EventHandlers');

const pathLib = require("path");

function watchLive(){
    var ipaddr = getLocalItem("ipadr");
    var port = getLocalItem("port");

    command = `vlc rtsp://${ipaddr}:${port}/unicast --sub-filter=marq --marq-marquee="%d-%m-%Y %H:%M:%S" --marq-position=10 --marq-size=20 --marq-color=0xFEFEBF`;

    exec(command, (err, stdout, stderr)=>{
        console.log(err);
        console.log(stdout);
        console.log(stderr);
    });
    logging("Command Executed :: " + command, true, "#14e300");
}

function record(){
    var ipaddr = getLocalItem("ipadr");
    var port = getLocalItem("port");
    var destfolder = getLocalItem("destfolder");
    var recmode = getLocalItem("recmode");
    var recforhours = getLocalItem("recforhours");
    var currTD = getcurrenttimedate();

    if (recmode=="alwayson") {
        command = `vlc rtsp://${ipaddr}:${port}/unicast --sout="#transcode{acodec=none,scodec=none}:file{dst=${destfolder}\\${currTD}.mp4,no-overwrite}"`;

        exec(command, (err, stdout, stderr)=>{
            console.log(err);
            console.log(stdout);
            console.log(stderr);
        });
        logging("Command Executed :: " + command, true, "#14e300");

    } else {
        command = `vlc rtsp://${ipaddr}:${port}/unicast --sout="#transcode{acodec=none,scodec=none}:file{dst=${destfolder}\\${currTD}.mp4,no-overwrite}"`;
        // create daemon which will execute the command in interval set by user
        logging(`Note: Daemon is created, this will execute command every ${recforhours} hour(s).`)
        logging(`This command will start a process, this process will make VLC stream and save the file for ${recforhours} hour(s) length MP4 video.`)
        duration = recforhours * 60 * 60

        recdaemon(ipaddr, port, destfolder, duration);
        setInterval(() => {
            recdaemon(ipaddr, port, destfolder, duration);
        }, duration * 1000);
    }
}

function recdaemon(ipaddr, port, destfolder, duration) {
    currTD = getcurrenttimedate();
    command = `vlc rtsp://${ipaddr}:${port}/unicast --sout="#transcode{acodec=none,scodec=none}:file{dst=${destfolder}\\${currTD}.mp4,no-overwrite}" --stop-time ${duration} vlc://quit`;
    
    exec(command, (err, stdout, stderr)=>{
        console.log(err);
        console.log(stdout);
        console.log(stderr);
    });
    logging("Command Executed :: " + command, true, "#14e300");
}

module.exports = {
    "watchLive": watchLive,
    "record":record
}