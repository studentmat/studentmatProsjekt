// Sier at visOppskrift er en global funskjon
visDiv = function (divId, smallOrBig){
	console.log(divId);
  console.log(smallOrBig);
  // Vis det er divHeadingClosed funksjonen kjøres på
  if (smallOrBig == "divSmallOko") {
    $("#"+divId+" .divBigOko").toggleClass("active");
    $("#"+divId + " .divBigOko").removeClass("hidden");
    
    console.log("makes #"+divId+" > divBigOko active");
    //Skjuler den lille visningen av oppskriften
    $("#"+divId + " .divSmallOko").removeClass("active");
    $("#"+divId + " .divSmallOko").toggleClass("hidden");
  }

  //Hvis det er divHeadingOpen
  else if (smallOrBig == "divBigOko") {
    $("#"+divId+" .divSmallOko").toggleClass("active");
    $("#"+divId + " .divSmallOko").removeClass("hidden");

    console.log("makes #"+divId+" > divSmallOko active");
    //Skjuler den lille visningen av oppskriften
    $("#"+divId + " .divBigOko").removeClass('active');
     $("#"+divId + " .divBigOko").toggleClass('hidden');
  }

}
