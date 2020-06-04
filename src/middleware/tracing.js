var initJaegerTracer = require('jaeger-client').initTracerFromEnv

function initTracer(serviceName) {
  const config = {
    serviceName: serviceName,
    sampler: {
      type: 'const',
      param: 100
    }
  }
  const options = {
    logger: {
      info: function logInfo(msg) {
        console.log('INFO ', msg)
      },
      error: function logError(msg) {
        console.log('ERROR', msg)
      }
    }
  }
  return initJaegerTracer(config, options)
}
module.exports = initTracer
