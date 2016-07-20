var hash = false;

$( document ).ready(function() {
    checkHash();
});

function checkHash() {
	if (window.location.hash != hash) {
		hash = window.location.hash;
		processHash(hash);
	}
	t = setTimeout("checkHash()", 10);
}

function processHash(hash) {

	console.log("Hash has changed to " + hash + "");

	if (hash == "#main") {
        
        document.getElementById("back_button").style.display = "none";
        
        driverid = localStorage.getItem("driverid");
        
        console.log("hash");
        
        $.get("https://enunua.com/ubdream/db/driver/update.php", {
        task: "get_missions"
        , driverid: driverid
        }).done(function (data) {

        document.getElementById("view_standby_content").innerHTML = data;

        });
        
	} 
	
}