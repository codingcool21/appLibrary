<?php

include "../login.php";
if(isset($_POST["username"]) && isset($_POST["password"])) {
    MAIN::run($_GET["username"], $_GET["password"]);
} else {
    print "Error: 500";
}
?>