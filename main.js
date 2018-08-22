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

//Comparison function which sorts date keys in ascending order//
function search_sort(search1, search2) {
    if (search1 > search2) return 1;
    if (search1 < search2) return -1;
    return 0;
}

//Write data to index.html//
function writeToDocument(data) {

    getData(function(data) {

                //Define data as that which is contained within near_earth_object array//
                data = data.near_earth_objects;

                //Define variable to pass data to index.html//
                var el = document.getElementById("data");

                //////////////////////////////////
                console.dir(data);
                /////////////////////////////////    

                // Extract NEO date keys in ascending order//
                var search_day = Object.keys(data).sort(search_sort);

                // Create FOR loop to access the date objects within the data set// 
                for (var i = 0; i < search_day.length; i++) {
                    var search_date = search_day[i];

                    // Extract NEO object keys for that date//
                    var neo_keys = Object.keys(data[search_date]);

                    //FOR loop to access the specific NEO objects within the data set//
                    for (var j = 0; j < neo_keys.length; j++) {
                        var neo_object = neo_keys[j];

                        //Access the data for that neo object//
                        var data_object = data[search_date][neo_object];

                        //FOR loop to access the specific information for that NEO objects//
                        for (var k = 0; k < Object.keys(data_object).length; k++) {

                            var data_item = Object.keys(data_object)[k];

                            //Access the data for that neo object//
                            var neo_object_item = data[search_date][neo_object][data_item];

                            // IF statement to extract nested data within object//
                            if (k == 0) {
                                el.innerHTML += neo_object_item["self"] + "<br>"; //Send data to index.html//
                            }
                            else if (k == 5) {

                                //FOR loop to extract estimated diameter data//
                                for (var l = 0; l < 1; l++) {
                                    var estimated_diameter_data = neo_object_item[Object.keys(neo_object_item)[l]];

                                    //FOR loop to extract estimated maximum diameter data//
                                    for (var m = 1; m < 2; m++) {

                                        var max_diameter_data = estimated_diameter_data[Object.keys(estimated_diameter_data)[m]];

                                        el.innerHTML += max_diameter_data + "<br>"; //Send data to index.html//
                                    }

                                }
                            }
                            else if (k == 7) {

                                //FOR loop to extract closest approach data//
                                for (var n = 0; n < 1; n++) {
                                    var close_approach_data = neo_object_item[Object.keys(neo_object_item)[n]];

                                    //FOR loop to extract miss distance data//
                                    for (var p = 3; p < 4; p++) {

                                        var miss_distance_data = close_approach_data[Object.keys(close_approach_data)[p]];

                                        //FOR loop to extract miss distance data in kilometers//
                                        for (var q = 2; q < 3; q++) {

                                            var miss_distance_kilometers = miss_distance_data[Object.keys(miss_distance_data)[q]];

                                            el.innerHTML += miss_distance_kilometers + "<br>"; //Send data to index.html//
                                        }
                                    }

                                }
                            }

                            else {
                                el.innerHTML += neo_object_item + "<br>"; //Send data to index.html//
                            }
                        }
                    }
                }

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
                else {
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

    });
}
