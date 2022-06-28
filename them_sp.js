var key_giohang = 'dsitemsanpham';

var key_dssp = 'danhsachsp';
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
    

    if(hinhanh1 != '' && ten != '' && giagoc != ''){
        var sp = taodoituongsp(hinhanh1,hinhanh2,hinhanh3,hinhanh4,hinhanh5, ten, giagoc, giamgia, null);
        // đưa sp vào ds
        dssp.push(sp);
        // tiếp theo lưu trữ dssv vào local
        var json_dssp = JSON.stringify(dssp);
        localStorage.setItem('danhsachsp',json_dssp);
        alert('Tạo sản phẩm thành công!');
    }
    else{
        alert('Tạo sản phẩm thất bại!');
    }
        
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
        if(dssp[i] != null){
            var sanpham= dssp[i];
            var htmlsp = chuyendoituongspThanhHTML(sanpham);
            html += htmlsp;
        }
        
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
    html+=    '<div class="giamgia" >';
    html+=        '<p style="font-size:10px; text-align: center;">Giảm '+sanpham.giamgia*100+'%</p>';
    html+=    '</div>';
    html+=    '<p style="display: none;" id="ma_sp">'+sanpham.masp+'</p>';
    html+=    '<img src="'+sanpham.hinhanh1+'" alt="">';
    html+=    '<a style="text-decoration: none;" onclick = "chi_tiet_sp(\''+sanpham.masp+'\')" href = "#"><p>'+sanpham.ten+'</p></a>';
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
    html+=    '<button id="xoa_sp" style = "background-color:rgb(246, 88, 15) ; " onclick = "xoa_sp_ban(\''+sanpham.masp+'\')"> Xóa </button>'
    html+=    '<button id="sua_sp" style = "background-color:rgb(246, 88, 15) ; "> Sửa </button>'
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


