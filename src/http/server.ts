import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifyCors from '@fastify/cors'
import { createGoalRoute } from './routes/create-goal'
import { createCompletionRoute } from './routes/create-completion'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'
require('dotenv').config()

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)

const port = process.env.PORT ? Number(process.env.PORT) : 3333

app
  .listen({
    host: '0.0.0.0',
    port: port,
  })
  .then(() => {
    // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
    console.log(`HTTP server running on port ${port}!`)
  })
