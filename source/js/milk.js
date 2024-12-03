$(() => {
  const KEY_LAYOUT = "layout";
  // setting
  function setSettings(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getSettings(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // gitee usage
  $(() => {
    if ($(location).attr("pathname").slice(0, 5) == "/blog") {
      var root_path = "/blog";
      $("body").css({
        cursor: 'url("' + root_path + '/cursor/normal.cur"), auto',
        "background-image": 'url("' + root_path + "/background.jpg" + '")',
      });
      $("a").hover(() => {
        $("a").css("cursor", 'url("' + root_path + '/cursor/link.cur"), auto');
      });
    }
  });

  // resizable
  $(() => {
    $(".win-body").resizable({
      animate: true,
      minHeight: 500,
      minWidth: 1000,
      alsoResize: ".win-title",
    });
    $(".win-title").resizable({
      animate: true,
      minHeight: 50,
    });
  });

  // dragable
  $(() => {
    $(".draggable-toc").draggable();
    $(".draggable").draggable();
    $(".win").draggable();
  });

  // scroll to top
  $(() => {
    const $sprite = $("#sprite-container");
    const $canvas = $("#sprite-canvas");
    if ($canvas.length <= 0) {
      return;
    }

    const ctx = $canvas[0].getContext("2d");
    const mouseOutAni = $sprite.data("mouse-out-ani").split(",");
    const mouseHoverAni = $sprite.data("mouse-hover-ani").split(",");
    const mouseClickAni = $sprite.data("mouse-click-ani").split(",");

    function drawFrame(imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;

        const scale = Math.min(
          $canvas.width() / imgWidth,
          $canvas.height() / imgHeight
        );

        const drawWidth = imgWidth * scale;
        const drawHeight = imgHeight * scale;

        const offsetX = ($canvas.width() - drawWidth) / 2;
        const offsetY = ($canvas.height() - drawHeight) / 2;

        ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      };
    }

    function playAnimation(frames) {
      frames.forEach((frame, index) => {
        setTimeout(() => drawFrame(frame), index * 100);
      });
    }

    function handleMouseOut() {
      playAnimation(mouseOutAni);
    }

    function handleMouseOver() {
      playAnimation(mouseHoverAni);
    }

    function handleMouseClick() {
      $(".post-content").animate({ scrollTop: $("#top").offset().top }, 500);
      playAnimation(mouseClickAni);
    }

    $canvas.on("click", handleMouseClick);
    $canvas.on("mouseover", handleMouseOver);
    $canvas.on("mouseout", handleMouseOut);

    handleMouseOut();
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
      $(".toc-text").each(function () {
        const text = $(this).text().trim();
        if (text.includes(target)) {
          // Remove 'li active' from all .toc-item elements
          $(".toc-item").removeClass("active");
          // Add 'li active' to the matched li
          $(this).closest("li").addClass("active");
          return false; // Exit loop after finding the first match
        }
      });
    });
  }

  // nav-menu highlight
  $(() => {
    var title = document.title;
    if (title.startsWith("[") && title.endsWith("]")) {
      $("#Home").addClass("active");
    } else if (title.startsWith("Archives")) {
      $("#Archives").addClass("active");
    } else if (title.startsWith("about")) {
      $("#About").addClass("active");
    } else if (title.startsWith("tags")) {
      $("#Tags").addClass("active");
    }
  });

  // header system info
  $(() => {
    var agent = navigator.userAgent;
    var os;
    if (agent.indexOf("Linux") >= 0) {
      os = '<i class="fab fa-linux" aria-hidden="true"></i>';
    } else if (agent.indexOf("Windows") >= 0) {
      os = '<i class="fab fa-windows" aria-hidden="true"></i>';
    } else if (agent.indexOf("Android") >= 0) {
      os = '<i class="fab fa-android" aria-hidden="true"></i';
    } else if (agent.indexOf("Mac")) {
      os = '<i class="fab fa-apple" aria-hidden="true"></i>';
    } else {
      os = '<i class="fab fa-meh-o" aria-hidden="true" /></i>';
    }

    var web;
    if (agent.indexOf("Firefox") >= 0) {
      web = '<i class="fab fa-firefox"></i>';
    } else if (agent.indexOf("Opera") >= 0) {
      web = '<i class="fab fa-opera" aria-hidden="true"></i>';
    } else if (agent.indexOf("Chrome") >= 0) {
      web = '<i class="fab fa-chrome" aria-hidden="true"></i>';
    } else if (agent.indexOf("Edge") >= 0) {
      web = '<i class="fab fa-edge" aria-hidden="true"></i>';
    } else if (agent.indexOf("Safari")) {
      web = '<i class="fab fa-safari" aria-hidden="true"></i>';
    } else {
      web = '<i class="fab fa-internet-explorer" aria-hidden="true"></i>';
    }

    var screen_info =
      '<i class="fas fa-desktop"></i>: ' + screen.width + " x " + screen.height;

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
      var _week = myDate.getDay();
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

      $("#date-ymd").html(year + "-" + mon + "-" + date);
      $("#date-week").html(weeks[_week]);
      $("#date-time").html(h + ":" + m + ":" + s);
    }, 1000);
  });

  // tree style
  $(() => {
    $(".category-list").addClass("tree");
    $(".tag-list").addClass("tree");
  });

  // tags style
  $(() => {
    const $tags = $("#list-cloud");
    const $tags_item = $("#list-cloud a");
    var size = $tags.data("size");
    var color = $tags.data("color");
    $tags_item.wrap('<div class="ffolder ' + size + " " + color + '"></div>');
    $tags_item.width("100%");
    $tags_item.css({
      "font-size": "25px",
      color: "black",
      "text-overflow": "ellipsis",
      overflow: "hidden",
      display: "inline-block",
      "white-space": "nowrap",
    });

    $tags_item.each(function () {
      $(this).attr("title", $(this).text());
    });
  });

  // header access
  $("#nav-access").click(function () {
    $(this).toggleClass("fa-toggle-off fa-toggle-on");
    $("#dropdown-content").toggle();
  });

  // comment tab page
  $("#comment-tabs").tabs();

  // code copy function
  $(() => {
    hljs.highlightAll();
    $("pre code").each(function () {
      const $codeBlock = $(this);

      const language = $codeBlock.attr("class").match(/language-\w+/);
      const languageType = language
        ? language[0].replace("language-", "")
        : "Unknown";
      // build bar: language copy
      const bar = `<div class="code-prompt"><span class="language">${languageType}</span><button type="button" class="copy">copy</button></div>`;
      $codeBlock.before(bar);
    });
    $(".copy").click(function () {
      const $button = $(this);
      const $codeBlock = $button.closest("pre").find("code");
      const codeText = $codeBlock.text().trim();

      navigator.clipboard
        .writeText(codeText)
        .then(function () {
          $button.text("Success!");
          setTimeout(function () {
            $button.text("Copy");
          }, 1000);
        })
        .catch(function (err) {
          setTimeout(function () {
            $button.text("Fail!");
          }, 1000);
        });
    });
  });

  // image
  $(() => {
    $("img").each(function (index) {
      // use fancybox to show image
      var title = ' data-caption="' + $(this).attr("alt") + '"';
      var source = ' href="' + $(this).attr("src") + '"';
      $(this).wrap("<a data-fancybox" + title + source + "></a>");
    });

    // change img path /img.type to http://host:port/path/to/your/img.type
    $("#post-content img").each(function (index) {
      var img = $(this);
      var imgSrc = img.attr("src");
      // judge /img.type
      var currentUrl = window.location.href;
      var slashCount = (imgSrc.match(/\//g) || []).length;
      if (slashCount === 1) {
        var newPath =
          currentUrl.replace(/[^\/]+$/, "") + imgSrc.replace("/", "");
        img.attr("src", newPath);
        var link = img.closest("a");
        if (link.length > 0) {
          link.attr("href", newPath);
        }
      }
    });

    // change img path as http://host:port/img.type to http://host:port/path/to/your/image/file
    $(".desktop-content ul li").each(function () {
      var postSourceHref = $(this)
        .find("#post-source li:last-child a")
        .attr("href");
      $(this)
        .find("img")
        .each(function () {
          var img = $(this);
          var imgSrc = img.attr("src");
          if (imgSrc && imgSrc.startsWith("/")) {
            var newSrc =
              location.href.slice(0, -1) + postSourceHref.slice(0, -1) + imgSrc;
            img.attr("src", newSrc);
            var link = img.closest("a");
            if (link.length > 0) {
              link.attr("href", newSrc);
            }
          }
        });
    });
  });

  // theme
  $(() => {
    const schemes = [
      "ayu-mirage",
      "charcoal",
      "cobalt",
      "dark-graphite",
      "default",
      "dieci",
      "dracula",
      "gotham",
      "lighthouse",
      "nord",
      "panic",
      "solarized-dark",
      "toothpaste",
    ];

    const schemeSelect = $("#scheme-select");

    schemes.forEach(function (scheme) {
      schemeSelect.append(`<option value="${scheme}">${scheme}</option>`);
    });

    schemeSelect.on("change", function () {
      const selectedScheme = $(this).val();
      $("#shceme-link").attr("href", "/css/theme/" + selectedScheme + ".css");
    });

    const highlights = [
      "1c-light",
      "a11y-dark",
      "a11y-light",
      "agate",
      "androidstudio",
      "an-old-hope",
      "arduino-light",
      "arta",
      "ascetic",
      "atom-one-dark",
      "atom-one-dark-reasonable",
      "atom-one-light",
      "brown-paper",
      "codepen-embed",
      "color-brewer",
      "dark",
      "default",
      "devibeans",
      "docco",
      "far",
      "felipec",
      "foundation",
      "github",
      "github-dark",
      "github-dark-dimmed",
      "gml",
      "googlecode",
      "gradient-dark",
      "gradient-light",
      "grayscale",
      "hybrid",
      "idea",
      "intellij-light",
      "ir-black",
      "isbl-editor-dark",
      "isbl-editor-light",
      "kimbie-dark",
      "kimbie-light",
      "lightfair",
      "lioshi",
      "magula",
      "mono-blue",
      "monokai",
      "monokai-sublime",
      "night-owl",
      "nnfx-dark",
      "nnfx-light",
      "nord",
      "obsidian",
      "panda-syntax-dark",
      "panda-syntax-light",
      "paraiso-dark",
      "paraiso-light",
      "pojoaque",
      "purebasic",
      "qtcreator-dark",
      "qtcreator-light",
      "railscasts",
      "rainbow",
      "routeros",
      "school-book",
      "shades-of-purple",
      "srcery",
      "stackoverflow-dark",
      "stackoverflow-light",
      "sunburst",
      "tokyo-night-dark",
      "tokyo-night-light",
      "tomorrow-night-blue",
      "tomorrow-night-bright",
      "vs2015",
      "vs",
      "xcode",
      "xt256",
    ];
    const highlightSelect = $("#highlight-select");

    highlights.forEach(function (highlight) {
      highlightSelect.append(
        `<option value="${highlight}">${highlight}</option>`
      );
    });

    highlightSelect.on("change", function () {
      const highlightededScheme = $(this).val();
      $("#highlight-link").attr(
        "href",
        "/lib/highlight/style/" + highlightededScheme + ".css"
      );
    });
  });

  // layout
  $(() => {
    function swapWindows(windowA, windowB) {
      const contentA = windowA.html();
      windowA.html(windowB.html());
      windowB.html(contentA);
    }

    const svgFloating = `<svg style="fill: currentColor;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M126.286 364.304v423.964a109.607 109.607 0 0 0 109.446 109.446h423.964a109.607 109.607 0 0 0 109.447-109.446V364.304a109.607 109.607 0 0 0-109.447-109.447H235.732a109.607 109.607 0 0 0-109.446 109.447z m64.285 42.428a87.75 87.75 0 0 1 87.59-87.59h339.107a87.75 87.75 0 0 1 87.59 87.59V745.84a87.75 87.75 0 0 1-87.59 87.59H278.16a87.75 87.75 0 0 1-87.59-87.59z" /><path d="M825.554 732.982V260A61.875 61.875 0 0 0 764 198.446H287a36.16 36.16 0 0 1 4.018-72.16H764A134.679 134.679 0 0 1 897.714 260v472.982a36.16 36.16 0 1 1-72.16 0z" /></svg>`;
    const svgStack = `<svg style="fill: currentColor;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M170.666667 341.333333h426.666666a85.333333 85.333333 0 0 1 85.333334 85.333334v426.666666a85.333333 85.333333 0 0 1-85.333334 85.333334H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333334V426.666667a85.333333 85.333333 0 0 1 85.333334-85.333334z m0 85.333334v426.666666h426.666666V426.666667H170.666667z m554.666666 384V341.333333a42.666667 42.666667 0 0 0-42.666666-42.666666H213.333333a85.333333 85.333333 0 0 1 85.333334-85.333334h426.666666a85.333333 85.333333 0 0 1 85.333334 85.333334v426.666666a85.333333 85.333333 0 0 1-85.333334 85.333334z m128-128V213.333333a42.666667 42.666667 0 0 0-42.666666-42.666666H341.333333a85.333333 85.333333 0 0 1 85.333334-85.333334h426.666666a85.333333 85.333333 0 0 1 85.333334 85.333334v426.666666a85.333333 85.333333 0 0 1-85.333334 85.333334z" /></svg>`;
    const svgTile = `<svg style="fill: currentColor;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M902.4 461.226667H121.6a75.093333 75.093333 0 0 1-75.093333-74.666667V167.68a74.666667 74.666667 0 0 1 75.093333-74.666667h780.8a74.666667 74.666667 0 0 1 74.666667 74.666667V388.266667a74.666667 74.666667 0 0 1-74.666667 72.96zM121.6 155.306667a11.093333 11.093333 0 0 0-11.093333 10.666666v220.586667a11.093333 11.093333 0 0 0 11.093333 10.666667h780.8a10.666667 10.666667 0 0 0 10.666667-10.666667V167.68a10.666667 10.666667 0 0 0-10.666667-10.666667l-780.8-1.706666zM385.706667 933.12H121.6a74.666667 74.666667 0 0 1-75.093333-74.666667v-221.44a75.093333 75.093333 0 0 1 75.093333-74.666666h264.106667a75.093333 75.093333 0 0 1 75.093333 74.666666v221.013334a74.666667 74.666667 0 0 1-75.093333 75.093333z m-264.106667-306.346667a11.093333 11.093333 0 0 0-11.093333 10.666667v221.013333a11.093333 11.093333 0 0 0 11.093333 10.666667h264.106667a11.093333 11.093333 0 0 0 11.093333-10.666667v-221.44a11.093333 11.093333 0 0 0-11.093333-10.666666l-264.106667 0.426666zM902.4 933.12h-264.533333a74.666667 74.666667 0 0 1-74.666667-74.666667v-221.44a75.093333 75.093333 0 0 1 74.666667-74.666666h264.533333a74.666667 74.666667 0 0 1 74.666667 74.666666v221.013334a74.709333 74.709333 0 0 1-74.666667 75.093333z m-264.533333-306.346667a10.666667 10.666667 0 0 0-10.666667 10.666667v221.013333a10.666667 10.666667 0 0 0 10.666667 10.666667h264.533333a10.666667 10.666667 0 0 0 10.666667-10.666667v-221.44a10.666667 10.666667 0 0 0-10.666667-10.666666l-264.533333 0.426666z" /></svg>`;
    const $icon = $("#layout-show .show-icon");
    const $text = $("#layout-show .show-text");

    function setLayout(next) {
      if (next == "tile") {
        $icon.html(svgTile);
      } else if (next == "floating") {
        $icon.html(svgFloating);
      } else if (next == "stack") {
        $icon.html(svgStack);
      }
      $text.text(next);
      setSettings(KEY_LAYOUT, next);
      $("#layout").removeClass().removeAttr("style");
      $("#w-content").removeClass().removeAttr("style").addClass("window");
      $("#w-tag").removeClass().removeAttr("style").addClass("window");
      $("#w-category").removeClass().removeAttr("style").addClass("window");
      if (next === "floating") {
        $("#layout").addClass("layout-floating");
        $("#w-content").addClass("f-content");
        $("#w-tag").addClass("f-tag");
        $("#w-category").addClass("f-category");

        function setRandomPosition(element) {
          const windowWidth = $(window).width();
          const windowHeight = $(window).height();
          const elemWidth = $(element).outerWidth();
          const elemHeight = $(element).outerHeight();

          const randomX = Math.random() * (windowWidth - elemWidth);
          const randomY = Math.random() * (windowHeight - elemHeight);

          $(element).css({
            left: randomX,
            top: randomY,
          });
        }

        setRandomPosition("#w-content");
        setRandomPosition("#w-tag");
        setRandomPosition("#w-category");

        $(".layout-floating .window")
          .draggable({
            containment: "window",
            start: function () {
              $(".window").css("z-index", 1);
              $(this).css("z-index", 2);
            },
          })
          .resizable();
        $(".layout-floating .window").on("click", function () {
          $(".window").css("z-index", 1);
          $(this).css("z-index", 2);
        });
      } else if (next === "stack") {
        $("#layout").addClass("layout-stack");
        $("#w-content").addClass("s-content");
        $("#w-tag").addClass("s-tag");
        $("#w-category").addClass("s-category");
        $(".layout-stack .window")
          .off("click")
          .on("click", function () {
            const zIndex3Window = $(".window").filter(function () {
              return parseInt($(this).css("z-index"), 10) === 3;
            });
            const clickedWindow = $(this);
            swapWindows(zIndex3Window, clickedWindow);
          });
      } else if (next === "tile") {
        $("#layout").addClass("layout-tile");
        $("#w-content").addClass("t-content");
        $("#w-tag").addClass("t-tag");
        $("#w-category").addClass("t-category");
        $(".layout-tile .window").on("mousedown", function () {
          currentWindow = $(this);
          $(".layout-tile").css("user-select", "none");
        });
        $(".layout-tile .window").on("mouseup", function (event) {
          const mouseX = event.pageX;
          const mouseY = event.pageY;
          let targetWindow = null;
          $(".layout-tile .window").each(function () {
            const targetPosition = $(this).offset();
            const targetWidth = $(this).outerWidth();
            const targetHeight = $(this).outerHeight();
            if (
              mouseX >= targetPosition.left &&
              mouseX <= targetPosition.left + targetWidth &&
              mouseY >= targetPosition.top &&
              mouseY <= targetPosition.top + targetHeight
            ) {
              targetWindow = $(this);
              return false;
            }
          });
          if (
            targetWindow &&
            currentWindow &&
            targetWindow[0] !== currentWindow[0]
          ) {
            swapWindows(currentWindow, targetWindow);
          }
          currentWindow = null;
          $(".layout-tile .window").removeAttr("user-select");
        });
      }
    }

    var layouts = ["tile", "floating", "stack"];
    var cachedLayout = getSettings(KEY_LAYOUT);
    if (cachedLayout == null) {
      const layout = $("#nav-layout").data("layout");
      setLayout(layout);
    } else {
      setLayout(cachedLayout);
    }
    $("#nav-layout").on("click", function () {
      var currentLayout = $(this).data("layout");
      var next = layouts[(1 + layouts.indexOf(currentLayout)) % layouts.length];
      $(this).data("layout", next);
      setLayout(next);
    });
  });

  // ffolders
  $(() => {
    // folder size
    const sizes = ["small", "medium", "big"];
    const sizeSelect = $("#size-select");
    sizes.forEach(function (scheme) {
      sizeSelect.append(`<option value="${scheme}">${scheme}</option>`);
    });
    sizeSelect.on("change", function () {
      const newSize = $(this).val();
      $("#list-cloud a").each(function () {
        const $parentDiv = $(this).parent();
        const colorClass = $parentDiv.attr("class").split(" ")[2];
        $parentDiv.attr("class", `ffolder ${newSize} ${colorClass}`);
      });
    });
    // folder color
    const colors = ["cyan", "yellow", "pink", "green", "gray"];
    const colorSelect = $("#color-select");
    colors.forEach(function (scheme) {
      colorSelect.append(`<option value="${scheme}">${scheme}</option>`);
    });
    colorSelect.on("change", function () {
      const newColor = $(this).val();
      $("#list-cloud a").each(function () {
        const $parentDiv = $(this).parent();
        const sizeClass = $parentDiv.attr("class").split(" ")[1];
        $parentDiv.attr("class", `ffolder ${sizeClass} ${newColor}`);
      });
    });
  });

  // background blur
  $(() => {
    const elementsToBlur = [
      ".archive",
      ".draggable-toc",
      ".post-content",
      ".desktop-content",
      ".desktop-category",
      ".desktop-tag",
    ];

    $blurSlider = $("#blur-slider");
    $blurValue = $("#blur-value");

    function setBlur(value) {
      $blurValue.text(value);
      $blurSlider.val(value);
      elementsToBlur.forEach((selector) => {
        $(selector).css("backdrop-filter", `blur(${value}px)`);
      });
    }

    const defaultBlur = $blurSlider.data("value");
    setBlur(defaultBlur);

    $blurSlider.on("input", function () {
      const blurValue = $(this).val();
      setBlur(blurValue);
    });
  });

  // font
  $(() => {
    var font = $("#font-check").data("check");
    if (!font) {
      $("#font-check").prop("checked", false);
    } else {
      $("#font-check").prop("checked", true);
    }
    $("#font-check").change(function () {
      if ($(this).is(":checked")) {
        $("body").css("font-family", "custom-font");
      } else {
        $("body").css("font-family", "sans-serif");
      }
    });
  });
});
