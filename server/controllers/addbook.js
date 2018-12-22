const http = require('http')
const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {isbn,openId} = ctx.request.body

    if (isbn && openId){
        console.log("书进后台了")
        const findRes = await mysql('books').select().where('isbn',isbn)
        if(findRes.length){
            ctx.state = {
                code:-1,
                data:{
                    msg:'图书已存在'
                }
            }
            return
        }



        //http://feedback.api.juhe.cn/ISBN?sub=9787508638119&key=8384a9409bc1f7e0d64d30af88b9558c
        let url = 'http://feedback.api.juhe.cn/ISBN?sub=' + isbn + '&key=fee9ea442684f9dcf5a758c174e0a583'
        //url = "https://jsonplaceholder.typicode.com/posts/1"
        const bookinfo = await getJSON(url)
        //console.log(bookinfo.price)
        console.log("wuyi is @await")
        console.log(bookinfo)
        const {title,images_medium,images_large,publisher,summary,price,author} = bookinfo
        console.log(title)

        try{
            await mysql('books').insert({
                isbn,openId,title,images_medium,images_large,publisher,summary,price,author
            })
            ctx.state.data = {
                title,
                msg:"success"
            }
        }catch(e){
            ctx.state = {
                code:-1,
                data:{
                    msg:'新增失败'+ e.sqlMessage
                }
            }
        }

    }
}
function getJSON(url){
    return new Promise((resolve, reject) => {
        http.get(url,res => {
                res.setEncoding("utf8")
                console.log("wu yi is inside the get")
                let body = ""
                res.on("data",data =>{
                    body += data
                });
                res.on("end",() => {
                    res_bookinfo = JSON.parse(body);
                    console.log(res_bookinfo)
                
                    if(res_bookinfo.result.title){
                        console.log("wu yi at resolve")
                        resolve(res_bookinfo.result)
                    }else{
                        console.log("wu yi at reject")
                        reject(res_bookinfo.result)
                    }

                })
            })
        })
    }
