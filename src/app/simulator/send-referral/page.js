"use client"

import styles from './page.module.css'
import { Card, CardHeader, CardBody, Spacer, Divider, ButtonGroup, Textarea, user } from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Link } from "@nextui-org/react"
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
  const [correlationId, setCorrelationId] = useState("bis-ref-1")
  const [correlationInfo, setCorrelationInfo] = useState("Opis za bis-ref-1")
  const [idQuestionnaire, setIdQuestionnaire] = useState(1) //DG, 9.8.2025: let's default to 1 which is always present. useState(null)
  const [patientKzz, setPatientKzz] = useState("012345678")
  const [patientBisId, setPatientBisId] = useState("")
  const [patientSurname, setPatientSurname] = useState("Celarc")
  const [patientName, setPatientName] = useState("Elizabeta Olivija")
  const [patientDateOfBirth, setPatientDateOfBirth] = useState("1950-10-27")
  const [patientYearOfBirth, setPatientYearOfBirth] = useState("")
  const [patientDateOfDeath1, setPatientDateOfDeath1] = useState("")
  const [patientDateOfDeath2, setPatientDateOfDeath2] = useState("")
  const [patientZip, setPatientZip] = useState("1000")
  const [patientCity, setPatientCity] = useState("Ljubljana")
  const [patientAddress, setPatientAddress] = useState("Simulatorska 123")
  const [patientCountry, setPatientCountry] = useState("Slovenija")
  const [patientCountryCode, setPatientCountryCode] = useState("705")
  const [patientSex, setPatientSex] = useState(0)
  const [patientIsDeceased, setPatientIsDeceased] = useState(false)
  const [priority, setPriority] = useState(1)
  const [referredByDoctorUniquifier, setReferredByDoctorUniquifier] = useState("123456")
  const [referredByDoctorSurname, setReferredByDoctorSurname] = useState("Al Mawed")
  const [referredByDoctorName, setReferredByDoctorName] = useState("Said")
  const [referredByDoctorPhoneNumber, setReferredByDoctorPhoneNumber] = useState(null)
  const [samplesTakenByDoctorUniquifier, setSamplesTakenByDoctorUniquifier] = useState("123457")
  const [samplesTakenByDoctorSurname, setSamplesTakenByDoctorSurname] = useState("Ambrožič")
  const [samplesTakenByDoctorName, setSamplesTakenByDoctorName] = useState("Miha")
  const [samplesTakenByDoctorPhoneNumber, setSamplesTakenByDoctorPhoneNumber] = useState("")
  const [clinicalDataAndDiagnosis, setClinicalDataAndDiagnosis] = useState(null)
  const [attachments, setAttachments] = useState([
    {
      name: "mock-attachment.pdf",
      size: 117,
      type: "application/pdf",
      data: "JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCA2MTIgNzkyXS9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNCAwIFI+Pj4+L0NvbnRlbnRzIDUgMCBSPj4KZW5kb2JqCg==",
      originalFileName: "mock-attachment.pdf",
      notes: "Test priloga iz simulatorja",
      comment: "Testni komentar",
      detailTags: []
    }
  ])

  const [response, setResponse] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onSubmit = async payload => {
    //Send a fetch request to Backend API.
    try {
      const response = await fetch("/api/simulator/send-referral", {
        method: "POST",
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        // If response is in the 200-299 range
        const data = await response.json()
        setResponse({ status: response.status, message: 'Naročilnica je bila uspešno poslana', data: { ...data.data }, rawData: data })
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
        <form
          onSubmit={event => {
            event.preventDefault()
            onSubmit({
              apiUrl: apiUrl, apiSecret: apiSecret
              , sender: {
                apiKey: apiKey,
                businessUnit: businessUnit,
                userName: userName
              }
              , user: {
                fullName: fullName
              }
              , payload: {
                correlationId: correlationId,
                correlationInfo: correlationInfo,
                idQuestionnaire: idQuestionnaire,
                priority: priority,
                patient: {
                  uniquifier: patientKzz,
                  bisId: patientBisId === "" ? null : patientBisId,
                  surname: patientSurname,
                  name: patientName,
                  dateOfBirth: patientDateOfBirth === "" ? null : patientDateOfBirth,
                  yearOfBirth: patientYearOfBirth === "" ? null : patientYearOfBirth,
                  dateDeathFrom: patientDateOfDeath1 === "" ? null : patientDateOfDeath1,
                  dateDeathTo: patientDateOfDeath2 === "" ? null : patientDateOfDeath2,
                  zip: patientZip === "" ? null : patientZip,
                  city: patientCity === "" ? null : patientCity,
                  adress: patientAddress === "" ? null : patientAddress,
                  country: patientCountry === "" ? null : patientCountry,
                  countryCode: patientCountryCode === "" ? null : patientCountryCode,
                  isSexMale: patientSex,
                  isDeceased: patientIsDeceased
                },
                referredByDoctor: {
                  uniquifier: referredByDoctorUniquifier,
                  surname: referredByDoctorSurname,
                  name: referredByDoctorName,
                  phoneNumber: referredByDoctorPhoneNumber
                },
                samplesTakenByDoctor: {
                  uniquifier: samplesTakenByDoctorUniquifier,
                  surname: samplesTakenByDoctorSurname,
                  name: samplesTakenByDoctorName,
                  phoneNumber: samplesTakenByDoctorPhoneNumber
                },
                clinicalDataAndDiagnosis: clinicalDataAndDiagnosis,
                attachments: attachments
              }
            })
          }}>
          
          {/* Main two-column layout */}
          <div className="flex gap-3">
            {/* LEFT PANE */}
            <div className="flex-1 flex flex-col gap-3">
              {/* Pacient card */}
              <Card>
                <CardHeader className="text-left text-xl md:text-base font-bold gap-3">
                  Pacient
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="flex gap-3">
                    {/* Left section - main patient data */}
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-3">
                        <Input
                          name="patientKzz"
                          clearable
                          underlined
                          fullWidth
                          label="KZZ"
                          variant="flat"
                          value={patientKzz}
                          onValueChange={setPatientKzz}
                        />
                        <Spacer y={1} />
                        <Input
                          name="patientBisId"
                          clearable
                          underlined
                          fullWidth
                          label="BIS Id"
                          variant="flat"
                          value={patientBisId}
                          onValueChange={setPatientBisId}
                        />
                        <Spacer y={1} />
                        <div style={{ width: '200px', minWidth: '200px', flexShrink: 0 }}>
                          <ButtonGroup fullWidth>
                            <Button variant={patientSex === 0 ? "solid" : "bordered"} onPress={e => { setPatientSex(0) }}>Ženska</Button>
                            <Button variant={patientSex === 1 ? "solid" : "bordered"} onPress={e => { setPatientSex(1) }}>Moški</Button>
                          </ButtonGroup>
                        </div>
                      </div>
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-3">
                        <Input
                          name="patientSurname"
                          clearable
                          underlined
                          fullWidth
                          label="Priimek"
                          variant="flat"
                          value={patientSurname}
                          onValueChange={setPatientSurname}
                        />
                        <Spacer y={1} />
                        <Input
                          name="patientName"
                          clearable
                          underlined
                          fullWidth
                          label="Ime"
                          variant="flat"
                          value={patientName}
                          onValueChange={setPatientName}
                        />
                        <Spacer y={1} />
                        <div className="flex gap-2" style={{ width: '200px', minWidth: '200px', flexShrink: 0 }}>
                          <div className="flex flex-col">
                            <Input
                              name="patientDateOfBirth"
                              clearable
                              underlined
                              fullWidth
                              label="Datum rojstva"
                              variant="flat"
                              value={patientDateOfBirth}
                              onValueChange={setPatientDateOfBirth}
                            />
                            <span style={{ fontSize: '9px', color: '#555', marginTop: '-12px', textAlign: 'center', position: 'relative', zIndex: 10 }}>YYYY-MM-DD</span>
                          </div>
                          <div style={{ width: '80px', minWidth: '80px', flexShrink: 0, flexGrow: 0 }}>
                            <div className="flex flex-col">
                              <Input
                                name="patientYearOfBirth"
                                type="number"
                                clearable
                                underlined
                                fullWidth
                                label="Leto roj."
                                variant="flat"
                                value={patientYearOfBirth}
                                onValueChange={setPatientYearOfBirth}
                              />
                              <span style={{ fontSize: '9px', color: '#555', marginTop: '-12px', textAlign: 'center', position: 'relative', zIndex: 10 }}>YYYY</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-3">
                        <div className="flex flex-1 gap-2">
                          <div style={{ width: '90px', minWidth: '90px', flexShrink: 0 }}>
                            <Input
                              name="patientZip"
                              type="number"
                              clearable
                              underlined
                              fullWidth
                              label="Pošta"
                              variant="flat"
                              value={patientZip}
                              onValueChange={setPatientZip}
                            />
                          </div>
                          <Input
                            name="patientCity"
                            clearable
                            underlined
                            fullWidth
                            label="Kraj"
                            variant="flat"
                            value={patientCity}
                            onValueChange={setPatientCity}
                          />
                        </div>
                        <Spacer y={1} />
                        <div className="flex-1">
                          <Input
                            name="patientAddress"
                            clearable
                            underlined
                            fullWidth
                            label="Naslov"
                            variant="flat"
                            value={patientAddress}
                            onValueChange={setPatientAddress}
                          />
                        </div>
                        <Spacer y={1} />
                        <div className="flex gap-2" style={{ width: '200px', minWidth: '200px', flexShrink: 0 }}>
                          <Input
                            name="patientCountry"
                            clearable
                            underlined
                            fullWidth
                            label="Država"
                            variant="flat"
                            value={patientCountry}
                            onValueChange={setPatientCountry}
                          />
                          <div style={{ width: '80px', minWidth: '80px', flexShrink: 0, flexGrow: 0 }}>
                            <Input
                              name="patientCountryCode"
                              type="number"
                              clearable
                              underlined
                              fullWidth
                              label="ISO N3"
                              variant="flat"
                              value={patientCountryCode}
                              onValueChange={setPatientCountryCode}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right section - death-related data (220px) */}
                    <div style={{ width: '220px', minWidth: '220px', flexShrink: 0, backgroundColor: '#374151', borderRadius: '8px', padding: '16px 12px 12px 12px', marginTop: '-16px', marginBottom: '-16px' }} className="flex flex-col gap-3 items-start">
                      <div style={{ minHeight: '56px', display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                        <ButtonGroup fullWidth>
                          <Button variant={patientIsDeceased === false ? "solid" : "bordered"} onPress={e => { setPatientIsDeceased(false) }}>Živ</Button>
                          <Button variant={patientIsDeceased === true ? "solid" : "bordered"} onPress={e => { setPatientIsDeceased(true) }}>Pokojnik</Button>
                        </ButtonGroup>
                      </div>
                      <div className="flex flex-col w-full">
                        <Input
                          name="patientDateOfDeath1"
                          clearable
                          underlined
                          fullWidth
                          label="Čas smrti"
                          variant="flat"
                          value={patientDateOfDeath1}
                          onValueChange={setPatientDateOfDeath1}
                        />
                        <span style={{ fontSize: '9px', color: '#555', marginTop: '-12px', textAlign: 'center', position: 'relative', zIndex: 10 }}>YYYY-MM-DDTHH:mm</span>
                      </div>
                      <div className="flex flex-col w-full">
                        <Input
                          name="patientDateOfDeath2"
                          clearable
                          underlined
                          fullWidth
                          label="Čas smrti do"
                          variant="flat"
                          value={patientDateOfDeath2}
                          onValueChange={setPatientDateOfDeath2}
                        />
                        <span style={{ fontSize: '9px', color: '#555', marginTop: '-12px', textAlign: 'center', position: 'relative', zIndex: 10 }}>YYYY-MM-DDTHH:mm</span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Prioriteta + Napotni zdravnik + Vzorce odvzel row */}
              <div className="flex gap-3">
                {/* Prioriteta - fixed width 160px, vertical buttons */}
                <Card style={{ width: '160px', minWidth: '160px' }}>
                  <CardHeader className="text-left text-xl md:text-base font-bold gap-3">
                    Prioriteta
                  </CardHeader>
                  <Divider />
                  <CardBody className="h-full">
                    <div className="flex flex-col gap-2 flex-1 justify-between">
                      <Button fullWidth size="sm" variant={priority === 1 ? "solid" : "bordered"} onPress={e => { setPriority(1) }}>Normalno</Button>
                      <Button fullWidth size="sm" variant={priority === 2 ? "solid" : "bordered"} onPress={e => { setPriority(2) }}>Nujno</Button>
                      <Button fullWidth size="sm" variant={priority === 3 ? "solid" : "bordered"} onPress={e => { setPriority(3) }}>Zaled. rez</Button>
                    </div>
                  </CardBody>
                </Card>
                <Card className="flex-1">
                  <CardHeader className="text-left text-xl md:text-base font-bold gap-3">
                    Napotni zdravnik
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <div className="flex flex-col gap-3">
                      <div className="flex w-full gap-3">
                        <Input
                          name="referredByDoctorUniquifier"
                          clearable
                          underlined
                          fullWidth
                          label="Zdravniška številka"
                          variant="flat"
                          value={referredByDoctorUniquifier}
                          onValueChange={setReferredByDoctorUniquifier}
                        />
                        <Input
                          name="referredByDoctorPhoneNumber"
                          clearable
                          underlined
                          fullWidth
                          label="Telefon"
                          variant="flat"
                          value={referredByDoctorPhoneNumber}
                          onValueChange={setReferredByDoctorPhoneNumber}
                        />
                      </div>
                      <div className="flex w-full gap-3">
                        <Input
                          name="referredByDoctorSurname"
                          clearable
                          underlined
                          fullWidth
                          label="Priimek"
                          variant="flat"
                          value={referredByDoctorSurname}
                          onValueChange={setReferredByDoctorSurname}
                        />
                        <Input
                          name="referredByDoctorName"
                          clearable
                          underlined
                          fullWidth
                          label="Ime"
                          variant="flat"
                          value={referredByDoctorName}
                          onValueChange={setReferredByDoctorName}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="flex-1">
                  <CardHeader className="text-left text-xl md:text-base font-bold gap-3">
                    Vzorce odvzel
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <div className="flex flex-col gap-3">
                      <div className="flex w-full gap-3">
                        <Input
                          name="samplesTakenByDoctorUniquifier"
                          clearable
                          underlined
                          fullWidth
                          label="Zdravniška številka"
                          variant="flat"
                          value={samplesTakenByDoctorUniquifier}
                          onValueChange={setSamplesTakenByDoctorUniquifier}
                        />
                        <Input
                          name="samplesTakenByDoctorPhoneNumber"
                          clearable
                          underlined
                          fullWidth
                          label="Telefon"
                          variant="flat"
                          value={samplesTakenByDoctorPhoneNumber}
                          onValueChange={setSamplesTakenByDoctorPhoneNumber}
                        />
                      </div>
                      <div className="flex w-full gap-3">
                        <Input
                          name="samplesTakenByDoctorSurname"
                          clearable
                          underlined
                          fullWidth
                          label="Priimek"
                          variant="flat"
                          value={samplesTakenByDoctorSurname}
                          onValueChange={setSamplesTakenByDoctorSurname}
                        />
                        <Input
                          name="samplesTakenByDoctorName"
                          clearable
                          underlined
                          fullWidth
                          label="Ime"
                          variant="flat"
                          value={samplesTakenByDoctorName}
                          onValueChange={setSamplesTakenByDoctorName}
                        />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>

              {/* BIS + Klinični podatki + Priloge row */}
              <div className="flex gap-3">
                <Card style={{ width: '160px', minWidth: '160px' }}>
                  <Divider />
                  <CardBody>
                    <div className="flex flex-col gap-3">
                      <Input
                        clearable
                        underlined
                        fullWidth
                        label="BIS naročilnica"
                        variant="flat"
                        value={correlationId}
                        onValueChange={setCorrelationId}
                      />
                      <Input
                        clearable
                        underlined
                        fullWidth
                        label="BIS opomba"
                        variant="flat"
                        value={correlationInfo}
                        onValueChange={setCorrelationInfo}
                      />
                    </div>
                  </CardBody>
                </Card>
                <Card className="flex-1">
                  <Divider />
                  <CardBody>
                    <Textarea
                      name="clinicalDataAndDiagnosis"
                      minRows={3}
                      maxRows={3}
                      label="Klinični podatki in diagnoze"
                      labelPlacement="inside"
                      value={clinicalDataAndDiagnosis}
                      onValueChange={setClinicalDataAndDiagnosis}
                    />
                  </CardBody>
                </Card>
                <Card className="flex-1">
                  <Divider />
                  <CardBody>
                    <Textarea
                      minRows={3}
                      maxRows={3}
                      label="Priloge (Base64)"
                      labelPlacement="inside"
                      value={attachments[0]?.data || ""}
                      onValueChange={(val) => setAttachments([{ ...attachments[0], data: val }])}
                    />
                  </CardBody>
                </Card>
              </div>

              {/* Submit button */}
              <Button type="submit" color="primary" size="lg">Kreiraj naročilnico</Button>
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
                    <Input
                      type="number"
                      clearable
                      underlined
                      fullWidth
                      label="Št. vprašalnika"
                      variant="flat"
                      value={idQuestionnaire}
                      onValueChange={setIdQuestionnaire}
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
                          <div className="flex justify-end mb-2">
                            <Button 
                              color="secondary" 
                              variant="light"
                              size="sm"
                              onPress={() => window.open(response.data.url, '_blank')}
                            >
                              Pojdi na naročilnico
                            </Button>
                          </div>
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