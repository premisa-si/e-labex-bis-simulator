import crypto from 'crypto'

//Sign request
export function signRequest(apiSecret, endpoint, method, body) {
  const message = `${endpoint}${method}${body}`
  console.log('message to sign:', message)
  return crypto
    .createHmac('sha256', padApiSecret(apiSecret))
    .update(message)
    .digest('hex')
}

//Pad ApiSecret if it's less than 64 bytes
export function padApiSecret(apiSecret) {
  let apiSecretBuffer = Buffer.from(apiSecret, 'utf8') // Convert string to Buffer
  let apiSecretPadded = Buffer.alloc(64) // Allocate a Buffer of 64 bytes, automatically filled with zeros
  apiSecretBuffer.copy(apiSecretPadded) // Copy the original key into the padded Buffer
  return apiSecretPadded
}