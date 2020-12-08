# moveup

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.

## Install

1.Install `node`  `git`  `ruby`

2.Add    `環境変数`    `NODE_PATH`  `x:\x\x\nodejs` to environment variable

3.In the `コマンド` get into `moveup-front` folder

4.Run      `npm install -g bower grunt-cli yo`         install bower and grunt

5.Run      `npm install -g generator-angular`          install angular scaffolding

6.Run      `bower install`            install bower

7.Run       `gem install compass`     install compass

8.Run       `npm install jit-grunt --save-dev`     install jit-grunt


## Build & development

Run `sudo grunt build --force` for building and `grunt serve` for preview.

## Testing 

Running `grunt test` will run the unit tests with karma.


## Trouble Shooting  



`      Warning: Running "imagemin:dist" (imagemin) task  `
`    Warning: Error: spawn /Users/xieyoujun/project/moveup-front/node_modules/jpegtran-bin/vendor/jpegtran ENOENT in file app/images/Banner/Banner_1.jpg Use --force to continue. `


try:  
npm uninstall grunt-contrib-imagemin  
npm install grunt-contrib-imagemin  

---



