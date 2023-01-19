import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button, Form, Grid, Image } from 'semantic-ui-react'

export default function PurposeFormPage() {

  const [newPurpose, setNewPurpose] = useState({ title: '', description: '' })
  const [errors, setErrors] = useState({})
  const router = useRouter()

  const validate = () => {
    const validators = {}

    if (!newPurpose.title) validators.title = 'Title is required'
    if (!newPurpose.description) validators.description = 'Description is required'

    return validators

  }

  const onChangeInput = (event) => {
    setNewPurpose({
      ...newPurpose,
      [event.target.name]: event.target.value
    })
  }

  const create = async (event) => {
    event.preventDefault()
    let errors = validate()
    if (Object.keys(errors).length) return setErrors(errors)

    const created = await axios.post('/api/purposes', newPurpose)
    created.status === 201 && router.push('/purposes')
  }

  return (
    <Grid
      centered
      verticalAlign='middle'
      columns={3}
      style={{ height: '80vh' }}
    >
      <Grid.Row>
        <Image src='/newyork.png' alt='New' width={700} height={300} />
      </Grid.Row>
      <Grid.Row>
        <h1>New purpose</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Form onSubmit={create}>
            <Form.Input
              name='title' placeholder='Title' onChange={onChangeInput}
              error={errors.title ? { content: errors.title, pointing: 'below' } : null} />
            <Form.Input
              name='description' placeholder='Description' onChange={onChangeInput}
              error={errors.description ? { content: errors.description, pointing: 'below' } : null} />
            <Button primary>ADD</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid >
  )
}