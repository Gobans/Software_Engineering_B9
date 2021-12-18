// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//功能：通过用户输入的参数筛选产品，得到产品信息，根据分数排序
// 云函数入口函数
exports.main = async (event, context) => {
    // 实例化数据库连接
    const db = cloud.database()
    const MAX_LIMIT = 10
    const search_word = event.search_word


    // 定义一个数组接收查询结果
    var relate_question = [];
    
    await db.collection('answer')
    .where({
        question_title:{
          $regex:'.*'+search_word+'.*',
          $options:'1'
        }
    })
    .limit(MAX_LIMIT)
    .get()
    .then(res => {
        console.log(res)
        relate_question = res.data
      })

      var result = {}
      result.errCode = 0
      result.errMsg = '获取相关问题成功'
    
      var data = {}
      data.relate_question = relate_question
    
      result.data = data
      console.log(result)
      return result
 
}