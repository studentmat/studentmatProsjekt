function visOppskrift(divID)
	console.log(divId);
	var div = document.getElementById(divId)
	if (div.style.display !== "none") {
		div.style.display = "none";
		div.style.img.width= 400px;
		div.style.img.height= 300px;
	}
	else {
		div.style.display = "block";
		div.style.img = 125px;
		div.style.img = 75px;
	}
}

$(function () {

  // $("#headingDiv").load("html/headingDiv.html");

   // Last inn navigasjonen inn i nav elementet
  $("#nav").load("html/nav.html");
  // Last inn footer inn i footer elementet
  $("#footer").load("html/footer.html");
});