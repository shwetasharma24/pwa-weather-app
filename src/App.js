import { useEffect } from 'react';
import fetchWeather from "./api/fetchWeather";
import './app.css';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [weatherHistory, setWeatherHistory] = useState([]);
  const rows = [];

  const search = async(e) => {
    if(e.key === 'Enter'){
      const data = await fetchWeather(query);
      // console.log(data);
      setWeather(data);
      rows.push({place:query});
      setWeatherHistory(weatherHistory.concat(query));
      // console.log(weatherHistory);
      // weatherHistory.map((currentSearch) => rows.push(createData(currentSearch)))
      // rows.push(recentSearches);
      setQuery(''); 
    }
  }

  //table style
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


  const classes = useStyles();

  return (
    
    <div className="main-container">

      <input 
        type="text"
        className="search"
        placeholder="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />



      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Recently Searched</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {weatherHistory.map((row) => (
            <TableRow key={row}>
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* <div style={{color:"white"}}>
      All Items
      {weatherHistory.map(item => {return <p>{item}</p>})}
    </div> */}



      {
        weather.main && (
          <div className="city">

            <h2 className="city-name">
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
            </h2>

            <div className="city-temp">
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </div>

            <div className="info">
              <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
              <p>{weather.weather[0].description}</p>
            </div>

          </div>
        )
      }

    </div>
  );
}

export default App;
