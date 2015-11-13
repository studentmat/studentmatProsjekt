/*
  Filnavn: script.js
  Skrevet av: Dora Oline Eriksrud og Katrine FYLL INN
  Når: November 2015
  Hensikt: samling av Jquery og Javascript funksjoner nødvendig for å få ønsket funksjonalitet
*/
// Lagrer hvilken div med oppskrift som er åpen
var openDiv = null;

// For å kunne kjøre den på folk-side, henter jeg pathen jeg starter med (f.eks. doraoe/studmat/)
// REN JAVASCRIPT
if (window.location.hostname === "folk.ntnu.no") {
  var startPath = "/doraoe/studmat/"; // SJekk om kan gjøres om til window.location.pathName
} else {
  var startPath = "";
}

// Laster opp siden
var loadPage = function() {
  
  // Setter openDiv til å være null (ingen div skal være åpne da)
  openDiv = null;
  // Går til toppen av siden
  $(window).scrollTop(0) ;

  // Kallre funksjonen findPage() for å få siden vi er på
  var page = findPage();

  // Kaller addAnchorEventListeners etter at siden er lastet ned/inn
  $("#main").load(startPath + "/html/" + page + ".html", addAnchorEventListeners);

  // Oppdaterer navBaren
  updateNavbar(page);
}

//Finner hvilken side en er på
//// REN JAVASCRIPT
var findPage = function() {
  // Hvis det er en #/ i pathen (altså ikke er på index)
  if (window.location.href.indexOf("#/") > -1 ) {
    return window.location.href.split("#/")[1];
  } else {
    return "home";
  }
}

// Takler "click" events som lyttes til
var handleHrefClick = function(event) {
  console.log("handleHrefClick");

  // Stopp klikket fra å navigere oss bort
  event.preventDefault();

  // Finn addressen (verdien til href) som var lenket til
  var page = $(this).attr("href");

  // Hvis vi ikke skal forflytte oss
  if (page === "#") {
     return false;
  }

  // Lager den endrede page-variabelen i page, hvor jeg har fjernet .html fra slutten
  page = page.split("/#/")[1];

  // Hvis vi f.eks. bare har fått /, ergo ikke får noe element etter /#/ i split
  if (!page) {
    page = "home";
  }

  window.history.pushState({},"", startPath + "/#/" + page);

  // Last inn den adressen inn i main
  var path = startPath +  "/html/" + page + ".html";
  $("#main").load(path);
  
  loadPage();

  return false;
}

//Laster ei ny side når vi klikker tilbake
// REN JAVASCRIPT
window.addEventListener('popstate', loadPage);   

// Laster inn rett html-dokument i rett tag når vi laster inn siden (kortversjon for document.onload)
$(function () {
  console.log("on onload");
 
  // Lytter på a-tagger i header 
  $('#header a[href]').click(handleHrefClick);

  // Og i footerboksen med logo
  $('#footer #footerBox2 a[href]').click(handleHrefClick);

  // Last inn navigasjonen inn i nav elementet
  $("#navBar").load(startPath + "/html/nav.html", function () {
    // Ventet til nav har lastet inn

    // Oppdaterer navbar etter at den er lastet opp
    var page = findPage();
    updateNavbar(page);

    // Lytt på alle "a" elementer som har en "href" adresse
    $('#navBar a[href]').click(handleHrefClick);
  });
 
  // Last inn footer inn i footer elementet
  $("#footer").load(startPath + "/html/footer.html", function () {

    // Lytt på alle "a" elementer som har en "href" adresse
    $('#footer a[href]').click(handleHrefClick);
  });

  loadPage();

});

// Oppdaterer navbar (hvilken side vi er på)
var updateNavbar = function(page) {

  console.log("updating navbar: ", page);

  //Fjerner klassen highlight fra listeelementet med den klassen 
  $("li.highlight").removeClass("highlight");
  //Ser om siden er home eller undefiniert for så å markere home som aktuell side
  if (page == "home" || page == undefined) {
    $("[href='/']").closest(".navButton").addClass("highlight");
  } else {
    var el = $("[href='/#/"+page+"']").closest(".navButton").addClass("highlight");
  }
}

//Holder navbaren fiksert i toppen ved å legge til classen fixed om det er lengre til toppen enn headers hoyde
$(window).bind('scroll', function () {
    if ($(window).scrollTop() > $("#header").outerHeight()) {
        $('#navBar').addClass('fixed');
    } else {
        $('#navBar').removeClass('fixed');
    }
});

//Legge til listeners til ankerne
// REN JAVASCRIPT
var addAnchorEventListeners = function() {
  var anchors = document.getElementsByClassName("anchor");
  for (var i = 0; i < anchors.length; i++) {
      // Når de trykkes på, kjører funkjsonen scrollToAnchor som scroller til rett plass på siden
      anchors[i].addEventListener("click", scrollToAnchor);
  }  
};

