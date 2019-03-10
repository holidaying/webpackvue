var gulp = require("gulp"),
	sftp = require("gulp-sftp"),
	replace = require("gulp-replace"),
	zip = require("gulp-zip"),
	tar = require("gulp-tar"),
	gzip = require("gulp-gzip"),
	path = require("path"),
	fs = require("fs"),
	moment = require("moment"),
	gulpSequence = require("gulp-sequence"),
	gulpSSH = require("gulp-ssh"),
	config = require("./publishConfig.json"),
	appsConfig = require("./buildConfig/apps");

var publishFileName;

gulp.task("copy", function() {
	var appName = process.argv[3].substring(2);
	baseUrl = path.resolve(__dirname, "./publish");
	return gulp.src(`build/**/*`).pipe(gulp.dest(`dist/${appName}`));
});

gulp.task("zip", ["copy"], function() {
	var appName = process.argv[3].substring(2);
	baseUrl = path.resolve(__dirname, "./publish");
	if (!fs.existsSync(baseUrl)) {
		fs.mkdirSync(baseUrl);
	}
	var appConfig = appsConfig[appName],
		version = appConfig.version || appName;
	return (
		gulp
			.src(`dist/${appName}*/**/*.*`)
			// .pipe(zip((publishFileName = `${version}_Build${moment().format("YYYYMMDDHH")}.zip`)))
			.pipe(tar((publishFileName = `${version}_Build${moment().format("YYYYMMDDHH")}.tar`)))
			.pipe(gzip())
			.pipe(gulp.dest("publish"))
	);
});
//上传到远程服务器任务
gulp.task("upload", function() {
	return gulp.src(path.resolve(__dirname, config.buildDir) + "/" + publishFileName).pipe(
		sftp({
			host: config.sftp.host,
			port: config.sftp.port,
			user: config.sftp.user,
			key: config.sftp.key,
			pass: config.sftp.pass,
			remotePath: config.sftp.remotePath
		})
	);
});
//解压服务器文件
gulp.task("unzip", ["upload"], function() {
	var SSH = new gulpSSH({
		ignoreErrors: false,
		sshConfig: {
			host: config.sftp.host,
			port: config.sftp.port,
			username: config.sftp.user,
			password: config.sftp.pass
		}
	});
	SSH.shell(["cd " + config.sftp.remotePath, "unzip -o " + publishFileName, "rm -rf " + publishFileName], {
		filePath: "shell.log"
	}).pipe(gulp.dest("logs"));
});

gulp.task("build", function(cb) {
	gulpSequence("webpackbuild", "zip", cb);
});

gulp.task("publish", function(cb) {
	gulpSequence("webpackbuild", "zip", "unzip", cb);
});
