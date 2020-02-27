$("#newick_export_modal").on("show.bs.modal", function(e) {
  $('textarea[id$="nwk_export_spec"]').val(
    tree.get_newick(function(node) {
      var tags = [];
      selection_set.forEach(function(d) {
        if (node[d]) {
          tags.push(d);
        }
      });
      if (tags.length) {
        return "{" + tags.join(",") + "}";
      }
      return "";
    })
  );
});

var percent_formatter = d3.format(".2f"),
  max_bootstrap_stroke_width = 7;

function bootstrap_edge_styler(bootstrap) {
  var bs_delimiter = "/";
  return function(element, data) {
    if (!d3.layout.phylotree.is_leafnode(data.target)) {
      if (data.target.bootstrap_values) {
        var bootstrap_value =
            data.target.bootstrap_values.split(bs_delimiter)[1].indexOf(".") >
            -1
              ? +data.target.bootstrap_values.split(bs_delimiter)[1] * 100
              : +data.target.bootstrap_values.split(bs_delimiter)[1],
          stroke_width =
            1 + (max_bootstrap_stroke_width - 1) * (bootstrap_value / 100);
        var max_lrt_val = tree
            .get_nodes()
            .map(node => node.bootstrap_values)
            .filter(node => node)
            .map(data_string => +data_string.split(bs_delimiter)[1])
            .reduce((a, b) => Math.max(a, b), 0),
          lrt_value = +data.target.bootstrap_values.split(bs_delimiter)[0];
        if (!bootstrap) {
          stroke_width =
            1 +
            (max_bootstrap_stroke_width - 1) *
              (+data.target.bootstrap_values.split(bs_delimiter)[0] /
                max_lrt_val);
        }
        element.style("stroke-width", stroke_width);
        element.on("mousemove", function() {
          d3.select("#tree_tooltip")
            .style("display", "block")
            .style("left", d3.event.pageX + 5 + "px")
            .style("top", d3.event.pageY - 25 + "px")
            .html(
              "<b>Bootstrap value:</b><p>" +
                percent_formatter(bootstrap_value) +
                "%</p><br/><b>SH-aLRT value:</b><p>" +
                lrt_value +
                "</p>"
            );
        });
        element.on("mouseout", function(e) {
          d3.select("#tree_tooltip").style("display", "none");
        });
      }
    }
    edge_colorizer(element, data);
  };
}

$("#newick_file").on("change", function(e) {
  var files = e.target.files; // FileList object

  if (files.length == 1) {
    var f = files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
      var split_filename = f.name.split("."),
        extension = split_filename[split_filename.length - 1],
        has_bootstrap_values = extension == "treefile";
      var res = d3.layout.newick_parser(e.target.result, has_bootstrap_values);

      if (res["json"]) {
        if (!("children" in res["json"])) {
          res["error"] = "Empty tree";
        }
      }

      var warning_div = d3
        .select("#main_display")
        .insert("div", ":first-child");
      if (res["error"]) {
        warning_div
          .attr("class", "alert alert-danger alert-dismissable")
          .html(
            "<strong>Newick parser error for file " +
              f.name +
              ": </strong> In file " +
              res["error"]
          );
      } else {
        default_tree_settings();
        tree(res);
        if (extension == "treefile") {
          $("#bootstrap-toggle").show();
          tree.style_edges(bootstrap_edge_styler(true));
          $(".veme").on("change", function(e) {
            var is_bootstrap = $(this).data("thickness") == "bootstrap";
            tree.style_edges(bootstrap_edge_styler(is_bootstrap)).update();
          });
        }
        selection_set =
          tree.get_parsed_tags().length > 0
            ? tree.get_parsed_tags()
            : ["Foreground"];
        selection_set.forEach((d, i) => update_selection_names(i));
        current_selection_name = selection_set[0];
        update_selection_names(0);
        tree
          .svg(svg)
          .options({ "include-bl-title": !has_bootstrap_values })
          .layout();
        warning_div
          .attr("class", "alert alert-success alert-dismissable")
          .html("Loaded a tree from  file <strong>" + f.name + ": </strong>");
      }
      warning_div
        .append("button")
        .attr("type", "button")
        .attr("class", "close")
        .attr("data-dismiss", "alert")
        .attr("aria-hidden", "true")
        .html("&times;");
    };

    reader.readAsText(f);
  }
});

