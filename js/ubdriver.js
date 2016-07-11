function update_start() {
    // Get missions - repeated if flag set in drivers account
    driverid = localStorage.getItem("driverid");

    $.get("https://enunua.com/ubdream/db/driver/update.php", {
        task: "get_missions"
        , driverid: driverid
    }).done(function (data) {

        document.getElementById("view_standby_content").innerHTML = data;

    });

    drivername = localStorage.getItem("drivername");
    username = localStorage.getItem("username");

    drivername_action_bar = "" + username + " - " + drivername + "";

    document.getElementById("drivername").innerHTML = drivername_action_bar;

}

function update() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    accuracy = position.coords.accuracy;

    console.log("Location:");
    console.log("----------");
    console.log(latitude);
    console.log(longitude);
    console.log('Accuracy: ' + position.coords.accuracy + 'm');
    console.log("----------");

    // document.getElementById("accuracy_standby_meters").innerHTML = accuracy;

    var standby_server_update_time = new Date().toLocaleTimeString();
    // document.getElementById("last_standby_server_update").innerHTML = standby_server_update_time;

    driverid = localStorage.getItem("driverid");
    status = localStorage.getItem("status");

    $.get("https://enunua.com/ubdream/db/driver/update.php", {
        task: "update"
        , driverid: driverid
        , status: status
        , latitude: latitude
        , longitude: longitude
        , accuracy: accuracy
    }).done(function (data) {
        localStorage.setItem("server_answer", data);
        server_answer_check();
    });

}








function server_answer_check() {

    server_answer = localStorage.getItem("server_answer");
    server_answer_array = server_answer.split("-");

    var response1 = server_answer_array[0];

    if (response1 == "1") {

        driverid = localStorage.getItem("driverid");

        $.get("https://enunua.com/ubdream/db/driver/update.php", {
            task: "reset_response"
            , driverid: driverid
            , response_type: "mission_update"
        }).done(function (data) {

            driverid = localStorage.getItem("driverid");

            $.get("https://enunua.com/ubdream/db/driver/update.php", {
                task: "get_missions"
                , driverid: driverid
            }).done(function (data) {

                document.getElementById("view_standby_content").innerHTML = data;

            });

        });

    }

}