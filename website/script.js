// Sier at visOppskrift er en global funskjon
visDiv = function (divId, smallOrBig){
	console.log(divId);
  console.log(smallOrBig);
  // Vis det er divHeadingClosed funksjonen kjøres på
  if (smallOrBig == "divSmall") {
    $("#"+divId+" .divBig").toggleClass("active");
    $("#"+divId + " .divBig").removeClass("hidden");

    
    console.log("makes #"+divId+" > divBig active");
    //Skjuler den lille visningen av oppskriften
    $("#"+divId + " .divSmall").removeClass("active");
    $("#"+divId + " .divSmall").toggleClass("hidden");
  }

  //Hvis det er divHeadingOpen
  else if (smallOrBig == "divBig") {
    $("#"+divId+" .divSmall").toggleClass("active");
    $("#"+divId + " .divSmall").removeClass("hidden");

    console.log("makes #"+divId+" > divSmall active");
    //Skjuler den lille visningen av oppskriften
    $("#"+divId + " .divBig").removeClass('active');
     $("#"+divId + " .divBig").toggleClass('hidden');
  }

}

// $ viser til JQuery som kjorer den gitte funksjonen/strengen e.l. nar hele siden er lastet
// Kortversjon for document.onload
// Laster inn rett html-dokument i rett tag
$(function () {

  console.log("funksjon kjører");

  // Laster inn "home.html" siden som første siden
  $("#main").load("html/home.html");
  // Last inn navigasjonen inn i nav elementet
  $("#navBar").load("html/nav.html", function () {
    // Ventet til nav har lastet inn

    // Lytt på alle "a" elementer so
    // har en "href" adresse
    $('a[href]').click(function(event) {
      // Stopp klikket fra å navigere oss bort
      console.log("Caught click from el:", $(this)[0]);
      event.preventDefault();

      // Finn addressen som var lenket til
      var page = $(this).attr("href");
      console.log("Trying to navigate to: ", page)
      
      if (page === "#") {
         return false;
      }

      window.history.pushState({},"", page);

      // Last inn den adressen inn i main
      // elementet
      $("#main").load("html/" + page);

      //Viser i navBaren hvilken side en er pa
      //$("#navBar").

      return false;
    });
  });

  // Last inn footer inn i footer elementet
  $("#footer").load("html/footer.html", function () {
    // Ventet til nav har lastet inn

    // Lytt på alle "a" elementer so
    // har en "href" adresse
    $('a[href]').click(function(event) {
      // Stopp klikket fra å navigere oss bort
      console.log("Caught click from el:", $(this)[0]);
      event.preventDefault();

      // Finn addressen som var lenket til
      var page = $(this).attr("href");
      console.log("Trying to navigate to: ", page)
      
      if (page === "#") {
         return false;
      }

      window.history.pushState({},"", page);

      // Last inn den adressen inn i main
      // elementet
      $("#main").load("html/" + page);

      return false;
    });
  });

});

// Highlighter i navbaren hvilken side vi er på
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

//Gir feilmelding for kundens "fake" linker
errorMessage = function () {
  console.alert("Beklager, siden eksisterer ikke");
}

//Kode for å hente inn tilfeldig oppskrift til home siden
//
//

//Form validering