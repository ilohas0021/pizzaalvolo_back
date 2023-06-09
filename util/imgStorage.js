const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, process.env.IMG_PATH)
    },
    filename : function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({
    storage : storage,
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return cb(new Error('PNG, JPG 파일만 업로드 가능합니다.'));
        }
        cb(null, true)
    }
});

module.exports = upload;