function chitiet_sphtml(sanpham){
    var html='';
    html+='<div class="mot_sp_ct">';
    html+=      '<div class="img">';
    html+=        '<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">';
    html+=         '<div class="carousel-inner">';
    html+=            '<div class="carousel-item active">';
    html+=             '<img src="'+sanpham.hinhanh1+'" class="d-block w-100" alt="NOT PICTURE">';
    html+=           '</div>';
    html+=            '<div class="carousel-item">';
    html+=             '<img src="'+sanpham.hinhanh2+'" class="d-block w-100" alt="NOT PICTURE">';
    html+=           '</div>';
    html+=           '<div class="carousel-item">';
    html+=             '<img src="'+sanpham.hinhanh3+'" class="d-block w-100" alt="NOT PICTURE">';
    html+=           '</div>';
    html+=           '<div class="carousel-item">';
    html+=             '<img src="'+sanpham.hinhanh4+'" class="d-block w-100" alt="NOT PICTURE">';
    html+=           '</div>';
    html+=           '<div class="carousel-item">';
    html+=             '<img src="'+sanpham.hinhanh5+'" class="d-block w-100" alt="NOT PICTURE">';
    html+=           '</div>';
    html+=          '</div>';
    html+=         '<button  class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">';
    html+=            '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
    html+=            '<span class="visually-hidden">Previous</span>';
    html+=          '</button>';
    html+=         '<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">';
    html+=           '<span class="carousel-control-next-icon" aria-hidden="true"></span>';
    html+=           '<span class="visually-hidden">Next</span>';
    html+=          '</button>';
    html+=       '</div>';
    html+=     '</div>';
    html+=      '<div class="tt_sp">';
    html+=        '<h3>'+sanpham.ten+'</h3>';
    html+=        '<div class="gia">';
    html+=         '<div class="gia_lv2">';
    html+=            '<del>'+sanpham.giagoc+'đ</del>';
    html+=            '<div style="float: left; margin-right: 25px;" class="giam_gia_goc_sp"><p>Giảm '+sanpham.giamgia*100+'%</p></div>';
    html+=          '</div>';
    html+=         '<div class="gia_ban">';
    html+=            '<span class="spann">'+gia_ban(sanpham)+'đ</span>';
    html+=          '</div>';
    html+=       '</div>';
    html+=       '<div class="size_lv1">';
    html+=          '<div class="size_lv2"><p>Kích Cỡ</p></div>';
    html+=          '<form name="frmMain">'
    html+=              '<select class="box_size_lv1" name="cmbChon1" value="" size="1">';
    html+=                  '<option class="box_size_lv2" name="mc1" value="1" selected>M</option>';
    html+=                  '<option class="box_size_lv2" name="mc2" value="2" >L</option>';
    html+=                  '<option class="box_size_lv2" name="mc3" value="3" >XL</option>';
    html+=                  '<option class="box_size_lv2" name="mc4" value="4">2XL</option>';
    html+=                  '<option class="box_size_lv2" name="mc5" value="5">3XL</option>';
    html+=              '</select>';
    html+=          '</form>'

    html+=       '</div>';

    html+=        '<div class="so_luong_lv1">';
    html+=          '<div class="so_luong_lv11"><p>Quý khách nhập số lượng vào ô bên dưới<p></div>';
    html+=          '<div class="so_luong_lv2"><p>Số Lượng</p></div>';
    html+=         '<div class="nut_sl"><input type="number" id="soluong"></div>';

    html+=       '</div>';

    html+=      '<div class="nut_ct_lv1">';
    html+=        '<div class="nut_ro_hang"><button onclick = "them_vao_gio_hang(\''+sanpham.masp+'\',lay_size(), \''+sanpham.hinhanh1+'\', \''+sanpham.ten+'\', \''+gia_ban(sanpham)+'\', lay_sl())">Thêm Vào Rỏ Hàng</button></div>';
    html+=         '<div class="dat_hang"><button>Đặt Hàng</button></div>';
    html+=        '</div>';
    html+=     '</div>';
    html+=       '<div id="thongtin_sp_lv1">' ;
    html+=        '<div class="thongtin_sp_lv2">';
    html+=        '<div class="ttct_sp_lv3">';
    html+=            '<h4>Chi Tiết Sản Phẩm</h4>';
    html+=       '</div>';
    html+=        '<div class="xx_lv3">';
    html+=           '<p>Xuất xứ: VIỆT NAM</p>';
    html+=           '<p>Chất liệu: Cotton</p>';
    html+=           '<p>Kiểu dáng: Unisex</p>';
    html+=       '</div>';

    html+=       '<div class="ttct_sp_lv3">';
    html+=           '<h4>Mô Tả Sản Phẩm</h4>';
    html+=       '</div>';
    html+=        '<div class="xx_lv3">';
    html+=           '<p>COLOR : picture <br>';
    html+=            'MATERIAL: 100% COTTON <br>';
    html+=            '-----------------';
    html+=            'Đây là mẫu sản phẩm trong bộ sưu tập NEW S/S 2020 Collection. Phiên bản XL LOGO với chất liệu vải được nâng cấp, cảm hứng thiết kế từ Basic với phối màu trendy, trung tính phù hợp với mọi outfit. <br>';
    html+=           'Hệ thống size Chart nâng lên 5 size cho các bạn lựa chọn : 0/1/2/3/4. <br>';
    html+=            'Form áo được Fit size theo form và tiêu chuẩn tương đối của người Việt Nam, nếu bạn đang cân nhắc giữa hai size, nên chọn size lớn hơn. <br>';
    html+=           'size 0 : Dưới 1m65, Cân Nặng Dưới 55 kg <br>';
    html+=            ' Size 1 : Chiều Cao Từ 1m65 , Cân Nặng trên 55 kg <br>';
    html+=           'Size 2 : Chiều Cao từ 1m65-  1 m 72, Cân Nặng Dưới 65 kg <br>';
    html+=          'Size 3 : Chiều Cao từ 1m70-  1m77 , Câng Nặng Dưới 80 kg <br>';
    html+=           'Size 4 : Chiều Cao Trên 1m72, Cân Nặng dưới 95kg  <br>';
        
    html+=           '*Điều kiện đổi hàng <br>';
        
    html+=            '- Chỉ nhận đổi sản phẩm khi có trường hợp khách yêu cầu đổi size, phát sinh lỗi từ nhà sản xuất (ố màu, phai màu, lỗi chất liệu, lỗi đường may,...) hoặc giao nhầm sản phẩm. <br>';
          
    html+=            '- Sản phẩm đổi phải chưa qua sử dụng, chưa qua giặt tẩy, không bị vấy bẩn, ám mùi, còn giữ nguyên hóa đơn mua hàng và nhãn mác, sản phẩm đổi phải còn nguyên quà tặng kèm (nếu có). <br>';
                
    html+=           '- Sản phẩm đổi phải có giá trị tương đương hoặc cao hơn sản phẩm được đổi. Vui lòng thanh toán chi phí chênh lệch giá trị sản phẩm nếu có. <br>';
                
    html+=          '*Khách hàng vui lòng đọc kỹ Điều kiện đổi hàng và cung cấp video unbox cho nhân viên trong vòng 7 ngày kể từ khi nhận được hàng,  lưu ý kiểm tra kỹ sản phẩm trước khi đổi.</p>';
                
    // html+=       '</div>';
    // html+=        '<div class="ttct_sp_lv4">';
    // html+=           '<p>CHEESE @facebook/ChiVanDo</p>';
    // html+=       '</div>';
    // html+=        '</div>';
    html+=   '</div>';
    html+='</div>';
    return html;
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
            var htmlsp = chitiet_sphtml(sp_canlay);
            html += htmlsp; 
        }      
    } 
    html +='</div>';
    
    var nodeSp = document.getElementById('san_pham_lv1');
    nodeSp.innerHTML = html;

    var htmll = '<div id="quangcao" style="display: none;"><img src="logo.jpg" alt=""></div>'; // tat quang cao
    var nodespp = document.getElementById('quangcao');
    nodespp.innerHTML = htmll;
}


