import axios from 'axios'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button, Confirm, Grid } from 'semantic-ui-react'

export default function PurposeDetail({ purpose, error }) {

  const [confirm, setConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const open = () => setConfirm(true)
  const close = () => setConfirm(false)

  const deleteClick = async () => {
    setIsLoading(true)
    const deleted = await axios.delete(`/api/purposes/${purpose._id}`)
    close()
    deleted.status === 204 && router.push('/purposes')
  }

  if (error) return <Error title={error} statusCode={404} />

  return (
    <Grid centered verticalAlign='middle' columns={1} style={{ height: '80vh' }}>
      <Grid.Column textAlign='center'>
        <h1>{purpose.title}</h1>
        <p>{purpose.description}</p>
        <div>
          <Button negative onClick={open} loading={isLoading}>Delete</Button>
        </div>
      </Grid.Column>
      <Confirm 
      header='Please confirm' content='Are you sure you want to delete?'
      open={confirm} onCancel={close} onConfirm={deleteClick}/>
    </Grid>
  )
}

export const getServerSideProps = async ({ query: { id }, req }) => {

  try {
    const { data } = await axios.get(`http://localhost:3000/api/purposes/${id}`, {
      headers: {
        Cookie: req.headers.cookie
      }
    })

    const purpose = data.data?.purpose || null
    return {
      props: { purpose, error: null }
    }
  } catch (err) {
    return {
      props: { purpose: null, error: 'Purpose not found' }
    }
  }
}