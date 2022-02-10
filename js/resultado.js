
var requestItemBusqueda = new XMLHttpRequest();

var arbol = JSON.parse(localStorage.getItem("arbolFiltrado"));
requestItemBusqueda.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var itemsItalika = JSON.parse(this.responseText);
    var newList = [];
    for (var i = 0; i < arbol.length; i++) {
      var nuevo = itemsItalika.datos.find(find => (parseInt(find.SKU)==parseInt(arbol[i].SKU)));
      if(!(undefined ===nuevo)){
        newList.push(nuevo);
      }
    }
  var itemAlto = itemsItalika.datos.find(itemItalika => parseInt(itemItalika.SKU)==parseInt(arbol[0].SKU));
  /*
    var arbolPrincipal = arbol.find(arbolFiltro => arbolFiltro.posicion=="Principal");
    var itemAlto; 
    if(!(arbolPrincipal===undefined)){
      itemAlto= itemsItalika.datos.find(itemItalika => parseInt(itemItalika.SKU)==parseInt(arbolPrincipal.SKU));
    }
    else {
      itemAlto= itemsItalika.datos.find(itemItalika => parseInt(itemItalika.SKU)==parseInt(arbol[0].SKU));
    }
  */
  
  localStorage.setItem("itemsFiltrados",  JSON.stringify(newList));
    llenaDatos(itemAlto);
    generarCarrucel(itemAlto);
  }
};
requestItemBusqueda.open("GET", "json/items.json", true);
requestItemBusqueda.send();


function generarCarrucel(itemSeleccionado){
  var itemsItalika = JSON.parse(localStorage.getItem("itemsFiltrados"));
  var total = itemsItalika.length;
  var opc1ModeloDiv = document.getElementById("opc1ModeloDiv");
  var opc1ModeloImg = document.getElementById("opc1ModeloImg");
  var opc1ModeloSpan = document.getElementById("opc1ModeloSpan");
  var opc2ModeloDiv = document.getElementById("opc2ModeloDiv");
  var opc2ModeloImg = document.getElementById("opc2ModeloImg");
  var opc2ModeloSpan = document.getElementById("opc2ModeloSpan");
  var opc3ModeloDiv = document.getElementById("opc3ModeloDiv");
  var opc3ModeloImg = document.getElementById("opc3ModeloImg");
  var opc3ModeloSpan = document.getElementById("opc3ModeloSpan");
  var seleccionModelos = document.getElementsByClassName("divMasModelos")[0]
  
  var filtro = itemsItalika.filter(e => e.SKU!=itemSeleccionado.SKU)
  if(total==1){//se oculta seleccionModelos
    seleccionModelos.hidden = true;
  }
  if(total==2){//se muestra seleccionModelos con 1
    seleccionModelos.hidden = false;
    opc1ModeloDiv.hidden = true;
    opc2ModeloDiv.hidden = false;
    opc3ModeloDiv.hidden = true;
    opc2ModeloImg.setAttribute("src", filtro[0].imgfrente);
    opc2ModeloDiv.setAttribute("onclick", 'redirecciona('+filtro[0].SKU+')');
    opc2ModeloSpan.innerText=filtro[0]["Modelo"];
  }
  if(total==3){//se muestra seleccionModelos con 2
    seleccionModelos.hidden = false;
    opc1ModeloDiv.hidden = false;
    opc2ModeloDiv.hidden = true;
    opc3ModeloDiv.hidden = false;
    opc1ModeloImg.setAttribute("src", filtro[0].imgfrente);
    opc1ModeloDiv.setAttribute("onclick", 'redirecciona('+filtro[0].SKU+')');
    opc1ModeloSpan.innerText=filtro[0]["Modelo"];
    opc3ModeloImg.setAttribute("src", filtro[1].imgfrente);
    opc3ModeloDiv.setAttribute("onclick", 'redirecciona('+filtro[1].SKU+')');
    opc3ModeloSpan.innerText=filtro[1]["Modelo"];
    
  }
  if(total==4){//se muestra seleccionModelos con 3
    seleccionModelos.hidden = false;
    opc1ModeloDiv.hidden = false;
    opc2ModeloDiv.hidden = false;
    opc3ModeloDiv.hidden = false;
    opc1ModeloImg.setAttribute("src", filtro[0].imgfrente);
    opc1ModeloDiv.setAttribute("onclick", 'redirecciona('+filtro[0].SKU+')');
    opc1ModeloSpan.innerText=filtro[0]["Modelo"];
    opc2ModeloImg.setAttribute("src", filtro[1].imgfrente);
    opc2ModeloDiv.setAttribute("onclick", 'redirecciona('+filtro[1].SKU+')');
    opc2ModeloSpan.innerText=filtro[1]["Modelo"];
    opc3ModeloImg.setAttribute("src", filtro[2].imgfrente);
    opc3ModeloDiv.setAttribute("onclick", 'redirecciona('+filtro[2].SKU+')');
    opc3ModeloSpan.innerText=filtro[2]["Modelo"];
    
  }
/*
  var owlcarousel = document.getElementById("owl-carousel1");
  owlcarousel.innerHtml+='';
  if(itemsItalika.length>0){
    for(i=0; i<itemsItalika.length; i++) {
      if(!(itemsItalika[i]===undefined)){
      var ruta = itemsItalika[i].imgfrente;
      var SKU = itemsItalika[i]["SKU"];
      var Modelo = itemsItalika[i]["Modelo"];

      var div = document.createElement('div');
      div.setAttribute("class", "item");

      var ahref = document.createElement('a');
      ahref.setAttribute("href", "#");
      ahref.setAttribute("onclick",'redirecciona('+SKU+')');

      var img = document.createElement('img');
      img.setAttribute("src", ruta);

      var divModelo = document.createElement('div');
      divModelo.setAttribute("class", 'modelo');

      var divModeloTexto = document.createTextNode(Modelo);

      divModelo.appendChild(divModeloTexto);
      ahref.appendChild(img);
      ahref.appendChild(divModelo);
      div.appendChild(ahref);


      document.getElementById("owl-carousel1").appendChild(div);
    }
//console.log(itemString);
*/
}


