let favs = $(".favs");

favs.on("click", function(){
	location.href = "/recipes/" + this.id;
});
