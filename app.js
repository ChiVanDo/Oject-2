$(document).ready(function () {
  $(".image-slider").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,//vô tận
    arrows: true,//nút di chuyển
    draggable: true,//cho phep di chuyển bằng chuột
    prevArrow: `<button type='button' class='slick-prev slick-arrow'><ion-icon name="arrow-back-outline"></ion-icon></button>`,
    nextArrow: `<button type='button' class='slick-next slick-arrow'><ion-icon name="arrow-forward-outline"></ion-icon></button>`,
    dots: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
        },
      },//cac loại display
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          infinite: false,
        },
      },
    ],
     autoplay: true,
     autoplaySpeed: 4000,
  });
});