/*
$('#owl-carousel1').owlCarousel({
  center: true,
  loop: false,
  margin: 10,
  nav: false,
  dots: false,
  URLhashListener:true,
  autoplayHoverPause:true,
  startPosition: 'URLHash',
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 3,
    }
  }


});

*/

function llenaDatos(itemSeleccionado){
  localStorage.setItem("itemSeleccionado",  JSON.stringify(itemSeleccionado));
  var camino = localStorage.getItem("camino");
  var video = document.getElementById("video");
  var rutaVideo = document.getElementById("rutaVideo");
  var verVideo = document.getElementById("verVideo");
  var reproductorVideo = document.getElementById("reproductorVideo");
  var tituloMoto = document.getElementById("tituloMoto");
  var lugarExcelente = document.getElementById("lugarExcelente");
  var precioNuevo = document.getElementById("precioNuevo");
  var dePrecio = document.getElementById("dePrecio");
  var pagosSemanales = document.getElementById("pagosSemanales");
  var precioSemanal = document.getElementById("precioSemanal");
  var imagenSeleccionada = document.getElementById("imagenSeleccionada");
  var fraseDiv = document.getElementById("fraseDiv");

  var tipoMotor = document.getElementById("tipoMotor");
  var tipoMotor_tr = document.getElementById("tipoMotor_tr");
  var cilindrada = document.getElementById("cilindrada");
  var cilindrada_tr = document.getElementById("cilindrada_tr");
  var velocidad_max = document.getElementById("velocidad_max");
  var velocidad_max_tr = document.getElementById("velocidad_max_tr");
  var potencia_max = document.getElementById("potencia_max");
  var potencia_max_tr = document.getElementById("potencia_max_tr");
  var torque_max = document.getElementById("torque_max");
  var torque_max_tr = document.getElementById("torque_max_tr");
  var sistema_arranque = document.getElementById("sistema_arranque");
  var sistema_arranque_tr = document.getElementById("sistema_arranque_tr");
  var sistema_ignicion = document.getElementById("sistema_ignicion");
  var sistema_ignicion_tr = document.getElementById("sistema_ignicion_tr");
  var transmision = document.getElementById("transmision");
  var transmision_tr = document.getElementById("transmision_tr");
  var rendimiento_combustible = document.getElementById("rendimiento_combustible");
  var rendimiento_combustible_tr = document.getElementById("rendimiento_combustible_tr");
  var capacidad_aceite_motor = document.getElementById("capacidad_aceite_motor");
  var capacidad_aceite_motor_tr = document.getElementById("capacidad_aceite_motor_tr");
  var recorre_tanque = document.getElementById("recorre_tanque");
  var recorre_tanque_tr = document.getElementById("recorre_tanque_tr");
  var capacidad_combustible = document.getElementById("capacidad_combustible");
  var capacidad_combustible_tr = document.getElementById("capacidad_combustible_tr");
  var cambios = document.getElementById("cambios");
  var cambios_tr = document.getElementById("cambios_tr"); 
  var autonomia = document.getElementById("autonomia");
  var autonomia_tr = document.getElementById("autonomia_tr");
  var tiempo_carga = document.getElementById("tiempo_carga");
  var tiempo_carga_tr = document.getElementById("tiempo_carga_tr");
  var tipo_bateria = document.getElementById("tipo_bateria");
  var tipo_bateria_tr = document.getElementById("tipo_bateria_tr");
  var capacidad_ah = document.getElementById("capacidad_ah");
  var capacidad_ah_tr = document.getElementById("capacidad_ah_tr");

  var suspencion_delantera = document.getElementById("suspencion_delantera");
  var suspencion_delantera_tr = document.getElementById("suspencion_delantera_tr");
  var suspencion_trasera = document.getElementById("suspencion_trasera");
  var suspencion_trasera_tr = document.getElementById("suspencion_trasera_tr");
  var frenos_delanteros = document.getElementById("frenos_delanteros");
  var frenos_delanteros_tr = document.getElementById("frenos_delanteros_tr");
  var frenos_traseros = document.getElementById("frenos_traseros");
  var frenos_traseros_tr = document.getElementById("frenos_traseros_tr");
  var rodada = document.getElementById("rodada");
  var rodada_tr = document.getElementById("rodada_tr");
  var rin = document.getElementById("rin");
  var rin_tr = document.getElementById("rin_tr");

  var largo_total = document.getElementById("largo_total");
  var largo_total_tr = document.getElementById("largo_total_tr");     
  var ancho_total = document.getElementById("ancho_total");
  var ancho_total_tr = document.getElementById("ancho_total_tr");     
  var alto_total = document.getElementById("alto_total");
  var alto_total_tr = document.getElementById("alto_total_tr");     
  var altura_asiento = document.getElementById("altura_asiento");
  var altura_asiento_tr = document.getElementById("altura_asiento_tr");     
  var capacidad_carga = document.getElementById("capacidad_carga");
  var capacidad_carga_tr = document.getElementById("capacidad_carga_tr");     
  var llanta_delantera = document.getElementById("llanta_delantera");
  var llanta_delantera_tr = document.getElementById("llanta_delantera_tr");     
  var llanta_trasera = document.getElementById("llanta_trasera");
  var llanta_trasera_tr = document.getElementById("llanta_trasera_tr");     
  var peso_total = document.getElementById("peso_total");
  var peso_total_tr = document.getElementById("peso_total_tr");     
  var distancia_entre_eje = document.getElementById("distancia_entre_eje");
  var distancia_entre_eje_tr = document.getElementById("distancia_entre_eje_tr");     


  var imgFlexDer = document.getElementById("imgFlexDer");  
  var imgFlexIzq = document.getElementById("imgFlexIzq");  
  var imgFlexFren = document.getElementById("imgFlexFren"); 
  var imgFlexDer2 = document.getElementById("imgFlexDer2");  
  var imgFlexIzq2 = document.getElementById("imgFlexIzq2");  
  var imgFlexFren2 = document.getElementById("imgFlexFren2"); 

  var btnLoQuiero = document.getElementById("btnLoQuiero"); 
  var overLoading = document.getElementById("overLoading"); 
  var reproducirVideo = document.getElementById("reproducirVideo"); 

  if(!(undefined ===itemSeleccionado.frase) &&
    !(""===itemSeleccionado.frase)   && 
    !(null === itemSeleccionado.frase)){
    fraseDiv.innerText=itemSeleccionado.frase
  }
  if(undefined === itemSeleccionado.preciodescuento && undefined === itemSeleccionado.Precio) {
    dePrecio.innerText="";
    precioNuevo.innerText="";
  }
  else if(!(undefined === itemSeleccionado.preciodescuento) && (undefined === itemSeleccionado.Precio)) {
    dePrecio.innerText="";
    precioNuevo.innerText="A "+itemSeleccionado.preciodescuento;
  }
  else if(!(undefined === itemSeleccionado.Precio) && (undefined === itemSeleccionado.preciodescuento)) {
    dePrecio.innerText="";
    precioNuevo.innerText="A "+itemSeleccionado.Precio;
  }else {
    dePrecio.innerText="De "+itemSeleccionado.Precio;
    precioNuevo.innerText="A "+itemSeleccionado.preciodescuento;
  }

  if(!(undefined === itemSeleccionado.semanalidad) &&
    !(""===itemSeleccionado.semanalidad)   && 
    !(null === itemSeleccionado.semanalidad)){
    pagosSemanales.innerText = itemSeleccionado.semanalidad+" pagos semanales";
    precioSemanal.innerText = itemSeleccionado.semanalidad;
  }else {
    pagosSemanales.innerText = "";
  }

  if(!(undefined === itemSeleccionado.imgfrente) &&
    !(""===itemSeleccionado.imgfrente)   && 
    !(null === itemSeleccionado.imgfrente)){
    var ruta = itemSeleccionado.imgfrente;
    imagenSeleccionada.setAttribute("class","");  
    imagenSeleccionada.setAttribute("src","");

      overLoading.setAttribute("class","overlayLoading active");
      setTimeout(function() {
          overLoading.setAttribute("class","overlayLoading");
          imagenSeleccionada.setAttribute("class","animated fadeInDown");
          imagenSeleccionada.setAttribute("src",ruta);
      }, 1000);

  }
 
  if((!null===itemSeleccionado.Caracteristicas.motor.Tipodemotor) &&
    !(""===itemSeleccionado.Caracteristicas.motor.Tipodemotor)   && 
    !(undefined === itemSeleccionado.Caracteristicas.motor.Tipodemotor)){
    tipoMotor_tr.hidden = false;
    tipoMotor.innerText = itemSeleccionado.Caracteristicas.motor.Tipodemotor;
  } 
  else {
    tipoMotor_tr.hidden = true;
  }
  if((!null===itemSeleccionado.Caracteristicas.motor.Cilindrada) && 
    !(""===itemSeleccionado.Caracteristicas.motor.Cilindrada) && 
    !(undefined === itemSeleccionado.Caracteristicas.motor.Cilindrada)){
    cilindrada_tr.hidden = false;
    cilindrada.innerText = itemSeleccionado.Caracteristicas.motor.Cilindrada;
  } 
  else {
    cilindrada_tr.hidden = true;
  }
  if((!null===itemSeleccionado.Caracteristicas.motor.Velocidadmaxima) && 
    !(""===itemSeleccionado.Caracteristicas.motor.Velocidadmaxima) && 
    !(undefined === itemSeleccionado.Caracteristicas.motor.Velocidadmaxima)){
    velocidad_max_tr.hidden = false;
    velocidad_max.innerText = itemSeleccionado.Caracteristicas.motor.Velocidadmaxima;
  } 
  else {
    velocidad_max_tr.hidden = true;
  }
  if(!(null === itemSeleccionado.Caracteristicas.motor.Potenciamaxima) && 
    !(""===itemSeleccionado.Caracteristicas.motor.Potenciamaxima) && 
    !(undefined === itemSeleccionado.Caracteristicas.motor.Potenciamaxima)){
    potencia_max_tr.hidden = false;
    potencia_max.innerText = itemSeleccionado.Caracteristicas.motor.Potenciamaxima;
  } 
  else {
    potencia_max_tr.hidden = true;
  }
  if(!(null === itemSeleccionado.Caracteristicas.motor.Torquemaximo) && 
    !(""===itemSeleccionado.Caracteristicas.motor.Torquemaximo) && 
    !(undefined === itemSeleccionado.Caracteristicas.motor.Torquemaximo)){
    torque_max_tr.hidden = false;
    torque_max.innerText = itemSeleccionado.Caracteristicas.motor.Torquemaximo;
  } 
  else {
    torque_max_tr.hidden = true;
  }
  if(!(null === itemSeleccionado.Caracteristicas.motor.Sistemadearranque) && 
    !(""===itemSeleccionado.Caracteristicas.motor.Sistemadearranque) && 
    !(undefined === itemSeleccionado.Caracteristicas.motor.Sistemadearranque)){
    sistema_arranque_tr.hidden = false;
    sistema_arranque.innerText = itemSeleccionado.Caracteristicas.motor.Sistemadearranque;
  } 
  else {
    sistema_arranque_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.motor.Sistemadeignicion) && 
    !(""===itemSeleccionado.Caracteristicas.motor.Sistemadeignicion) && 
    !(null === itemSeleccionado.Caracteristicas.motor.Sistemadeignicion)){
    sistema_ignicion_tr.hidden = false;
    sistema_ignicion.innerText = itemSeleccionado.Caracteristicas.motor.Sistemadeignicion;
  } 
  else {
    sistema_ignicion_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.motor.TransmisionFinal) && 
    !(""===itemSeleccionado.Caracteristicas.motor.TransmisionFinal) && 
    !(null === itemSeleccionado.Caracteristicas.motor.TransmisionFinal)){
    transmision_tr.hidden = false;
    transmision.innerText = itemSeleccionado.Caracteristicas.motor.TransmisionFinal;
  } 
  else {
    transmision_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.motor.Rendimientodecombustible) && 
    !(""===itemSeleccionado.Caracteristicas.motor.Rendimientodecombustible) && 
    !(null === itemSeleccionado.Caracteristicas.motor.Rendimientodecombustible)){
    rendimiento_combustible_tr.hidden = false;
    rendimiento_combustible.innerText = itemSeleccionado.Caracteristicas.motor.Rendimientodecombustible;
  } 
  else {
    rendimiento_combustible_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.motor.Capacidaddeaceite) && 
    !(""===itemSeleccionado.Caracteristicas.motor.Capacidaddeaceite) && 
    !(null === itemSeleccionado.Caracteristicas.motor.Capacidaddeaceite)){
    capacidad_aceite_motor_tr.hidden = false;
    capacidad_aceite_motor.innerText = itemSeleccionado.Caracteristicas.motor.Capacidaddeaceite;
  } 
  else {
    capacidad_aceite_motor_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.motor.Rendimientodecombustibleportanque) && 
    !(""===itemSeleccionado.Caracteristicas.motor.Rendimientodecombustibleportanque) && 
    !(null === itemSeleccionado.Caracteristicas.motor.Rendimientodecombustibleportanque)){
    recorre_tanque_tr.hidden = false;
    recorre_tanque.innerText = itemSeleccionado.Caracteristicas.motor.Rendimientodecombustibleportanque;
  } 
  else {
    recorre_tanque_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.motor.Capacidaddecombustible) && 
    !(""===itemSeleccionado.Caracteristicas.motor.Capacidaddecombustible) && 
    !(null === itemSeleccionado.Caracteristicas.motor.Capacidaddecombustible)){
    capacidad_combustible_tr.hidden = false;
    capacidad_combustible.innerText = itemSeleccionado.Caracteristicas.motor.Capacidaddecombustible;
  } 
  else {
    capacidad_combustible_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.motor.Cambios) && 
    !(""===itemSeleccionado.Caracteristicas.motor.Cambios) && 
    !(null === itemSeleccionado.Caracteristicas.motor.Cambios)){
    cambios_tr.hidden = false;
    cambios.innerText = itemSeleccionado.Caracteristicas.motor.Cambios;
  } 
  else {
    cambios_tr.hidden = true;
  }
  var autonomia = itemSeleccionado.Caracteristicas.motor["Autonomía"];
  if(!(undefined === autonomia) && 
    !(""===autonomia) && 
    !(null === autonomia)){
    autonomia_tr.hidden = false;
    autonomia.innerText = autonomia;
  } 
  else {
    autonomia_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.motor.Tiempoderecarga) && 
    !(""===itemSeleccionado.Caracteristicas.motor.Tiempoderecarga) && 
    !(null === itemSeleccionado.Caracteristicas.motor.Tiempoderecarga)){
    tiempo_carga_tr.hidden = false;
    tiempo_carga.innerText = itemSeleccionado.Caracteristicas.motor.Tiempoderecarga;
  } 
  else {
    tiempo_carga_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.motor.TipoBateria) && 
    !(""===itemSeleccionado.Caracteristicas.motor.TipoBateria) && 
    !(null === itemSeleccionado.Caracteristicas.motor.TipoBateria)){
    tipo_bateria_tr.hidden = false;
    tipo_bateria.innerText = itemSeleccionado.Caracteristicas.motor.TipoBateria;
  } 
  else {
    tipo_bateria_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.motor.CapacidadAh) && 
    !(""===itemSeleccionado.Caracteristicas.motor.CapacidadAh) && 
    !(null === itemSeleccionado.Caracteristicas.motor.CapacidadAh)){
    capacidad_ah_tr.hidden = false;
    capacidad_ah.innerText = itemSeleccionado.Caracteristicas.motor.CapacidadAh;
  } 
  else {
    capacidad_ah_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.chasis.Suspensiondelantera) && 
    !(""===itemSeleccionado.Caracteristicas.chasis.Suspensiondelantera) && 
    !(null === itemSeleccionado.Caracteristicas.chasis.Suspensiondelantera)){
    suspencion_delantera_tr.hidden = false;
    suspencion_delantera.innerText = itemSeleccionado.Caracteristicas.chasis.Suspensiondelantera;
  } 
  else {
    suspencion_delantera_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.chasis.Suspensiontrasera) && 
    !(""===itemSeleccionado.Caracteristicas.chasis.Suspensiontrasera) && 
    !(null === itemSeleccionado.Caracteristicas.chasis.Suspensiontrasera)){
    suspencion_trasera_tr.hidden = false;
    suspencion_trasera.innerText = itemSeleccionado.Caracteristicas.chasis.Suspensiontrasera;
  } 
  else {
    suspencion_trasera_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.chasis.Frenosdelanteros) && 
    !(""===itemSeleccionado.Caracteristicas.chasis.Frenosdelanteros) && 
    !(null === itemSeleccionado.Caracteristicas.chasis.Frenosdelanteros)){
    frenos_delanteros_tr.hidden = false;
    frenos_delanteros.innerText = itemSeleccionado.Caracteristicas.chasis.Frenosdelanteros;
  } 
  else {
    frenos_delanteros_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.chasis.Frenostraseros) && 
    !(""===itemSeleccionado.Caracteristicas.chasis.Frenostraseros) && 
    !(null === itemSeleccionado.Caracteristicas.chasis.Frenostraseros)){
    frenos_traseros_tr.hidden = false;
    frenos_traseros.innerText = itemSeleccionado.Caracteristicas.chasis.Frenostraseros;
  } 
  else {
    frenos_traseros_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.chasis.Rodada) && 
    !(""===itemSeleccionado.Caracteristicas.chasis.Rodada) && 
    !(null === itemSeleccionado.Caracteristicas.chasis.Rodada)){
    rodada_tr.hidden = false;
    rodada.innerText = itemSeleccionado.Caracteristicas.chasis.Rodada;
  } 
  else {
    rodada_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.chasis.Rin) && 
    !(""===itemSeleccionado.Caracteristicas.chasis.Rin) && 
    !(null === itemSeleccionado.Caracteristicas.chasis.Rin)){
    rin_tr.hidden = false;
    rin.innerText = itemSeleccionado.Caracteristicas.chasis.Rin;
  } 
  else {
    rin_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.dimensionPeso.Largototal) && 
    !(""===itemSeleccionado.Caracteristicas.dimensionPeso.Largototal) && 
    !(null === itemSeleccionado.Caracteristicas.dimensionPeso.Largototal)){
    largo_total_tr.hidden = false;
    largo_total.innerText = itemSeleccionado.Caracteristicas.dimensionPeso.Largototal;
  } 
  else {
    largo_total_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.dimensionPeso.Anchototal) && 
    !(""===itemSeleccionado.Caracteristicas.dimensionPeso.Anchototal) && 
    !(null === itemSeleccionado.Caracteristicas.dimensionPeso.Anchototal)){
    ancho_total_tr.hidden = false;
    ancho_total.innerText = itemSeleccionado.Caracteristicas.dimensionPeso.Anchototal;
  } 
  else {
    ancho_total_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.dimensionPeso.Alturadelasiento) && 
    !(""===itemSeleccionado.Caracteristicas.dimensionPeso.Alturadelasiento) && 
    !(null === itemSeleccionado.Caracteristicas.dimensionPeso.Alturadelasiento)){
    altura_asiento_tr.hidden = false;
    altura_asiento.innerText = itemSeleccionado.Caracteristicas.dimensionPeso.Alturadelasiento;
  } 
  else {
    altura_asiento_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.dimensionPeso.Altototal) && 
    !(""===itemSeleccionado.Caracteristicas.dimensionPeso.Altototal) && 
    !(null === itemSeleccionado.Caracteristicas.dimensionPeso.Altototal)){
    alto_total_tr.hidden = false;
    alto_total.innerText = itemSeleccionado.Caracteristicas.dimensionPeso.Altototal;
  } 
  else {
    alto_total_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.dimensionPeso.Capacidaddecarga) && 
    !(""===itemSeleccionado.Caracteristicas.dimensionPeso.Capacidaddecarga) && 
    !(null === itemSeleccionado.Caracteristicas.dimensionPeso.Capacidaddecarga)){
    capacidad_carga_tr.hidden = false;
    capacidad_carga.innerText = itemSeleccionado.Caracteristicas.dimensionPeso.Capacidaddecarga;
  } 
  else {
    capacidad_carga_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.dimensionPeso.Llantadelantera) && 
    !(""===itemSeleccionado.Caracteristicas.dimensionPeso.Llantadelantera) && 
    !(null === itemSeleccionado.Caracteristicas.dimensionPeso.Llantadelantera)){
    llanta_delantera_tr.hidden = false;
    llanta_delantera.innerText = itemSeleccionado.Caracteristicas.dimensionPeso.Llantadelantera;
  } 
  else {
    llanta_delantera_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.dimensionPeso.Llantatrasera) && 
    !(""===itemSeleccionado.Caracteristicas.dimensionPeso.Llantatrasera) && 
    !(null === itemSeleccionado.Caracteristicas.dimensionPeso.Llantatrasera)){
    llanta_trasera_tr.hidden = false;
    llanta_trasera.innerText = itemSeleccionado.Caracteristicas.dimensionPeso.Llantatrasera;
  } 
  else {
    llanta_trasera_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.dimensionPeso.Pesototal) && 
    !(""===itemSeleccionado.Caracteristicas.dimensionPeso.Pesototal) && 
    !(null === itemSeleccionado.Caracteristicas.dimensionPeso.Pesototal)){
    peso_total_tr.hidden = false;
    peso_total.innerText = itemSeleccionado.Caracteristicas.dimensionPeso.Pesototal;
  } 
  else {
    peso_total_tr.hidden = true;
  }
  if(!(undefined === itemSeleccionado.Caracteristicas.dimensionPeso.Distanciaentreejes) && 
    !(""===itemSeleccionado.Caracteristicas.dimensionPeso.Distanciaentreejes) && 
    !(null === itemSeleccionado.Caracteristicas.dimensionPeso.Distanciaentreejes)){
    distancia_entre_eje_tr.hidden = false;
    distancia_entre_eje.innerText = itemSeleccionado.Caracteristicas.dimensionPeso.Distanciaentreejes;
  } 
  else {
    distancia_entre_eje_tr.hidden = true;
  }

  var rutaImgIzq = itemSeleccionado.img3["4i"];
  var rutaImgDer = itemSeleccionado.img3["4d"];
  var rutaImgFren = itemSeleccionado["imgfrentes"];


  if(!(undefined === rutaImgIzq) && 
    !(""=== rutaImgIzq) && 
    !(null === rutaImgIzq)){
    imgFlexIzq.setAttribute("src",rutaImgIzq)
    imgFlexIzq2.setAttribute("src",rutaImgIzq)
  } 
  else {
    imgFlexIzq.hidden = true;
    imgFlexIzq2.hidden = true;
  }
  if(!(undefined === rutaImgDer) && 
    !(""=== rutaImgDer) && 
    !(null === rutaImgDer)){
    imgFlexDer.setAttribute("src",rutaImgDer)
    imgFlexDer2.setAttribute("src",rutaImgDer)
  } 
  else {
    imgFlexDer.hidden = true;
    imgFlexDer2.hidden = true;
  }
  if(!(undefined === rutaImgFren) && 
    !(""=== rutaImgFren) && 
    !(null === rutaImgFren)){
    imgFlexFren.setAttribute("src",rutaImgFren)
    imgFlexFren2.setAttribute("src",rutaImgFren)
  } 
  else {
    imgFlexFren.hidden = true;
    imgFlexFren2.hidden = true;
  }


  tituloMoto.innerText=itemSeleccionado.Modelo;

  //btnLoQuiero.setAttribute("onclick",'requestHelp(664899,"'+tituloMoto.innerText+'")'); // cesar
  //btnLoQuiero.setAttribute("onclick",'requestHelp(196228,"'+tituloMoto.innerText+'")'); // leo
  btnLoQuiero.setAttribute("onclick",'requestHelp(83517,"'+tituloMoto.innerText+'")');
  lugarExcelente.innerText=camino;

  var videoRuta = itemSeleccionado["nombre archivo video"];
  if(!(undefined === videoRuta) && 
    !(""=== videoRuta) && 
    !(null === videoRuta)){
    video.setAttribute("class","video saltar");
    reproducirVideo.hidden = false;
    rutaVideo.setAttribute("src",videoRuta);
    reproductorVideo.load();
  } 
  else {
    video.setAttribute("class","video saltar");
    reproducirVideo.hidden = true;
  }

  document.getElementsByClassName("divCosto")[0].setAttribute("style","display:none;");


}

