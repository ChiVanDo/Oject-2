// hàm tạo id tự động
function tao_idsp(){
    var id;

    id = Math.random().toString().substring(2,10) +'_'+ String(new Date().getTime()); // lấy thời gian hiện tại quy đổi thành milicecon
    return id;
}

var dssp = JSON.parse(localStorage.getItem('danhsachsp')); // tao ds mới
// duyệt các phần tử trong mảng

if(dssp==null)
    dssp = new Array();

function clicktaosp(){ // khi click vao ham nay se lay thong tin cua input
    console.log('clicktaosp');
    // truy cập các node để lấy data
    var nodehinhanh1 = document.getElementById('hinhanh1');
    var hinhanh1 = nodehinhanh1.value;
    nodehinhanh1.value='';
    var nodehinhanh2 = document.getElementById('hinhanh2');
    var hinhanh2 = nodehinhanh2.value;
    nodehinhanh2.value='';
    var nodehinhanh3 = document.getElementById('hinhanh3');
    var hinhanh3 = nodehinhanh3.value;
    nodehinhanh3.value='';
    var nodehinhanh4 = document.getElementById('hinhanh4');
    var hinhanh4 = nodehinhanh4.value;
    nodehinhanh4.value='';
    var nodehinhanh5 = document.getElementById('hinhanh5');
    var hinhanh5 = nodehinhanh5.value;
    nodehinhanh5.value='';

    var nodeten = document.getElementById('ten');
    var ten = nodeten.value;
    nodeten.value='';

    var nodegiagoc = document.getElementById('giagoc');
    var giagoc = parseInt(nodegiagoc.value);
    nodegiagoc.value='';
    

    var nodegiamgia = document.getElementById('giamgia');
    var giamgia = parseFloat(nodegiamgia.value);
    nodegiamgia.value='';

    

    // tạo ra đối tượng data từ người dùng
    var sp = taodoituongsp(hinhanh1,hinhanh2,hinhanh3,hinhanh4,hinhanh5, ten, giagoc, giamgia, null);
    // đưa sp vào ds
    dssp.push(sp);
    // tiếp theo lưu trữ dssv vào local
    var json_dssp = JSON.stringify(dssp);
    localStorage.setItem('danhsachsp',json_dssp);
}


// hàm này khi ấn vào thêm giỏ hàng sẽ thêm sp vào giỏ
var dssp_giohang = JSON.parse(localStorage.getItem('dssp_giohang')); // tao ds mới
// duyệt các phần tử trong mảng

if(dssp_giohang==null)
    dssp_giohang = new Array();

function them_vao_gio_hang(ten1, dongia1, sl1){
    console.log('Them_vao_gio_hang');
    //lấy thuộc tính sản phẩm
    var ten = ten1;
  

    var dongia = dongia1;

    var sl = sl1;
   
    //
    //---
    var sp = taodoituongsp(ten, dongia, sl);
    dssp_giohang.push(sp);
    var json_dssp_giohang = JSON.stringify(dssp_giohang);
    localStorage.setItem('dssp_giohang',json_dssp_giohang);
}
        
        
        
        
        // tạo ra đối tượng dựa vào các thuocj tính truyền vào
        // input : các thuộc tính
        // output: đối tượng
        // tạo 1 đối tượng là 1 sp
function taodoituongsp(hinhanh1,hinhanh2,hinhanh3,hinhanh4,hinhanh5, ten ,giagoc, giamgia, masp){
    var sp = new Object();
            // tạo thuộc tính và phương thức cho đối tượng
            //b1 gán
    sp.hinhanh1 = hinhanh1;
    sp.hinhanh2 = hinhanh2;
    sp.hinhanh3 = hinhanh3;
    sp.hinhanh4 = hinhanh4;
    sp.hinhanh5 = hinhanh5;
            // sp.size_m = size_m;
            // sp.size_l = size_l;
            // sp.size_xl = size_xl;
    sp.ten = ten;
    sp.giagoc = giagoc;
    sp.giamgia = giamgia;

    if(masp != null){
        sp.masp = masp;
    }
    else{
        sp.masp = tao_idsp();
    }
            
            //b2 viết phương thức

    sp.tinhgiaban = function(){
                //logic
        var giaban = 0;
        giaban= this.giagoc - (this.giagoc * this.giamgia);
        return giaban;
    }
    sp.tojson = function(){
        var json = JSON.stringify(this);
        return json;
    }
            // từ json chuyền thành 1 đối tượng đầy đủ phương thức
            //in : json
            // out : đối tượng đầy đủ các phương thức
    
    return sp;
}
        // chuyển đối tượng từ json lấy từ local thành đối tượng đầy đủ
        // in đối tượng lấy từ local là json
        // out đối tượng đầy đủ
