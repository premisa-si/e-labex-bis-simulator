"use client"

import styles from './page.module.css'
import { Card, CardHeader, CardBody, Spacer, Divider, ButtonGroup, Textarea } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useState } from 'react'

export default function Home() {
  const [referralId, setReferralId] = useState("");
  const [correlationId, setCorrelationId] = useState("");
  const [status, setStatus] = useState("")

  function onStatusRetrieve(jsonPayload) {
    console.log('jsonPayload:', jsonPayload)
    // 👇 Send a fetch request to Backend API.
    fetch("/api/simulator/status-referral", {
      method: "POST",
      body: JSON.stringify(jsonPayload),
      // headers: {
      //   "content-type": "application/json",
      //   "Labex-Referral-Api-Key": jsonPayload.apiKey,
      //   "Labex-Referral-Business-Unit": jsonPayload.businessUnit //"654321"
      // },
    }).then(async response => console.log('Yeah:', await response.text())).catch(e => console.log(e))

  }

  return (
    <div>
      <div className="container mx-auto">
        <p className="text-center text-sm md:text-base">
          Status Labex e-naročilnice
        </p>
        <form>
          <Card>
            <CardHeader>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-3">
                <Input
                  clearable
                  underlined
                  fullWidth
                  label="Id naročilnice"
                  variant="flat"
                  value={referralId}
                  onValueChange={setReferralId}
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-3">
                <Input
                  clearable
                  underlined
                  fullWidth
                  label="BIS referenca"
                  variant="flat"
                  value={correlationId}
                  onValueChange={setCorrelationId}
                />
              </div>
              <Button type="button" color="primary" size="lg" onClick={event => onStatusRetrieve({ referralId, correlationId })}>Poizvedi</Button>

            </CardHeader>
            <Divider />
            <CardBody>

            </CardBody>
          </Card>
        </form>
      </div>
    </div>
  )
}