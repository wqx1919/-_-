module.exports = function(app) {
    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });
    app.use("/ueditor", require("./ueditor"));
    // app.use("/", require("./qidian"));
}