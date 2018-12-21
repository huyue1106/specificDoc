require(['gitbook'], function(gitbook) {

  var ribbon;
  var pluginConfig = {};

  function initializePlugin(config) {
    pluginConfig = config.ribbon;
  }

  function getUrl() {
    var url = pluginConfig.url;

    if (pluginConfig.appendFilepath) {
      if (url.slice(-1) != '/') {
        url = url + '/'
      }
      url = url + gitbook.state.filepath;
    }

    return url;
  }

  function getRibbon() {
    return '<a class="ribbon ' + pluginConfig.color + '" href="' +
             getUrl() + '">' + pluginConfig.text + '</a>';
  }

  function getPluginConfig() {
    return pluginConfig;
  }

  gitbook.events.bind('start', function(e, config) {
    initializePlugin(config);

    gitbook.toolbar.createButton({
      className: 'ribbon-toolbar',
      icon: 'fa ' + pluginConfig.icon,
      label: pluginConfig.text,
      position: 'right',
      onClick: function() {
        window.open(getUrl());
      }
    });
  });

  gitbook.events.bind('page.change', function() {
    $('.book .book-body .body-inner').append('<div id="feedback-wrap"><i class="fa fa-comments"></i><img src="0.png"/*tpa=https://game.gtimg.cn/images/tgideas/doc/cntimg/gitbook/wxappqrcode/0.png*/><p>扫码反馈</p></div>');
    $('#feedback-wrap').click(function(){
      $(this).toggleClass('hover');
    })
    // $('#feedback-wrap').append(getRibbon());
    // bodyInner.append(getRibbon());
    // new QRCode(document.getElementById("feedback-wrap"), "http://www.example.com/test?"+gitbook.state.filepath+'&'+gitbook.state.chapterTitle);
  });

});
