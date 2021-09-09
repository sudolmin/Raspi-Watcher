const {watchLive, record} = require('./frontend/linkers/execcmd')
const {selectRecFolder, logging} = require('./frontend/linkers/EventHandlers')
const {getLocalItem, setLocalItem} = require('./frontend/linkers/storageHandler')
const { ValidateIPaddress } = require('./frontend/linkers/validators')

window.addEventListener('DOMContentLoaded', () => {

    setLocalItem("recmode", "alwayson");
    var ipaddr = getLocalItem("ipadr");
    var port = getLocalItem("port");
    var destfolder = getLocalItem("destfolder");
    
    if (ipaddr==null) {
        setLocalItem("ipadr", "0.0.0.0");
        ipaddr = getLocalItem("ipadr");
    }
    if (port==null) {
        setLocalItem("port", "8554");
        port = getLocalItem("port");
    }
    if (destfolder!=null) {
        document.querySelector("#selectdesbtn").innerHTML = "Change Folder";
        document.querySelector("#selecteddest").innerHTML = destfolder;
        logging("Destination folder for saving recordings is set to "+destfolder);
        logging("You can change this by clicking change folder button");
    }

    document.querySelector('#ipaddr').value = ipaddr;
    document.querySelector('#port').value = port;

    logging("IP address set to "+ipaddr);
    logging("Port set to "+port);

    document.querySelector("#ipaddr").addEventListener("change", (e)=>{
        ValidateIPaddress(e.target.value);
    });
    
    document.querySelector("#port").addEventListener("change", (e)=>{
        setLocalItem("port", e.target.value);
    logging("Port set to "+e.target.value);
    });
    
    document.querySelector("#watchbtn").addEventListener("click", () => {
        watchLive();
    });
    
    document.querySelector("#recordbtn").addEventListener("click", () => {
        record();
    });
    
    document.querySelector("#selectdesbtn").addEventListener("click", () => {
        selectRecFolder();
    });
    
})