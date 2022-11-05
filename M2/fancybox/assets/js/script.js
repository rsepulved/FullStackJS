$(function(){

  $(".boton1").click(function(){
    Fancybox.show(
      [
        {
          src: "https://youtu.be/kjLGORVosqc",
          type: "video",
          ratio: 16 / 10,
          width: 640,
          height: 360,         
        },
      ]
    );
    });

  $(".boton2").click(function(){
    
    Fancybox.show(
      [
        {
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113630.98419898393!2d-109.4088558396887!3d-27.125809790394694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9947f017a8d4ae2b%3A0xbbe5b3edc02a2db6!2sIsla%20de%20Pascua!5e0!3m2!1ses-419!2scl!4v1657497270715!5m2!1ses-419!2scl",
          type: "iframe",
          ratio: 16/10,
          width: 640,
          height:360,
        },
      ]
    );
  });

  

  
});


