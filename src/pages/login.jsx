import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button, Form, Grid, Image } from 'semantic-ui-react'

export default function LoginPage() {

  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const router = useRouter()
  const [errors, setErrors] = useState({})

  const validate = () => {
    const validators = {}

    if (!credentials.email) validators.email = 'Email is required'
    if (!credentials.password) validators.password = 'Password is required'

    return validators

  }

  const onChangeInput = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }

  const login = async (event) => {
    event.preventDefault()
    let errors = validate()
    if (Object.keys(errors).length) return setErrors(errors)
    try {
      const login = await axios.post('/api/auth/login', credentials)
      login.status === 200 && router.push('/purposes')
    } catch (error) {
      const {response: {data}} = error
      const badCredentials = {email: data.error, password: data.error}
      setErrors(badCredentials)
    }
  }

  return (
    <Grid centered verticalAlign='middle' columns={3} style={{ height: '60vh' }}>
      <Grid.Row>
        <Image src='/welcome.png' alt='New' width={600} height={250} />
      </Grid.Row>
      <Grid.Row>
        <h5>Not responsive. Recommended devices: computer or laptop. Sorry :D</h5>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Form onSubmit={login}>
            <Form.Input name='email' type='email' placeholder='Email' onChange={onChangeInput}
              error={errors.email ? { content: errors.email, pointing: 'below' } : null} />
            <Form.Input name='password' type='password' placeholder='Password' onChange={onChangeInput}
              error={errors.password ? { content: errors.password, pointing: 'below' } : null} />
            <Button color='grey'>LOGIN</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}