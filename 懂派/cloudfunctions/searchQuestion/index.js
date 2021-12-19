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

      var relate_question_2 = [];
//获取还没有回答的问题
      await db.collection('question')
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
          relate_question_2 = res.data
        })

      var result = {}
      result.errCode = 0
      result.errMsg = '获取相关问题成功'
    
      //将没有回答的问题点赞数设置成-1；复制_id,新增属性question_id
      for(var i = 0; i < relate_question_2.length; i++) {
        relate_question_2[i].like_cnt = -1
        relate_question_2[i].question_id = relate_question_2[i]._id
      }



      var all_question = relate_question.concat(relate_question_2)
      var data = {}
      data.relate_question = all_question
    
      result.data = data
      console.log(result)
      return result
 
}