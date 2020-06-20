$(() => {
  // 使用fancybox显示图片
  $("img").each(function (index) {
    var title = ' data-caption="' + $(this).attr("alt") + '"';
    var source = ' href="' + $(this).attr("src") + '"';
    $(this).wrap("<a data-fancybox" + title + source + "></a>");
  });

  // dragable
  $(() => {
    $(".draggable-toc").draggable();
    $(".draggable").draggable();
    $(".win").draggable();
  });

  // scroll to top
  $("#scroll2top").click((e) => {
    $(".post-content").animate({ scrollTop: $("#top").offset().top }, 500);
  });

  if (document.getElementById("post-content")) {
    _h2_list = document.getElementsByTagName("h2");
    _h3_list = document.getElementsByTagName("h3");
    _h_list = Array.from(_h2_list).concat(Array.from(_h3_list));
    var h_list = _h_list.sort(function (a, b) {
      return a.offsetTop - b.offsetTop;
    });
    var target = null;
    $("#post-content").scroll(() => {
      page_height = document.getElementById("post-content").scrollHeight;
      _height = document.getElementById("post-content").clientHeight;
      var height = page_height - _height;

      // progress
      temp_height = $("#post-content").scrollTop();
      var scrolled = (temp_height / height) * 100;
      document.getElementById("bar").style.width = scrolled + "%";
      $("div p span").text(scrolled.toFixed(2) + "%");

      // highlight
      len = h_list.length / 2;
      for (var i = 0; i <= len; ++i) {
        if (temp_height - h_list[i].offsetTop <= 0) {
          target = h_list[i].id;
          break;
        }
        if (temp_height - h_list[h_list.length - 1 - i].offsetTop >= 0) {
          target = h_list[h_list.length - 1 - i].id;
          break;
        }
      }
      $(".toc a span").removeClass("active");
      $('.toc a[href="#' + target + '"] span').addClass("active");
    });
  }

  // system info
  $(() => {
    var agent = navigator.userAgent;
    var os;
    if (agent.indexOf("Linux") >= 0) {
      os = '<i class="fa fa-linux" aria-hidden="true"></i>';
    } else if (agent.indexOf("Windows") >= 0) {
      os = '<i class="fa fa-windows" aria-hidden="true"></i>';
    } else if (agent.indexOf("Android") >= 0) {
      os = '<i class="fa fa-android" aria-hidden="true"></i';
    } else {
      os = navigator.platform;
    }

    var web;
    if (agent.indexOf("Firefox") >= 0) {
      web = '<i class="fa fa-firefox"></i>';
    } else if (agent.indexOf("Opera") >= 0) {
      web = '<i class="fa fa-opera" aria-hidden="true"></i>';
    } else if (agent.indexOf("Chrome") >= 0) {
      web = '<i class="fa fa-chrome" aria-hidden="true"></i>';
    } else if (agent.indexOf("Edge") >= 0) {
      web = '<i class="fa fa-edge" aria-hidden="true"></i>';
    } else {
      web = '<i class="fa fa-internet-explorer" aria-hidden="true"></i>';
    }

    var screen_info =
      '<i class="fa fa-tv"></i>: ' + screen.width + " x " + screen.height;

    $("#nav-system").html(
      "web: " + web + " | " + "OS: " + os + " | " + screen_info
    );
  });

  // time
  $(() => {
    setInterval(() => {
      var myDate = new Date();
      var year = myDate.getFullYear(); //获取当前年
      var mon = myDate.getMonth() + 1; //获取当前月
      var date = myDate.getDate(); //获取当前日
      _week = myDate.getDay();
      var weeks = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      var h = myDate.getHours(); //获取当前小时数(0-23)
      var m = myDate.getMinutes(); //获取当前分钟数(0-59)
      var s = myDate.getSeconds(); //获取当前秒

      $("#date").html(
        year +
          "年" +
          mon +
          "月" +
          date +
          "日" +
          weeks[_week] +
          " " +
          h +
          " : " +
          m +
          " : " +
          s
      );
    }, 1000);
  });

  $(() => {
    $(".category-list").addClass("ascii");
    $(".tag-list").addClass("ascii");
  });

  $(() => {
    $("#list-cloud a").wrap('<div class="ffolder small pink"></div>');
    $("#list-cloud a").width("50px");
    $("#list-cloud a").css({
      "font-size": "25px",
      color: "black",
      "text-overflow": "ellipsis",
      overflow: "hidden",
      display: "inline-block",
      "white-space": "nowrap",
    });

    $("#list-cloud a").each(function () {
      $(this).attr("title", $(this).text());
    });
  });

  $("#nav-access").click(() => {
    $(".fa-angle-down").toggle();
    $("#dropdown-content").toggle();
  });

  $("#comment-tabs").tabs();
});