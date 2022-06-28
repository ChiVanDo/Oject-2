var key_giohang = 'dsitemsanpham';
function tao_idsp(){
    var id;
    id = Math.random().toString().substring(2,10) +'_'+ String(new Date().getTime()); // lấy thời gian hiện tại quy đổi thành milicecon
    return id;
}
var dssp_donhang = JSON.parse(localStorage.getItem('danhsachsp_donhang')); // tao ds mới
// duyệt các phần tử trong mảng
if(dssp_donhang==null)
    dssp_donhang = new Array();
function clicktaosp_donhang(){ // khi click vao ham nay se lay thong tin cua input
    alert('Đặt hàng thành công!');
    // truy cập các node để lấy data

    var nodeten = document.getElementById('ten');
    var ten = nodeten.value;
    nodeten.value='';

    var nodetinh = document.getElementById('tinh');
    var tinh = nodetinh.value;
    nodetinh.value='';

    var nodehuyen = document.getElementById('huyen');
    var huyen = nodehuyen.value;
    nodehuyen.value='';
    
    var nodexa = document.getElementById('xa');
    var xa = nodexa.value;
    nodexa.value='';

    var nodenha = document.getElementById('nha');
    var nha = nodenha.value;
    nodenha.value='';

    var nodesdt = document.getElementById('sdt_kh');
    var sdt = parseInt(nodesdt.value);
    nodesdt.value='';

    var nodeemail = document.getElementById('email');
    var email = nodeemail.value;
    nodeemail.value='';


    // tạo ra đối tượng data từ người dùng
    var sp = taodoituongsp_banhang(ten,tinh,huyen,xa,nha,sdt,email, null);

    tao_doituong_sp_donhang(sp.madonhang); // tao 1 mang chua cac sp trong bill co key == voi ma bill
    // đưa sp vào ds
    dssp_donhang.push(sp);
    // tiếp theo lưu trữ dssv vào local
    var json_dssp = JSON.stringify(dssp_donhang);
    localStorage.setItem('danhsachsp_donhang',json_dssp);

}
function taodoituongsp_banhang(ten,tinh,huyen,xa,nha,sdt_kh,email,madonhang){
    var sp = new Object();
         
    sp.ten = ten;
    sp.tinh = tinh;
    sp.huyen = huyen;
    sp.xa = xa;
    sp.nha = nha;
    sp.sdt = sdt_kh;
    sp.email = email;

    if(madonhang != null){
        sp.madonhang = madonhang;
    }
    else{
        sp.madonhang = tao_idsp();
    }
            //b2 viết phương thức

    sp.tojson = function(){
        var json = JSON.stringify(this);
        return json;
    }
            // từ json chuyền thành 1 đối tượng đầy đủ phương thức
            //in : json
            // out : đối tượng đầy đủ các phương thức
    return sp;
}


