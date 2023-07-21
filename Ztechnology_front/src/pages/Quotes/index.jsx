import React, {useState} from 'react'
import { Container } from '@mui/material';
import CreateQuote from '../../components/molecules/Quote/CreateQuote/CreteQuote';
import ListQuotes from '../../components/molecules/Quote/ListQuotes/ListQuotes';
import SendQuote from '../../components/molecules/Quote/SendQuote/SendQuote';
import UpdateQuote from '../../components/molecules/Quote/UpdateQuote/UpdateQuote';


function Quotes() {
    const [load, setLoad] = useState(false)
    const [client, setClient] = useState('')
    const [quote, setQuote] = useState('')
    const [idUpdate, setIdUpdate] = useState('');

  return (
    <Container maxWidth='lg' sx={{mt:5}}>
      
    <CreateQuote load={load} setLoad={setLoad}/>
    <ListQuotes load={load} setLoad={setLoad} setClient={setClient} setQuote={setQuote} setIdUpdate={setIdUpdate}/>
    <SendQuote client={client} quote={quote}  load={load} setLoad={setLoad} />
    <UpdateQuote idUpdate={idUpdate} load={load} setLoad={setLoad}/>
    </Container>
  )
}

export default Quotes