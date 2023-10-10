import { NextRequest, NextResponse } from 'next/server'
import * as headers from '../../headers'

export async function GET(Request) {
  return new Response("This is GET /api/simulator/send-referral route");
}

export async function POST(req) {
  const body = await req.json()
  const apiUrl = body.apiUrl
  const apiKey = body.apiKey
  const apiSecret = body.apiSecret
  const businessUnit = body.businessUnit
  const userName = body.userName
  const fullName = body.fullName
  console.log('POST with body:', body)
  delete body.apiKey
  delete body.apiSecret
  delete body.businessUnit
  delete body.userName
  delete body.fullName
  delete body.apiUrl

  //'http://localhost:7071/api/external'
  const address = `${apiUrl}/api/external`
  console.log('POST to address:', address)
  const res = await fetch(`${apiUrl}/api/external`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      [headers.ApiKey]: apiKey,
      [headers.BusinessUnit]: businessUnit,
      [headers.UserName]: userName,
      [headers.FullName]: fullName
    },
  })
  const data = await res.json()
  console.log('POST response:', data)
  return NextResponse.json({ data })
}