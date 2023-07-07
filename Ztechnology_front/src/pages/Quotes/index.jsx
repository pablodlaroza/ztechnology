import React, {useState} from 'react'
import { Container } from '@mui/material';
import CreateQuote from '../../components/molecules/Quote/CreateQuote/CreteQuote';
import ListQuotes from '../../components/molecules/Quote/ListQuotes/ListQuotes';


function Quotes() {
    const [load, setLoad] = useState(false)
  return (
    <Container maxWidth='lg' sx={{mt:5}}>
      
    <CreateQuote load={load} setLoad={setLoad}/>
    <ListQuotes load={load} setLoad={setLoad}/>
    </Container>
  )
}

export default Quotes