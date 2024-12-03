import { NextResponse } from 'next/server'
import * as headers from '../../headers'
import * as helpers from '../../helpers'

export async function POST(request) {
  const body = await request.json()
  const apiUrl = body.apiUrl

  console.log('POST with body:', body)

  //Remove apiUrl as it is here just
  //to make it easier testing by end user.
  delete body.apiUrl

  const method = 'POST'
  const endpoint = '/api/labex'
  const address = `${apiUrl}${endpoint}`
  console.log(`${method} to address ${address}`)

  const bodyStringified = JSON.stringify(body)

  const response = await fetch(address, {
    method: method,
    body: bodyStringified,
    headers: {
      "Content-Type": "application/json"
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