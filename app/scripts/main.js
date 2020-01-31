require.config({
  paths : {
      "jquery" : "/bower_components/jquery/dist/jquery",
      "bootstrap" : "/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap",
      "angular" : "/bower_components/angular/angular",
      "angularAnimate" : "/bower_components/angular-animate/angular-animate",
      "angularCookies" : "/bower_components/angular-cookies/angular-cookies",
      "angularResource" : "/bower_components/angular-resource/angular-resource",
      "angularRoute" : "/bower_components/angular-route/angular-route",
      "angularAanitize" : "/bower_components/angular-sanitize/angular-sanitize",
      "angularTouch" : "/bower_components/angular-touch/angular-touch",
      "angularAMD" : "/bower_components/angularAMD/angularAMD",
      "ngLoad" : "/bower_components/angularAMD/ngload",
      "angularUiRouter" : "/bower_components/angular-ui-router/release/angular-ui-router",
      "angularCSS": "/bower_components/angular-css/angular-css"
  },
  shim : {
      "jquery" : {
          experts : "jquery",
      },
      "bootstrap" : {
          deps : ["jquery"],
      },
      "angular" : {
          experts : "angular",
      },
      "angularAnimate" : {
          deps : ["angular"],
      },
      "angularCookies" : {
          deps : ["angular"],
      },
      "angularResource" : {
          deps : ["angular"],
      },
      "angularRoute" : {
          deps : ["angular"],
      },
      "angularAanitize" : {
          deps : ["angular"],
      },
      "angularTouch" : {
          deps : ["angular"],
      },
      "angularUiRouter" : {
          deps : ["angular"],
          experts : "angularUiRouter"
      },
      "angularAMD" : {
          deps : ["angular"],
          experts : "angularAMD",
      },
      "angularCSS" : {
          deps : ["angular"],
      },
      "ngLoad" : {
          deps : ["angularAMD"],
          experts : "ngLoad"
      }
  },
  deps : ['app']
});
