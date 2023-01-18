import axios from 'axios'
import { useRouter } from 'next/router'
import { Button, Card, Container, Grid } from 'semantic-ui-react';

export default function PurposeList({ purposes }) {

  const router = useRouter()

  if (purposes.length === 0)
    return (
      <Grid centered verticalAlign='middle' columns={1} style={{ height: '80vh' }}>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <h1>There are no purposes yet</h1>
            <div>
              <Button primary onClick={() => router.push('/purposes/new')}>Add a new purpose</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )


  return (
    <Container>
      <Card.Group itemsPerRow={3}>
        {purposes.map((purpose) =>
          <Card key={purpose._id}>
            <Card.Content>
              <Card.Header>{purpose.title}</Card.Header>
              <Card.Description>{purpose.description}</Card.Description>
            </Card.Content>
            <Card.Content>
              <Button color='green'>Complete</Button>
              <Button color='orange' onClick={() => router.push(`/purposes/${purpose._id}`)}>View</Button>
              <Button primary>Edit</Button>
            </Card.Content>
          </Card>
        )}
      </Card.Group>
    </Container>
  )
}

export const getServerSideProps = async ({req}) => {

  const { data: { data } } = await axios.get('http://localhost:3000/api/purposes', {
    headers: {
      Cookie: req.headers.cookie
    }
  })

  const purposes = data.purposes
  return {
    props: { purposes }
  }
}
