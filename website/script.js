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
  $(".main").load("html/home.html");
  // Last inn navigasjonen inn i nav elementet
  $("#navBar").load("html/nav.html", function () {
    // Ventet til nav har lastet inn

    // Lytt på alle "a" elementer so
    // har en "href" adresse
    $('a[href]').click(function(event) {
      // Stopp klikket fra å navigere oss bort
      console.log("Caught click!")
      event.preventDefault();

      // Finn addressen som var lenket til
      var page = $(this).attr("href");

      window.history.pushState({},"", page);
      
     
      // Last inn den adressen inn i main
      // elementet
      $("#main").load("html/" + page);

      //Viser i navBaren hvilken side en er pa
      //$("#navBar").

      // For a laste inn ankermeny
      $("#ankerMeny").load("html/"+ page + "#ankerMeny")

      return false;
    });
  });

  // Last inn footer inn i footer elementet
  $("#footer").load("html/footer.html");


});

$(function(){

  var page = location.href.toLowerCase();

  $("#navBar li a").each(function() {


    if (page.indexOf(this.href.toLowerCase()) > -1) {

     $("li.highlight").removeClass("highlight");

    $(this).parent().addClass("highlight");

    }

  });

 })


//Holder navbaren fiksert i toppen 
$(window).bind('scroll', function () {
    if ($(window).scrollTop() > $("#headerContent").outerHeight()) {
        $('#navBar').addClass('fixed');
    } else {
        $('#navBar').removeClass('fixed');
    }
});


