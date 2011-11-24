var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['jQuery', 'Underscore', 'Backbone', "text!templates/app_menubar.tmpl.html", "order!libs/jquery.tmpl.min", "order!libs/jquery-ui/js/jquery-ui-1.9m6.min"], function($, _, Backbone, _view_menubar) {
  return ThreeNodes.AppMenuBar = (function() {
    function AppMenuBar() {
      this.on_menu_select = __bind(this.on_menu_select, this);
      var menu_bar_view, self;
      menu_bar_view = $.tmpl(_view_menubar, {});
      $("body").prepend(menu_bar_view);
      $("#main-menu-bar").menubar({
        select: this.on_menu_select
      });
      self = this;
      $("#main_file_input_open").change(function(e) {
        return self.context.commandMap.execute("LoadLocalFileCommand", e);
      });
    }
    AppMenuBar.prototype.on_menu_select = function(event, ui) {
      var fh, rel;
      fh = this.context.injector.get("FileHandler");
      this.context.commandMap.execute("ClearWorkspaceCommand");
      if ($('a', ui.item).attr('href') === "#example") {
        rel = $('a', ui.item).attr("rel");
        $.ajax({
          url: "examples/" + rel,
          dataType: 'text',
          success: function(data) {
            return fh.load_from_json_data(data);
          }
        });
        return false;
      }
      switch (ui.item.text().toLowerCase()) {
        case "new":
          return this.context.commandMap.execute("ClearWorkspaceCommand");
        case "open":
          return $("#main_file_input_open").click();
        case "save":
          return this.context.commandMap.execute("SaveFileCommand");
        case "rebuild shaders":
          return this.context.commandMap.execute("RebuildShadersCommand");
      }
    };
    return AppMenuBar;
  })();
});