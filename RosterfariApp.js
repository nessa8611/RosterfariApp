"use strict";
// Store Url in a variable
var url ="https://rosterfari.firebaseio.com/.json";
var nameArray = [];
var postAjax = function () {
    //Step 1. Create request opject
    var request = new XMLHttpRequest();
    //Step 2. Create the "envelope" aka request.open // Option GET, POST, PUT, DELETE
    request.open("POST", url, true)
    //Step 3. Define what happens when request comes back aka "request.onLoad. " Always if else station
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            // This means good things are happening.
            console.log(this.response);

        }
        else {
            // This means the data got to the server and failed.
            console.log(this.response);
        }
    };
    //Step 4. Define what happens when there is an error on request aka request.onerror
    request.onerror = function () {
        // This is a time request, which means the reponse was not recieved. 
        console.log("Com ERR");
    }
    //Step 4.1 Define info to send to firebase!
    var fullName = document.getElementById("fullname").value;
    var phoneNumber = document.getElementById("phone").value;

    var name = {
        first: fullName,
        last: phoneNumber,

    }
    name = JSON.stringify(name);
    document.getElementById("fullname").value = "";
    document.getElementById("phone").value = "";

    //var name = {
    //    firstName: "Tre",
    //    lastName: "Davis",
    //    birthDate: "April 26th, 1991"

    //};
    ////This step is a must! You must stringify the var
    //console.log("This is the unstring...:" + name);
    //name = JSON.stringify(name);
    //console.log("This is the string...:" + name);
    //Step 5. "Send" request.
    request.send(name);

}

var getAjax = function () {

    //Step 1. Create request object
    var request = new XMLHttpRequest();
    //Step 2. Create the "envelope" aka request.open
    request.open("GET", url, true);
    //Step 3. Define what happens when request comes back aka "request.onload. "
    // This is an annonymus function 
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            // This means good things are happening.

            //Step 4.1 Define how to recieve info from firebase!

           console.log("Your response is: " + this.response);
            // This converts it to a readable format.
            var data = JSON.parse(this.response);
            console.log("This is parsed data: " + data);
            // Add any actions to be done on successful loads.
            nameArray = [];
            for (var x in data) {
                //Adding a property of id to the data
                // data[x].id = x;
                nameArray.push(data[x]);
            }
            //Output Table function
            outputTable();

        } else {
            // This means the data got to the server and failed.
            console.log(this.response);
        }

        nameArray.push(data);
    };
    //Step 4. Define what happens when there is an error on request aka request.onerror
    request.onerror = function () {
        // This is a timeout request, which means the reponse was not recieved. 
        console.log("Com ERR");
    }

    //Step 5. "Send" request.

    request.send();

}

// READ - write/display/output table
var outputTable = function () {
    var holder = "<table>";
    for (var x in nameArray) {
        holder += "<tr>";
        for (var y in nameArray[x]) {
            holder += "<td>"
            holder += nameArray[x][y];

            holder += "</td>"
        }


        holder += "</tr>";
    }

    holder += "</table>";

    document.getElementById("outputTable").innerHTML = holder;


}