var loadPage = function() {
  var openDiv = null;

  console.log("loading page");
  //Sjekker om vi ber om a ga til index (ikke #) eller refresher
  if (window.location.href.indexOf("#/") > -1 ) {
    var page = window.location.href.split("#/")[1];
    $("#main").load("/html/" + page + ".html");

  } else {
    // Om ingen side er spesifisert, lastes home.html opp
    $("#main").load("/html/home.html"); 
  }

  updateNavbar(page);
}

var handleHrefClick = function(event) {
      

    // Finn addressen som var lenket til
    var page = $(this).attr("href");

    /* ENDRET GRUNNET ANKERBAR
    if (page === "#") {
       return false;
    }
    */
   
    if (page.indexOf("#/") < -1 ) {
      console.log("# -page");
      return false;
    }

    console.log("cept going");
    
    // Stopp klikket fra å navigere oss bort
    event.preventDefault();
    // Lager den endrede page-variabelen i page, hvor jeg har fjernet .html fra slutten
    page = page.split("/#/")[1];

    if (!page) {
      page = "home";
    }

    window.history.pushState({},"", "/#/" + page);

    // Last inn den adressen inn i main
    var path = "/html/" + page + ".html";
    console.log(path);
    $("#main").load(path);

    updateNavbar(page);

    return false;
}

window.addEventListener('popstate', loadPage); 
  //Oppdater navbar

// Kortversjon for document.onload
// Laster inn rett html-dokument i rett tag
$(function () {
  loadPage();

  // Last inn navigasjonen inn i nav elementet
  $("#navBar").load("/html/nav.html", function () {
    // Ventet til nav har lastet inn

    // Så gjøre det mulig å lytte lytte til elementene og navigere

    // Lytt på alle "a" elementer som har en "href" adresse
    $('#navBar a[href]').click(handleHrefClick);
  });
 
  // Last inn footer inn i footer elementet
  $("#footer").load("/html/footer.html", function () {

    // Lytt på alle "a" elementer so
    // har en "href" adresse
    $('#footer a[href]').click(handleHrefClick);
  });
});

var updateNavbar = function(page) {

  console.log("page: ", page);

  //Fjerner klassen highlight fra listeelementet med den klassen 
  $("li.highlight").removeClass("highlight");
  var el = $("[href='/#/"+page+"']").closest(".navButton").addClass("highlight");
  console.log("El: ", el);
}


//Holder navbaren fiksert i toppen ved å legge til classen fixed om det er lengre til toppen enn headerContents hoyde
$(window).bind('scroll', function () {
    if ($(window).scrollTop() > $("#headerContent").outerHeight()) {
        $('#navBar').addClass('fixed');
    } else {
        $('#navBar').removeClass('fixed');
    }
});

// Åpner og lukker divs
visDiv = function (divId, smallOrBig) {

  // Vis det er divSmall funksjonen kjøres på
  if (smallOrBig == "divSmall") {
    $("#"+divId + " .divBig").toggleClass("active");
    $("#"+divId + " .divBig").removeClass("hidden");

    //Skjuler den lille visningen av oppskriften
    $("#"+divId + " .divSmall").removeClass("active");
    $("#"+divId + " .divSmall").toggleClass("hidden");

    console.log("kalt på divSmall");
  }

  //Hvis det er divBig
  else if (smallOrBig == "divBig") {
    $("#"+divId + " .divSmall").toggleClass("active");
    $("#"+divId + " .divSmall").removeClass("hidden");

    console.log("makes #"+divId+" > divSmall active");
    //Skjuler den lille visningen av oppskriften
    $("#"+divId + " .divBig").removeClass('active');
    $("#"+divId + " .divBig").toggleClass('hidden');

    openDiv = null;
    console.log("kalt på divBig");
  }

    console.log("openDiv: ", openDiv);

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

//Gir feilmelding for kundens "fake" linker
errorMessage = function () {
  alert("Beklager, siden eksisterer ikke");
}

//Kode for å hente inn tilfeldig oppskrift til home siden
randomOppskrift = function() { 
  var nummer = Math.floor(Math.random()*10);
  console.log(nummer)
  oppskrift = document.getElementById(nummer);
  console.log(oppskrift)
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
    return false;
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
    var fil = "text.txt";
    fil.open("w");
    fil.writeln("------------------------------------------------");
    fil.writeln("name: " + nm.value);
    fil.writeln("Mail: " + em.value);
    fil.writeln("Topic: " + tp.value);
    fil.writeln("Melding: " + mld.value);
    fil.writeln("------------------------------------------------");
    fil.Close();
    document.getElementById("formMelding").innerHTML = 
    "<div id='yes'>Din melding ble sendt!</div>";
    return true;
 }