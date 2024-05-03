function onClickUserName() {
    document.getElementById("userNameSignIn").focus();
}

function onClickPassWord() {
    document.getElementById("passWordSignIn").focus();
}

function onClickUserNameSignUp() {
    document.getElementById("userNameSignUp").focus();
}

function onClickPassWordSignUp() {
    document.getElementById("passWordSignUp").focus();
}

function onClickGmailSignUp() {
    document.getElementById("gmailSignUp").focus();
}

var storedData = localStorage.getItem('users_data');
var userData = Array.isArray(storedData) ? storedData : JSON.parse(storedData || "[]");

function redirectToPageSignIn() {
    window.location = "http://127.0.0.1:5500/Product/Todo-2/signIn.html";
    alert("Sign Up Success");
}

function onClickSignUpSubmit() {
    var userNameSignUp = document.getElementById("userNameSignUp").value;
    var passWordSignUp = document.getElementById("passWordSignUp").value;
    var gmailSignUp = document.getElementById("gmailSignUp").value;

    if(checkSignUpValueEmpty(userNameSignUp, passWordSignUp, gmailSignUp)){
        alert("You must enter complete information!");
        return;
    }

    if (isEmailExist(gmailSignUp)) {
        alert("This gmail is already in use!");
        return;
    }

    addUserData(userNameSignUp, passWordSignUp, gmailSignUp);
    redirectToPageSignIn();
}

function checkSignUpValueEmpty(name, password, email) {
    if(name == '' || password == '' || email == ''){
        return true;
    }
}

function isEmailExist(email) {
    return userData.hasOwnProperty(email);
}

function addUserData(username, password, email) {
    var storedData = localStorage.getItem('users_data');
    var userData = storedData ? JSON.parse(storedData) : {};
    userData[email] = { username: username, password: password, email: email };
    localStorage.setItem('users_data', JSON.stringify(Object.values(userData)));
}

function getAllUserData() {
    return Object.values(userData);
}

function removeUserData(email) {
    var indexToRemove = -1;
    for (var i = 0; i < userData.length; i++) {
        if (userData[i].email === email) {
            indexToRemove = i;
            break;
        }
    }
    if (indexToRemove !== -1) {
        userData.splice(indexToRemove, 1); // Xóa người dùng tại vị trí indexToRemove
        localStorage.setItem('users_data', JSON.stringify(userData));
        return true;
    }
    return false;
}


function redirectToPageHome() {
    window.location.href = "http://127.0.0.1:5500/Product/Todo-2/home.html";
    alert("Welcome Home!");
}

function onClickSignInSubmit() {
    var userNameSignIn = document.getElementById("userNameSignIn").value;
    var passWordSignIn = document.getElementById("passWordSignIn").value;
    var checkUserData = false;
    userData.forEach(function(user){
        if(user.username === userNameSignIn && user.password === passWordSignIn){
            checkUserData = true;
            return;
        }
    });

    if(checkUserData == true){
        console.log("hi");
        redirectToPageHome();
    } else {
        alert("Invalid user name or password");
    }
}

// function initGoogleSignIn() {
//     gapi.load('auth2', function() {
//         auth2 = gapi.auth2.init({
//             client_id: '574539043099-3jn6seiojaktst5q08lf94j7dbdbaonl.apps.googleusercontent.com',
//             cookiepolicy: 'single_host_origin',
//         });
//         attachSignin(document.querySelector('.signIn-social'));
//     });
// }

// function attachSignin(element) {
//     auth2.attachClickHandler(element, {}, function(googleUser) {
//         console.log('Đăng nhập thành công!');
//         var profile = googleUser.getBasicProfile();
//         console.log('ID: ' + profile.getId());
//         console.log('Tên: ' + profile.getName());
//         console.log('Ảnh: ' + profile.getImageUrl());
//         console.log('Email: ' + profile.getEmail());
//     }, function(error) {
//         console.log('Đăng nhập thất bại: ' + error.error);
//     });
// }

// document.addEventListener('DOMContentLoaded', function() {
//     initGoogleSignIn();
// });