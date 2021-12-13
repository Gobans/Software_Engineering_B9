// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    
  // 实例化数据库连接
  const db = cloud.database()

  var product;
  await db.collection('product')
  .where({
    product_id: event.product_id
  })
  .get()
  .then(res => {
    console.log('获得产品信息成功')
    product = res.data[0]
    console.log(product)
  })

  /*查询产品的评论   start*/
  var comments
  await db.collection('evaluation')
  .where({
      product_id:event.product_id
  })
  .field({
      evaluation_content:true
  })
  .orderBy('evaluation_date','desc')
  .get()
  .then(res => {
    console.log('操作成功')
    console.log(res.data)
    comments = res.data
  })

  var result = {}
  result.errCode = 0
  result.errMsg = '获取成功'

  var data = {}
  data.product = product
  data.comments = comments

  result.data = data
  console.log('result')
  console.log(result)
  
  return result
}