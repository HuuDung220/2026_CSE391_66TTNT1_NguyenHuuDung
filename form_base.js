let form = document.getElementById("registerForm");

let fullname = document.getElementById("fullname");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let terms = document.getElementById("terms");

function showError(id,message){
    document.getElementById(id).textContent = message;
}

function clearError(id){
    document.getElementById(id).textContent = "";
}

function validateFullname(){

    let value = fullname.value.trim();
    let regex = /^[A-Za-zÀ-ỹ\s]{3,}$/;

    if(value === ""){
        showError("fullnameError","Không được để trống");
        return false;
    }

    if(!regex.test(value)){
        showError("fullnameError","Tên không hợp lệ");
        return false;
    }

    clearError("fullnameError");
    return true;
}

function validateEmail(){

    let value = email.value.trim();
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(value === ""){
        showError("emailError","Không được để trống");
        return false;
    }

    if(!regex.test(value)){
        showError("emailError","Email không hợp lệ");
        return false;
    }

    clearError("emailError");
    return true;
}

function validatePhone(){

    let value = phone.value.trim();
    let regex = /^0\d{9}$/;

    if(value === ""){
        showError("phoneError","Không được để trống");
        return false;
    }

    if(!regex.test(value)){
        showError("phoneError","Số điện thoại không hợp lệ");
        return false;
    }

    clearError("phoneError");
    return true;
}

function validatePassword(){

    let value = password.value;
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if(value === ""){
        showError("passwordError","Không được để trống");
        return false;
    }

    if(!regex.test(value)){
        showError("passwordError","Mật khẩu chưa đủ mạnh");
        return false;
    }

    clearError("passwordError");
    return true;
}

function validateConfirm(){

    if(confirmPassword.value !== password.value){
        showError("confirmError","Mật khẩu không khớp");
        return false;
    }

    clearError("confirmError");
    return true;
}

function validateGender(){

    let genders = document.getElementsByName("gender");

    for(let g of genders){
        if(g.checked){
            clearError("genderError");
            return true;
        }
    }

    showError("genderError","Vui lòng chọn giới tính");
    return false;
}

function validateTerms(){

    if(!terms.checked){
        showError("termsError","Phải đồng ý điều khoản");
        return false;
    }

    clearError("termsError");
    return true;
}

form.addEventListener("submit",function(e){

    e.preventDefault();

    let valid =
        validateFullname() &
        validateEmail() &
        validatePhone() &
        validatePassword() &
        validateConfirm() &
        validateGender() &
        validateTerms();

    if(valid){

        form.style.display = "none";

        document.getElementById("successMessage").innerHTML =
        "<div class='success'>Đăng ký thành công! 🎉<br>Xin chào "
        + fullname.value + "</div>";
    }

});

fullname.addEventListener("blur",validateFullname);
email.addEventListener("blur",validateEmail);
phone.addEventListener("blur",validatePhone);
password.addEventListener("blur",validatePassword);
confirmPassword.addEventListener("blur",validateConfirm);

fullname.addEventListener("input",()=>clearError("fullnameError"));
email.addEventListener("input",()=>clearError("emailError"));
phone.addEventListener("input",()=>clearError("phoneError"));
password.addEventListener("input",()=>clearError("passwordError"));
confirmPassword.addEventListener("input",()=>clearError("confirmError"));