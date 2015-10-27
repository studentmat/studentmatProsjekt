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