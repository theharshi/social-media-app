// const home = function (req, res) {

// };
// module.exports = home;
module.exports.home = function (req, res) {
	res.render("home", { tittle: "tittle" });
};
