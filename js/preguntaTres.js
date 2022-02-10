obtieneArbol();
var camino = localStorage.getItem("camino");
var importante = localStorage.getItem("importante");
var breadSelection1 = document.getElementById("breadSelection1");
var breadSelection2 = document.getElementById("breadSelection2");
breadSelection1.innerText = camino + " >";
breadSelection2.innerText = importante + " >";

function redirecciona(opc) {
  var utilizar = document
    .getElementsByClassName("center")[0]
    .getElementsByClassName("imgBtnModal")[0].textContent;
  var seleccionado = document
    .getElementsByClassName("center")[0]
    .getElementsByTagName("a")[0];
  if (
    JSON.stringify(
      utilizar.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    ).toUpperCase() ==
      JSON.stringify(
        opc.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      ).toUpperCase() ||
    opc == "ok"
  ) {
    if (opc != "ok") {
      seleccionado.setAttribute("class", "item respCuest btnItem btnItem2");
      tiempoEfecto(seleccionado);
    }
    localStorage.setItem("utilizar", utilizar);
    var almacenado = localStorage.getItem("utilizar");
    console.log(almacenado);
    var overLoading = document.getElementById("overLoading");
    overLoading.setAttribute("class", "overlayLoading2 active");
    document.location.href = "preguntaCuatro.html";
  }
}
function tiempoEfecto(seleccionado) {
  setTimeout(function () {
    seleccionado.setAttribute("class", "item respCuest btnItem");
  }, 250);
}
function inicio() {
  var overLoading = document.getElementById("overLoading");
  overLoading.setAttribute("class", "overlayLoading2 active");
  document.location.href = "index.html";
}
function regresar() {
  var overLoading = document.getElementById("overLoading");
  overLoading.setAttribute("class", "overlayLoading2 active");
  document.location.href = "preguntaDos.html";
}

function obtieneArbol() {
  var requestItemBusqueda = new XMLHttpRequest();
  requestItemBusqueda.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var itemsItalika = JSON.parse(this.responseText).arbol_decision;
      var filtroUtilizar = itemsItalika.filter(function (arbol) {
        return (
          JSON.stringify(
            arbol.camino.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          ).toUpperCase() ===
            JSON.stringify(
              camino.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            ).toUpperCase() &&
          JSON.stringify(
            arbol.importancia.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          ).toUpperCase() ===
            JSON.stringify(
              importante.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            ).toUpperCase()
        );
      });

      var data = filtroUtilizar.filter((obj, pos, arr) => {
        return arr.map((mapObj) => mapObj.uso).indexOf(obj.uso) == pos;
      });

      generarCarrucel(data);
    }
  };
  requestItemBusqueda.open("GET", "json/arbolDecisionItalika.json", true);
  requestItemBusqueda.send();
}

function generarCarrucel(data) {
  var owlcarousel = document.getElementById("owl-carousel2");
  owlcarousel.innerHtml += "";
  var imagenesJson = JSON.parse(
    '{ "Deporte":"img_Deporte.png", "Diversion":"img_Jugar.png", "Socializar":"img_Socializar.png", "Trabajo":"img_Trabajar.png", "Transporte":"img_Trasladarse.png" }'
  );
  if (data.length > 0) {
    for (i = 0; i < data.length; i++) {
      var uso = data[i].uso;
      if (!(data[i] === undefined)) {
        var ahref = document.createElement("a");
        ahref.setAttribute("href", "#");
        ahref.setAttribute("class", "item respCuest btnItem");
        ahref.setAttribute("onclick", "redirecciona('" + uso + "')");
        ahref.setAttribute("data-hash", "uno");

        var img1 = document.createElement("img");
        img1.setAttribute("class", "imgResp");
        img1.setAttribute(
          "src",
          "img/PNG/img_perfilador/P3/" + imagenesJson[uso]
        );

        var img2 = document.createElement("img");
        img2.setAttribute("class", "imgOpcional");
        img2.setAttribute("src", "img/SVG/img_opciones.svg");

        var div1 = document.createElement("div");
        div1.setAttribute("class", "imgOpcional2");

        var div2 = document.createElement("div");
        div2.setAttribute("class", "imgBtnModal");
        var div2Texto = document.createTextNode(uso);
        div2.appendChild(div2Texto);

        ahref.appendChild(img1);
        ahref.appendChild(img2);
        div1.appendChild(div2);
        ahref.appendChild(div1);
        document.getElementById("owl-carousel2").appendChild(ahref);
      }
    }
  }
  $("#owl-carousel2").owlCarousel({
    center: true,
    loop: false,
    margin: 160,
    stagePadding: 0,
    nav: false,
    items: 1,
    smartSpeed: 750,
    startPosition: 1,

    responsive: {
      0: {
        items: 1,
      },
      850: {
        items: 2,
      },
    },
  });
}

/*
{ 
	"Deporte":"img_Deporte.png",
	"Jugar":"img_Jugar.png",
	"Socializar":"img_Socializar.png",
	"Trabajar":"img_Trabajar.png",
	"Trasladarse":"img_Trasladarse.png"
}

<a href="#" class="item respCuest btnItem" onclick="redirecciona('Deporte')" data-hash="uno">
    <img class="imgResp" src="img/PNG/img_perfilador/P3/img_Deporte.png">
    <img class="imgOpcional" src="img/SVG/img_opciones.svg" alt="">
    <div class="imgOpcional2">
        <div class="imgBtnModal">Deporte</div>
    </div>
</a>
<a href="#" class="item respCuest btnItem" onclick="redirecciona('Jugar')" data-hash="dos">
    <img class="imgResp" src="img/PNG/img_perfilador/P3/img_Jugar.png">
    <img class="imgOpcional" src="img/SVG/img_opciones.svg" alt="">
    <div class="imgOpcional2">
        <div class="imgBtnModal">Jugar</div>
    </div>
</a>
<a href="#"  class="item respCuest btnItem" onclick="redirecciona('Socializar')" data-hash="tres">
    <img class="imgResp" src="img/PNG/img_perfilador/P3/img_Socializar.png">
    <img class="imgOpcional" src="img/SVG/img_opciones.svg" alt="">
    <div class="imgOpcional2">
        <div class="imgBtnModal">Socializar</div>
    </div>
</a>
<a href="#" class="item respCuest btnItem" onclick="redirecciona('Trabajar')" data-hash="cuatro">
    <img class="imgResp" src="img/PNG/img_perfilador/P3/img_Trabajar.png">
    <img class="imgOpcional" src="img/SVG/img_opciones.svg" alt="">
    <div class="imgOpcional2">
        <div class="imgBtnModal">Trabajar</div>
    </div>
</a>
<a href="#"  class="item respCuest btnItem" onclick="redirecciona('Trasladarse')" data-hash="cinco">
    <img class="imgResp" src="img/PNG/img_perfilador/P3/img_Trasladarse.png">
    <img class="imgOpcional" src="img/SVG/img_opciones.svg" alt="">
    <div class="imgOpcional2">
        <div class="imgBtnModal">Trasladarse</div>
    </div>
</a>

*/
