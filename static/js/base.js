function sign_out() {
      $.removeCookie('mytoken', { path: '/' });
      alert('로그아웃!');
      window.location.href = "/login";
  };

function openClose() {
  if ($("#list-items").css("display") == "block") {
      $("#list-items").hide();
      $("#btn-list-items").text("개인정보 열기");
  } else {
      $("#list-items").show();
      $("#btn-list-items").text("개인정보 닫기");
  }
}


function fnMove(seq) {
  var offset = $("#div" + seq).offset();
  $('html, body').animate({
      scrollTop: offset.top - 60 /*스크롤된 위치에서 상단네비 길이만큼 -60*/
  }, 400 /*스크롤시간*/ );
}
$(document).ready(function(){
  var target = $("#sidebar");

  // 버튼을 클릭하면 사이드바 열림
  $(document).on("click", "#OpenBtn", function (e){
      target.show();
      target.addClass('emphasized');
  });

  // 사이드바 외부를 클릭하면 사이드바 닫힘
  $(document).mouseup(function (e){
      if(target.has(e.target).length==0) {
          target.hide();
          target.removeClass('emphasized');
      } 
  });
});;
