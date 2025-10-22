import React, { useState } from 'react';
import { 
  Paper, 
  Box, 
  TextField, 
  InputAdornment,
  Stack,
  Typography,
  Popper,
  ClickAwayListener,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Modal
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import destinationsData from '../data/destinations.json';
import DatePicker from './DatePicker';
import GuestsDropdown from './GuestsDropdown';

const SearchForm: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [dateAnchorEl, setDateAnchorEl] = useState<null | HTMLElement>(null);
  const [dateRange, setDateRange] = useState<{startDate: Date | null; endDate: Date | null}>({startDate: null, endDate: null});
  const [guestsAnchorEl, setGuestsAnchorEl] = useState<null | HTMLElement>(null);
  const [guestInfo, setGuestInfo] = useState({
    adults: 2,
    children: 0,
    rooms: 1
  });
  
  const handleLocationClick = (event: React.MouseEvent<HTMLElement>) => {
    setDateAnchorEl(null); // Close date picker if open
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };
  
  const handleDateClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null); // Close location dropdown if open
    // Toggle date picker visibility
    setDateRange(prev => ({...prev})); // Force re-render
    setDateAnchorEl(dateAnchorEl ? null : event.currentTarget);
  };

  const handleDateClickAway = () => {
    setDateAnchorEl(null);
  };

  const handleDateSelect = (startDate: Date | null, endDate: Date | null) => {
    setDateRange({ startDate, endDate });
    if (startDate && endDate) {
      setDateAnchorEl(null);
    }
  };

  const handleGuestsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null); // Close location dropdown if open
    setDateAnchorEl(null); // Close date picker if open
    setGuestsAnchorEl(event.currentTarget);
  };

  const handleGuestsClose = () => {
    setGuestsAnchorEl(null);
  };

  const handleGuestInfoChange = (adults: number, children: number, rooms: number) => {
    setGuestInfo({ adults, children, rooms });
    setGuestsAnchorEl(null);
  };

  const formatDateRange = () => {
    if (!dateRange.startDate && !dateRange.endDate) return 'Check-in date — Check-out date';
    
    const formatDate = (date: Date | null) => {
      if (!date) return '';
      return new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }).format(date);
    };
    
    if (dateRange.startDate && dateRange.endDate) {
      return `${formatDate(dateRange.startDate)} — ${formatDate(dateRange.endDate)}`;
    }
    
    return dateRange.startDate ? `${formatDate(dateRange.startDate)} — Check-out date` : 'Check-in date — Check-out date';
  };

  const formatGuestInfo = () => {
    const { adults, children, rooms } = guestInfo;
    return `${adults} ${adults === 1 ? 'adult' : 'adults'} · ${children} ${children === 1 ? 'child' : 'children'} · ${rooms} ${rooms === 1 ? 'room' : 'rooms'}`;
  };

  const open = Boolean(anchorEl);
  const dateOpen = Boolean(dateAnchorEl);
  const guestsOpen = Boolean(guestsAnchorEl);

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 1 }}>
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={2}
      >
        <Box sx={{ flex: 1, position: 'relative' }}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              <TextField
                fullWidth
                placeholder="Where are you going?"
                variant="outlined"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClick={handleLocationClick}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <Popper 
                open={open} 
                anchorEl={anchorEl}
                placement="bottom-start"
                style={{ 
                  zIndex: 1000, 
                  width: anchorEl?.offsetWidth,
                  marginTop: '2px'
                }}
              >
                <Paper 
                  elevation={3} 
                  sx={{ 
                    width: '100%', 
                    maxHeight: '300px', 
                    overflow: 'auto',
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    bgcolor: 'white'
                  }}
                >
                  <Typography 
                    sx={{ 
                      p: 1.5, 
                      fontWeight: 'bold',
                      borderBottom: '1px solid #f0f0f0',
                      fontSize: '14px'
                    }}
                  >
                    Trending destinations
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {destinationsData.trendingDestinations.map((destination) => (
                      <ListItem 
                        key={destination.id}
                        button
                        onClick={() => {
                          setSearchValue(destination.city);
                          setAnchorEl(null);
                        }}
                        sx={{ 
                          py: 1,
                          '&:hover': { bgcolor: '#f5f5f5' }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: '40px' }}>
                          <LocationOnIcon sx={{ color: '#71767b', fontSize: '20px' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={destination.city}
                          secondary={destination.country}
                          primaryTypographyProps={{ 
                            fontWeight: 'medium',
                            fontSize: '14px'
                          }}
                          secondaryTypographyProps={{
                            fontSize: '12px',
                            color: '#71767b'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Popper>
            </div>
          </ClickAwayListener>
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon color="action" />
                </InputAdornment>
              ),
              readOnly: true,
            }}
            value={formatDateRange()}
            onClick={handleDateClick}
          />
          <Modal
            open={dateOpen}
            onClose={handleDateClickAway}
            aria-labelledby="date-picker-modal"
            BackdropProps={{
              onClick: handleDateClickAway,
              sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
            }}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              mt: 10
            }}
          >
            <Box 
              onClick={(e) => e.stopPropagation()}
              sx={{ 
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            >
              <DatePicker 
                onSelectDate={handleDateSelect} 
                selectedStartDate={dateRange.startDate} 
                selectedEndDate={dateRange.endDate} 
              />
            </Box>
          </Modal>
        </Box>

        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
              readOnly: true,
            }}
            value={formatGuestInfo()}
            onClick={handleGuestsClick}
          />
        </Box>

        <Box>
          <Box 
            component="button"
            sx={{
              bgcolor: '#0071c2',
              color: 'white',
              fontWeight: 'bold',
              py: 1.5,
              px: 4,
              border: 'none',
              borderRadius: 1,
              cursor: 'pointer',
              width: { xs: '100%', md: 'auto' },
              '&:hover': {
                bgcolor: '#005999'
              }
            }}
          >
            Search
          </Box>
        </Box>
      </Stack>

      {/* <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <input type="checkbox" id="flights" style={{ marginRight: '8px' }} />
        <Typography component="label" htmlFor="flights" variant="body2">
          I'm looking for flights
        </Typography>
      </Box> */}

      <Modal
        open={guestsOpen}
        onClose={handleGuestsClose}
        aria-labelledby="guests-modal"
        aria-describedby="guests-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }
        }}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          mt: 10
        }}
      >
        <GuestsDropdown 
          onClose={handleGuestsClose}
          onApply={handleGuestInfoChange}
          initialAdults={guestInfo.adults}
          initialChildren={guestInfo.children}
          initialRooms={guestInfo.rooms}
        />
      </Modal>
    </Paper>
  );
};

export default SearchForm;