$("#display_tree").on("click", function(e) {
  tree.options({ branches: "straight" }, true);
});

$("#mp_label").on("click", function(e) {
  tree.max_parsimony(true);
});

$("[data-direction]").on("click", function(e) {
  // console.log(tree.spacing_y())
  // tree.spacing_y(tree.spacing_y() + 1).update()

  var which_function =
    $(this).data("direction") == "vertical" ? tree.spacing_x : tree.spacing_y;
  which_function(which_function() + +$(this).data("amount")).update();
});

$(".phylotree-layout-mode").on("change", function(e) {
  if ($(this).is(":checked")) {
    if (tree.radial() != ($(this).data("mode") == "radial")) {
      tree
        .radial(!tree.radial())
        .placenodes()
        .update();
    }
  }
});

$("#toggle_animation").on("click", function(e) {
  var current_mode = $(this).hasClass("active");
  $(this).toggleClass("active");
  tree.options({ transitions: !current_mode });
});

$(".phylotree-align-toggler").on("change", function(e) {
  if ($(this).is(":checked")) {
    if (tree.align_tips($(this).data("align") == "right")) {
      tree.placenodes().update();
    }
  }
});

$(".phylotree-align-left").on("click", function(e) {
  // if ($(this).is(":checked")) {
  //   if (tree.align_tips($(this).data("align") == "right")) {
  //     tree.placenodes().update();
  //   }
  // }

  console.log("left");
});

$(".phylotree-align-right").on("click", function(e) {
  // if ($(this).is(":checked")) {
  //   if (tree.align_tips($(this).data("align") == "right")) {
  //     tree.placenodes().update();
  //   }
  // }
  console.log("right");
});

function sort_nodes(asc) {
  tree.traverse_and_compute(function(n) {
    var d = 1;
    if (n.children && n.children.length) {
      d += d3.max(n.children, function(d) {
        return d["count_depth"];
      });
    }
    n["count_depth"] = d;
  });
  tree.resort_children(function(a, b) {
    return (a["count_depth"] - b["count_depth"]) * (asc ? 1 : -1);
  });
}

$("#sort_original").on("click", function(e) {
  tree.resort_children(function(a, b) {
    return a["original_child_order"] - b["original_child_order"];
  });
});

$("#sort_ascending").on("click", function(e) {
  sort_nodes(true);
});

$("#sort_descending").on("click", function(e) {
  sort_nodes(false);
});

$("#and_label").on("click", function(e) {
  tree.internal_label(function(d) {
    return d.reduce(function(prev, curr) {
      return curr[current_selection_name] && prev;
    }, true);
  }, true);
});

$("#or_label").on("click", function(e) {
  tree.internal_label(function(d) {
    return d.reduce(function(prev, curr) {
      return curr[current_selection_name] || prev;
    }, false);
  }, true);
});

$("#filter_add").on("click", function(e) {
  tree
    .modify_selection(
      function(d) {
        return d.tag || d[current_selection_name];
      },
      current_selection_name,
      false,
      true
    )
    .modify_selection(
      function(d) {
        return false;
      },
      "tag",
      false,
      false
    );
});

$("#filter_remove").on("click", function(e) {
  tree.modify_selection(function(d) {
    return !d.tag;
  });
});

$("#select_all").on("click", function(e) {
  tree.modify_selection(function(d) {
    return true;
  });
});

$("#select_all_internal").on("click", function(e) {
  tree.modify_selection(function(d) {
    return !d3.layout.phylotree.is_leafnode(d.target);
  });
});

$("#select_all_leaves").on("click", function(e) {
  tree.modify_selection(function(d) {
    return d3.layout.phylotree.is_leafnode(d.target);
  });
});

$("#select_none").on("click", function(e) {
  tree.modify_selection(function(d) {
    return false;
  });
});

$("#clear_internal").on("click", function(e) {
  tree.modify_selection(function(d) {
    return d3.layout.phylotree.is_leafnode(d.target)
      ? d.target[current_selection_name]
      : false;
  });
});

