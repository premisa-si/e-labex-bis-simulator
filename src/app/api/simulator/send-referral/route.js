import { NextRequest, NextResponse } from 'next/server'
import * as headers from '../../headers'
import crypto from 'crypto'

export async function GET(Request) {
  return new Response("This is GET /api/simulator/send-referral route");
}

export async function POST(req) {
  const body = await req.json()
  const apiUrl = body.apiUrl
  const apiKey = body.apiKey
  const apiSecret = body.apiSecret
  const sender = body.sender

  console.log('POST with body:', body)

  //Remove apiSecret and apiUrl as both are here just
  //to make it easier testing by end user. They
  //MUST NOT be in request.
  delete body.apiSecret
  delete body.apiUrl
  delete body.sender

  //'http://localhost:7071/api/external'
  const method = 'POST'
  const endpoint = '/api/external'
  const address = `${apiUrl}${endpoint}`
  console.log('POST to address:', address)

  const bodyStringified = JSON.stringify(body)
  const signature = signRequest(apiSecret, endpoint, method, bodyStringified);

  const res = await fetch(address, {
    method: "POST",
    body: bodyStringified,
    headers: {
      "Content-Type": "application/json",
      [headers.ApiKey]: sender.apiKey,
      [headers.BusinessUnit]: sender.businessUnit,
      [headers.UserName]: sender.userName,
      [headers.Signature]: signature,
    },
  })
  const data = await res.json()
  console.log('POST response:', data)
  return NextResponse.json({ data })
}

function signRequest(apiSecret, endpoint, method, body) {
  const message = `${endpoint}${method}${body}`
  console.log('message:', message)
  return crypto
    .createHmac('sha256', padApiSecret(apiSecret))
    .update(message)
    .digest('hex')
}

function padApiSecret(apiSecret) {
  let apiSecretBuffer = Buffer.from(apiSecret, 'utf8') // Convert string to Buffer
  let apiSecretPadded = Buffer.alloc(64) // Allocate a Buffer of 64 bytes, automatically filled with zeros
  apiSecretBuffer.copy(apiSecretPadded) // Copy the original key into the padded Buffer
  return apiSecretPadded
}