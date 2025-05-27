"use client"

import styles from './page.module.css'
import { Card, CardHeader, CardBody, Spacer, Divider, ButtonGroup, Textarea, user } from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Link } from "@nextui-org/react"

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
  const [patientKzz, setPatientKzz] = useState("012345678")
  const [patientBisId, setPatientBisId] = useState("")
  const [patientSurname, setPatientSurname] = useState("Celarc")
  const [patientName, setPatientName] = useState("Elizabeta Olivija")
  const [patientDateOfBirth, setPatientDateOfBirth] = useState("1950-10-27")
  const [patientYearOfBirth, setPatientYearOfBirth] = useState("")
  const [patientZip, setPatientZip] = useState("1000")
  const [patientCity, setPatientCity] = useState("Ljubljana")
  const [patientAddress, setPatientAddress] = useState("Simulatorska 123")
  const [patientCountry, setPatientCountry] = useState("Slovenija")
  const [patientCountryCode, setPatientCountryCode] = useState("705")
  const [patientSex, setPatientSex] = useState(0)
  const [priority, setPriority] = useState(1)
  const [referredByDoctorUniquifier, setReferredByDoctorUniquifier] = useState("123456")
  const [referredByDoctorSurname, setReferredByDoctorSurname] = useState("Al Mawed")
  const [referredByDoctorName, setReferredByDoctorName] = useState("Said")
  const [samplesTakenByDoctorUniquifier, setSamplesTakenByDoctorUniquifier] = useState("123457")
  const [samplesTakenByDoctorSurname, setSamplesTakenByDoctorSurname] = useState("Ambrožič")
  const [samplesTakenByDoctorName, setSamplesTakenByDoctorName] = useState("Miha")
  const [clinicalDataAndDiagnosis, setClinicalDataAndDiagnosis] = useState("")

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
          Pošiljanje Labex e-naročilnice
        </p>
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
                priority: priority,
                patient: {
                  uniquifier: patientKzz,
                  bisId: patientBisId === "" ? null : patientBisId,
                  surname: patientSurname,
                  name: patientName,
                  dateOfBirth: patientDateOfBirth === "" ? null : patientDateOfBirth,
                  yearOfBirth: patientYearOfBirth === "" ? null : patientYearOfBirth,
                  zip: patientZip === "" ? null : patientZip,
                  city: patientCity === "" ? null : patientCity,
                  adress: patientAddress === "" ? null : patientAddress,
                  country: patientCountry === "" ? null : patientCountry,
                  countryCode: patientCountryCode === "" ? null : patientCountryCode,
                  isSexMale: patientSex
                },
                referredByDoctor: {
                  uniquifier: referredByDoctorUniquifier,
                  surname: referredByDoctorSurname,
                  name: referredByDoctorName
                },
                samplesTakenByDoctor: {
                  uniquifier: samplesTakenByDoctorUniquifier,
                  surname: samplesTakenByDoctorSurname,
                  name: samplesTakenByDoctorName
                },
                clinicalDataAndDiagnosis: clinicalDataAndDiagnosis
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
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-3">
                <Input
                  clearable
                  underlined
                  fullWidth
                  label="Številka BIS naročilnice"
                  variant="flat"
                  value={correlationId}
                  onValueChange={setCorrelationId}
                />
                <Spacer y={1} />
                <Input
                  clearable
                  underlined
                  fullWidth
                  label="Opomba BIS naročilnice"
                  variant="flat"
                  value={correlationInfo}
                  onValueChange={setCorrelationInfo}
                />
              </div>
            </CardBody>
          </Card>
          <Spacer y={1} />
          <Card>
            <CardHeader className="text-left text-xl md:text-base font-bold gap-3">
              Prioriteta
            </CardHeader>
            <Divider />
            <CardBody>
              <ButtonGroup fullWidth>
                <Button variant={priority === 1 ? "solid" : "bordered"} onPress={e => { setPriority(1) }}>Normalno</Button>
                <Button variant={priority === 2 ? "solid" : "bordered"} onPress={e => { setPriority(2) }}>Nujno</Button>
                <Button variant={priority === 3 ? "solid" : "bordered"} onPress={e => { setPriority(3) }}>Zaledeneli rez</Button>
              </ButtonGroup>
            </CardBody>
          </Card>
          <Spacer y={1} />
          <Card>
            <CardHeader className="text-left text-xl md:text-base font-bold gap-3">
              Pacient
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-3">
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
              </div>
              <Spacer y={1} />
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-3">
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
                <ButtonGroup fullWidth>
                  <Button variant={patientSex === 0 ? "solid" : "bordered"} onPress={e => { setPatientSex(0) }}>Ženska</Button>
                  <Button variant={patientSex === 1 ? "solid" : "bordered"} onPress={e => { setPatientSex(1) }}>Moški</Button>
                </ButtonGroup>
              </div>
              <Spacer y={1} />
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-3">
                <Input
                  name="patientDateOfBirth"
                  clearable
                  underlined
                  fullWidth
                  label="Datum rojstva (YYYY-MM-DD)"
                  variant="flat"
                  value={patientDateOfBirth}
                  onValueChange={setPatientDateOfBirth}
                />
                <Spacer y={1} />
                <Input
                  name="patientYearOfBirth"
                  type="number"
                  clearable
                  underlined
                  fullWidth
                  label="Leto rojstva (YYYY)"
                  variant="flat"
                  value={patientYearOfBirth}
                  onValueChange={setPatientYearOfBirth}
                />
              </div>
              <Spacer y={1} />
               <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-3">
                <Input
                  name="patientZip"
                  type="number"
                  clearable
                  underlined
                  fullWidth
                  label="Poštna številka"
                  variant="flat"
                  value={patientZip}
                  onValueChange={setPatientZip}
                />
                <Spacer y={1} />
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
                <Spacer y={1} />
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
              <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-3">
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
                <Spacer y={1} />
                <Input
                  name="patientCountryCode"
                  type="number"
                  clearable
                  underlined
                  fullWidth
                  label="Država ISO N3"
                  variant="flat"
                  value={patientCountryCode}
                  onValueChange={setPatientCountryCode}
                />
              </div>
            </CardBody>
          </Card>
          <Spacer y={1} />
          <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 gap-3">
            <Card>
              <CardHeader className="text-left text-xl md:text-base font-bold gap-3">
                Napotni zdravnik
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex w-full flex-wrap mb-6 md:mb-0 gap-3">
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
                  <Spacer y={1} />
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
                  <Spacer y={1} />
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
              </CardBody>
            </Card>
            <Card>
              <CardHeader className="text-left text-xl md:text-base font-bold gap-3">
                Vzorce odvzel
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex w-full flex-wrap mb-6 md:mb-0 gap-3">
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
                  <Spacer y={1} />
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
                  <Spacer y={1} />
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
              </CardBody>
            </Card>
          </div>
          <Spacer y={1} />
          <Card>
            {/* <CardHeader className="text-left text-xl md:text-base font-bold gap-3">
            Klinični podatki in diagnoze
          </CardHeader> */}
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
          <Spacer y={1} />
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