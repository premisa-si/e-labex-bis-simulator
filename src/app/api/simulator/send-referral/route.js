import { NextResponse } from 'next/server'
import * as headers from '../../headers'
import * as helpers from '../../helpers'

export async function POST(request) {
  const body = await request.json()
  const apiUrl = body.apiUrl
  const apiSecret = body.apiSecret
  const sender = body.sender

  console.log('POST with body:', body)
  console.log('idQuestionnaire:', body.payload.idQuestionnaire)
  if (body.payload.idQuestionnaire === null || body.payload.idQuestionnaire === '')
    delete body.payload.idQuestionnaire

  console.log('idQuestionnaire-after:', body.payload.idQuestionnaire)

  //Remove apiSecret and apiUrl as both are here just
  //to make it easier testing by end user.
  //Neither MUST NOT be in request.
  delete body.apiSecret
  delete body.apiUrl
  delete body.sender

  const method = 'POST'
  const endpoint = '/api/external'
  const address = `${apiUrl}${endpoint}`
  console.log(`${method} to address ${address}`)

  const bodyStringified = JSON.stringify(body)
  const signature = helpers.signRequest(apiSecret, endpoint, method, bodyStringified);

  const response = await fetch(address, {
    method: method,
    body: bodyStringified,
    headers: {
      "Content-Type": "application/json",
      [headers.ApiKey]: sender.apiKey,
      [headers.BusinessUnit]: sender.businessUnit,
      [headers.UserName]: sender.userName,
      [headers.Signature]: signature,
    },
  })
  const data = await response.json()
  console.log('Response:', data)
  return new NextResponse(JSON.stringify({ data }), {
    status: response.status,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}