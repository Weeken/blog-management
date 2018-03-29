const router = require('koa-router')()
const { uploadFile } = require('../utils/uploadImg')
const path = require('path')
const qiniu = require("qiniu")

//需要填写你的 Access Key 和 Secret Key
const ACCESS_KEY = '_LNBwZDWvhuQCM74BoxFr9Q1nlrZZ39m6ECy82I_'
const SECRET_KEY = 'lw28LW3Cb4SRRDkmirB0svgzYH3jp5wV9kcejm04'
const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY)


//要上传的空间
bucket = 'weeken'
//上传到七牛后保存的文件名
key = `${Math.random().toString(16).substr(2)}.jpg`

//构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
function uptoken(bucket, key) {
  let options = {
    scope: bucket,
    expires: 600,
    // callbackUrl: 'http://api.example.com/qiniu/upload/callback',
    callbackBody: 'key=$(key)&hash=$(etag)&bucket=$(bucket)&fsize=$(fsize)&name=$(x:name)'
  }
  let putPolicy = new qiniu.rs.PutPolicy(options)
  return putPolicy.uploadToken(mac)
}

router.get('/v1/api/token', async (ctx, next) => {
  ctx.body = {
    token: uptoken(bucket, key)
  }
})

// router.post('/upload', async (ctx, next) => {
//   // 上传文件请求处理
//   let result = { success: false }
//   let serverFilePath = path.resolve(__dirname, '../public/images')
//   // 上传文件事件
//   result = await uploadFile(ctx, {
//     fileType: 'album', // common or album
//     path: serverFilePath
//   })
//
//   ctx.body = result
// })


module.exports = router
