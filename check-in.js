$(document).ready(function () {
  $(".succsse").hide();
  $(".click-button").on("click", function () {
    const inpust = $("input").val();
    if (inpust === "5565" || inpust === "1234") {
      alert("You Check-In Successfully! Thank You!!");
      $(".succsse").show();
      $(".main3").hide();
    } else {
      alert("Incorrect ID. Please try again, Thank You.");
    }
  });
});
