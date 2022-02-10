$(document).ready(function () {
  $("#owl-carousel1").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    URLhashListener: true,
    autoplayHoverPause: true,
    startPosition: "URLHash",
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  });

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
});

$(".btnMasInfo").click(function () {
  $("#overlay1").addClass("active");
});
// $(".btnQuiero").click(function(){
//   $("#overlay2").addClass("active")
// })

$(".overlayClose").click(function () {
  $(this).closest(".overlay").removeClass("active");
});

$(".modalItemMost").click(function () {
  $(".divRespuestasCuestionario").css("display", "none");
  $(".contenidoMoto").css("display", "block");
});
