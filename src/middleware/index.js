import uuid from 'uuid'
var initTracer = require('./tracing')
var opentracing = require('opentracing')
var ZipkinB3TextMapCodec = require('jaeger-client').ZipkinB3TextMapCodec
var url = require('url')

const serviceName = process.env.SERVICE_ID || 'unknown-service'
var tracer = initTracer(serviceName + '_TRACER')
// initialize tracing into expressjs
opentracing.initGlobalTracer(tracer)

if (process.env.ZIPKIN_HEADERS) {
  // using zipkin headers
  console.debug('request contains zipkin headers')
  var codec = new ZipkinB3TextMapCodec({ urlEncoding: true })
  tracer.registerInjector(opentracing.FORMAT_HTTP_HEADERS, codec)
  tracer.registerExtractor(opentracing.FORMAT_HTTP_HEADERS, codec)
}
async function trace(resolve, root, args, ctx, info) {
  // const { request: req } = ctx
  console.log(info.fieldName)
  const span = tracer.startSpan(info.fieldName)
  span.log({ event: 'request_start' })
  // // span.log({ event: 'request_received' })

  // // // DEBUG
  // // span.log(info.fieldName)

  // // // include some useful tags on the trace
  span.setTag('x_b3_traceid', uuid())
  // // span.setTag(opentracing.Tags.HTTP_METHOD, req.method)
  // span.setTag(opentracing.Tags.SPAN_KIND, 'graphql.request')
  // // // span.setTag(opentracing.Tags.HTTP_URL, req.url)
  span.setTag('graphql.args', JSON.stringify(args))
  // span.setTag('graphql.info', JSON.stringify(info))

  let result
  try {
    result = await resolve(root, args, ctx, info)
    span.setTag('graphql.result', JSON.stringify(result))
  } catch (e) {
    span.setTag('graphql.error', e)
    span.log({ event: 'error', message: e })
  }
  // span.finish()
  setTimeout(() => {
    span.finish()
    console.log("SPAN", span)
  }, 200)

  console.log(`logResult: ${JSON.stringify(result)}`)
  return result
}

module.exports = [trace]
