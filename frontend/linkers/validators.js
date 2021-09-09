const {getLocalItem, setLocalItem} = require('./storageHandler')
const {logging} = require('./EventHandlers');

function ValidateIPaddress(ipaddress) 
{
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
        {
            document.querySelector('#ipaddr').className="";
            document.querySelector('#watchbtn').disabled=false;        
            document.querySelector('#watchbtn').className="";
            document.querySelector('#recordbtn').disabled=false;        
            document.querySelector('#recordbtn').className="";
            setLocalItem("ipadr", ipaddress);
            logging("IP address set to "+ipaddress);
    }
    else{
        document.querySelector('#ipaddr').className="error";
        document.querySelector('#watchbtn').disabled=true;        
        document.querySelector('#watchbtn').className="disabled";
        document.querySelector('#recordbtn').disabled=true;        
        document.querySelector('#recordbtn').className="disabled";
        logging("IP address you've entered is invalid. Buttons are disabled.", false, "", true);
    }
}

module.exports = {
    'ValidateIPaddress': ValidateIPaddress
}