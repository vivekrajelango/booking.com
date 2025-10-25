import React, { useState } from 'react';
import { 
  Paper, 
  Box, 
  TextField, 
  Button, 
  InputAdornment, 
  Typography, 
  Modal,
  Stack,
  CircularProgress
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import DatePicker from './DatePicker';
import GuestsDropdown from './GuestsDropdown';
import HotelCard from './HotelCard';
import { searchHotels } from '../services/api';
import type { Hotel, SearchParams } from '../services/api';

const SearchForm: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [dateAnchorEl, setDateAnchorEl] = useState<null | HTMLElement>(null);
  const [dateRange, setDateRange] = useState<{startDate: Date | null; endDate: Date | null}>({startDate: null, endDate: null});
  const [guestsAnchorEl, setGuestsAnchorEl] = useState<null | HTMLElement>(null);
  const [guestInfo, setGuestInfo] = useState({
    adults: 2,
    children: 0,
    rooms: 1
  });
  const [searchResults, setSearchResults] = useState<Hotel[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleDateClick = (event: React.MouseEvent<HTMLElement>) => {
    // Toggle date picker visibility
    setDateRange(prev => ({...prev})); // Force re-render
    setGuestsAnchorEl(null); // Close guests dropdown if open
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
    setDateAnchorEl(null); // Close date picker if open
    setGuestsAnchorEl(event.currentTarget);
  };

  const handleGuestsClose = () => {
    setGuestsAnchorEl(null);
  };

  const handleGuestsSelect = (adults: number, children: number, rooms: number) => {
    setGuestInfo({ adults, children, rooms });
    setGuestsAnchorEl(null);
  };
  
  const isFormValid = () => {
    return (
      searchValue.trim() !== '' && 
      dateRange.startDate !== null && 
      dateRange.endDate !== null
    );
  };

  const handleSearch = async () => {
    if (!isFormValid()) return;
    
    setIsSearching(true);
    
    // Format dates for API call with timezone handling
    const formatDateToLocalISOString = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const fromDate = formatDateToLocalISOString(dateRange.startDate!);
    const toDate = formatDateToLocalISOString(dateRange.endDate!);
    
    const searchParams: SearchParams = {
      query: searchValue,
      from: fromDate,
      to: toDate,
      adults: guestInfo.adults,
      children: guestInfo.children
    };

    // Update URL with search parameters
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('checkIn', fromDate);
    urlSearchParams.set('checkOut', toDate);
    urlSearchParams.set('guests', String(guestInfo.adults + guestInfo.children));
    window.history.replaceState(null, '', `?${urlSearchParams.toString()}`);
    
    try {
      const results = await searchHotels(searchParams);
      setSearchResults(results);
      // Close any open dropdowns
      setDateAnchorEl(null);
      setGuestsAnchorEl(null);
    } catch (error) {
      console.error('Error searching hotels:', error);
    } finally {
      setIsSearching(false);
    }
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

  const dateOpen = Boolean(dateAnchorEl);
  const guestsOpen = Boolean(guestsAnchorEl);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 1, sm: 2 },
        borderRadius: 2,
        width: { xs: '95%', sm: '100%' },
        maxWidth: '100%',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        mx: 'auto'
      }}
    >
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={{ xs: 1.5, sm: 1 }}
        alignItems="stretch"
        sx={{ width: '100%' }}
      >
        <Box sx={{ flex: 1, position: 'relative', width: '100%' }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search Hotel or Location"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                height: { xs: '40px', sm: 'auto' }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon color="action" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                </InputAdornment>
              )
            }}
          />
        </Box>
        
        <Box sx={{ flex: 1, position: 'relative', width: '100%' }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            required
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                height: { xs: '40px', sm: 'auto' }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon color="action" />
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

        <Box sx={{ flex: 1, position: 'relative', width: '100%' }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                height: { xs: '40px', sm: 'auto' }
              }
            }}
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

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: { xs: 'center', sm: 'flex-start' },
            width: { xs: '100%', sm: 'auto' },
            mt: { xs: 1, sm: 0 }
          }}
        >
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            disabled={isSearching || !isFormValid()}
            sx={{ 
              height: { xs: '40px', sm: '56px' },
              borderRadius: '8px',
              px: { xs: 2, sm: 4 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              textTransform: 'none',
              boxShadow: 2,
              width: { xs: '100%', sm: 'auto' },
              '&.Mui-disabled': {
                backgroundColor: '#ccc',
                color: '#666'
              }
            }}
          >
            {isSearching ? <CircularProgress size={24} color="inherit" /> : 'Search'}
          </Button>
        </Box>
      </Stack>

      {/* <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <input type="checkbox" id="flights" style={{ marginRight: '8px' }} />
        <Typography htmlFor="flights" variant="body2">
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
          mt: { xs: 2, sm: 10 },
          p: { xs: 1, sm: 0 }
        }}
      >
        <GuestsDropdown 
          onClose={handleGuestsClose}
          onApply={handleGuestsSelect}
          initialAdults={guestInfo.adults}
          initialChildren={guestInfo.children}
          initialRooms={guestInfo.rooms}
        />
      </Modal>
      
      {/* Search Results Section */}
      {searchResults.length > 0 && (
        <Box sx={{ mt: 4, width: '100%' }}>
          <Box>
            {searchResults.map((hotel) => (
              <HotelCard key={hotel.hotelId} hotel={hotel} />
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default SearchForm;