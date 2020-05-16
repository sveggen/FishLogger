function dropdown(){
    $("ui search selection dropdown").dropdown();
}

$(function() {
  var basic = $('#demo-basic').croppie({
    viewport: {
      width: 150,
      height: 200
    }
  });
  basic.croppie('bind', {
    url: 'https://i.imgur.com/xD9rzSt.jpg',
    points: [77, 469, 280, 739]
  });
});










  