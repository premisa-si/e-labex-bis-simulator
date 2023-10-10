import { NextRequest, NextResponse } from 'next/server'
import * as headers from '../../headers'

// export async function POST(req) {
//   const body = await req.json()
//   const apiKey = body.apiKey
//   const apiSecret = body.apiSecret
//   const businessUnit = body.businessUnit
//   const userName = body.userName
//   const fullName = body.fullName
//   console.log('POST with body:', body)
//   delete body.apiKey
//   delete body.apiSecret
//   delete body.businessUnit
//   delete body.userName
//   delete body.fullName
  
//   const res = await fetch('http://localhost:7071/api/external', {
//     method: "POST",
//     body: JSON.stringify(body),
//     headers: {
//       "Content-Type": "application/json",
//       [headers.ApiKey]: apiKey,
//       [headers.BusinessUnit]: businessUnit,
//       [headers.UserName]: userName,
//       [headers.FullName]: fullName
//     },
//   })
//   const data = await res.json()
//   console.log('POST response:', data)
//   return NextResponse.json({ data })

//   //return new Response({"message": "This is POST /api/simulator/send-referral route"});
// }

export async function POST(request) {
  console.log('POST request:', request)
  const body = await request.json()
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

  const id = body.payload.referralId
  const res = await fetch(`http://localhost:7071/api/external/status/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      [headers.ApiKey]: apiKey,
      [headers.BusinessUnit]: businessUnit,
      [headers.UserName]: userName,
      [headers.FullName]: fullName
    }
  })
  const data = await res.json()
  console.log('GET response:', data)
  return NextResponse.json({ data })

  // return new Response("This is GET /api/simulator/status-referral route")
}