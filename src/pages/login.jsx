import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'

export default function LoginPage() {

  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const router = useRouter()

  const onChangeInput = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }

  const login = async (event) => {
    event.preventDefault()
    if (credentials.email === '' || credentials.password === '') return
    const login = await axios.post('/api/auth/login', credentials)
    login.status === 200 && router.push('/purposes')
  }

  return (
    <Grid centered verticalAlign='middle' columns={3} style={{ height: '80vh' }}>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Form onSubmit={login}>
            <Form.Input name='email' type='email' placeholder='Email' onChange={onChangeInput}/>
            <Form.Input name='password' type='password' placeholder='Password' onChange={onChangeInput}/>
            <Button color='grey'>LOGIN</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}