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

  const [response, setResponse] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onTokenRetrieve = async payload => {
    console.log('payload:', payload)
    try {
      const response = await fetch("/api/simulator/retrieve-token", {
        method: "POST",
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        // If response is in the 200-299 range
        const data = await response.json()
        setResponse({ status: response.status, message: 'Token', data: { ...data.data }, rawData: data })
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
        <p className="text-center text-sm md:text-base">
          Žeton
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
          <Spacer y={1} />
          <Button type="button" color="primary" size="lg" onClick={event => onTokenRetrieve(
            {
              apiUrl: apiUrl, apiSecret: apiSecret
              , sender: {
                apiKey: apiKey,
                businessUnit: businessUnit,
                userName: userName
              }
              , user: {
                userName: userName,
                fullName: fullName
              }
            })}>Pridobi žeton</Button>
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
                  <Tabs aria-label="Response tabs" color="primary">
                    {/* Tab 1: Preview */}
                    <Tab key="preview" title="Predogled">
                      {response.status >= 200 && response.status < 300 ? (
                        // Successful response - show token
                        <div style={{ overflow: 'auto', maxHeight: '600px' }}>
                          {response.data.token && (
                            <div className="flex justify-end mb-2">
                              <Button 
                                color="secondary" 
                                variant="light"
                                size="sm"
                                onPress={() => {
                                  navigator.clipboard.writeText(response.data.token.token);
                                }}
                              >
                                Kopiraj žeton
                              </Button>
                            </div>
                          )}
                          <div className="flex flex-col gap-4">
                            {response.data.token && (
                              <>
                                <div>
                                  <h3 className="font-bold mb-2">Žeton</h3>
                                  <pre style={{ 
                                    wordWrap: 'break-word', 
                                    whiteSpace: 'pre-wrap',
                                    backgroundColor: '#f5f5f5',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc'
                                  }}>
                                    {response.data.token.token}
                                  </pre>
                                </div>
                                
                                <div>
                                  <h3 className="font-bold mb-2">Podatki o žetonu
                                    {(() => {
                                      const payload = JSON.parse(atob(response.data.token.token.split('.')[1]));
                                      const expDate = new Date(payload.exp * 1000);
                                      const now = new Date();
                                      const diff = expDate - now;
                                      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                                      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                      const day = String(expDate.getDate()).padStart(2, '0');
                                      const month = String(expDate.getMonth() + 1).padStart(2, '0');
                                      const year = expDate.getFullYear();
                                      const hour = String(expDate.getHours()).padStart(2, '0');
                                      const minute = String(expDate.getMinutes()).padStart(2, '0');
                                      const expDateTimeStr = `${day}.${month}.${year} ob ${hour}:${minute}`;
                                      return ` - poteče ${expDateTimeStr}, to je čez ${days} dni in ${hours} ur.`;
                                    })()}
                                  </h3>
                                  <pre style={{ 
                                    wordWrap: 'break-word', 
                                    whiteSpace: 'pre-wrap',
                                    backgroundColor: '#f5f5f5',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc'
                                  }}>
                                    {JSON.stringify(JSON.parse(atob(response.data.token.token.split('.')[1])), null, 2)}
                                  </pre>
                                </div>
                              </>
                            )}
                          </div>
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
