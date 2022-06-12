const express = require("express");
const router = express.Router();
const conn = require("../config/db.js");

const multer = require("multer"); // multer 모듈 불러오기(파일 업로드)
const sharp = require("sharp"); // sharp 모듈 불러오기(이미지 리사이징)

var storage = multer.diskStorage({ // 업로드한 파일의 이름을 유지하기 위해서 storage 변수를 생성함
  destination(req, file, cb) {
    cb(null, "public/Uploads/"); // 파일의 저장 경로
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); // 파일의 이름이 중복되는 것을 방지하기 위해서 파일명 앞에 시간을 라벨링함
  },
});
var uploadWithOriginalFilename = multer({storage : storage});

router.get('/', function(req,res){
  res.render('upload');
});

router.post('/uploadFileWithOriginalFilename', uploadWithOriginalFilename.single('attachment'), function(req,res){ // 5

    console.log(req.file);


      sharp(req.file.path) // 파일 리사이즈 순서 파일의위치와 이름 파일이 일차적으로 저장되고 썸네일이 붙은 파일로 리사이즈 되서 재저장
      .resize(250, 250)                   // 리사이즈크기
      .jpeg({quality : 100})              
      .toFile("D:/Repo/Project/Smile/Web/public/Uploads/" + req.file.originalname)  

  res.render('confirmation', { file:req.file, files:null });
});

router.post('/uploadFilesWithOriginalFilename', uploadWithOriginalFilename.array('attachments'), function(req,res){ // 7
  res.render('confirmation', { file:null, files:req.files });
});

module.exports = router;