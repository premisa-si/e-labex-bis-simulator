"use client"

import styles from './page.module.css'
import { Card, CardHeader, CardBody, Spacer, Divider, Tooltip } from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react"

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useState } from 'react'

export default function Home() {
  const [businessUnit, setBusinessUnit] = useState("654321")
  const [userName, setUserName] = useState("uporabniskoIme")
  const [fullName, setFullName] = useState("Ime Priimek")
  const [apiUrl, setApiUrl] = useState("http://localhost:7071")
  const [apiKey, setApiKey] = useState("abcd-1234-defg-5678")
  const [apiSecret, setApiSecret] = useState("1234")

  const currentDate = new Date()
  // Format the date to yyyy-MM-dd
  const formattedDate = currentDate.toISOString().split('T')[0]
  const [statusDate, setStatusDate] = useState(formattedDate)
  const [response, setResponse] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onStatusRetrieve = async payload => {
    console.log('payload:', payload)
    try {
      const response = await fetch("/api/simulator/status-list-referral", {
        method: "POST",
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        // If response is in the 200-299 range
        const data = await response.json()
        setResponse({ status: response.status, message: 'Status', data: { ...data.data } })
      } else {
        // If response is 4xx or 5xx
        const errorData = await response.text();
        setResponse({ status: response.status, message: 'Strežnik je odgovoril z napako', data: errorData });
      }
    }
    catch (error) {
      console.log('Response - exception has been thrown, error:', error)
      //Handle network error
      setResponse({ status: 'Network Error', message: 'Napaka v povezavi', data: error.message })
    }
    setIsModalVisible(true)
  }

  return (
    <div>
      <div className="container mx-auto">
        <p className="text-center text-sm md:text-base">
          Status Labex e-naročilnice
        </p>
        <form>
          <Card>
            <CardHeader className="text-left text-xl md:text-base font-bold gap-3">
              API
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-3">
                <Input
                  clearable
                  underlined
                  fullWidth
                  label="API URL"
                  variant="flat"
                  value={apiUrl}
                  onValueChange={setApiUrl}
                />
                <Spacer y={1} />
                <Input
                  clearable
                  underlined
                  fullWidth
                  label="API Key"
                  variant="flat"
                  value={apiKey}
                  onValueChange={setApiKey}
                />
                <Spacer y={1} />
                <Input
                  name="apiSecret"
                  clearable
                  underlined
                  fullWidth
                  label="API Secret"
                  css={{ mb: '6px' }}
                  value={apiSecret}
                  onValueChange={setApiSecret}
                />
              </div>
            </CardBody>
          </Card>
          <Spacer y={1} />
          <Card>
            <CardHeader className="text-left text-xl md:text-base font-bold gap-3">
              Organizacija
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-3">
                <Input
                  clearable
                  underlined
                  fullWidth
                  label="Business Unit"
                  variant="flat"
                  value={businessUnit}
                  onValueChange={setBusinessUnit}
                />
                <Tooltip content="Če ne vnesete vrednosti, boste pridobili seznam vseh statusov za plačnika">
                  <span style={{ cursor: 'pointer' }}>ℹ️</span>
                </Tooltip>
                <Spacer y={1} />
                <Input
                  clearable
                  underlined
                  fullWidth
                  label="Uporabniško ime"
                  variant="flat"
                  value={userName}
                  onValueChange={setUserName}
                />
                <Spacer y={1} />
                <Input
                  clearable
                  underlined
                  fullWidth
                  label="Ime in priimek"
                  variant="flat"
                  value={fullName}
                  onValueChange={setFullName}
                />
              </div>
              <Spacer y={1} />

            </CardBody>
          </Card>
          <Spacer y={8} />

          <Card>
            <CardHeader>

            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-3">
                <Input
                  type="date"
                  clearable
                  underlined
                  fullWidth
                  label="Datum"
                  variant="flat"
                  value={statusDate}
                  onValueChange={setStatusDate}
                />
              </div>
              <Spacer y={1} />
            </CardBody>
          </Card>
          <Spacer y={1} />
          <Button type="button" color="primary" size="lg" onClick={event => onStatusRetrieve(
            {
              apiUrl: apiUrl, apiSecret: apiSecret
              , sender: {
                apiKey: apiKey,
                businessUnit: businessUnit,
                userName: userName
              }
              , user: {
                fullName: fullName
              },
              payload: { statusDate: statusDate || '' }
            })}>Poizvedi</Button>
          <Spacer y={8} />
        </form>
      </div>
      <Modal
        isOpen={isModalVisible}
        size='4xl'
        onClose={() => setIsModalVisible(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h4 id="modal-title" style={{ margin: 0 }}>
                  {'Rezultat'}
                </h4>
              </ModalHeader>
              <ModalBody>
                {response && (
                  response.status >= 200 && response.status < 300 ? (
                    // Successful response
                    <div style={{ overflow: 'auto', maxHeight: '400px' }}>
                      <pre style={{ color: 'green' }}>
                        {JSON.stringify(response.data, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    // Error response
                    <div style={{ overflow: 'auto', maxHeight: '400px' }}>
                      <pre style={{ color: 'red' }}>
                        Napaka: Status {response.status} - Razlog: {response.message || 'N/A'}
                        <h2>
                          Tehnične podrobnosti
                        </h2>
                        <p>
                          {response.data}
                        </p>
                      </pre>
                    </div>
                  )
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Zapri
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}