import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Connection from './Сonnection';
import WorkSettings from './WorkSettings';
import Tasks from './Tasks';
import DistributionOfTasks from './DistributionOfTasks';
import "../App.css";

// TODO Уменьшить размер полей с настройками 
// Увеличить кнопки запуска проверки
// Перенести проверку задачи по id на первую вкладку
// Отвязать выбор в выпадающих списках друг от друга

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box className="floating-button-container">{children}</Box>}
    </Typography>
  );
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

export default function FloatingActionButtonZoom() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box className="floating-button-container"
    //TODO кинуть в css
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          className="tab-buttons"
        >
          <Tab label="Подключение" {...a11yProps(0)} className="tab-button" />
          <Tab label="Настройки работы" {...a11yProps(1)} className="tab-button" />
          <Tab label="Задачи" {...a11yProps(2)} className="tab-button" />
          <Tab label="Распределение задач" {...a11yProps(3)} className="tab-button" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <Connection />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WorkSettings />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Tasks />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <DistributionOfTasks />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
