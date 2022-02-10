var itemSeleccionado = JSON.parse(localStorage.getItem("itemSeleccionado"));

var camino = localStorage.getItem("camino");
var tituloMoto = document.getElementById("tituloMoto");
var lugarExcelente = document.getElementById("lugarExcelente");
var imgFlexDer = document.getElementById("imgFlexDer");
var imgFlexIzq = document.getElementById("imgFlexIzq");
var imgFlexFren = document.getElementById("imgFlexFren");
var elektraIframe = document.getElementById("elektraIframe");
var fraseDiv = document.getElementById("fraseDiv");

tituloMoto.innerText = itemSeleccionado.Modelo;
lugarExcelente.innerText = camino;

var rutaImgIzq = itemSeleccionado.img3["4i"];
var rutaImgDer = itemSeleccionado.img3["4d"];
var rutaImgFren = itemSeleccionado["imgfrentes"];
//https://www.elektra.com.mx/skucode?addtocart=true&sku=34004263&tienda=2784
//elektraIframe.setAttribute("src","https://www.elektra.com.mx/skucode?addtocart=true&sku="+itemSeleccionado.SKU+"&tienda=2784") se coment DEBIDO AQUE NO SE UTILIZA

if (
  !(undefined === itemSeleccionado.frase) &&
  !("" === itemSeleccionado.frase) &&
  !(null === itemSeleccionado.frase)
) {
  fraseDiv.innerText = itemSeleccionado.frase;
}

if (
  !(undefined === rutaImgIzq) &&
  !("" === rutaImgIzq) &&
  !(null === rutaImgIzq)
) {
  imgFlexIzq.setAttribute("src", rutaImgIzq);
} else {
  imgFlexIzq.hidden = true;
}
if (
  !(undefined === rutaImgDer) &&
  !("" === rutaImgDer) &&
  !(null === rutaImgDer)
) {
  imgFlexDer.setAttribute("src", rutaImgDer);
} else {
  imgFlexDer.hidden = true;
}
if (
  !(undefined === rutaImgFren) &&
  !("" === rutaImgFren) &&
  !(null === rutaImgFren)
) {
  imgFlexFren.setAttribute("src", rutaImgFren);
} else {
  imgFlexFren.hidden = true;
}

function regresar() {
  var overLoading = document.getElementById("overLoading");
  overLoading.setAttribute("class", "overlayLoading2 active");
  document.location.href = "resultado.html";
}

function inicio() {
  var overLoading = document.getElementById("overLoading");
  overLoading.setAttribute("class", "overlayLoading2 active");
  document.location.href = "index.html";
}

function frameLoaded() {
  console.log(
    "prueba erickprueba erickprueba erickprueba erickprueba erickprueba erickprueba erickprueba erick"
  );
}
