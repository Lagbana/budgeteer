import { app } from './app'
import { IConfig } from './typing'


const config: IConfig = {
  port: Number(process.env.PORT) || 8080
}

app.listen(config.port, () => {
  console.log(`App running on port ${config.port}!`)
})
