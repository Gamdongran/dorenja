function save() {
    let type = $("#type").val();
    let name = $("#name").val();
    let number = $("#number").val();
    let address1 = $("#address1").val();
    let address1_1 = $("#address1-1").val();
    let address1_2 = $("#address1-2").val();
    let address2 = $("#address2").val();
    let address3_lat = $("#address3-lat").val();
    let address3_lng= $("#address3-lng").val();
    console.log(username, password, password2);
    $.ajax({
        type: "POST",
        url: "/save",
        data: {
            type:type,
            name: name,
            number: number,
            address1:address1,
            address1_1 : address1_1,
            address1_2: address1_2,
            address2: address2,
            address3_lat: address3_lat,
            address3_lng: address3_lng,
        },
        success: function (response) {
            alert("등록완료");
        }
    });

}

