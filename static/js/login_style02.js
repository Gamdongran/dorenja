


function register() {

    if ($(target).is(":checked") == true) {
        window.location.href = '/register/1'
    }
    else if ($(guardian).is(":checked") == true) {
        window.location.href = '/register/2'
    }
    else {
        alert('보호자/대상자를 선택해 주세요')
    }

}

function guardianChk() {
    if ($('#guardian').is(":checked") == true) {

        $('#target').prop('checked', false)
    }
}

function targetChk() {
    if ($('#target').is(":checked") == true) {
        $('#guardian').prop('checked', false)
    }
}

function sign_in() {
    let username = $("#input-username").val();
    let password = $("#input-password").val();

    if (username == "") {
        alert('아이디를 입력해주세요.')
        return;
    }

    if (password == "") {
        alert('비밀번호를 입력해주세요.')
        return;
    } 
    $.ajax({
        type: "POST",
        url: "/sign_in",
        data: {
            username_give: username,
            password_give: password
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