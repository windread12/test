$(document).ready(function() {
  var button = $("#btn");

  // handle click and add class
  button.on("click", () => {
    $(".div-child").remove();
    $(".divempty").remove();
    $("#divTxt").text($("#txtTitle").val());
    readTxt();
  });


  $('#btnImage').on('click', function() {
    html2canvas(document.querySelector("#divGrid"), {
      onrendered: function(canvas) {
        document.body.appendChild(canvas);
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'image_' + (new Date()).format("yyyyMMddhhmmss") + '.jpg';
        a.click();
        document.body.removeChild(canvas);
      },
    });
  });


});

function readTxt() {
  var str = $("#txtInput").val().split(';');
  for (var i = 0; i < str.length; i++) {
    drawTable(str[i].trim(), (i == str.length - 1 ? 'Y' : 'N'));
  }
}

function drawTable(s, flag) {
  var c = s.split(',');
  var rowData = '';
  var table;
  if (s.length == 0)
    table = $('<table></table>').addClass('tbempty');
  else
    table = $('<table></table>').addClass('foo');

  for (var i = 0; i < 3; i++) {
    row = $('<tr></tr>');
    for (var j = 0; j < 5; j++) {
      var CurrentCell = ((5 * i) + (j + 1));
      rowData = '';
      for (var k = 0; k < c.length; k++) {
        if (c[k] < 0) {
          if (CurrentCell == Math.abs(c[k])) {
            rowData = $('<td></td>').addClass('bar').text('●');
            break;
          }
        } else if (c[k].toString().trim().substring(0, 1) == '+') {
          if (CurrentCell == 15) {
            rowData = $('<td></td>').addClass('bar').text('●');
            break;
          }
        } else {
          if (CurrentCell == (parseInt(c[k], 10) + 7)) {
            rowData = $('<td></td>').addClass('bar').text('●');
            break;
          }
        }
      }
      if (rowData == '')
        rowData = $('<td></td>').addClass('bar').text('○');
      row.append(rowData);
    }
    table.append(row);
  }



  $("#divGrid").append(
    $('<div/>')
    .addClass('div-child col-xs-3 col-sm-3 col-md-3 col-lg-3')
    .append(table));

  if (flag == 'Y') {
    $("#divGrid").append(
      $('<div/>')
      .addClass('divempty')
      .html("&nbsp;"));
  }
}

Date.prototype.format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小時
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}