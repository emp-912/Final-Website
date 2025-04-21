// js/jquery.js

$(function () {
  // Hover effect on section titles
  $(".section-title").hover(
    function () {
      $(this)
        .animate({ fontSize: "2.5rem", opacity: 0.8 }, 300)
        .animate({ fontSize: "2.2rem", opacity: 1 }, 200);
    },
    function () {
      $(this).animate({ fontSize: "2rem" }, 300);
    }
  );

  // Click effect: slide up/down
  $(".section-title").click(function () {
    $(this).slideUp(150).slideDown(150);
  });

  // Double-click bounce
  $(".section-title")
    .off("dblclick")
    .dblclick(function () {
      var $el = $(this);
      $el.stop(true);
      $el
        .animate({ marginTop: "-=20px" }, 200)
        .animate({ marginTop: "+=20px" }, 200);
    });

  // jQuery autosuggest for search
  var sections = ["About Me", "Projects", "Skills", "Interests", "Contact"];
  $("#search-input")
    .attr("autocomplete", "off")
    .on("input", function () {
      var val = $(this).val().toLowerCase();
      var $ul = $("#suggestions").empty();
      if (!val) {
        $ul.hide();
        return;
      }
      var matches = sections.filter(function (s) {
        return s.toLowerCase().includes(val);
      });
      matches.forEach(function (item) {
        $("<li>")
          .addClass("list-group-item list-group-item-action")
          .text(item)
          .appendTo($ul);
      });
      matches.length ? $ul.slideDown(150) : $ul.slideUp(150);
    });

  // Click suggestion => smooth scroll
  $("#suggestions").on("click", "li", function () {
    var id = $(this).text().toLowerCase().replace(/ /g, "-");
    $("html, body").animate({ scrollTop: $("#" + id).offset().top - 60 }, 400);
    $("#suggestions").slideUp(100);
  });

  // Hide suggestions on outside click
  $(document).on("click", function (e) {
    if (!$(e.target).closest("#search-form").length) {
      $("#suggestions").slideUp(100);
    }
  });
});

// Hover highlight on interests list
$(document).ready(function () {
  $("#interest-list .list-group-item").hover(
    function () {
      $(this).addClass("bg-light");
    },
    function () {
      $(this).removeClass("bg-light");
    }
  );
});
