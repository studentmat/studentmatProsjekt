
visDiv = function (divId, smallOrBig){

  // Vis det er divSmall funksjonen kjøres på
  if (smallOrBig == "divSmall") {
    $("#"+divId+" .divBig").toggleClass("active");
    $("#"+divId + " .divBig").removeClass("hidden");

        //Skjuler den lille visningen av oppskriften
    $("#"+divId + " .divSmall").removeClass("active");
    $("#"+divId + " .divSmall").toggleClass("hidden");
  }

  //Hvis det er divBig
  else if (smallOrBig == "divBig") {
    $("#"+divId+" .divSmall").toggleClass("active");
    $("#"+divId + " .divSmall").removeClass("hidden");

    console.log("makes #"+divId+" > divSmall active");
    //Skjuler den lille visningen av oppskriften
    $("#"+divId + " .divBig").removeClass('active');
     $("#"+divId + " .divBig").toggleClass('hidden');
  }

  //Gar gjennom alle barna/divene og fjerner active-classen fra divBig IKKE FERDIG
/*
  var bigDivs = document.getElementsByClass("bigDiv");
  for (div in bigDivs) {
    if (div.hasClass("active")) {
      div.removeClass("active");
      div.parent.children.hasClass("smallDiv")
    }
    }
*/
}
// ÅPne og lukke av div hvor det ikke erstattes med ny div
visDivOnly = function (divId) {
  var div = document.getElementById(divId);
  var bigDiv = div.children('.bigDiv');
  if (bigDiv.classList.contains('active')) {
    $(bigDiv).removeClass("active");
  }
   $(bigDiv).toggleClass("active");
}

// Kortversjon for document.onload
// Laster inn rett html-dokument i rett tag
$(function () {

  // Laster inn "home.html" siden som første siden
  $("#main").load("html/home.html");
  // Last inn navigasjonen inn i nav elementet
  $("#navBar").load("html/nav.html", function () {
    // Ventet til nav har lastet inn

    // Lytt på alle "a" elementer so
    // har en "href" adresse
    $('a[href]').click(function(event) {
      
      // Stopp klikket fra å navigere oss bort
      event.preventDefault();

      // Finn addressen som var lenket til
      var page = $(this).attr("href");

      if (page === "#") {
         return false;
      }

      // HVA GJØR DENNE?????????????????????????
      window.history.pushState({},"", page);

      // Last inn den adressen inn i main
      $("#main").load("html/" + page);

      //Fjerner klassen highlight fra listeelementet med den klassen 
      $("li.highlight").removeClass("highlight");

      //Finner foreldren/knappen i navbaren
      var buttonLi = $(this).closest(".navButton");
      
      //Setter knappen til å ha klassen highlight
      buttonLi.addClass("highlight");

      return false;
    });
  });

  // Last inn footer inn i footer elementet
  $("#footer").load("html/footer.html", function () {

    // Lytt på alle "a" elementer so
    // har en "href" adresse
    $('a[href]').click(function(event) {

      // Stopp klikket fra å navigere oss bort
      event.preventDefault();

      // Finn addressen som var lenket til
      var page = $(this).attr("href");
      
      if (page === "#") {
         return false;
      }

      window.history.pushState({},"", page);

      // Last inn den adressen inn i mainelementet
      $("#main").load("html/" + page);

      return false;
    });
  });
});


//Holder navbaren fiksert i toppen ved å legge til classen fixed om det er lengre til toppen enn headerContents hoyde
$(window).bind('scroll', function () {
    if ($(window).scrollTop() > $("#headerContent").outerHeight()) {
        $('#navBar').addClass('fixed');
    } else {
        $('#navBar').removeClass('fixed');
    }
});

//Gir feilmelding for kundens "fake" linker
errorMessage = function () {
  alert("Beklager, siden eksisterer ikke");
}

//Kode for å hente inn tilfeldig oppskrift til home siden
//
//

//Form validering
