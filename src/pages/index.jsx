import { Grid } from 'semantic-ui-react';

export default function Index() {
  //TODO- Add user info, purposes count and completed count
  return (
    <Grid centered verticalAlign='middle' columns={1} style={{ height: '80vh' }}>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <h1>Hello! This is your purpose list</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  )
}
