$ function visOppskrift(divID) {
	console.log(divId);
	var div = document.getElementById(divId)
	if (div.style.display !== "none") {
		div.style.display = "none";
	}
	else {
		div.style.display = "block";
	}
}

$(function () {

  $("#headingDiv").load("html/headingDiv.html");

  // Laster inn "hjem" siden som første siden
  $("#main").load("html/home.html");
  // Last inn navigasjonen inn i nav elementet
  $("#nav").load("html/nav.html");
  // Last inn footer inn i footer elementet
  $("#footer").load("html/footer.html");

  // Lytt på alle "a" elementer so
  // har en "href" adresse
  $(document).on('click','ul a', function(event) {
    // Stopp klikket fra å navigere oss bort
    event.preventDefault();

    // Finn addressen som var lenket til
    var page = $(this).attr("href");

    window.history.pushState({},"", page);
    // Last inn den adressen inn i main
    // elementet
    $("#main").load("html/" + page);

    return false;
  });

});
