const { HttpError } =  require('http-errors')

const errorMiddleware = (error, req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message || 'Internal Server Error'

  console.log(`[ERROR] - Status: ${status} - Message: ${message}`)
  res.status(status).json({ status: 'error', code: status, message })
}

module.exports = { errorMiddleware }