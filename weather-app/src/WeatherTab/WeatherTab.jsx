import React from 'react'
import { Box, Tabs, Tab } from "@mui/material"
import { useState } from 'react'
import WeatherGraph from '../WeatherGraph/WeatherGraph';
import HumidityGraph from '../HumidityGraph/HumidityGraph';
import 'swiper/scss'
import 'swiper/scss/navigation'

function TabPanel({children, value, index}) {
    return (
        <div hidden={value !== index}>
            {value == index && <Box>{children}</Box>}
        </div>
    )
}

function WeatherTab() {
  const [value, setvalue] = useState(0);
  const handleChange = (event, newValue) => setvalue(newValue);
    return (
    <Box sx={{width:"100%"}}>
        <Box sx={{borderBottom:1, borderColor: "divider"}}>
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
                <Tab label="날씨" />
                <Tab label="습도" />
                <Tab label="바람" />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <WeatherGraph />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <HumidityGraph />
        </TabPanel>
        <TabPanel value={value} index={2}>
            3
        </TabPanel>
    </Box>
  )
}

export default WeatherTab