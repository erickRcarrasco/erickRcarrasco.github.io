
var camino = localStorage.getItem("camino");
var importante = localStorage.getItem("importante");
var utilizar = localStorage.getItem("utilizar");
var breadSelection1 = document.getElementById("breadSelection1");
var breadSelection2 = document.getElementById("breadSelection2");
var breadSelection3 = document.getElementById("breadSelection3");
breadSelection1.innerText=camino+" >";
breadSelection2.innerText=importante+" >";
breadSelection3.innerText=utilizar+" >";


var requestArbol = new XMLHttpRequest();
requestArbol.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
  var arbolDecisionItalika = JSON.parse(this.responseText); 
  var filtroUtilizar = arbolDecisionItalika.arbol_decision.filter(function (arbol) {
    return  (JSON.stringify(arbol.camino.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toUpperCase())  === (JSON.stringify(camino.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toUpperCase()) &&
    		(JSON.stringify(arbol.importancia.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toUpperCase()) === (JSON.stringify(importante.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toUpperCase()) &&
  			(JSON.stringify(arbol.uso.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toUpperCase()) === (JSON.stringify(utilizar.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) .toUpperCase())
  	});
  	var filtrosort = filtroUtilizar.sort(function (a, b) {
	    if (parseFloat(a["semanalidad"]) > parseFloat(b["semanalidad"])) {
	      return -1;
	    }
	    if (parseFloat(a["semanalidad"]) < parseFloat(b["semanalidad"])) {
	      return 1;
	    }
		return 0;
	});
	var max = parseInt(filtrosort[0].semanalidad);
	var min = parseInt(filtrosort[filtrosort.length-1].semanalidad);
	cargaSlider(max,min);
	localStorage.setItem("arbolFiltrado",  JSON.stringify(filtrosort));
}


};
requestArbol.open("GET", "json/arbolDecisionItalika.json", true);
requestArbol.send();



function redirecciona() {
	var almacen = JSON.parse(localStorage.getItem("arbolFiltrado"));
	console.log(almacen);
	/*
	var filtroUtilizar = almacen.filter(function (arbol) {
		return  (parseFloat(arbol["semanalidad"]) <= parseFloat(document.getElementById("precioSemanal").innerText.split("$",2)[1])) 
	});
	*/
	var valorEncontrado=0;
	for(var i=0; i<almacen.length; i++){
		if(parseFloat(almacen[i].semanalidad) == parseFloat(document.getElementById("precioSemanal").innerText.split("$",2)[1])) {
			valorEncontrado=almacen[i].semanalidad;
			break;
		}
		else {	
			if(parseFloat(almacen[i].semanalidad) < parseFloat(document.getElementById("precioSemanal").innerText.split("$",2)[1])) {
				if(i==almacen.length-1){
					if(parseFloat(almacen[i].semanalidad) == parseFloat(document.getElementById("precioSemanal").innerText.split("$",2)[1])) {
						valorEncontrado=almacen[i].semanalidad;
						break;
					}
					else {
						valorEncontrado=almacen[i-1].semanalidad;
						break;
					}
				}
				else {
					valorEncontrado=almacen[i-1].semanalidad;
					break;
				}
			}
			
		}
	}
	var filtroUtilizar = almacen.filter(function (arbol) {
		return  (parseFloat(arbol["semanalidad"]) <= parseFloat(valorEncontrado)) 
	});
	
	
	
	console.log(filtroUtilizar);
	localStorage.setItem("arbolFiltrado",  JSON.stringify(filtroUtilizar));
	var overLoading = document.getElementById("overLoading");
	overLoading.setAttribute("class", "overlayLoading2 active");
	document.location.href="listoPiloto.html";
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
	document.location.href="preguntaTres.html";
}


function cargaSlider(maximo,minimo){

	$(".js-range-slider").ionRangeSlider({
	    min: minimo,
	    max: maximo,
	    from: minimo,
	    grid: true,
	    prefix: "$",
	    hide_min_max: true,
	    height: 400,
	    postfix: ".00",
	        onStart: function (data) {
	            document.getElementById("precioSemanal").innerText="$"+data.from;
	        },
	        onChange: function (data) {
	            // fired on every range slider update
	            document.getElementById("precioSemanal").innerText="$"+data.from;
	        },
	        onFinish: function (data) {
	            // fired on pointer release
	        },
	        onUpdate: function (data) {
	            // fired on changing slider with Update method
	        }
	});

	$(".js-grid-text-0").prepend("$");
	$(".js-grid-text-2").prepend("$");
	$(".js-grid-text-4").prepend("$");

	$(".js-grid-text-0").append(".00");
	$(".js-grid-text-2").append(".00");
	$(".js-grid-text-4").append(".00");

	$(".js-grid-text-0").css("margin-left", "-3.6%");
	$(".js-grid-text-2").css("margin-left", "-3.6%");
	$(".js-grid-text-4").css("margin-left", "-3.6%");

	$($(".irs-grid").children()[6]).css("display", "none");
	$($(".irs-grid").children()[18]).css("display", "none");
}


