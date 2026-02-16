"use client"

import styles from './page.module.css'
import { Card, CardHeader, CardBody, Spacer, Divider } from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react"
import { Tabs, Tab } from "@nextui-org/react"

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

  const [referralId, setReferralId] = useState("");
  const [correlationId, setCorrelationId] = useState("");
  const [response, setResponse] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onStatusRetrieve = async payload => {
    console.log('payload:', payload)
    try {
      const response = await fetch("/api/simulator/labels-referral-details", {
        method: "POST",
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        // If response is in the 200-299 range
        const data = await response.json()
        setResponse({ status: response.status, message: 'Status', data: { ...data.data }, rawData: data })
      } else {
        // If response is 4xx or 5xx
        const errorData = await response.text();
        setResponse({ status: response.status, message: 'Strežnik je odgovoril z napako', data: errorData, rawData: errorData });
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
        <form>
          {/* Main two-column layout */}
          <div className="flex gap-3">
            {/* LEFT PANE */}
            <div className="flex-1 flex flex-col gap-3">
              <Card>
                <Divider />
                <CardBody>
                  <div className="flex flex-col gap-3">
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
                </CardBody>
              </Card>
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
              payload: { referralId: referralId || '' }
            })}>Pridobi nalepke</Button>
            </div>

            {/* RIGHT PANE - fixed 220px */}
            <div style={{ width: '220px', minWidth: '220px' }} className="flex flex-col gap-3">
              {/* Organizacija */}
              <Card>
                <CardHeader className="text-left text-xl md:text-base font-bold gap-3">
                  Organizacija
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="flex flex-col gap-3">
                    <Input
                      clearable
                      underlined
                      fullWidth
                      label="Business Unit"
                      variant="flat"
                      value={businessUnit}
                      onValueChange={setBusinessUnit}
                    />
                    <Input
                      clearable
                      underlined
                      fullWidth
                      label="Uporabniško ime"
                      variant="flat"
                      value={userName}
                      onValueChange={setUserName}
                    />
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
                </CardBody>
              </Card>

              {/* API */}
              <Card>
                <CardHeader className="text-left text-xl md:text-base font-bold gap-3">
                  API
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="flex flex-col gap-3">
                    <Input
                      clearable
                      underlined
                      fullWidth
                      label="API Key"
                      variant="flat"
                      value={apiKey}
                      onValueChange={setApiKey}
                    />
                    <Input
                      name="apiSecret"
                      clearable
                      underlined
                      fullWidth
                      label="API Secret"
                      value={apiSecret}
                      onValueChange={setApiSecret}
                    />
                  </div>
                </CardBody>
              </Card>

              {/* Other settings */}
              <Card>
                <Divider />
                <CardBody>
                  <div className="flex flex-col gap-3">
                    <Input
                      clearable
                      underlined
                      fullWidth
                      label="API URL"
                      variant="flat"
                      value={apiUrl}
                      onValueChange={setApiUrl}
                    />
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
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
                  <Tabs aria-label="Response tabs" color="primary">
                    {/* Tab 1: Preview */}
                    <Tab key="preview" title="Predogled">
                      {response.status >= 200 && response.status < 300 ? (
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
                      )}
                    </Tab>
                    
                    {/* Tab 2: API Response */}
                    <Tab key="response" title="API Odgovor">
                      <div style={{ overflow: 'auto', maxHeight: '600px' }}>
                        <div className="flex justify-end mb-2">
                          <Button 
                            color="secondary" 
                            variant="light"
                            size="sm"
                            onPress={() => {
                              // Copy FULL response
                              navigator.clipboard.writeText(JSON.stringify(response.rawData, null, 2));
                            }}
                          >
                            Kopiraj JSON
                          </Button>
                        </div>
                        <div className="mb-2 text-left" style={{ fontSize: '11px', color: '#666' }}>
                          Pri kopiranju dobite celoten, 'ne-odrezan' JSON odgovor.
                        </div>
                        <pre style={{ 
                          backgroundColor: '#f4f4f4', 
                          padding: '12px', 
                          borderRadius: '4px',
                          fontSize: '12px',
                          overflow: 'auto'
                        }}>
                          {JSON.stringify(response.rawData, null, 2)}
                        </pre>
                      </div>
                    </Tab>
                  </Tabs>
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