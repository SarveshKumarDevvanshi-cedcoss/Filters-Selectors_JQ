createPageElement();
$(document).ready(function(){
    createTable(products);
    setOptions(selectUniqueColumnValue("brand"), "brand");
    setOptions(selectUniqueColumnValue("os"), "os");
    console.log(products);
    $("body").on("click","#rmBtn", function(){
        var pid=$(this).data("pid");
        $("#"+pid).hide();
    });
    $("body").on("keyup", "#search", function(){
        var s=$("#search").val();
        var prod=products.filter((v,i) =>{
            var n=v.name;
            return n.toLowerCase() == s.toLowerCase() || v.id == s;
        });
        if(s.length == 0){
            prod=products;
        }
        createTable(prod);
    });
    $("body").on("change", "#brand", function(){
        var os=$("#os").val();
        var brand=$("#brand").val();
        var prod;
        if(brand == -1 ){
            prod=products;
        }
        else if(os == -1){
            prod=products.filter((v,i) =>{
                return v.brand === brand;
            });
        }
        else{
            prod=products.filter((v,i) =>{
                return v.os === os && v.brand === brand;
            });
        }
        createTable(prod);
    });
    $("body").on("change", "#os", function(){
        var os=$("#os").val();
        var brand=$("#brand").val();
        var prod;
        if(os == -1){
            prod=products;
        }
        else if(brand == -1){
            prod=products.filter((v,i) =>{
                return v.os === os;
            });
        }
        else{
            prod=products.filter((v,i) =>{
                return v.os === os && v.brand === brand;
            });
        }
        createTable(prod);
    });
});
function filterTable(){
    
}
function selectUniqueColumnValue(column){
    var col=products.map((a)=>{ return a[column]});
    var uniqueCol=Array.from(new Set(col));
    return uniqueCol;
}
function setOptions(opts, idx){
    var opt=`<option value = -1 >Select ${idx}</option>`;
    for(var i=0;i<opts.length;i++){
        opt+=`<option value="${opts[i]}">${opts[i]}</option>`;
    }
    $("#"+idx).html(opt);
}
function createTable(products){
    var name = 
    `<table><thead>
    <tr>
    <th>Id</th>
    <th>Name</th>
    <th>Brand</th>
    <th>Operating System</th>
    <th>Remove</th>
    </tr></thead>`;
  for (let i = 0; i < products.length; i++) {
    name += `<tr id="${products[i].id}">
    <td>${products[i].id}</td>
    <td>${products[i].name}</td>
    <td>${products[i].brand}</td>
    <td>${products[i].os}</td>
    <td><a href="#" id="rmBtn" data-pid="${products[i].id}">&#10005;</a></td>
    </tr>`;
  }
  name += `</table>`;
  $("#productData").html(name);
}
function createPageElement(){
    var html=`<div class="wrapper">
    <div class="header">
        <div id="filterDropdown">
            <select name="" id="brand"></select>
            <select name="" id="os"></select>
        </div>
        <div id="searchBar">
            <label for="search">Search:<input type="text" name="" id="search"></label>
        </div>
    </div>
    <div id="productData"></div>
</div>`;
$("#dataTable").html(html);
}