import { Button, Card, Container, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useEvents } from 'src/hooks/useEvents'
import EventAPI from '../api/apiController'
import CustomView from 'src/components/Calendar/customView'

const EventDetail = () => {
  let { eventId } = useParams()
  const navigate = useNavigate();
  const { loading, event, ...eventActions } = useEvents(eventId);
  useEffect(() => {
    if (!event && !loading) {
      navigate(`/404`);
    }
  }, [event, eventId, loading, navigate]);


  return (
    <>
      <Helmet>
        <title> Event </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Event Detail Page
          </Typography>
        </Stack>
        {event?._id &&
          <div>
            <Typography variant="subtitle1">
              Share This Link With Your Friends! {`${process.env.REACT_APP_URL}/Event/${eventId}`}
            </Typography>
            <Card>
              <CustomView event={event} action={eventActions} />
            </Card>
            <Button variant="contained" sx={{ m: '1rem' }} onClick={
              () => {
                eventActions.updateEvent({ ...event})
                navigate(`/event/${eventId}/result`)
              }
            }>
              Submit
            </Button>
          </div>
        }
      </Container>
    </>
  )
}

export default EventDetail