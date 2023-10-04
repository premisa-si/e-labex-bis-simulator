import { NextRequest, NextResponse } from 'next/server'

export async function GET(Request) {
  return new Response("This is GET /api/simulator/status-referral route");
}

export async function POST(req) {
  const body = await req.json()
  const apiKey = body.apiKey
  const apiSecret = body.apiSecret
  const businessUnit = body.businessUnit
  console.log('POST with body:', body)
  delete body.apiKey
  delete body.apiSecret //you should never send secret over the wire!
  delete body.businessUnit
  
  const res = await fetch('http://localhost:7071/api/external/status', {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Labex-Referral-Api-Key": apiKey,
      "Labex-Referral-Business-Unit": businessUnit 
    },
  })
  const data = await res.json()
  console.log('POST response:', data)
  return NextResponse.json({ data })

  //return new Response({"message": "This is POST /api/simulator/status-referral route"});
}