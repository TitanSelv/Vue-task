import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { formattedLeads } from './server.js'

const server = express()

server.get('/', (req, res) => {
    const app = createSSRApp({
        data: () => ({ count: 1 }),
        template: `<button @click = "count++" > {{ count }}</button >`
  })

renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `)
})
})

server.listen(3004, () => {
    console.log('ready')
})