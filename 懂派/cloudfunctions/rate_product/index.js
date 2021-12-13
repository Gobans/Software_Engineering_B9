// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    if (event.product_id == undefined) {

        // 返回执行结果
        var result = {}
        result.errCode = 2
        result.errMsg = '未传必要参数，请重试'

        var data = {}
        result.data = data

        return result

    }

    // 实例化数据库
    const db = cloud.database()

    var product;
    await db.collection('product')
        .where({
            product_id: parseInt(event.product_id) 
        })
        .get()
        .then(res => {
            console.log('查询关系成功')
            console.log(res.data)
            product = res.data[0]
        })


    /** 为该产品修改评分 start */
    await db.collection('product')
        .where({
            product_id: parseInt(product.product_id)
        })
        .update({
            data: {
                product_score: (product.product_score * product.evaluation_cnt + event.score*2) / (product.evaluation_cnt + 1),
                evaluation_cnt: product.evaluation_cnt + 1
            }
        })
        .then(res => {
            console.log('评分成功')
            console.log(res)
        })
    /** 为该产品修改评分 end */

    /** 增加evaluation记录 start */

    to_add_data = {

        //产品id
        product_id: parseInt(event.product_id), 

        //评价者的id
        user_id: wxContext.OPENID,

        //评价的日期
        evaluation_date: new Date(),

        //评价的内容
        evaluation_content: event.comment,

        //评价的分数
        evaluation_score: event.score
    }


    //连接数据库
    await db.collection('evaluation')
        .add({
            data: to_add_data
        })
        .then(res => {

            console.log('新增成功')
            console.log(res)

            add_result = res._id
        })
    /** 增加evaluation记录 end */

    var result = {}

    result.errCode = 0
    result.errMsg = '评分成功'

    var data = {}
    data.product = product
    result.data = data
    return result

}