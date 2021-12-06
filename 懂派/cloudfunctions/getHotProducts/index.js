// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  
  // 实例化数据库连接
  const db = cloud.database()

  // 每次至多查询多少个热词，最大值为100
  const MAX_LIMIT = 4

  // 定义一个数组接收查询结果
  var hot_products = [];

  await db.collection('product')
  .orderBy('product_score', 'desc')
  .limit(MAX_LIMIT)
  .get()
  .then(res => {

    console.log('操作成功')
    console.log(res.data)

    hot_products = res.data

  })

  var result = {}
  result.errCode = 0
  result.errMsg = '获取热门产品成功'

  var data = {}
  data.hot_products = hot_products

  result.data = data
  console.log(result)
  return result

}