function doituongdaydu_ham(json){
            //b1 chuyển đối tượng lấy từ local thành đối tượng chưa đầy đủ
    var json_in = JSON.parse(json); // json_in is đối tượng chưa đầy đủ
            //b2 chuyển thành đối tượng đầy đủ phương thức
    var doituongfull;
    doituongfull = taodoituongsp(json_in.hinhanh, json_in.ten, json_in.giagoc, json_in.giamgia);
    return doituongfull;
}

// chuyển 1 đối tượng thành 1 đoạn html để hiển thị được dssp lên màn hình
// input : dssp
// output: HTML hiển thị
function chuyenDanhsachdoituongsanphamthanhHTML(dssp){
    var html = '<div class="nhieu_sp">';
    
    for(var i=0; i < dssp.length ; i++){
        var sanpham= dssp[i];
        var htmlsp = chuyendoituongspThanhHTML(sanpham);
        html += htmlsp;
    }
    html +='</div>';
    return html;
}

// chuyen 1 doi tuong thanh 1 doạn hTML
// INPUT : ĐỐI TƯỢNG
// OUTPUT  ĐOẠN HTML

function chuyendoituongspThanhHTML(sanpham){
    var html = '';
    html+='<div class="mot_sp">';
    html+=    '<div class="giamgia">';
    html+=        '<p style="font-size:10px;">Giảm '+sanpham.giamgia*100+'%</p>';
    html+=    '</div>';
    html+=    '<p style="display: none;" id="ma_sp">'+sanpham.masp+'</p>';
    html+=    '<img src="'+sanpham.hinhanh1+'" alt="">';
    html+=    '<a onclick = "chi_tiet_sp(\''+sanpham.masp+'\')" href = "#"><p>'+sanpham.ten+'</p></a>';
    html+=    '<div class="gia">';
    html+=        '<div class="giaban">';
    html+=            '<span>'+gia_ban(sanpham)+'đ</span>';
    html+=        '</div>';
    html+=        '<div class="giagoc">';
    html+=            '<del>'+sanpham.giagoc+'đ</del> <!--Thẻ del gạch ngang chữ-->';
    html+=        '</div>';
    html+=        '<div class="ic">';
    html+=            '<i class="fa-solid fa-truck-fast"></i>';
    html+=            '<i class="fa-regular fa-heart"></i>';
    html+=        '</div>';
    html+=        '<div class="ic_star">';
    html+=            '<i class="fa-solid fa-star"></i>';
    html+=            '<i class="fa-solid fa-star"></i>';
    html+=            '<i class="fa-solid fa-star"></i>';
    html+=            '<i class="fa-solid fa-star"></i>';
    html+=            '<i class="fa-solid fa-star"></i>';
    html+=        '</div>';
    html+=    '</div>';
    html+='</div>';
    return html;
}

        
//  HÀM TÍNH GIÁ BÁN TỪ SẢN PHẦM
// INPUT: GIÁ GỐC+GIẢM GIÁ
// OUT : GIÁ BÁN
function gia_ban(sanpham){
    var giaban;
        giaban=sanpham.giagoc-(sanpham.giagoc * sanpham.giamgia);
    return giaban;
}



function chi_tiet_sp(msp){
    var id_sp;
    id_sp = msp;
    console.log('ID SP LA: '+id_sp);

    var jsonDssp = localStorage.getItem('danhsachsp');
    var dssp = JSON.parse(jsonDssp);

    var html = '<div class="nhieu_sp">';
    for(var i = 0 ; i < dssp.length ; i++){
        var sp_canlay = dssp[i];
        if(sp_canlay.masp == id_sp){
            var html = '<div class="nhieu_sp">';
            var htmlsp = chuyendoituongspThanhHTML(sp_canlay);
            html += htmlsp; 
        }      
    } 
    html +='</div>';
    
    var nodeSp = document.getElementById('san_pham_lv1');
    nodeSp.innerHTML = html;
}

function taodoituongitemgiohang(idsp, sl, size){
    var item = new Object();
}




