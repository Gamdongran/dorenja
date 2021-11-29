

//카카오로그인

function kakaoLogin() {
    Kakao.init('35dde2f296a97b5ad171e7beb3bfb02c'); //발급받은 키 중 javascript키를 사용해준다.
    console.log(Kakao.isInitialized()); // sdk초기화여부판단
    Kakao.Auth.login({
        success: function (response) {
            Kakao.API.request({
                url: '/v2/user/me',
                success: function (response) {
                    res=response
                    if(response.id != ''){
                        if(response.kakao_account != ''){
                            kakao_log = response.kakao_account.email
                            check(kakao_log);
                            
                            // alert('카카오로그인!')
                        }
                    }
                    
                },
                fail: function (error) {
                    alert('카카오 로그인 실패')
                },
            })
        },
        fail: function (error) {
            console.log(error)
        },
    })
}
//카카오로그아웃  
function kakaoLogout() {
    if (Kakao.Auth.getAccessToken()) {
        Kakao.API.request({
            url: '/v1/user/unlink',
            success: function (response) {
                alert('카카오 로그아웃')
            },
            fail: function (error) {
                console.log(error)
            },
        })
        Kakao.Auth.setAccessToken(undefined)
    }
}

function check(kakao_email){

    $.ajax({
        type: "POST",
        url: "/sign_up/check_dup",
        data: {
            username_give: kakao_email
        },
        success: function (response) {
            // alert('kakao 중복체크')
            
            if (response["exists"] == false) {
                // alert('kakao계정이 등록되어 있지 않아 등록후 로그인 합니다.')
                $.ajax({
                    type: "POST",
                    url: "/sign_up/save",
                    data: {
                        username_give: kakao_email,
                        password_give: 'kakao'
                    },
                    success: function (response) {
                        alert("회원가입을 축하드립니다!");
                        kakao_sign_in(kakao_email)
                        window.location.replace("/");
                    }
                });
            } else {
                // alert('이미 등록되어 로그인을 진행합니다.')
                kakao_sign_in(kakao_email)
                window.location.replace("/");
                
            }
            

        }
    });
}

function kakao_sign_in(kakao_email) {
    $.ajax({
                    type: "POST",
                    url: "/sign_in",
                    data: {
                        username_give: kakao_email,
                        password_give: 'kakao'
                    },
                    success: function (response) {
                        if (response['result'] == 'success') {
                            $.cookie('mytoken', response['token'], { path: '/' });
                            window.location.replace("/");
                        } else {
                            alert(response['msg']);
                        }
                    }
                });
}