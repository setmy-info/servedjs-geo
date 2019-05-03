var fs = require('fs');
var uglify = require("uglify-js");

var code = {
    "servedjs-geo.js": fs.readFileSync("./src/frontend/public/js/servedjs-geo.js", "utf8")
};

var options = {
    output: {
        comments: /^!/
    }
};

fs.writeFileSync("./src/frontend/public/js/servedjs-geo.min.js", uglify.minify(code, options).code, "utf8");

fs.createReadStream("./src/frontend/public/js/servedjs-geo.js").pipe(fs.createWriteStream("./dist/servedjs-geo.js"));
fs.createReadStream("./src/frontend/public/js/servedjs-geo.min.js").pipe(fs.createWriteStream("./dist/servedjs-geo.min.js"));
