function back_to_start() {
    $("#view_login").fadeOut("slow", function () {
        $("#view_start").fadeIn("slow", function () {

        });
    });
}

$(document).ready(function () {
    
    hideindicator();

    var loggedin = localStorage.getItem('loggedin');

    if (loggedin == 'Yes') {
        wasloggedin();
    }

    $("#login_btn, #login_btn_french").click(function () {

        $("#view_start").fadeOut("slow", function () {
            $("#view_login").fadeIn("slow", function () {

            });
        });

    });

    $(document).on('submit', '#login_form', function (e) {
        //prevent the form from doing a submit
        e.preventDefault();
        return false;
    })

    $('#login_btn_go').click(function (e) {
        //Leverage the HTML5 validation w/ ajax. Have to submit to get em. Wont actually submit
        //has .validateDontSubmit class
        var $theForm = $(this).closest('form');
        //Some browsers don't implement checkValidity
        if ((typeof ($theForm[0].checkValidity) == "function") && !$theForm[0].checkValidity()) {

            localStorage.setItem('toast', 'Account not found. Please check your ID Number / Username.');
            toast();

            document.getElementById("login_btn_go").className = "waves-effect waves-light btn taxi250";

            document.getElementById("login_btn_go").style.pointerEvents = "all";

            return;
        }
        login_form_go();
    });

});

function login_form_go() {

    // hide button to prevent double click
    document.getElementById("login_btn_go").className = "waves-effect waves-light btn taxi250 disabled";
    document.getElementById("login_btn_go").style.pointerEvents = "none";

    username = document.getElementById('username').value;
    localStorage.setItem("username",username);
    
    password = document.getElementById('password').value;
    localStorage.setItem("password",password);

    $.get("https://enunua.com/ubdream/db/driver/account.php?&task=start&username=" + username + "", function (data) {

        if (data == "account_found") {
            check_login();
        }
        if (data == "account_not_found") {

            document.getElementById("login_btn_go").className = "waves-effect waves-light btn taxi250";
            document.getElementById("login_btn_go").style.pointerEvents = "all";

            localStorage.setItem('toast', 'Account not found. Please try again.');
            toast();
        }

    });
}

function check_login() {

    var username = localStorage.getItem("username");

    $.get("https://enunua.com/ubdream/db/driver/account.php?task=get_name&username=" + username + "", function (data) {

        localStorage.setItem("drivername", data);

        $.get("https://enunua.com/ubdream/db/driver/account.php?task=get_id&username=" + username + "", function (data) {

            localStorage.setItem("driverid", data);

            check_password();

        });

    });

}

function check_password() {

    driverid = localStorage.getItem("driverid");

    $.get("https://enunua.com/ubdream/db/driver/account.php?task=check_password&password=" + password + "&driverid=" + driverid + "", function (data) {

        if (data == "password_correct") {

            localStorage.setItem("loggedin", "Yes");



            $("#view_login").fadeOut("slow", function () {
                
                    $("#view_standby").fadeIn("slow", function () {
                        
                            update_start();
                            update();
                    
                            myVar = setInterval(function () {
                                myTimer();
                            }, 5000);
                                    
                });
                
            });

        }
        if (data == "password_incorrect") {

            alert("Mot de passe incorrect.");
            document.getElementById("login_btn_go").className = "waves-effect waves-light btn taxi250";
            document.getElementById("login_btn_go").style.pointerEvents = "all";

        }



    });

}







function scancode() {

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            // alert("We got a barcode\n" +
            //   "Result: " + result.text + "\n" +
            //   "Format: " + result.format + "\n" +
            //   "Cancelled: " + result.cancelled);

            is_cancelled = result.cancelled;

            //  alert(is_cancelled);

            if (is_cancelled == true) {
                alert("Scanning cancelled. Please try again.")
            } else if (is_cancelled == false) {

                //  alert("Test");

                localStorage.setItem("codefromqr", result.text);

                // alert(result.text);

                namefound();
            }

        }
        , function (error) {
            alert("Scanning failed: " + error);
        }
    );

}

function namefound() {

    var codefromqr = localStorage.getItem("codefromqr");
    var codefromqr = atob(codefromqr);
    var codefromqr_type = codefromqr.substr(0, 3);
    var codefromqr_id = codefromqr.substr(3);

    // alert("Type: "+codefromqr_type+"\nID: "+codefromqr_id+"");

    partner_type = codefromqr_type;
    id_no = codefromqr_id;
    pin = "";

    check_login_from_card();

}





function wasloggedin() {
    
    document.getElementById('view_start').style.display = 'none';
    document.getElementById('view_standby').style.display = 'block';
    
    update_start();
    
    myVar = setInterval(function () {
        myTimer();
    }, 5000);
}






function myTimer() {
update();
}





function native_navigation(street) {
    
launchnavigator.navigate(""+street+", Goma");
    
}




function logout() {
    localStorage.clear();
    location.reload();
}








function make_call(number) {
    location.href = "tel:+"+number+"";
}