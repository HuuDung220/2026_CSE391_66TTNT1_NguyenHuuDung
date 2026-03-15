const prices={
"Áo":150000,
"Quần":200000,
"Giày":500000
}

let form=document.getElementById("orderForm")

let product=document.getElementById("product")
let quantity=document.getElementById("quantity")
let deliveryDate=document.getElementById("deliveryDate")
let address=document.getElementById("address")
let note=document.getElementById("note")

let total=document.getElementById("total")

function showError(id,msg){
document.getElementById(id).textContent=msg
}

function clearError(id){
document.getElementById(id).textContent=""
}

function validateProduct(){

if(product.value===""){
showError("productError","Phải chọn sản phẩm")
return false
}

clearError("productError")
return true
}

function validateQuantity(){

let q=Number(quantity.value)

if(!Number.isInteger(q)||q<1||q>99){
showError("quantityError","Số lượng 1-99")
return false
}

clearError("quantityError")
return true
}

function validateDate(){

let selected=new Date(deliveryDate.value)
let today=new Date()

let max=new Date()
max.setDate(today.getDate()+30)

if(deliveryDate.value===""){
showError("dateError","Chọn ngày giao")
return false
}

if(selected<today){
showError("dateError","Không chọn ngày quá khứ")
return false
}

if(selected>max){
showError("dateError","Không quá 30 ngày")
return false
}

clearError("dateError")
return true
}

function validateAddress(){

let v=address.value.trim()

if(v.length<10){
showError("addressError","Địa chỉ ≥10 ký tự")
return false
}

clearError("addressError")
return true
}

function validateNote(){

if(note.value.length>200){
showError("noteError","Tối đa 200 ký tự")
return false
}

clearError("noteError")
return true
}

function validatePayment(){

let radios=document.getElementsByName("payment")

for(let r of radios){
if(r.checked){
clearError("paymentError")
return true
}
}

showError("paymentError","Chọn phương thức thanh toán")
return false
}

function calculateTotal(){

let p=product.value
let q=Number(quantity.value)

if(prices[p]&&q){

let t=prices[p]*q

total.textContent=t.toLocaleString("vi-VN")

}
}

product.addEventListener("change",calculateTotal)
quantity.addEventListener("input",calculateTotal)

note.addEventListener("input",function(){

let len=note.value.length
let counter=document.getElementById("charCount")

counter.textContent=len+"/200"

if(len>200){
counter.style.color="red"
showError("noteError","Tối đa 200 ký tự")
}else{
counter.style.color="black"
clearError("noteError")
}

})

product.addEventListener("blur",validateProduct)
quantity.addEventListener("blur",validateQuantity)
deliveryDate.addEventListener("blur",validateDate)
address.addEventListener("blur",validateAddress)

product.addEventListener("input",()=>clearError("productError"))
quantity.addEventListener("input",()=>clearError("quantityError"))
deliveryDate.addEventListener("input",()=>clearError("dateError"))
address.addEventListener("input",()=>clearError("addressError"))

form.addEventListener("submit",function(e){

e.preventDefault()

let valid=
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validateNote() &
validatePayment()

if(valid){

let div=document.getElementById("summary")

let p=product.value
let q=quantity.value
let price=prices[p]
let sum=price*q

div.innerHTML=`
<h3>Xác nhận đơn hàng</h3>
Sản phẩm: ${p}<br>
Số lượng: ${q}<br>
Tổng tiền: ${sum.toLocaleString("vi-VN")} VND<br>
Ngày giao: ${deliveryDate.value}<br><br>

<button id="confirm">Xác nhận</button>
<button id="cancel">Hủy</button>
`

div.style.display="block"

document.getElementById("confirm").onclick=function(){

form.style.display="none"

document.getElementById("success").innerHTML=
"<h2>Đặt hàng thành công 🎉</h2>"

}

document.getElementById("cancel").onclick=function(){

div.style.display="none"

}

}

})
