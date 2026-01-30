import { NextResponse } from 'next/server'
import * as headers from '../../headers'
import * as helpers from '../../helpers'

export async function POST(request) {
  const body = await request.json()
  const apiUrl = body.apiUrl
  const apiSecret = body.apiSecret
  const sender = body.sender
  const user = body.user
  const referralId = body.referralId

  console.log('Body:', body)

  //Remove apiSecret and apiUrl as both are here just
  //to make it easier testing by end user.
  //Neither MUST NOT be in request.
  delete body.apiSecret
  delete body.apiUrl
  delete body.sender
  delete body.referralId

  const method = 'POST'
  const endpoint = `/api/external/referral/${referralId}`
  const address = `${apiUrl}${endpoint}`
  console.log(`${method} to address ${address}`)

  const requestBody = JSON.stringify({
    referralId: referralId,
    user: { fullName: user.fullName }
  })

  const signature = helpers.signRequest(apiSecret, endpoint, method, requestBody);

  const response = await fetch(address, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      [headers.ApiKey]: sender.apiKey,
      [headers.BusinessUnit]: sender.businessUnit,
      [headers.UserName]: user.userName,
      [headers.Signature]: signature,
    },
    body: requestBody
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
