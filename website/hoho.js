// Sier at visOppskrift er en global funskjon
visDiv = function (divId){
	console.log(divId);
  $("#"+divId+" .inndelingDiv").toggleClass("active");
  console.log("makes #"+divId+" > inndelingDiv active");
  //Skjuler den lille visningen av oppskriften
  $("#"+divId + " .divHeading").hide();
}