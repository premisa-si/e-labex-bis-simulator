"use client"

import styles from './page.module.css'
import { Card, CardHeader, CardBody, Spacer, Divider, ButtonGroup, Textarea, user } from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Link } from "@nextui-org/react"

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'

import { useState } from 'react'

export default function Home() {
  const [apiUrl, setApiUrl] = useState("http://localhost:7171")
  const [referralId, setReferralId] = useState("")
  const [idStatus, setIdStatus] = useState(1)
  const [statusName, setStatusName] = useState("")

  const [response, setResponse] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onSubmit = async payload => {
    //Send a fetch request to Backend API.
    
    try {
      const response = await fetch("/api/labex-simulator/labex-actions", {
        method: "POST",
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        // If response is in the 200-299 range
        const data = await response.json()
        setResponse({ status: response.status, message: 'Naročilnica je bila uspešno poslana', data: { ...data.data } })
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
          Simulacija procesiranja v Labex-u
        </p>
        <form
          onSubmit={event => {
            event.preventDefault()
            onSubmit({
              apiUrl: apiUrl,
              user: {
                userName: 'bis-simulator',
                fullName: 'Bis Simulator'
              }
              , payload: {
                id: referralId,
                correlationId: '',
                correlationInfo: '',
                idReferralStatus: 4,
                referralStatusName: "Obdelano v Labex-u",
                idStatus: idStatus,
                statusName: statusName,
                statusDateTimeUtc: new Date().toISOString(),
                idStatusReason: 0,
                statusReasonName: null,
                statusReasonNotes: null,
                details: []
              }
            })
          }}>
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
              </div>
            </CardBody>
          </Card>
          <Spacer y={2} />            
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
              <Spacer y={1} />
            </CardBody>
          </Card>    
          <Spacer y={1} />        
          <Card>
            <CardHeader className="text-left text-xl md:text-base font-bold gap-3">
              Labex akcije
            </CardHeader>
            <Divider />
            <CardBody>
              
              <ButtonGroup fullWidth>
                <Button variant={idStatus === 1 ? "solid" : "bordered"} onPress={e => { setIdStatus(1); setStatusName('Sprejeto'); }}>Sprejem</Button>
                <Button variant={idStatus === -1 ? "solid" : "bordered"} onPress={e => { setIdStatus(-1); setStatusName('Zavrnjeno'); }}>Zavrnitev</Button>
                <Button variant={idStatus === 2 ? "solid" : "bordered"} onPress={e => { setIdStatus(2); setStatusName('Podpisano'); }}>Podpis</Button>
              </ButtonGroup>
            </CardBody>
          </Card>            
          <Button type="submit" color="primary" size="lg">Pošlji</Button>
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
                {response && (
                  response.status >= 200 && response.status < 300 ? (
                    // Successful response
                    <Link href={response.data.url} target="_blank" style={{ color: 'green', textDecoration: 'none' }}>
                      Pojdi na naročilnico
                    </Link>
                  ) : null
                )}
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