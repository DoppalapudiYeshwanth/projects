import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import generateData from './helper';
import DisplayBox from './DisplayBox';

export default function SearchBox(){

    let [city, setCity] = useState("");
    let [weatherReport, setWeatherReport] = useState(null);


    
    let handleChange = (event)=>{

        setCity((prevCity)=>{
            return prevCity = event.target.value;
        })
        console.log(city);
    }

    let handleSubmit = async(event)=>{
        event.preventDefault();
        let data = await generateData(city);
        setWeatherReport(data);
        setCity("");
        console.log(data);
    }

    return(
        <>  
        <h2>Search for the City.</h2>
        <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Search for the city." variant="outlined" required value={city} onChange={handleChange}/>
      <Button variant="contained" endIcon={<SendIcon />} sx={{ '& > :not(style)': { m: 1.4, width: '2ch' } }} type='Submit' onClick={handleSubmit}>
        Search
      </Button><br /><br />
    </Box>
    <DisplayBox sendWeatherReport={weatherReport}></DisplayBox>
    </>
    )
}