// tao doi tuong trong gio hang
function lay_sl(){ // khi click vao ham nay se lay thong tin cua input
    var nodesl = document.getElementById('soluong');
    var sl = parseInt(nodesl.value);
    return sl;
}

function lay_size(){
    var size, value1;
    value1 = frmMain.cmbChon1.value;
    if(value1 == 1){
        size = 'M';
    }
    if(value1 == 2){
        size = 'L';
    }
    if(value1 == 3){
        size = 'XL';
    }
    if(value1 == 4){
        size = '2XL';
    }
    if(value1 == 5){
        size = '3XL';
    }
    return size;
}


function taosanphamtronggiohang(idsp, hinhanh , ten , gia){
    var item = new Object();
    item.idsp = idsp;
    item.soluong = lay_sl();
    item.size = lay_size();
    item.hinhanh = hinhanh;
    item.ten = ten;
    item.gia = gia;
    return item;
}


function laydsspgiohang(){
    var dsspgiohang = new Array();
    //b1 lay chuoi json luu trong local
    var jsondssp = localStorage.getItem(key_giohang);
    //b2 chuyen tu json qua dssgiohang
    if(jsondssp != null)
        dsspgiohang = JSON.parse(jsondssp);
    return dsspgiohang;
}

function luudsvaolocal(dsgiohang){
    var json = JSON.stringify(dsgiohang);
    localStorage.setItem(key_giohang, json);
}

// xóa sản phẩm do người bán hàng muốn xóa
function xoa_sp_ban(idsp){
    alert('masp'+idsp);
    
    var jsdssp = localStorage.getItem(key_dssp); 
    var dssp1 = JSON.parse(jsdssp);
    var len = dssp1.length;
    var pos;
    
    console.log(dssp1);
    console.log(len);

    for(var i = 0 ; i  < len ; i++){
        if(dssp1[i] != null && dssp1[i].masp == idsp ){
            console.log('id san pham can xoa' +dssp1[i].masp);
            pos = i;
        } 
    }

    for(var i = pos ; i < len ; i++){
        dssp1[i] = dssp1[i+1];
    }
    len--;


    //luu lai dssp sau khi xoa vao local
    for(var i = 0 ; i < len ; i++){
        // them lai sp vao local
        var json = JSON.stringify(dssp1);
        localStorage.setItem(key_dssp, json);
    }
    location.reload(); // tu dong loading lai trang web khi xoa 1 sp

}



function tao_doi_tuong_matkhau(){
    
}








