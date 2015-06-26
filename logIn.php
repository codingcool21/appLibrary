<?php

include "../login.php";
if(isset($_POST["username"]) && isset($_POST["password"])) {
    MAIN::run($_POST["username"], $_POST["password"]);
} else {
    print "Error: 500\n";
}
?>