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
    const MAX_LIMIT = 10
    const search_word = event.search_word

    // 定义一个数组接收查询结果
    var relate_question = [];
    try{
        return await db.collection('question').aggregate()
        .match({
            question_content:{
              $regex:'.*'+search_word+'.*',
              $options:'1'
            }
        })
        .lookup({
          from: 'answer',
          localField: '_id',
          foreignField: 'question_id',
          as: 'ans_info',
        })
        .project({
            question_content: 1,
          //  like_cnt: 1,
            ans_info: 1
        })
       /* .sort({
            like_cnt: -1,
            ans_time: -1
        })*/
        .limit(4)
        .end()
      } catch(e){
        console.error(e)
      }
 
}