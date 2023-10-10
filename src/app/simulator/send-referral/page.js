"use client"

import styles from './page.module.css'
import { Card, CardHeader, CardBody, Spacer, Divider, ButtonGroup, Textarea } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useState } from 'react'

async function onSubmit(jsonPayload) {
  console.log('jsonPayload:', jsonPayload)
  // 👇 Send a fetch request to Backend API.
  fetch("/api/simulator/send-referral", {
    method: "POST",
    body: JSON.stringify(jsonPayload),
  }).then(async response => console.log('Yeah:', await response.text())).catch(e => console.log(e))
}

export default function Home() {
  const [businessUnit, setBusinessUnit] = useState("654321")
  const [userName, setUserName] = useState("uporabniskoIme")
  const [fullName, setFullName] = useState("Ime Priimek")
  const [apiUrl, setApiUrl] = useState("https://test-e-referral.patologija.mf")
  const [apiKey, setApiKey] = useState("abcd-1234-defg-5678")
  const [apiSecret, setApiSecret] = useState("1234")
  const [correlationId, setCorrelationId] = useState("bis-ref-1")
  const [correlationInfo, setCorrelationInfo] = useState("Opis za bis-ref-1")
  const [patientKzz, setPatientKzz] = useState("012345678")
  const [patientSurname, setPatientSurname] = useState("Winslet")
  const [patientName, setPatientName] = useState("Kate")
  const [patientDateOfBirth, setPatientDateOfBirth] = useState("1975-11-19")
  const [patientYearOfBirth, setPatientYearOfBirth] = useState("")
  const [priority, setPriority] = useState("OB")
  const [referredByDoctorUniquifier, setReferredByDoctorUniquifier] = useState("123456")
  const [referredByDoctorSurname, setReferredByDoctorSurname] = useState("Dotorevski")
  const [referredByDoctorName, setReferredByDoctorName] = useState("Marija")
  const [samplesTakenByDoctorUniquifier, setSamplesTakenByDoctorUniquifier] = useState("123457")
  const [samplesTakenByDoctorSurname, setSamplesTakenByDoctorSurname] = useState("Zdravniković")
  const [samplesTakenByDoctorName, setSamplesTakenByDoctorName] = useState("Miha")
  const [clinicalDataAndDiagnosis, setClinicalDataAndDiagnosis] = useState("")

  return (
    <div>
      <div className="container mx-auto">
        <p className="text-center text-sm md:text-base">
          Pošiljanje Labex e-naročilnice
        </p>
        <form
          onSubmit={event => {
            event.preventDefault()
            console.log('Submitting!')
            onSubmit({
              businessUnit: businessUnit, apiUrl: apiUrl, apiKey: apiKey, apiSecret: apiSecret
              , userName: userName, fullName: fullName
              , payload: {
                correlationId: correlationId,
                correlationInfo: correlationInfo,
                priority: priority,
                patient: {
                  uniquifier: patientKzz,
                  surname: patientSurname,
                  name: patientName,
                  dateOfBirth: patientDateOfBirth === "" ? null : patientDateOfBirth,
                  yearOfBirth: patientYearOfBirth === "" ? null : patientYearOfBirth
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
                  label="BPI"
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
                {/* <Spacer y={1} />
                <Input
                  clearable
                  underlined
                  fullWidth
                  label="Ime in priimek uporabnika"
                  variant="flat"
                  value={fullName}
                  onValueChange={setFullName}
                /> */}
              </div>
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
                <Button variant={priority === "OB" ? "solid" : "bordered"} onPress={e => { setPriority("OB") }}>Normalno</Button>
                <Button variant={priority === "NU" ? "solid" : "bordered"} onPress={e => { setPriority("NU") }}>Nujno</Button>
                <Button variant={priority === "ZR" ? "solid" : "bordered"} onPress={e => { setPriority("ZR") }}>Zaledeneli rez</Button>
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
                  clearable
                  underlined
                  fullWidth
                  label="Leto rojstva (YYYY)"
                  variant="flat"
                  value={patientYearOfBirth}
                  onValueChange={setPatientYearOfBirth}
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
    </div>
  )
}