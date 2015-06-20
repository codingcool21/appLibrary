<?php
    $longUrl = $_GET["longUrl"];
    $response = http_post_data("https://www.googleapis.com/urlshortener/v1/url/", array("longUrl"=>$longUrl, "key"=>"AIzaSyB4rbn1o8vo6BYo1ZxyxAXv4-JxCTnjttU"));
    echo $response;
?>
