import axios from 'axios'
import { useRouter } from 'next/router'
import { Button, Card, Container, Grid } from 'semantic-ui-react'

export default function Index({ data }) {

  const router = useRouter()

  const { user, purposes } = data
  const incompletedPurposes = purposes.filter((p) => !p.completed)
  const completedPurposes = purposes.length - incompletedPurposes.length
  const showList = incompletedPurposes.slice(0,3)
  const emptyList = showList.length === 0

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={2}
      style={{ height: "70vh" }}
    >
      <Grid.Row style={{ height: "5vh" }}>
        <h1>Hello {user.username}! This is your personal info</h1>
      </Grid.Row>
      <Grid.Row style={{ height: "2vh" }}>
        <h2>EMAIL: {user.email}</h2>
      </Grid.Row>
      <Grid.Row style={{ height: "2vh" }}>
        <h2>TOTAL PURPOSES: {purposes.length} | COMPLETED: {completedPurposes}</h2>
      </Grid.Row>
      {!emptyList && <Grid.Row style={{ height: "2vh" }}>
        <h3>HERE ARE SOME TO FINISH</h3>
      </Grid.Row>}
      <Container>
        <Card.Group itemsPerRow={3}>
          {showList.map((purpose) =>
            <Card key={purpose._id}>
              <Card.Content>
                <Card.Header>{purpose.title}</Card.Header>
                <Card.Description>{purpose.description}</Card.Description>
              </Card.Content>
            </Card>
          )}
        </Card.Group>
        <Button style={{margin: '5vh'}} color='orange' 
        onClick={() => router.push('/purposes')}>SHOW ALL</Button>
      </Container>
    </Grid >
  )
}

export const getServerSideProps = async ({ req }) => {

  const { data: { data } } = await axios.get(`http://${req.headers.host}/api/user/info`, {
    headers: {
      Cookie: req.headers.cookie
    }
  })

  return {
    props: { data }
  }
}
