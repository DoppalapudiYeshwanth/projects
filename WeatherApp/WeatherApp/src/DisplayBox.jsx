import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function DisplayBox({ sendWeatherReport }) {

  if (!sendWeatherReport) {
    return <p>No data yet. Search for a city.</p>;
  }

  const weatherList = [
    { label: "City", value: sendWeatherReport.name },
    { label: "Country", value: sendWeatherReport.country },
    { label: "Temperature", value: `${sendWeatherReport.temp} °C` },
    { label: "Max Temp", value: `${sendWeatherReport.temp_max} °C` },
    { label: "Min Temp", value: `${sendWeatherReport.temp_min} °C` },
    { label: "Wind Speed", value: `${sendWeatherReport.wind_speed} m/s` },
    { label: "Wind Degree", value: `${sendWeatherReport.wind_deg}°` },
    { label: "Wind Gust", value: sendWeatherReport.wind_gust || "N/A" },
    { label: "Weather", value: sendWeatherReport.weather_main },
    { label: "Description", value: sendWeatherReport.weather_description },
  ];

  return (
    <>
      <h2>Weather Data.</h2>

      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
          {weatherList.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemText 
                primary={item.label}
                secondary={item.value}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
