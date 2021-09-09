const {getLocalItem, setLocalItem} = require('./storageHandler')
const { ipcRenderer } = require("electron")
const ipc = ipcRenderer;

function getcurrenttimedate(dateSep="",gSeperator="",timeSep="") {
    date = new Date();

    month = date.getMonth() + 1;
    if (month.toString().length==1) {
        month = '0'+month
    }   
    day = date.getDate();
    if (day.toString().length==1) {
        day = '0'+day
    }
    hour = date.getHours();
    if (hour.toString().length==1) {
        hour = '0'+hour
    }
    minutes = date.getMinutes() + 1;
    if (minutes.toString().length==1) {
        minutes = '0'+minutes
    }   
    seconds = date.getSeconds();
    if (seconds.toString().length==1) {
        seconds = '0'+seconds
    }

    return [date.getFullYear(), month, day].join(dateSep) + gSeperator +
        [date.getHours(), date.getMinutes(), date.getSeconds()].join(timeSep);
}

function logging(log, custommode=false, customColor = "#ff4c4c", error=false, errorColor="#ff4c4c") {
    var logPara = document.createElement("p");
    logPara.innerHTML = "> [" + getcurrenttimedate("/", " ", ":") + "] " + log;
    if (custommode){
        logPara.style.color=customColor;
    }
    if (error) {
        logPara.style.backgroundColor=errorColor;
    }
    logele = document.querySelector("#logs");
    logele.appendChild(logPara);
    logele.scrollTo(0, logele.scrollHeight);
}


function selectRecFolder() {
    ipc.invoke('openFileExp', ["openDirectory"]).then((path) => {
        if(path===undefined){return}
        setLocalItem('destfolder', path[0]);
        document.querySelector("#selectdesbtn").innerHTML = "Change Folder";
        document.querySelector("#selecteddest").innerHTML = path[0];
        logging("Destination folder for saving recordings is set to "+path[0]);
        logging("You can change this by clicking change folder button");
    });
}


module.exports = {
    "logging": logging,
    "selectRecFolder":selectRecFolder,
    "getcurrenttimedate":getcurrenttimedate
}