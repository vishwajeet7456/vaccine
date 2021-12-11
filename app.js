var btnSearch = document.querySelector("#btn-search");
var txtInput = document.querySelector("#txt-input");
var txtDate = document.querySelector("#txt-date");
var outputDiv = document.querySelector("#output");

var serverURL = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin"


function getDoseURL(text, date) {
    return serverURL + "?" + "pincode=" + text + "&date=" + date
}

function errorHandler(error) {
    console.log("error occured", error);
    alert("Something wrong with the server! try again after some time")
}

function clickHandler() {
    var inputText = txtInput.value;
    var inputDate = txtDate.value;

    fetch(getDoseURL(inputText, inputDate))
        .then(response => response.json())
        .then(json => {
            var cityX = json.centers[0].name;
            var vaccineName = json.centers[0].sessions[0].vaccine;
            var totalDose = json.centers[0].sessions[0].available_capacity;
            var totalDose1 = json.centers[0].sessions[0].available_capacity_dose1;
            var totalDose2 = json.centers[0].sessions[0].available_capacity_dose2;

            outputDiv.innerText = "Center Name: " + cityX + " | " + "Vaccine: " + vaccineName + " | Total available Dose: " + totalDose + " | Total available Dose1: " + totalDose1 + " | Total available Dose2: " + totalDose2
        })
        .catch(errorHandler)
};

btnSearch.addEventListener("click", clickHandler)