$(".btnMasInfo2").click(function(){
  setTimeout(function() {
    $("#overlay1").addClass("active")
    $("#cuestionarioHead").addClass("z-indexAumentada");
  }, 300);

})
//$(".btnQuiero").click(function(){
//  setTimeout(function() {
//    $("#overlay2").addClass("active")
//  }, 300);
//})


$(".overlayClose").click(function(){
    var este = $(this).closest(".overlay");
    setTimeout(function() {
      este.removeClass("active");
      $("#cuestionarioHead").removeClass("z-indexAumentada");
    }, 300);
})

$(".cerrarVideo").click(function() {
  $(".video").addClass( "saltar" );
});


function reproduce(){
  video.setAttribute("class","video");
  reproductorVideo.load();
}

function inicio(){
  var overLoading2 = document.getElementById("overLoading2");
  overLoading2.setAttribute("class", "overlayLoading2 active");
  document.location.href="index.html"; 
}

function regresar(){
  var overLoading2 = document.getElementById("overLoading2");
  overLoading2.setAttribute("class", "overlayLoading2 active");
  document.location.href="preguntaCuatro.html";
}

function redirecciona(seleccion) {
  console.log(seleccion);

  var requestItemBusqueda = new XMLHttpRequest();
  requestItemBusqueda.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var itemsItalika = JSON.parse(this.responseText); 
      var seleccions = ""+seleccion;
      var itemSeleccionado = itemsItalika.datos.find(itemItalika => parseInt(itemItalika.SKU)==parseInt(seleccions));
      llenaDatos(itemSeleccionado);
    generarCarrucel(itemSeleccionado);
    }
  };
  requestItemBusqueda.open("GET", "json/items.json", true);
  requestItemBusqueda.send();
}


function requestHelp(idUser,modelo) {
  jQuery.ajax({
    url: 'https://wjzpkrhl44.execute-api.us-east-1.amazonaws.com/v1/notificacion/¡Quiere el producto!/¡Apoya a tu próximo cliente! Acércate quiere el modelo: '+modelo+'. Te está esperando. /1/0/'+idUser ,
    method: 'GET',
    dataType: "json",

    success: function (data) {
      //var json = $.parseJSON(data);

      var codeResponse=data.codigo;
      if(codeResponse==200){
      //alert('En breve un asesor se acercará contigo');
      }
      console.log(data.codigo);
      document.location.href=" listoAsesor.html"; 
     

    },
    error: function(data) {  
      console.log(data);
      document.location.href=" listoAsesor.html"; 

    },

    async: true
    });

}




