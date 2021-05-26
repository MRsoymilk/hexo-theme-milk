$(() => {
  // gitee usage
  $(() => {
    if($(location).attr("pathname").slice(0, 5) == "/blog"){
      var root_path = "/blog";
      $("body").css({
        "cursor":"url(\"" + root_path + "/cursor/normal.cur\"), auto",
        "background-image":"url(\"" + root_path + "/background.jpg" + "\")"
      });
      $("a").hover(() => {
        $("a").css("cursor", "url(\"" + root_path + "/cursor/link.cur\"), auto")
      })
    }
  })

  // resizable
  $(() => {
    $(".win-body").resizable({
      animate: true,
      minHeight: 500,
      minWidth: 1000,
      alsoResize: ".win-title"
    })
    $(".win-title").resizable({
      animate: true,
      minHeight: 50
    })
  })
  // use fancybox to show pictures
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

  // toc style
  if (document.getElementById("post-content")) {
    var _h1_list = document.getElementsByTagName("h1");
    var _h2_list = document.getElementsByTagName("h2");
    var _h3_list = document.getElementsByTagName("h3");
    var _h4_list = document.getElementsByTagName("h4");
    var _h5_list = document.getElementsByTagName("h5");
    var _h6_list = document.getElementsByTagName("h6");
    var _h_list = Array.from(_h1_list)
      .concat(Array.from(_h2_list))
      .concat(Array.from(_h3_list))
      .concat(Array.from(_h4_list))
      .concat(Array.from(_h5_list))
      .concat(Array.from(_h6_list));
    var h_list = _h_list.sort(function (a, b) {
      return a.offsetTop - b.offsetTop;
    });
    var target = null;
    $("#post-content").scroll(() => {
      page_height = document.getElementById("post-content").scrollHeight;
      _height = document.getElementById("post-content").clientHeight;
      var height = page_height - _height;

      // progress
      var temp_height = $("#post-content").scrollTop();
      var scrolled = (temp_height / height) * 100;
      document.getElementById("bar").style.width = scrolled + "%";
      $("div.draggable-toc p span").text(scrolled.toFixed(2) + "%");

      // highlight
      len = h_list.length / 2;
      for (var i = 0; i < len; ++i) {
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

  // nav-menu highlight
  $(() => {
    var title = document.title;
    if (title[0] == "[" && title[title.length - 1] == "]") {
      document.getElementById("Home").className += "active";
    } else if (title.search("Archives") == 0) {
      document.getElementById("Archives").className += "active";
    } else if (title.search("about") == 0) {
      document.getElementById("About").className += "active";
    }
  });

  // header system info
  $(() => {
    var agent = navigator.userAgent;
    var os;
    if (agent.indexOf("Linux") >= 0) {
      os = '<i class="fa fa-linux" aria-hidden="true"></i>';
    } else if (agent.indexOf("Windows") >= 0) {
      os = '<i class="fa fa-windows" aria-hidden="true"></i>';
    } else if (agent.indexOf("Android") >= 0) {
      os = '<i class="fa fa-android" aria-hidden="true"></i';
    } else if (agent.indexOf("Mac")) {
      os = '<i class="fa fa-apple" aria-hidden="true"></i>';
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
    } else if (agent.indexOf("Safari")) {
      web = '<i class="fa fa-safari" aria-hidden="true"></i>';
    } else {
      web = '<i class="fa fa-internet-explorer" aria-hidden="true"></i>';
    }

    var screen_info =
      '<i class="fa fa-tv"></i>: ' + screen.width + " x " + screen.height;

    $("#nav-system").html(
      "web: " + web + " | " + "OS: " + os + " | " + screen_info
    );
  });

  // header time
  $(() => {
    setInterval(() => {
      var myDate = new Date();
      var year = myDate.getFullYear(); // year
      var mon = myDate.getMonth() + 1; // month
      var date = myDate.getDate(); // date
      _week = myDate.getDay();
      var weeks = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      var h = myDate.getHours(); // hours(0-23)
      var m = myDate.getMinutes(); // minutes(0-59)
      var s = myDate.getSeconds(); // seconds

      $("#date").html(
        year +
          "-" +
          mon +
          "-" +
          date +
          " " +
          weeks[_week] +
          " " +
          h +
          ":" +
          m +
          ":" +
          s
      );
    }, 1000);
  });

  // ascii style
  $(() => {
    $(".category-list").addClass("ascii");
    $(".tag-list").addClass("ascii");
  });

  // tags style
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

  // header access
  $("#nav-access").click(() => {
    $(".fa-angle-down").toggle();
    $("#dropdown-content").toggle();
  });

  // comment tab page
  $("#comment-tabs").tabs();

  // code copy function
  $(() => {
    $(".hljs").prepend(
      "<div class='hljs-prompt'><i class='fa fa-files-o' aria-hidden='true'>copy</i></div>"
    );
    $(".hljs").hover(
      function () {
        _this = this;
        $(this).children(".hljs-prompt").show();
        $(this)
          .children(".hljs-prompt")
          .click(function () {
            // copy prompt
            var prompt = document.createElement("span");
            prompt.className = "Tips";
            prompt.innerHTML = "alerady copy!";
            document.body.appendChild(prompt);
            setTimeout(function () {
              document.body.removeChild(prompt);
            }, 500);

            var text = $(_this).text();
            text = text.substring(4, text.length);
            navigator.clipboard.writeText(text).then(
              function () {},
              function () {
                alert("copy failed");
              }
            );
          });
      },
      function () {
        $(this).children(".hljs-prompt").hide();
      }
    );
  });
});
