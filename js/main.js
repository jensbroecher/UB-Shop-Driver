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
                            }, 15000);
                                    
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







function scancode(orderid) {

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            // alert("We got a barcode\n" +
            //   "Result: " + result.text + "\n" +
            //   "Format: " + result.format + "\n" +
            //   "Cancelled: " + result.cancelled);

            is_cancelled = result.cancelled;

            //  alert(is_cancelled);

            if (is_cancelled == true) {
                alert("Numérisation annulée. Veuillez réessayer.")
            } else if (is_cancelled == false) {

                //  alert("Test");

                localStorage.setItem("codefromqr", result.text);
                confirm_delivery_after_scan(orderid);
                // alert(result.text);

            }

        }
        , function (error) {
            alert("Numérisation a échoué: " + error);
        }
    );

}



function confirm_delivery_after_scan(orderid) {

    var codefromqr = localStorage.getItem("codefromqr");
    
    var codefromqr = Tea.decrypt(codefromqr, "ubx");

    $.get("https://enunua.com/ubdream/db/driver/scanqr.php?&task=confirm_code&orderid=" + orderid + "&qr=" + codefromqr + "", function (data) {

        if (data == "order_confirmed") {
            sweetAlert("Confirmé: "+codefromqr+"", "", "success");
            do_start();
        }
        if (data == "code_used_already") {
            sweetAlert("Ce code a déjà été confirmé!", "S'il vous plaît essayer à nouveau!", "error");
        }
        if (data == "code_no_match") {
            sweetAlert("Le code est correct, mais appartient à un ordre différent!", "S'il vous plaît essayer à nouveau!", "error");
        }
        if (data == "code_not_found") {
            sweetAlert("Ce code n'a pas été trouvé!", "S'il vous plaît essayer à nouveau!", "error");
        }

    });

}





function wasloggedin() {
    
    document.getElementById('view_start').style.display = 'none';
    document.getElementById('view_standby').style.display = 'block';
    
    update_start();
    
    myVar = setInterval(function () {
        myTimer();
    }, 15000);
}






function myTimer() {
update();
}





function native_navigation(lat,lng) {
    
launchnavigator.navigate(""+lat+", "+lng+"",
  null,
  function(){
      console.log("launchnavigator Plugin success");
  },
  function(error){
      console.log("Plugin error: "+ error);
  });
    
}




function logout() {
    location.href = "#start";
    localStorage.clear();
    location.reload();
}







function make_call(number) {
    location.href = "tel:+"+number+"";
}