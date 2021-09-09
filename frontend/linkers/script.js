
function selectoptions(e) {
    modeval = e.value;       
    localStorage.setItem("recmode", modeval);
    if (modeval=="alwayson") {
        document.querySelector(".inphours").className = "inphours hide";
        modelog = "Recording is always on.";
    } else {
        document.querySelector(".inphours").className = "inphours";
        hourchanged(document.querySelector(".inphours").querySelector("input"));
        modelog = "Recordings file is saved and restarts every "+ document.querySelector(".inphours").querySelector("input").value + " hours.";
    }
    var logPara = document.createElement("p");
    logPara.innerHTML = "> Recording mode is set to :: "+modelog;
    logele = document.querySelector("#logs");
    logele.appendChild(logPara);
    logele.scrollTo(0, logele.scrollHeight);
}

function hourchanged(e) {
    localStorage.setItem("recforhours",e.value);

    var logPara = document.createElement("p");
    logPara.innerHTML = "> Recording hours is set to "+e.value;
    logele = document.querySelector("#logs");
    logele.appendChild(logPara);
    logele.scrollTo(0, logele.scrollHeight);
}