$("#clear_leaves").on("click", function(e) {
  tree.modify_selection(function(d) {
    return !d3.layout.phylotree.is_leafnode(d.target)
      ? d.target[current_selection_name]
      : false;
  });
});

$("#display_dengrogram").on("click", function(e) {
  tree.options({ branches: "step" }, true);
});

//    phylotree.modify_selection = function (callback, attr, place, skip_refresh, mode) {

$("#branch_filter").on("input propertychange", function(e) {
  var filter_value = $(this).val();

  var rx = new RegExp(filter_value, "i");

  tree.modify_selection(function(n) {
    return (
      filter_value.length &&
      tree
        .branch_name()(n.target)
        .search(rx) != -1
    );
  }, "tag");
});

$("#validate_newick").on("click", function(e) {
  var res = d3.layout.newick_parser($('textarea[id$="nwk_spec"]').val(), true);
  if (res["error"] || !res["json"]) {
    var warning_div = d3
      .select("#newick_body")
      .selectAll("div  .alert-danger")
      .data([res["error"]]);
    warning_div.enter().append("div");
    warning_div
      .html(function(d) {
        return d;
      })
      .attr("class", "alert-danger");
  } else {
    default_tree_settings();
    tree(res)
      .svg(svg)
      .layout();
    $("#newick_modal").modal("hide");
  }
});

function default_tree_settings() {
  tree = d3.layout.phylotree();
  tree.branch_length(null);
  tree.branch_name(null);
  tree.node_span("equal");
  tree.options({ "draw-size-bubbles": false }, false);
  //tree.radial (true);
  tree.style_nodes(node_colorizer);
  tree.style_edges(edge_colorizer);
  tree.selection_label(current_selection_name);
  tree.node_circle_size(undefined);
  tree.radial(false);
}

function update_controls() {
  // $("[data-mode='" + (tree.radial() ? "radial" : "linear") + "']").click();
  //$("[data-align='" + (tree.align_tips() ? "right" : "left") + "']").click();
  //console.log("tree.align_tips()")
}

function node_colorizer(element, data) {
  try {
    var count_class = 0;

    selection_set.forEach(function(d, i) {
      if (data[d]) {
        count_class++;
        element.style(
          "fill",
          color_scheme(i),
          i == current_selection_id ? "important" : null
        );
      }
    });

    if (count_class > 1) {
    } else {
      if (count_class == 0) {
        element.style("fill", null);
      }
    }
  } catch (e) {}
}

function edge_colorizer(element, data) {
  //console.log (data[current_selection_name]);
  try {
    var count_class = 0;

    selection_set.forEach(function(d, i) {
      if (data[d]) {
        count_class++;
        element.style(
          "stroke",
          color_scheme(i),
          i == current_selection_id ? "important" : null
        );
      }
    });

    if (count_class > 1) {
      element.classed("branch-multiple", true);
    } else if (count_class == 0) {
      element.style("stroke", null).classed("branch-multiple", false);
    }
  } catch (e) {}
}

var valid_id = new RegExp("^[\\w]+$");

$("#selection_name_box").on("input propertychange", function(e) {
  var name = $(this).val();

  var accept_name = selection_set.indexOf(name) < 0 && valid_id.exec(name);

  d3.select("#save_selection_button").classed(
    "disabled",
    accept_name ? null : true
  );
});

$("#selection_rename > a").on("click", function(e) {
  d3.select("#save_selection_button")
    .classed("disabled", true)
    .on("click", function(e) {
      // save selection handler
      var old_selection_name = current_selection_name;
      selection_set[current_selection_id] = current_selection_name = $(
        "#selection_name_box"
      ).val();

      if (old_selection_name != current_selection_name) {
        tree.update_key_name(old_selection_name, current_selection_name);
        update_selection_names(current_selection_id);
      }
      send_click_event_to_menu_objects(
        new CustomEvent(selection_menu_element_action, {
          detail: ["save", this]
        })
      );
    });

  d3.select("#cancel_selection_button")
    .classed("disabled", false)
    .on("click", function(e) {
      // save selection handler
      $("#selection_name_box").val(current_selection_name);
      send_click_event_to_menu_objects(
        new CustomEvent(selection_menu_element_action, {
          detail: ["cancel", this]
        })
      );
    });

  send_click_event_to_menu_objects(
    new CustomEvent(selection_menu_element_action, { detail: ["rename", this] })
  );
  e.preventDefault();
});

