"use client"

import styles from './page.module.css'
import { Card, CardHeader, CardBody, Spacer, Divider, ButtonGroup, Textarea } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useState } from 'react'

export default function Home() {
  const [businessUnit, setBusinessUnit] = useState("654321");
  const [apiKey, setApiKey] = useState("abcd-1234-defg-5678");
  const [apiSecret, setApiSecret] = useState("1234");
  const [referralId, setReferralId] = useState("");
  const [correlationId, setCorrelationId] = useState("");
  const [status, setStatus] = useState("")

  function onStatusRetrieve(jsonPayload) {
    console.log('jsonPayload:', jsonPayload)
    // 👇 Send a fetch request to Backend API.
    fetch("/api/simulator/status-referral", {
      method: "POST",
      body: JSON.stringify(jsonPayload),
    }).then(async response => {
      const value = await response.text()
      const json = JSON.parse(value)
      const pretty = JSON.stringify(json, null, 2)
      setStatus(pretty)
      console.log('Yeah:', pretty)
    }).catch(e => console.log(e))

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

            </CardHeader>
            <Divider />
            <CardBody>
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
              <Button type="button" color="primary" size="lg" onClick={event => onStatusRetrieve({
                businessUnit: businessUnit, apiKey: apiKey, apiSecret: apiSecret
                , userName: 'dengia', fullName: 'Denis Giacomelli', payload: { referralId: referralId }
              })}>Poizvedi</Button>
              <Spacer y={1} />
              <pre>{status}</pre>
            </CardBody>
          </Card>
          <Spacer y={1} />
          <Card>
            <CardHeader>

            </CardHeader>
            <Divider />
            <CardBody>
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
            </CardBody>
          </Card>
        </form>
      </div>
    </div>
  )
}