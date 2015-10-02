// Sier at visOppskrift er en global funskjon
visOppskrift = function (divId){
	console.log(divId);
	var div = document.getElementById(divId)
	if (div.style.display !== "none") {
		div.style.display = "none";
	}
	else {
		div.style.display = "block";
	}
}

// $ viser til JQuery som kjorer den gitte funksjonen/strengen e.l. nar hele siden er lastet
// Kortversjon for document.onload
$(function () {

  console.log("funksjon kjører");

  //$(".headerContent").load("html/headerContent.html");

  // Laster inn "hjem" siden som første siden
  //$(".main").load("html/home.html");
  // Last inn navigasjonen inn i nav elementet
  $(".navBar").load("html/nav.html");
  // Last inn footer inn i footer elementet
  $(".footer").load("html/footer.html");

  // Lytt på alle "a" elementer so
  // har en "href" adresse
  $(document).on('click','.navList ul a', function(event) {
    // Stopp klikket fra å navigere oss bort
    event.preventDefault();

    // Finn addressen som var lenket til
    var page = $(this).attr("href");

    window.history.pushState({},"", page);
    // Last inn den adressen inn i main
    // elementet
    $(".main").load("html/" + page);

    return false;
  });

});
