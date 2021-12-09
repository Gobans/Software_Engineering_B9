// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//功能：通过用户输入的参数筛选产品，得到产品信息，根据分数排序
// 云函数入口函数
exports.main = async (event, context) => {
  
    // 实例化数据库连接
    const db = cloud.database()
    const _ = db.command
    // 每次至多查询多少个热词，根据页面不同传回不同的限制
    const MAX_LIMIT = event.MAX_LIMIT
    const weightLow = event.weightLow
    const weightHigh = event.weightHigh
    const durationLow = event.durationLow
    const durationHigh = event.durationHigh
    const priceLow = event.priceLow
    const priceHigh = event.priceHigh
    const thicknessLow = event.thicknessLow
    const thicknessHigh = event.thicknessHigh
  
    // 定义一个数组接收查询结果
    var products = [];
    console.log('到这了')
    try{
        return await db.collection('product')
    .where({
        price: _.gt(priceLow),
        price: _.lt(priceHigh),
        weight: _.gt(weightLow),
        weight: _.lt(weightHigh),
        thickness: _.gt(thicknessLow),
        thickness: _.lt(thicknessHigh),
        duration: _.gt(durationLow),
        duration: _.lt(durationHigh),
    })
    .orderBy('product_score', 'desc')
    .limit(MAX_LIMIT)
    .get()
    /*
    .then(res => {
      console.log('操作成功')
      console.log(res.data)
      products = res.data
    })
    */
} catch(e){
    console.error(e)
  }
}