//For ankermenyen, slik at en scroller til rett plass
var scrollToAnchor = function () {

  console.log("scroll to Anchor");
  
  // Henter "iden" en skal scrolle til
  var id = $(this).attr("data-anchor");

  // Finner elementet med den iden
  var el = document.getElementById(id);

  // Finner posisjonen til elementet
  var offset = $(el).offset();

  // Scroller elegant ned til elementet, ikke brått og brutalt
  $("html, body").animate({
    // Finner posisjonen minus høyden til navbaren
    scrollTop: offset.top - $("#navBar").height()*2
  }, 100);
};

// Åpner og lukker divs, tar inn ideen til elementet som har de ulike divene til barn, og om den kalles på en liten/stor div
visDiv = function (divId, smallOrBig) {
  // SJEKK kan forenkles

  // Vis det er divSmall funksjonen kjøres på
  if (smallOrBig == "divSmall") {
    $("#"+divId + " .divBig").toggleClass("active");
    $("#"+divId + " .divBig").removeClass("hidden");

    //Skjuler den lille visningen av oppskriften
    $("#"+divId + " .divSmall").removeClass("active");
    $("#"+divId + " .divSmall").toggleClass("hidden");
  }

  //Hvis det er divBig
  else if (smallOrBig == "divBig") {
    $("#"+divId + " .divSmall").toggleClass("active");
    $("#"+divId + " .divSmall").removeClass("hidden");

    //Skjuler den lille visningen av oppskriften
    $("#"+divId + " .divBig").removeClass('active');
    $("#"+divId + " .divBig").toggleClass('hidden');

    openDiv = null;
  }


  //Lukker tidligere åpnet div
  if (openDiv !== null) {
    //Lukker diven
    var bigDiv = openDiv.getElementsByClassName("divBig")[0];
    bigDiv.classList.remove("active");
    bigDiv.classList.add("hidden");
    //Finner den rette divSmall og setter den til active
    var smallDiv = openDiv.getElementsByClassName("divSmall")[0];
    smallDiv.classList.add("active");
    smallDiv.classList.remove("hidden");
  } 

  //Legger diven i openDiv hvis funksjonen ble kalt på divSmall
  if (smallOrBig == "divSmall") {
    openDiv = document.getElementById(divId);
  }
}

//Gir feilmelding for kundens "fake" linker
// REN JAVASCRIPT
errorMessage = function () {
  alert("Beklager, siden eksisterer ikke");
}

//Kode for å hente inn tilfeldig oppskrift til home siden
// REN JAVASCRIPT
randomOppskrift = function() { 
  var nummer = Math.floor(Math.random()*10);
  oppskrift = document.getElementById(nummer);
  oppskrift.style.display = "block";
}

//Form validering
// REN JAVASCRIPT
function validateForm(){
  var nm = document.getElementById("name");
  console.log(nm)
  console.log(nm.value)
  var em = document.getElementById("email");
  console.log(em)
  console.log(em.value)
  var tp = document.getElementById("melding");
    console.log(tp)
    console.log(tp.value)
  var mld = document.getElementById("comments");
    console.log(mld)
    console.log(mld.value)


if(nameLength(nm)) {
  if(emailFormat(em)) {
    if(selectTopic(tp)) {
      if(meldingLength(mld)) {
        if(writeToFile(nm, em, tp, mld)) {
            nm.value= "";
            em.value= "";
            tp.value= "";
            mld.value="";
        }
      }
    }
  }
}
return false;
}

function nameLength(nm) {   
  var nmLength = nm.value.length;
  console.log(nmLength);

  if(nmLength > 30) {
    console.log("hmm");
    document.getElementById("formMelding").innerHTML = 
      "<div id='no'>Navnet kan ikke ha flere enn 30 tegn.</div>";
      return false; 
  }
  else {
    return true;
  }
}

function emailFormat(em) {
  if(!em.value) {
    document.getElementById("formMelding").innerHTML = 
      "<div id='no'>Du må skrive inn E-mail.</div>";
      return false; 
  } else {
    return true;  
  }    
}

function selectTopic(tp)
{
if(tp.value == "Velg")
{
document.getElementById("formMelding").innerHTML = 
    "<div id='no'> Du må velge hva meldingen handler om. </div>";
    return false;
}
else
{
  return true;
}
}

function meldingLength(mld)
{
var mldLength = mld.value.length;
if(!mld.value)
{
  document.getElementById("formMelding").innerHTML = 
    "<div id='no'>Du må skrive inn en melding.</div>";
    return false; 
}
if(mldLength >= 400)
{
  document.getElementById("formMelding").innerHTML = 
    "<div id='no'>Meldingen kan ikke ha flere enn 400 tegn.</div>";
    return false; 
}
else
{
 return true;
}

}
function writeToFile(nm, em, tp, mld) {
    //var fil = "text.txt";
    //fil.open("w");
    //fil.writeln("------------------------------------------------");
    //fil.writeln("name: " + nm.value);
    //fil.writeln("Mail: " + em.value);
    //fil.writeln("Topic: " + tp.value);
    //fil.writeln("Melding: " + mld.value);
    //fil.writeln("------------------------------------------------");
    //fil.Close();
    document.getElementById("formMelding").innerHTML = 
    "<div id='yes'>Din melding ble sendt!</div>";
    return true;
 }
