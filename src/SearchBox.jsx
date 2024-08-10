import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import {useState} from "react";
export default function SearchBox({updateInfo}){
   let[city,setCity]=useState("");
   let[error,setError]=useState(false);
   const API_URL="http://api.openweathermap.org/data/2.5/weather"
   const API_KEY="a9481eb0df6f8cfe8b1810ed38f3735f"
   let getWeatherInfo=async()=>{
      try{
         let response= await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
         let jsonResponse=await response.json();
         console.log(jsonResponse);
         let result={
          city:city,
          temp:jsonResponse.main.temp,
          tempMin:jsonResponse.main.temp_min,
          tempMax:jsonResponse.main.temp_max,
          humidity:jsonResponse.main.humidity,
          feelsLike:jsonResponse.main.feelsLike,
          weather:jsonResponse.weather[0].description
         };
         console.log(result);
         return result;
       }
      
    catch(err){
         throw err;
   }}
   
   let handleChange=(event)=>{
      setCity(event.target.value);
   }
   let handleSubmit=async(event)=>{
      try{event.preventDefault();
         console.log(city);
         setCity("");
         let newInfo=await getWeatherInfo();
         updateInfo(newInfo);
      }catch{
          setError(true);
      }}
      
   return(<div className="SearchBox">
   <form onSubmit={handleSubmit}> <TextField  style={{backgroundColor:"white"}}id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange}/> 
   <br /> <br />
    <Button style={{textAlign:"center"}}variant="contained" type="submit">
        Search
      </Button>
      {error && <p style={{color:"red"}}>No such place exists</p>}</form>
   </div>)
} 