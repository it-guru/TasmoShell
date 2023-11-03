
var Josh = Josh || {};
(function(root, $, _) {
  Josh.Tasmo_rcmd = function(shell, config) {
    config = config || {};
    var _console = config.console ||
                   (Josh.Debug && root.console ? root.console : {
      log: function() {
      }
    });
    var _shell = shell;
    _shell.templates.connect = _.template("<div>"+
                                            "Connecting <%=host%> ..."+
                                            "</div>");
    _shell.templates.rcmd    = _.template("<div>"+
                                            "<span>rcmd:&nbsp; <%=rcmd%>"+
                                            "</span>"+
                                            "</div>");
    var self = {
      getNode: function(path, callback) {
        callback();
      },
      getChildNodes: function(node, callback) {
        callback([]);
      }
    };

    _shell.setCommandHandler("connect", {
      exec: connect
    });
    _shell.setCommandHandler("rcmd", {
      exec: rcmd
    });


    function connect(cmd, args, callback) {
      callback(_shell.templates.connect({host: args[0]}));
    }

    function rcmd(cmd, args, callback) {
      var rcmd=args.join(" ");
      callback(_shell.templates.rcmd({rcmd:rcmd}));
    }

    function render_ls(node, path, callback) {
      if(!node) {
        return callback(_shell.templates.not_found({cmd: 'ls', path: path}));
      }
      return self.getChildNodes(node, function(children) {
        _console.log("finish render: " + node.name);
        callback(_shell.templates.ls({nodes: children}));
      });
    }

    return self;
  };
})(this, $, _);
