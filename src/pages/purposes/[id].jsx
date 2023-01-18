import axios from 'axios'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Confirm, Form, Grid } from 'semantic-ui-react'

export default function PurposeDetail({ cookie }) {

  const [confirm, setConfirm] = useState(false)
  const [isLoadingUPD, setIsLoadingUPD] = useState(false)
  const [isLoadingDEL, setIsLoadingDEL] = useState(false)
  const [purpose, setPurpose] = useState({ _id: '', title: '', description: '' })
  const [validations, setValidations] = useState({})
  const [error, setError] = useState(null)

  const router = useRouter()

  useEffect(() => {
    loadPurpose(router.query.id)
  }, [router.query.id])

  const loadPurpose = async (id) => {
    try {
      const { data: { data } } = await axios.get(`/api/purposes/${id}`, {
        headers: {
          Cookie: cookie
        }
      })
      const pp = data?.purpose
      setPurpose({ _id: pp._id, title: pp.title, description: pp.description })
    } catch (error) {
      setError('Purpose not found')
    }
  }

  const openModal = () => setConfirm(true)
  const closeModal = () => setConfirm(false)

  const deleteClick = async () => {
    setIsLoadingDEL(true)
    const deleted = await axios.delete(`/api/purposes/${purpose._id}`)
    closeModal()
    deleted.status === 204 && router.push('/purposes')
  }

  const validate = () => {
    const validators = {}

    if (!purpose.title) validators.title = 'Title is required'
    if (!purpose.description) validators.description = 'Description is required'

    return validators

  }

  const onChangeInput = (event) => {
    setPurpose({
      ...purpose,
      [event.target.name]: event.target.value
    })
  }

  const update = async (event) => {
    event.preventDefault()
    let validations = validate()
    if (Object.keys(validations).length) return setValidations(validations)
    setIsLoadingUPD(true)
    const updated = await axios.patch(`/api/purposes/${purpose._id}`, purpose)
    updated.status === 200 && router.push('/purposes')
  }

  if (error) return <Error title={error} statusCode={404} />

  return (
    <Grid
      centered
      verticalAlign='middle'
      columns={3}
      style={{ height: '80vh' }}
    >
      <Grid.Column textAlign='center'>
        <Form>
          <Form.Input
            name='title' placeholder='Title' onChange={onChangeInput} value={purpose.title}
            error={validations.title ? { content: validations.title, pointing: 'below' } : null} />
          <Form.Input
            name='description' placeholder='Description' onChange={onChangeInput} value={purpose.description}
            error={validations.description ? { content: validations.description, pointing: 'below' } : null} />
          <Button primary onClick={update} loading={isLoadingUPD}>UPDATE</Button>
          <Button negative onClick={openModal} loading={isLoadingDEL}>DELETE</Button>
        </Form>
      </Grid.Column>
      <Confirm
        header='Please confirm' content='Are you sure you want to delete?'
        open={confirm} onCancel={closeModal} onConfirm={deleteClick} />
    </Grid>
  )
}

export const getServerSideProps = async ({ req }) => {

  return {
    props: { cookie: req.headers.cookie }
  }
}