$("#selection_delete > a").on("click", function(e) {
  tree.update_key_name(selection_set[current_selection_id], null);
  selection_set.splice(current_selection_id, 1);

  if (current_selection_id > 0) {
    current_selection_id--;
  }
  current_selection_name = selection_set[current_selection_id];
  update_selection_names(current_selection_id);
  $("#selection_name_box").val(current_selection_name);

  send_click_event_to_menu_objects(
    new CustomEvent(selection_menu_element_action, { detail: ["save", this] })
  );
  e.preventDefault();
});

$("#selection_new > a").on("click", function(e) {
  d3.select("#save_selection_button")
    .classed("disabled", true)
    .on("click", function(e) {
      // save selection handler
      current_selection_name = $("#selection_name_box").val();
      current_selection_id = selection_set.length;
      selection_set.push(current_selection_name);
      update_selection_names(current_selection_id);
      send_click_event_to_menu_objects(
        new CustomEvent(selection_menu_element_action, {
          detail: ["save", this]
        })
      );
    });

  d3.select("#cancel_selection_button")
    .classed("disabled", false)
    .on("click", function(e) {
      // save selection handler
      $("#selection_name_box").val(current_selection_name);
      send_click_event_to_menu_objects(
        new CustomEvent(selection_menu_element_action, {
          detail: ["cancel", this]
        })
      );
    });

  send_click_event_to_menu_objects(
    new CustomEvent(selection_menu_element_action, { detail: ["new", this] })
  );
  e.preventDefault();
});

function send_click_event_to_menu_objects(e) {
  $(
    "#selection_new, #selection_delete, #selection_rename, #save_selection_name, #selection_name_box, #selection_name_dropdown"
  )
    .get()
    .forEach(function(d) {
      d.dispatchEvent(e);
    });
}

function update_selection_names(id, skip_rebuild) {
  skip_rebuild = skip_rebuild || false;
  id = id || 0;

  current_selection_name = selection_set[id];
  current_selection_id = id;

  if (!skip_rebuild) {
    d3.selectAll(".selection_set").remove();

    d3.select("#selection_name_dropdown")
      .selectAll(".selection_set")
      .data(selection_set)
      .enter()
      .append("li")
      .attr("class", "selection_set")
      .append("a")
      .attr("href", "#")
      .text(function(d) {
        return d;
      })
      .style("color", function(d, i) {
        return color_scheme(i);
      })
      .on("click", function(d, i) {
        update_selection_names(i, true);
      });
  }

  d3.select("#selection_name_box")
    .style("color", color_scheme(id))
    .property("value", current_selection_name);

  tree.selection_label(selection_set[id]);
}

var width = 800, //$(container_id).width(),
  height = 800, //$(container_id).height()
  selection_set = ["Foreground"],
  current_selection_name = $("#selection_name_box").val(),
  current_selection_id = 0,
  max_selections = 10;
(color_scheme = d3.scale.category10()),
  (selection_menu_element_action = "phylotree_menu_element_action");

var tree = d3.layout
  .phylotree()
  //.phylotree("body")
  .size([width, height])
  .separation(function(a, b) {
    return 0;
  })
  .count_handler(function(count) {
    $("#selected_branch_counter").text(function(d) {
      return count[current_selection_name];
    });
    $("#selected_filtered_counter").text(count.tag);
  });

//.node_span (function (a) {if (a.children && a.children.length) return 1; return isNaN (parseFloat (a["attribute"]) * 100) ? 1 : parseFloat (a["attribute"]) * 100; });

// var tree = d3.layout
//   .phylotree("body")
//   //.size([width, height])
//   .options({
//     "left-right-spacing": "fit-to-size",
//     "top-bottom-spacing": "fit-to-size"
//   })
//   .size([500, 500]);

