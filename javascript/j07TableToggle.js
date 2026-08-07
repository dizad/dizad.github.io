// used to slide animate the tables down

$('document').ready(function(){
	$(function(){
		$(".tableHeader").click(function(event){
			var $target = $(event.target);
			$target.closest("tr").nextUntil(":not(.tableContentRow)").find(".propagate").slideToggle();
		});
	});
});