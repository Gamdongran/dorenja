function sql_read() {
    $.ajax({
        type: "GET",
        url: '/sql/read',
        success: function (response) {
            alert('s')
            map_list = response['map_list']
            let positions = []
            for (i = 0; i < map_list.length; i++) {
                temp_map = {
                    type: map_list[i][1],
                    title: map_list[i][0],
                    content: `<div>${map_list[i][0]}</div>`,
                    latlng: new kakao.maps.LatLng(map_list[i][8], map_list[i][7]),
                }
                positions[i] = temp_map


            }

            for (var i = 0; i < positions.length; i++) {
                // 마커 이미지의 이미지 크기 입니다
                var imageSize = new kakao.maps.Size(24, 35);

                // 마커 이미지를 생성합니다    
                var markerImage = new kakao.maps.MarkerImage(imageSrcRed, imageSize);

                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: positions[i].latlng, // 마커를 표시할 위치
                    title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image: markerImage // 마커 이미지 
                });

            }

            alert(response["msg"])
        },
        error: function (request, status, error) {
            alert("에러발생");

        }
    });

}
//     $(document).ready(function () {
//       showArticles();
//     });
// 

function go_map() {
    window.location.href = '/location'
}

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 1 // 지도의 확대 레벨 (1~) 숫자가 낮을수록 확대되어있음 (100이면 한반도 보임)
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

my_lat = ''
my_lon = ''
sql_read()



// [
//   {
//     title: '카카오',
//     content: '<div>카카오</div>',
//     latlng: new kakao.maps.LatLng(33.450705, 126.570677)
//   },
//   {
//     title: '생태연못',
//     content: '<div>생태연못</div>',
//     latlng: new kakao.maps.LatLng(33.450936, 126.569477)
//   },
//   {
//     title: '텃밭',
//     content: '<div>텃밭</div>',
//     latlng: new kakao.maps.LatLng(33.450879, 126.569940)
//   },
//   {
//     title: '근린공원',
//     content: '<div>근린공원</div>',
//     latlng: new kakao.maps.LatLng(33.451393, 126.570738)
//   }
// ];

var imageSrcYellow = "https://petsa-test.s3.ap-northeast-2.amazonaws.com/markerStar.png";

var imageSrcRed = "https://petsa-test.s3.ap-northeast-2.amazonaws.com/markerStarBlue.png";

var imageSrcBlue = "https://petsa-test.s3.ap-northeast-2.amazonaws.com/markerStarRed.png";

// if (j == 0) {
//   j = j + 1



// }
// else {
// }

// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
if (navigator.geolocation) {

// GeoLocation을 이용해서 접속 위치를 얻어옵니다
navigator.geolocation.getCurrentPosition(function (position) {

    var lat = position.coords.latitude, // 위도
        lon = position.coords.longitude; // 경도
    my_lat = lat
    my_lon = lon

    var locPosition = new kakao.maps.LatLng(lat,
            lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        message = '<div style="padding:5px;">현재위치 입니다.</div>'; // 인포윈도우에 표시될 내용입니다

    // 마커와 인포윈도우를 표시합니다
    displayMarker(locPosition, message);

});

} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
    message = 'geolocation을 사용할수 없어요..'

displayMarker(locPosition, message);
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    map: map,
    position: locPosition
});

var iwContent = message, // 인포윈도우에 표시할 내용
    iwRemoveable = true;

// 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable
});

// 인포윈도우를 마커위에 표시합니다 
infowindow.open(map, marker);

// 지도 중심좌표를 접속위치로 변경합니다
map.setCenter(locPosition);
}