// var test_string =
//   "(KX538966.1_group_1:0.009555576501,(((((((((KY983583.1_group_1:0.01240011606,MF374984.1_group_1:0.01184117047):0.0007829493216,KY967359.1_group_1:0.01508396238):0.008519037304,(MN306053.1_group_1:0.01451061141,MN310478.1_group_1:0.01366445827):0.01386131028):0.003658211882,((((((KF530066.1_group_1:0.0201134113,KF530059.1_group_1:0.02194450026):0.005247626337,(KF530060.1_group_1:0.01390097706,KF530077.1_group_1:0.01469286853):0.009986934482):0.02515942109,(KF530072.1_group_1:0.009179986062,KF530080.1_group_1:0.008904349768):0.02789396866):0.008705998078,((KP198611.1_group_1:0.02650205748,KU131570.1_group_1:0.03276846494):0.003090231892,KF923906.1_group_1:0.02833354036):0.01385776292):0.009481184243,((((((AY278488.2_group_1:0.00964211911,AY278554.2_group_1:0.009594795222):0.0009905206582,AY304495.1_group_1:0.01067165696):0.002774707432,AY278487.3_group_1:0.01353105796):0.01465167974,AY613947.1_group_1:0.02875251098):0.1927003483,NC_045512.2_group_1:0.2276736686):0.1121731171,((((((((KJ156876.1_group_1:0.03039984616,KF600630.1_group_1:-0.001916925894):0.009287072102,KT156560.1_group_1:0.006276587447):0.001596502121,KP209312.1_group_1:0.007922094129):0.004323729048,KT156561.1_group_1:0.01265743903):0.004898502074,((KM015348.1_group_1:6.580536222e-06,KM210278.1_group_1:-6.580536222e-06):0.002845521515,KM210277.1_group_1:0.002925144631):0.01322798922):0.002299878178,((KC667074.1_group_1:0.01437482285,KF192507.1_group_1:0.01444134751):0.001635037556,KF600620.1_group_1:0.0152805681):0.003121717834):0.002202882456,(KF186564.1_group_1:0.002837148275,KF600636.1_group_1:-0.002837148275):0.01667105609):0.004529193427,KR011266.1_group_1:0.02575534092):0.3406671114):0.3005333791):0.02869313494,MH685718.1_group_1:0.02870069498):0.005352860279):0.00523719674,KY967356.1_group_1:0.02071673594):0.003412957175,KX538979.1_group_1:0.01566875616):0.0005357225343,KX538978.1_group_1:0.01090360706):0.00152378501,KX538970.1_group_1:0.0108955083):0.0007491304032,(KF923904.1_group_1:0.006741245849,KX538964.1_group_1:0.006017966997):0.002551689953):0.0004047829087,(KX538972.1_group_1:0.007380611897,KX538976.1_group_1:0.01066363996):0.0002682440148)";

var container_id = "#tree_container";
//var test_string = "(a : 0.1, (b : 0.11, (c : 0.12, d : 0.13) : 0.14) : 0.15)";

//window.setInterval (function () {});

var svg = d3
  .select(container_id)
  .append("svg")
  .attr("width", 800)
  .attr("height", 800);

var treeSvg = svg;

function selection_handler_name_box(e) {
  var name_box = d3.select(this);
  switch (e.detail[0]) {
    case "save":
    case "cancel":
      name_box
        .property("disabled", true)
        .style("color", color_scheme(current_selection_id));

      break;
    case "new":
      name_box
        .property("disabled", false)
        .property("value", "new_selection_name")
        .style("color", color_scheme(selection_set.length));
      break;
    case "rename":
      name_box.property("disabled", false);
      break;
  }
}

function selection_handler_new(e) {
  var element = d3.select(this);
  $(this).data("tooltip", false);
  switch (e.detail[0]) {
    case "save":
    case "cancel":
      if (selection_set.length == max_selections) {
        element.classed("disabled", true);
        $(this).tooltip({
          title: "Up to " + max_selections + " are allowed",
          placement: "left"
        });
      } else {
        element.classed("disabled", null);
      }
      break;
    default:
      element.classed("disabled", true);
      break;
  }
}

function selection_handler_rename(e) {
  var element = d3.select(this);
  element.classed(
    "disabled",
    e.detail[0] == "save" || e.detail[0] == "cancel" ? null : true
  );
}

function selection_handler_save_selection_name(e) {
  var element = d3.select(this);
  element.style(
    "display",
    e.detail[0] == "save" || e.detail[0] == "cancel" ? "none" : null
  );
}

