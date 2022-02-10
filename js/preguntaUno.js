function redirecciona(opc) {
	var camino = document.getElementsByClassName("center")[0].getElementsByClassName("imgBtnModal")[0].textContent;
	var seleccionado = document.getElementsByClassName("center")[0].getElementsByTagName("a")[0];
	if((JSON.stringify(camino.normalize("NFD").replace(/[\u0300-\u036f]/g,"")).toUpperCase())==(JSON.stringify(opc.normalize("NFD").replace(/[\u0300-\u036f]/g,"")).toUpperCase()) || opc=='ok'){
	
		if(opc!='ok'){
			seleccionado.setAttribute("class", "item respCuest btnItem btnItem2");
			tiempoEfecto(seleccionado)
		}	
		localStorage.setItem("camino", camino);
		var almacenado = localStorage.getItem("camino");
		console.log(camino);


		var overLoading = document.getElementById("overLoading");
    	overLoading.setAttribute("class", "overlayLoading2 active");
		document.location.href="preguntaDos.html";

	}
}
function tiempoEfecto(seleccionado){
	setTimeout(function() {
		seleccionado.setAttribute("class", "item respCuest btnItem");
	},250);
}
function inicio(){
    var overLoading = document.getElementById("overLoading");
    overLoading.setAttribute("class", "overlayLoading2 active");
	document.location.href="index.html";

}
