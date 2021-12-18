// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  
  // 实例化数据库连接
  const db = cloud.database()

  // 每次至多查询多少个回答，最大值为50
  const MAX_LIMIT = 50

  //返回结果的data
  var data = {}
  var result = {}
  var hot_answers = new Array();
  try{
    return await db.collection('answer').aggregate()
    .lookup({
      from: 'question',
      localField: 'question_id',
      foreignField: '_id',
      as: 'question_info',
    })
    .project({
      _id:1,
        ans_content: 1,
        like_cnt: 1,
        question_info: 1
    })
    .sort({
        like_cnt: -1,
        ans_time: -1
    })
    .limit(MAX_LIMIT)
    .end()
    /*
    .then(res => {
        console.log(res.list)
        hot_answers = res.list.slice(0)
        console.log(hot_answers)
        result.errCode = 0
        result.errMsg = '获取热门问答成功'
        data.hot_answers = [...hot_answers]
        result.data = data
        console.log(result)
        console.log(result)
        return result
    })*/
  } catch(e){
    console.error(e)
  }
  
    //return result
}