//===========================
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
function chuyendoituongspThanhHTML(sanpham){
    var html = '';
    html+=        '<div class="mot_sp">';
    html+=            '<div style="margin-left:100px;" class="item1">';
    html+=                '<div style="float: left;">';
    html+=                   '<img src="'+sanpham.hinhanh+'" alt="">';
    html+=               '</div>';
    html+=               '<div style="float: left;">';
    html+=                   '<p>'+sanpham.ten+'</p></>' ;
    html+=                '</div>';
    html+=            '</div>';
    html+=            '<div style="margin-left: 35px;" class="item">';
    html+=                '<p>'+sanpham.size+'</p>';
    html+=            '</div>';
    html+=           '<div style="margin-left: 35px;" class="item">';
    html+=                '<p>'+sanpham.gia+'đ</p>';
    html+=           '</div>';
    html+=           '<div class="item">';
    html+=               '<p>'+sanpham.soluong+'</p>';
    html+=           '</div>';
    html+=           '<div class="item">';
    html+=               '<p>'+sanpham.soluong * sanpham.gia+'đ</p>';
    html+=           '</div>';
    html+=           '<div class="item">';
    html+=               '<button onclick="xoa_sp_gio_hang(\''+sanpham.idsp+'\', \''+sanpham.size+'\')">Xóa</button>';
    html+=           '</div>';
    html+=       '</div>';
    return html;
}
function xoa_sp_gio_hang(idsp, size){
    var jsdssp = localStorage.getItem(key_giohang); 
    var dssp1 = JSON.parse(jsdssp);
    var len = dssp1.length;
    var pos;
    
    
    for(var i = 0 ; i  < len ; i++){
        if(dssp1[i] != null && dssp1[i].idsp == idsp && dssp1[i].size == size){
            console.log('id san pham can xoa' +dssp1[i].idsp + dssp1[i].size);
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
        localStorage.setItem(key_giohang, json);
    }
    location.reload(); // tu dong loading lai trang web khi xoa 1 sp

}

//================================= Hàm chuyển HTML của chi tiết đơn hàng
function chuyenDanhsachdoituongsanphamthanhHTML_donhang(dssp){
    var html = '';
    html+=       '<div class="nhieu_sp">';
    html+=        '<div class="data_khach_hang">';
    html+=         '<div class="table-lv1">';
    html+=             ' <h3>Thông tin khách hàng</h3>';
    html+=               '<table class="table">';
    html+=                  '<thead>';
    html+=                      '<tr>';
    html+=                           '<th scope="col">TÊN KHÁCH HÀNG</th>';
    html+=                           '<th scope="col">ĐỊA CHỈ KHÁCH HÀNG</th>';
    html+=                           '<th scope="col">SỐ ĐIỆN THOẠI</th>;'
    html+=                      '</tr>';
    html+=                  '</thead>';
    html+=                   '<tbody>';
    html+=                      '<tr>';
    html+=                           '<td>'+dssp.ten+'</td>';
    html+=                          '<td>'+dssp.tinh+','+dssp.huyen+','+dssp.xa+','+dssp.nha+'</td>';
    html+=                          ' <td>'+dssp.sdt+'</td>';
    html+=                       '</tr>';
    html+=                       '</tbody>';
    html+=                  '</table>';
    html+=       '</div>';
    html+=   '</div>';
    html+=   '</div>';
    return html;
}
// ==============HÀM CHUYỂN HTML chi tiết đơn hàng
function html_dssp_dh(sp){
    var html = '';
    html+=              '<table class="table">';
    html+=                  '<thead>';
    html+=                      '<tr>';
    html+=                          '<th scope="col">TÊN SẢN PHẨM</th>';
    html+=                          '<th scope="col">SIZE</th>';
    html+=                          '<th scope="col">SỐ LƯỢNG</th>';
    html+=                          '<th scope="col">ĐƠN GIÁ</th>';
    html+=                          '<th scope="col">TỔNG TIỀN</th>';
    html+=                       '</tr>';
    html+=                   '</thead>';
    html+=                   '<tbody>';
    html+=                       '<tr>';
    html+=                           '<td>'+sp.ten+'</td>';
    html+=                           '<td>'+sp.size+'</td>';
    html+=                           '<td>'+sp.sl+'</td>';
    html+=                           '<td>'+sp.gia+'VNĐ</td>';
    html+=                          '<td>'+sp.gia * sp.sl+'VNĐ</td>';
    html+=                      '</tr>';
    html+=                   '</tbody>';
    html+=               '</table>';
    
    return html;
}
// hiển thị chi tiết đơn hàng
function chi_tiet_sp_donhang(msp){
    var id_sp;
    id_sp = msp;
    console.log('ID SP LA: '+id_sp);
    //============== HIEN THI NUT
    document.getElementById('nut').style.display = 'block';
    document.getElementById('nut1').style.display = 'block';
    //===============Hien thi thong tin kh
    var jsonDssp = localStorage.getItem('danhsachsp_donhang');
    var dssp = JSON.parse(jsonDssp);
    var html = '';
    for(var i = 0 ; i < dssp.length ; i++){
        var sp_canlay = dssp[i];
        if(sp_canlay != null && sp_canlay.madonhang == id_sp){
            var htmlsp = chuyenDanhsachdoituongsanphamthanhHTML_donhang(sp_canlay);
            html += htmlsp; 
        }      
    } 
    var nodeSp = document.getElementById('san_pham_lv1');
    nodeSp.innerHTML = html;


    //========= hien thi dssp_dh
    var jsdssp2 = localStorage.getItem(msp); 
    var dssp2 = JSON.parse(jsdssp2);
    var sl = dssp2.length;
    var html1 = '';
    for(var i = 0 ; i < dssp2.length ; i++){
        var sp_canlay1 = dssp2[i];
        if(sp_canlay1 != null){
            var htmlsp1 = html_dssp_dh(sp_canlay1);
            html1 += htmlsp1; 
        }
    } 
    var nodeSp1 = document.getElementById('dssp');
    nodeSp1.innerHTML = html1;
    
}



//======================= // hiển thị danh sách đơn hàng
function dsspdonhang(dssp){
    var html = ''; 
    for(var i=0; i < dssp.length ; i++){
        if(dssp[i] != null){
            var sanpham= dssp[i];
            var htmlsp = mot_sp_html(sanpham);
            html += htmlsp;
        }
    }
    return html;
}

function mot_sp_html(sanpham){
    var html='';
    html+=        '<div class="mot_sp">';
    html+=           '<div id="'+sanpham.madonhang+'" style="margin-left:100px; width:1000px" class="item1">';
    html+=                '<h3>Vui lòng chuẩn bị đơn hàng có mã <'+sanpham.madonhang+'> cho đơn vị vận chuyển</h3>';
    html+=            '</div>';
    html+=            '<div class="item">';
    html+=                '<button onclick="chi_tiet_sp_donhang(\''+sanpham.madonhang+'\')">Chi tiết đơn hàng</button>';
    html+=            '</div>';
    html+=        '</div>';
    return html;
}
// tạo hiệu ứng khi đã gửi hàng
function da_gui_hang(msp){
    var jsonDssp = localStorage.getItem('danhsachsp_donhang');
    var dssp = JSON.parse(jsonDssp);
    
    for(var i = 0 ; i < dssp.length ; i++){
        var sp_canlay = dssp[i];
        if(sp_canlay != null && sp_canlay.madonhang == msp){
            document.getElementById(msp).style.background = 'green';
        }      
    } 
    alert("XÁC NHẬN ĐƠN HÀNG ĐÃ ĐƯỢC GỬI ĐI");
}

// tạo Oject của đơn hàng
function taomotsp_donhang( ten, size, sl, gia, tongtien){
    var sp = new Object();
    sp.ten = ten;
    sp.sl = sl;
    sp.gia = gia;
    sp.size =size;
    sp.tongtien = tongtien;
    return sp;
}
var dssp_dh = JSON.parse(localStorage.getItem('dssp_dh')); // tao ds mới
// duyệt các phần tử trong mảng
if(dssp_dh==null)
    dssp_dh = new Array();

// tạo hẳn 1 mảng_có key là id của đơn hàng chứa các sản phẩm của đơn hàng
function tao_doituong_sp_donhang(key_id){
    var dsspjs = localStorage.getItem('dsitemsanpham');
    var dsspoj = JSON.parse(dsspjs);
  
    for(var i = 0 ; i < dsspoj.length; i++){
        if(dsspoj[i] != null){
            var sp = taomotsp_donhang(dsspoj[i].ten,dsspoj[i].size, dsspoj[i].soluong, dsspoj[i].gia, dsspoj[i].tongtien);
            dssp_dh.push(sp);
        }
    }
    var json_sp = JSON.stringify(dssp_dh);
    localStorage.setItem(key_id,json_sp);
}

//===Rối qía nhìn không ra kk
function chuyendoituongspThanhHTML_donhang(sanpham){
    var html = '';
    html+=        '<div class="mot_sp">';
    html+=            '<div style="margin-left:100px;" class="item1">';
    html+=                '<div style="float: left;">';
    html+=                   '<img src="'+sanpham.hinhanh+'" alt="">';
    html+=               '</div>';
    html+=               '<div style="float: left;">';
    html+=                   '<p>'+sanpham.ten+'</p></>' ;
    html+=                '</div>';
    html+=            '</div>';
    html+=            '<div style="margin-left: 35px;" class="item">';
    html+=                '<p>'+sanpham.size+'</p>';
    html+=            '</div>';
    html+=           '<div style="margin-left: 35px;" class="item">';
    html+=                '<p>'+sanpham.gia+'đ</p>';
    html+=           '</div>';
    html+=           '<div class="item">';
    html+=               '<p>'+sanpham.soluong+'</p>';
    html+=           '</div>';
    html+=           '<div class="item">';
    html+=               '<p>'+sanpham.soluong * sanpham.gia+'đ</p>';
    html+=           '</div>';
    html+=       '</div>';
    return html;
}