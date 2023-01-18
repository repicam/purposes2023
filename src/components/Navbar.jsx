import { Button, Container, Menu } from 'semantic-ui-react'
import axios from 'axios'
import { useRouter } from 'next/router'

export const Navbar = ({ isLogged }) => {
  const router = useRouter()

  const onLogout = async () => {
    await axios.post('/api/auth/logout')
    router.push('/login')
  }

  return isLogged && (
    <Menu inverted style={{ padding: '10px' }}>
      <Container>
        <Menu.Menu position='left'>
          <Button positive onClick={() => router.push('/')}> My user </Button>
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Button primary onClick={() => router.push('/purposes/new')}> New purpose </Button>
          <Button negative onClick={onLogout}> Logout </Button>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}