var openDiv = null;
var loadPage = function() {
  console.log("loading page and scrolling to top");
  
  openDiv = null;
  $(window).scrollTop(0) ;

  //Sjekker om vi ber om a ga til index (ikke #) eller refresher
  if (window.location.href.indexOf("#/") > -1 ) {
    var page = window.location.href.split("#/")[1];
    // Kaller addAnchorEventListeners etter at siden er lastet ned/inn
    $("#main").load("/html/" + page + ".html", addAnchorEventListeners);
    updateNavbar(page);
  } else {
    // Om ingen side er spesifisert, lastes home.html opp
    $("#main").load("/html/home.html");
    updateNavbar("home");

  }
}

var handleHrefClick = function(event) {
  console.log("handleHrefClick");

  // Stopp klikket fra å navigere oss bort
  event.preventDefault();

  // Finn addressen (verdien til href) som var lenket til
  var page = $(this).attr("href");

  if (page === "#") {
     return false;
  }

  // Lager den endrede page-variabelen i page, hvor jeg har fjernet .html fra slutten
  page = page.split("/#/")[1];

  if (!page) {
    page = "home";
  }

  window.history.pushState({},"", "/#/" + page);

  // Last inn den adressen inn i main
  var path = "/html/" + page + ".html";
  $("#main").load(path);

  //updateNavbar(page);
  
  loadPage();

  return false;
}

//Laster ei ny side når vi klikker tilbake
window.addEventListener('popstate', loadPage);   

// Kortversjon for document.onload
// Laster inn rett html-dokument i rett tag
$(function () {
  console.log("on onload");
 

  // Last inn navigasjonen inn i nav elementet
  $("#navBar").load("/html/nav.html", function () {
    // Ventet til nav har lastet inn

    // Så gjøre det mulig å lytte lytte til elementene og navigere

    // Lytt på alle "a" elementer som har en "href" adresse
    $('#navBar a[href]').click(handleHrefClick);
  });
 
  $()
  // Last inn footer inn i footer elementet
  $("#footer").load("/html/footer.html", function () {

    // Lytt på alle "a" elementer som har en "href" adresse
    $('#footer a[href]').click(handleHrefClick);
  });

  loadPage();

});

var updateNavbar = function(page) {
  console.log("updating Navbar");
  console.log("page: ", page);
  //Fjerner klassen highlight fra listeelementet med den klassen 
  $("li.highlight").removeClass("highlight");
  if (page == "home") {
    //Spesielt for homesiden, da den i navbaren blir henvist til med /
    $("#navBar a[href='/']").closest(".navButton").addClass("highlight");
  } else {
    var el = $("#navBar a[href='/#/"+page+"']").closest(".navButton").addClass("highlight");
    console.log("el: ", el);
  }
}

//Holder navbaren fiksert i toppen ved å legge til classen fixed om det er lengre til toppen enn headerContents hoyde
$(window).bind('scroll', function () {
    if ($(window).scrollTop() > $("#headerContent").outerHeight()) {
        $('#navBar').addClass('fixed');
    } else {
        $('#navBar').removeClass('fixed');
    }
});

//Legge til listeners til ankerne
var addAnchorEventListeners = function() {
  var anchors = document.getElementsByClassName("anchor");
  console.log(anchors);
  for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener("click", scrollToAnchor);
  }  
};

//For ankermenyen
var scrollToAnchor = function () {
  console.log("scroll to Anchor");
  var id = $(this).attr("data-anchor");
  console.log("id:", id);
  var el = document.getElementById(id);
  // Finner posisjonen til elementet
  var offset = $(el).offset();

  // Scroller elegant ned til elementet
  $("html, body").animate({
    // Finner posisjonen minus høyden til navbaren
    scrollTop: offset.top - $("#navBar").height()*2
  }, 100);
};


// Åpner og lukker divs
visDiv = function (divId, smallOrBig) {

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
/*
// Åpne og lukke av div hvor det ikke erstattes med ny div
visDivOnly = function (divId) {
  var div = document.getElementById(divId);
  var bigDiv = div.children('.divBig');
  if (bigDiv.classList.contains('active')) {
    $(bigDiv).removeClass("active");
    openDiv = null;
  }
  $(bigDiv).toggleClass("active");
}
*/

//Gir feilmelding for kundens "fake" linker
errorMessage = function () {
  alert("Beklager, siden eksisterer ikke");
}

//Kode for å hente inn tilfeldig oppskrift til home siden
randomOppskrift = function() { 
  var nummer = Math.floor(Math.random()*10);
  oppskrift = document.getElementById(nummer);
  oppskrift.style.display = "block";
}

//Form validering
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


if(nameLength(nm))
{
if(emailFormat(em))
{

if(selectTopic(tp))
{

if(meldingLength(mld))
{
  if(writeToFile(nm, em, tp, mld))
  {
    nm.value= "";
    em.value= "";
    tp.value= "";
    mld.value="";
  }



}}}}
return false;
}

function nameLength(nm)
{   
var nmLength = nm.value.length;
console.log(nmLength)

if(nmLength > 30)
{
  console.log("hmm")
  document.getElementById("formMelding").innerHTML = 
    "<div id='no'>Navnet kan ikke ha flere enn 30 tegn.</div>";
    return false; 
}
else
{
  return true;
}
}

function emailFormat(em)
{
if(!em.value)
{
  document.getElementById("formMelding").innerHTML = 
    "<div id='no'>Du må skrive inn E-mail.</div>";
    return false; 
}
else 
{
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
