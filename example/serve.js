/*
 * @Author: saber2pr
 * @Date: 2019-05-03 21:16:23
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-11-22 10:51:47
 */
const { Koa } = require("@saber2pr/koa")

Koa()
  .use(async (ctx, next) => {
    ctx.response.setHeader("access-control-allow-origin", "*")
    ctx.response.setHeader("Content-Type", "application/json")
    ctx.response.writeHead(200, {
      "Access-Control-Allow-Methods": "PUT,DELETE",
      "Access-Control-Allow-Credentials": "true"
    })

    console.log(ctx.request.url)
    console.log(ctx.request.method)

    await next()
  })
  .use(async (ctx, next) => {
    if (ctx.request.url === "/get" && ctx.request.method === "GET") {
      ctx.response.statusCode = 401
      ctx.response.end(
        JSON.stringify({
          value: "hello get"
        })
      )
    }

    if (ctx.request.url === "/post" && ctx.request.method === "POST") {
      ctx.response.end(
        JSON.stringify({
          value: "hello post"
        })
      )
    }

    if (ctx.request.url === "/put" && ctx.request.method === "PUT") {
      ctx.response.end(
        JSON.stringify({
          value: "hello put"
        })
      )
    }

    if (ctx.request.url === "/delete" && ctx.request.method === "DELETE") {
      ctx.response.end(
        JSON.stringify({
          value: "hello delete"
        })
      )
    }

    await next()
  })
  .use(async ctx => {
    ctx.response.statusCode = 404
    ctx.response.end()
  })
  .listen(3000, () => console.log("listening..."))
