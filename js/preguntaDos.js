
var camino = localStorage.getItem("camino");
var breadSelection1 = document.getElementById("breadSelection1");
breadSelection1.innerText=camino+" >";

function redirecciona(opc) {
	var importante = document.getElementsByClassName("center")[0].getElementsByClassName("imgBtnModal")[0].textContent;
	var seleccionado = document.getElementsByClassName("center")[0].getElementsByTagName("a")[0];

	if((JSON.stringify(importante.normalize("NFD").replace(/[\u0300-\u036f]/g,"")).toUpperCase())==(JSON.stringify(opc.normalize("NFD").replace(/[\u0300-\u036f]/g,"")).toUpperCase()) || opc=='ok'){
		if(opc!='ok'){
			seleccionado.setAttribute("class", "item respCuest btnItem btnItem2");
			tiempoEfecto(seleccionado)
		}	
		localStorage.setItem("importante", importante);
		var almacenado = localStorage.getItem("importante");
		console.log(almacenado);
		var overLoading = document.getElementById("overLoading");
    	overLoading.setAttribute("class", "overlayLoading2 active");
		document.location.href="preguntaTres.html";
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
function regresar(){
	var overLoading = document.getElementById("overLoading");
    overLoading.setAttribute("class", "overlayLoading2 active");
	document.location.href="preguntaUno.html";
}

