<?php
require 'index.html';

if(isset($_POST["check-in"])){
  $texts = $_POST["text"];
  $selects = $_POST["select"];
  $query = "INSERT INTO gtr_date VALUES('', '$texts', '$selects')";
  mysqli_query($conn,$query);
  echo"
  <script> alert('Check-in   Successfully'); </script>
  ";
   
}
?>