function selection_handler_name_dropdown(e) {
  var element = d3.select(this).selectAll(".selection_set");
  element.classed(
    "disabled",
    e.detail[0] == "save" || e.detail[0] == "cancel" ? null : true
  );
}

function selection_handler_delete(e) {
  var element = d3.select(this);
  $(this).tooltip("destroy");
  switch (e.detail[0]) {
    case "save":
    case "cancel":
      if (selection_set.length == 1) {
        element.classed("disabled", true);
        $(this).tooltip({
          title:
            "At least one named selection set <br> is required;<br>it can be empty, however",
          placement: "bottom",
          html: true
        });
      } else {
        element.classed("disabled", null);
      }
      break;
    default:
      element.classed("disabled", true);
      break;
  }
}

$(document).ready(function() {
  d3.text("./data/Phylogenetic_Tree1.tree", function(error, treData) {

    default_tree_settings();
    tree(treData)
      .svg(treeSvg)
      .spacing_x(25)
      .spacing_y(50)
      //.options({"show-menu": false})
      .layout();

    // d3.json("./data/substitution-counts.json", (err, data) => {
    //   // D3 bar chart
    //   var padding = { top: 20, bottom: 20, right: 20, left: 75 },
    //     width = 400 - padding.left - padding.right,
    //     height = 610 - padding.top - padding.bottom;

    //   var svg = d3
    //     .select("#viz")
    //     .attr("width", width + padding.left + padding.right)
    //     .attr("height", height + padding.top + padding.bottom)
    //     .append("g")
    //     .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

    //   var x_scale = d3.scale
    //     .ordinal()
    //     //.domain(["Mutated", "NotMutated"])
    //     .domain(["Nonsynonymous", "Synonymous"])
    //     .rangeRoundBands([0, width], 0.3);

    //   var synonymous_counts = _.pluck(_.values(data), "synonymous_counts").reduce(
    //       (a, b) => a + b,
    //       0
    //     ),
    //     nonsynonymous_counts = _.pluck(
    //       _.values(data),
    //       "nonsynonymous_counts"
    //     ).reduce((a, b) => a + b, 0);

    //   var y_scale = d3.scale
    //     .linear()
    //     .domain([0, Math.max(synonymous_counts, nonsynonymous_counts)])
    //     .range([height, 0]);

    //   var x_axis = d3.svg
    //     .axis()
    //     .orient("bottom")
    //     .scale(x_scale);

    //   var y_axis = d3.svg
    //     .axis()
    //     .orient("left")
    //     .scale(y_scale);

    //   svg
    //     .append("g")
    //     .attr("class", "axis")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(x_axis);

    //   svg
    //     .append("g")
    //     .attr("class", "axis")
    //     .call(y_axis);

    //   var y_label_x = -35,
    //     y_label_y = height / 2;

    //   svg
    //     .append("text")
    //     .attr("x", y_label_x)
    //     .attr("y", y_label_y)
    //     .attr("transform", "rotate(-90 " + y_label_x + "," + y_label_y + ")")
    //     .attr("text-anchor", "middle")
    //     .text("Inferred substitutions");

    //   svg
    //     .selectAll(".axis-line")
    //     .data(d3.range(10, 181, 10))
    //     .enter()
    //     .append("line")
    //     .attr("x1", 1)
    //     .attr("x2", width)
    //     .attr("y1", y_scale)
    //     .attr("y2", y_scale)
    //     .attr("stroke", (d, i) => (i % 2 == 1 ? "lightgrey" : "WhiteSmoke"));

    //   svg
    //     .selectAll(".bar")
    //     .data([
    //       { category: "Nonsynonymous", value: nonsynonymous_counts },
    //       { category: "Synonymous", value: synonymous_counts }
    //     ])
    //     .enter()
    //     .append("rect")
    //     .attr("class", "bar")
    //     .attr("x", d => x_scale(d.category))
    //     .attr("y", d => y_scale(d.value))
    //     .attr("width", x_scale.rangeBand())
    //     .attr("height", d => Math.max(height - y_scale(d.value) - 1, 0))
    //     .attr("fill", d =>
    //       d.category == "Nonsynonymous" ? "pink" : "lightblue"
    //     );

    //   svg
    //     .selectAll(".update-bar")
    //     .data([
    //       { category: "Nonsynonymous", value: 0 },
    //       { category: "Synonymous", value: 0 }
    //     ])
    //     .enter()
    //     .append("rect")
    //     .attr("class", "update-bar")
    //     .attr("x", d => x_scale(d.category))
    //     .attr("y", d => y_scale(d.value))
    //     .attr("width", x_scale.rangeBand())
    //     .attr("height", d => height - y_scale(d.value))
    //     .attr("fill", d => (d.category == "Nonsynonymous" ? "red" : "blue"));

    //   // communication with d3

    //   function my_menu_title(node) {
    //     console.log(node.name);

    //     //data

    //     if (!data[node.name]) {
    //       return "Show data";
    //     }

    //     console.log(data[node.name]);
    //     //{synonymous_counts: 5, nonsynonymous_counts: 12}

    //     svg
    //       .selectAll(".update-bar")
    //       .data([
    //         {
    //           category: "Nonsynonymous",
    //           value: data[node.name].nonsynonymous_counts
    //         },
    //         { category: "Synonymous", value: data[node.name].synonymous_counts }
    //       ])
    //       .transition()
    //       .duration(500)
    //       .attr("y", d => y_scale(d.value))
    //       .attr("height", d => Math.max(height - y_scale(d.value) - 1, 0));

    //     // label
    //     return "Show data";
    //   }

    //   function runTreeMenuUpdate() {
    //     tree
    //       .get_nodes()
    //       .filter(d3.layout.phylotree.is_leafnode)
    //       .forEach(function(tree_node) {
    //         d3.layout.phylotree.add_custom_menu(
    //           tree_node, // add to this node
    //           my_menu_title, // display this text for the menu
    //           function() {
    //             // my_node_style_text(tree_node);
    //             console.log("show data is selected");
    //           },
    //           // on-click callback include a reference to tree_node via transitive closure
    //           d3.layout.phylotree.is_leafnode // condition on when to display the menu
    //           // a function that takes node as an argument
    //         );
    //       });
    //   }

    //   runTreeMenuUpdate();

    //   d3.select("#reset-button").on("click", function() {
    //     svg
    //       .selectAll(".update-bar")
    //       .data([
    //         {
    //           category: "Nonsynonymous",
    //           value: 0
    //         },
    //         { category: "Synonymous", value: 0 }
    //       ])
    //       .transition()
    //       .duration(500)
    //       .attr("y", d => y_scale(d.value))
    //       .attr("height", d => Math.max(height - y_scale(d.value) - 1, 0));

    //     default_tree_settings();
    //     tree(test_string)
    //       .svg(treeSvg)
    //       .spacing_x(20)
    //       .spacing_y(40)
    //       .layout();

    //     runTreeMenuUpdate();

    //     //update_selection_names();
    //   });
    // });

    //   $("#selection_new")
    //     .get(0)
    //     .addEventListener(
    //       selection_menu_element_action,
    //       selection_handler_new,
    //       false
    //     );
    //   $("#selection_rename")
    //     .get(0)
    //     .addEventListener(
    //       selection_menu_element_action,
    //       selection_handler_rename,
    //       false
    //     );
    //   $("#selection_delete")
    //     .get(0)
    //     .addEventListener(
    //       selection_menu_element_action,
    //       selection_handler_delete,
    //       false
    //     );
    //   $("#selection_delete")
    //     .get(0)
    //     .dispatchEvent(
    //       new CustomEvent(selection_menu_element_action, {
    //         detail: ["cancel", null]
    //       })
    //     );
    //   $("#selection_name_box")
    //     .get(0)
    //     .addEventListener(
    //       selection_menu_element_action,
    //       selection_handler_name_box,
    //       false
    //     );
    //   $("#save_selection_name")
    //     .get(0)
    //     .addEventListener(
    //       selection_menu_element_action,
    //       selection_handler_save_selection_name,
    //       false
    //     );
    //   $("#selection_name_dropdown")
    //     .get(0)
    //     .addEventListener(
    //       selection_menu_element_action,
    //       selection_handler_name_dropdown,
    //       false
    //     );
    update_selection_names();
  });
});
