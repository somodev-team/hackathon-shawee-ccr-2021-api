import React, { useMemo, useState } from 'react'
import { createRoute } from 'app-route-manager'
import './update-profile.style.scss'
import { Button, Form, BackButton } from 'app-components'
import { usePerson, useRoute } from 'app-hooks'
import { STEPS } from './steps'

export const UpdateProfile = () => {
  const { updateProfile } = usePerson()
  const { goToProfile } = useRoute()
  const [step, setStep] = useState(0)
  const [newProfile, setNewProfile] = useState({})

  const isLast = useMemo(() => step === STEPS.length - 1, [step])
  const StepComponent = useMemo(() => STEPS[step].component, [step])
  const schema = useMemo(() => STEPS[step].schema, [step])

  const handleNext = async data => {
    if (isLast) {
      await updateProfile({
        ...newProfile,
        ...data,
      })

      return goToProfile()
    }

    setStep(step + 1)
    setNewProfile({
      ...newProfile,
      ...data,
    })
  }

  const handleClick = () => {
    setStep(step - 1)
  }

  return (
    <div className="page update-profile full-height">
      <div className="container full-height">
        <div className="d-flex full-height">
          <BackButton onClick={handleClick} />

          <h1 className="update-profile__title">Complete seu perfil</h1>

          <Form schema={schema} onSubmit={handleNext}>
            <div className="flex-grow-1 d-flex">
              <div className="steps flex-grow-1 d-flex align-items-center flex-column justify-content-center">
                <StepComponent />
              </div>
            </div>
            <Button className="btn btn-primary w-100">
              {isLast ? 'Finalizar' : 'Próximo'}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

createRoute({
  path: '/update-profile',
  component: UpdateProfile,
  private: true,
})
