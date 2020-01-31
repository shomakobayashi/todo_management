
$(document).ready(function() {

      var uluru = {lat: 35.7281334, lng: 139.9139612};
      var map = new google.maps.Map(document.getElementById('shopDmap'), {
          zoom: 16,
          center: uluru
      });
      var marker = new google.maps.Marker({
          position: uluru,
          map: map
      });
      var contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h4 id="firstHeading" class="firstHeading">エステティック ミスパリ シャポー市川店</h4>'+
          '<div id="bodyContent">'+
          '<p><b4>プロフェッショナル集団</b4>,' +
          '世界に認められたミス・パリのプロフェッショナル集団「ミス・パリ」は、1982年に創業し、お客様をまっすぐに一生懸命見てまいりました。' +
          'これまでに培った高い技術力、効果を出す指導法、高品質の商品、安全性・有効性に優れた機器、美しく聡明な社員、居心地の良い洗練されたサ' +
          'ロンの全てで、あなたのご希望にお応えいたします。</p>'+
          '<p>WebSite: <a href="https://www.miss-paris.co.jp/">'+
          'https://www.miss-paris.co.jp/</a> '+
          '</p>'+
          '</div>'+
          '</div>';

      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });

      var marker = new google.maps.Marker({
          position: uluru,
          map: map,
          title: 'Uluru (Ayers Rock)'
      });
      marker.addListener('click', function() {
          infowindow.open(map, marker);
      });

});
