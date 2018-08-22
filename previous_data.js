
//Search begin year//
var year = 2018;

//Search begin month//
var month = 04;

//Search begin day//
var start_day = 03;

//Search end day//
var end_day = start_day + 7;

//Search begin date//
var start_Date = year + "-" + month + "-" + start_day;

//Search end date//
var end_Date = year + "-" + month + "-" + end_day;

//Search URL//
var search_date = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + start_Date + "&" + end_Date + "&api_key=ZnhM6SAoXPwGVXYMEqYw5L4MLB7z6SQmrwv7fbuW";


//Data callback function//
function getData(cb) {
    
    // Create new server request//
    var xhr = new XMLHttpRequest();
    
    // Access server location//    
    xhr.open("GET", search_date);
    xhr.send();
    
    //Obtain server data//
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

//Write data to index.html//
function writeToDocument(data) {
    
    getData(function(data) {

        //Define data as that which is contained within near_earth_object array//
        data = data.near_earth_objects;

        //Define variable to pass data to index.html//
        var el = document.getElementById("data");

//////////////////////////////////
        //console.dir(data);
/////////////////////////////////    

        console.dir(Object.keys(data));

        // Create FOR loop to loop over each day within the data set//     
        for (var days_passed = 0; days_passed < 8; days_passed++) {

            // Create day variable to be used to access data for that specific day//
            var current_day = start_day + days_passed;

            // IF statement to ensure that the format for the date is YYYY-MM-DD//
            if (current_day < 10) {
                if (month < 10) {
                    var current_date = year + "-0" + month + "-" + "0" + current_day;
                }
                else {
                    current_date = year + "-" + month + "-" + "0" + current_day;
                }
            }
            else {
                if (month < 10) {
                    current_date = year + "-0" + month + "-" + current_day;
                }
                else {
                    current_date = year + "-" + month + "-" + current_day;
                }
            }

            // Convert the date to string to access JSON object//
            var current_data_date = current_date.toString();


            //Access the data for that day//
            var data_day = data[current_data_date];


            //FOR loop used to retrieve data on the near Earth objects for that day//
            for (var neo_obj in data_day) {

                // Create new array with JSON object names for the data to be extracted//
                var neo_data = new Array('name', 'absolute_magnitude_h', 'close_approach_data', 'estimated_diameter', 'is_potentially_hazardous_asteroid');
                
                //FOR loop to obtain specific neo object data//
                for (var item_data_index = 0; item_data_index < neo_data.length; item_data_index++) {
                    
                    
                        // IF statement to extract additional data from diameter and close approach data//
                        if (item_data_index == 0 || 1 || 4) {
                            
                            // Obtain data name from array//
                            var item_data = neo_data[item_data_index].toString();
                            //el.innerHTML += data_day[neo_obj][item_data] + "<br>";
                        } 
                        else if (item_data_index == 2) {
                             //+ "[0].miss_distance.kilometers";
                            item_data = neo_data[item_data_index].toString();
                           // el.innerHTML += data_day[neo_obj][item_data] + '["0"]["miss_distance"]["kilometers"]'+ "<br>";
                            
                        }
                        else{
                             //+ ".kilometers.estimated_diameter_max";
                            item_data = neo_data[item_data_index].toString();
                            //el.innerHTML += data_day[neo_obj] + '["estimated_diameter"]["kilometers"]["estimated_diameter_max"]' + "<br>";
                        }

                    //Display data on HTML page//
                   //el.innerHTML += data_day[neo_obj][item_data] + "<br>";
                }
                
                 //el.innerHTML= data_day[neo_obj]["estimated_diameter"]["kilometers"]["estimated_diameter_max"];
                 //el.innerHTML= data_day[neo_obj]["close_approach_data"]["0"]["miss_distance"]["kilometers"];
            }
        }
    });
}