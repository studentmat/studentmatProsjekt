/*
  Filnavn: script.js
  Skrevet av: Dora Oline Eriksrud og Katrine Jordheim
  Når: November 2015
  Hensikt: samling av Jquery og Javascript funksjoner nødvendig for å få ønsket funksjonalitet
*/

// Lagrer hvilken div med oppskrift som er åpen
var openDiv = null;
var startPath;

// For å kunne kjøre den på folk-side, henter jeg pathen jeg starter med (f.eks. doraoe/studmat/)
if (window.location.hostname === "folk.ntnu.no") {
  // var startPath = "/doraoe/studmat/"; 
  startPath = window.location.pathname;
} else {
  startPath = "";
}

// Laster opp siden
var loadPage = function() {
  
  // Setter openDiv til å være null (ingen div skal være åpne da)
  openDiv = null;
  // Går til toppen av siden
  // $(window).scrollTop(0); JQUERY

  // Kallre funksjonen findPage() for å få siden vi er på
  var page = findPage();

  // Kaller addAnchorEventListeners etter at siden er lastet ned/inn
  $("#main").load(startPath + "/html/" + page + ".html", function() {
    addAnchorEventListeners();
    window.scrollTo(0, 0);
  });

  // Oppdaterer navBaren
  updateNavbar(page);
}

//Finner hvilken side en er på
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
window.addEventListener('popstate', loadPage);   

// Laster inn rett html-dokument i rett tag når vi laster inn siden
//$(function () { JQUERY
window.onload = function() { 
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

}

// Oppdaterer navbar (hvilken side vi er på)
var updateNavbar = function(page) {

  //Fjerner klassen highlight fra listeelementet med den klassen
  // Ved bruk av javascript her måtte jeg gått gjennom hvert li elementet jeg fikk og sett om det hadde highlight klassen
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
    // Hvis vi har scrollet lengre ned enn headerens høyde
    if ($(window).scrollTop() > $("#header").outerHeight()) {
      $('#navBar').addClass('fixed');
    } else {
      $('#navBar').removeClass('fixed');
    }
});

//Legge til listeners til ankerne
var addAnchorEventListeners = function() {
  var anchors = document.getElementsByClassName("anchor");
  for (var i = 0; i < anchors.length; i++) {
      // Når de trykkes på, kjører funkjsonen scrollToAnchor som scroller til rett plass på siden
      anchors[i].addEventListener("click", scrollToAnchor);
  }  
};

//For ankermenyen, slik at en scroller til rett plass
var scrollToAnchor = function () {
  
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
  }, 500);
};

// Åpner og lukker divs, tar inn ideen til elementet som har de ulike divene til barn, og om den kalles på en liten/stor div
visDiv = function (divId, smallOrBig) {
  var divToOpen;
  // Finner ut hvilken type div som skal åpnes 
  if (smallOrBig == "divSmall") {
    divToOpen = "divBig"; 
  }
  else {
    divToOpen = "divSmall";
  }

  // Setter rett div til å være åpen og rett til å være lukket
  $("#"+divId + " ." + divToOpen).toggleClass("active");
  $("#"+divId + " ." + divToOpen).removeClass("hidden");

  //Skjuler den lille visningen av oppskriften
  $("#"+divId + " ." + smallOrBig).removeClass("active");
  $("#"+divId + " ." + smallOrBig).toggleClass("hidden");

  if (smallOrBig == "divBig") {
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

    // Finner posisjonen til elementet
    var offset = $(openDiv).offset();

    // Scroller til toppen av diven
    $("html, body").animate({
      // Finner posisjonen minus høyden til navbaren + 4 pixler for å ha det tett i toppen
      scrollTop: offset.top - $("#navBar").height()+4
    }, 500);
  }
}

//Gir feilmelding for kundens "fake" linker
errorMessage = function () {
  alert("Beklager, siden eksisterer ikke");
}

//Kode for å hente inn tilfeldig oppskrift til home siden
/*
randomOppskrift = function() { 
  var 
  var nummer = Math.floor(Math.random()*10);
  oppskrift = document.getElementById(nummer);
  oppskrift.style.display = "block";
}
*/
// Henter en tilfeldig oppskrift til forsiden
randomOppskrift = function() {
  // Legger alle oppskriftene i ei liste
  var oppskriftList = document.getElementsByClassName("oppskrift");
  // Finner et tilfeldig nummer
  var nummer = Math.floor(Math.random()*10);
  var oppskrift = oppskriftList[nummer];
  oppskrift.style.display = "block";
}

tilOppskrift = function(type, id, callback) {
  // Naviger til rett side
  window.history.pushState({},"", startPath + "/#/" + type);

  // Last inn den adressen inn i main
  var path = startPath +  "/html/" + type + ".html";
  $("#main").load(path, function() { updateNavbar(type), visDiv(id, "divSmall")});
  
}

//Form validering
function validateForm(){
  //Feltene i formen
  var nm = document.getElementById("name");
  var em = document.getElementById("email");
  var tp = document.getElementById("melding");
  var mld = document.getElementById("comments");


//Nested validering, går ikke videre før feltet er OK.
  if(nameLength(nm)) {
    if(emailFilled(em)) {
      if(emailFormat(em)){
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
  }
  return false;
}

//Validerer lengden på navn
function nameLength(nm) {   
  var nmLength = nm.value.length;

  if(nmLength > 30) {
    document.getElementById("formMelding").innerHTML = 
      "<div id='no'>Navnet kan ikke ha flere enn 30 tegn.</div>";
      return false; 
  }
  else {
    return true;
  }
}

//Validerer at E-mail er fyllt ut.
function emailFilled(em) {
  if(!em.value) {
    document.getElementById("formMelding").innerHTML = 
      "<div id='no'>Du må skrive inn E-mail.</div>";
      return false; 
  } else {
    return true;  
  }    
}
//Validerer Email format
function emailFormat(em) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!regex.test(em.value)){
    document.getElementById("formMelding").innerHTML = 
    "<div id='no'>Du må skrive inn riktig E-mail-format.</div>";
    return false; 
  }
  else {
      return true;
  }    
}
//Må velge noe annet enn default
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
//Validerer at melding er skrevet inn.
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
//Skal skrive til fil, men trenger noe annet Javascript grunnet sikkerhet.
function writeToFile(nm, em, tp, mld) {
  /*Umulig å skrive info til fil med Javascript eller andre ting i 
  pensum. Her trengs PHP, Python eller annet server-side script som er
  utenfor pensum :( */
    document.getElementById("formMelding").innerHTML = 
    "<div id='yes'>Din melding ble sendt!</div>";
    return true;
 }