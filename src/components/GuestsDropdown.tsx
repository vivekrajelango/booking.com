import React, { useState } from 'react';
import { Box, Typography, IconButton, Divider, Button, Switch, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface GuestsDropdownProps {
  onClose: () => void;
  onApply: (adults: number, children: number, rooms: number) => void;
  initialAdults?: number;
  initialChildren?: number;
  initialRooms?: number;
}

const GuestsDropdown: React.FC<GuestsDropdownProps> = ({
  onClose,
  onApply,
  initialAdults = 2,
  initialChildren = 0,
  initialRooms = 1
}) => {
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);
  const [rooms, setRooms] = useState(initialRooms);
  const [travelingWithPets, setTravelingWithPets] = useState(false);

  const handleIncrement = (type: 'adults' | 'children' | 'rooms') => {
    if (type === 'adults') {
      setAdults(prev => Math.min(prev + 1, 30));
    } else if (type === 'children') {
      setChildren(prev => Math.min(prev + 1, 10));
    } else {
      setRooms(prev => Math.min(prev + 1, 30));
    }
  };

  const handleDecrement = (type: 'adults' | 'children' | 'rooms') => {
    if (type === 'adults') {
      setAdults(prev => Math.max(prev - 1, 1));
    } else if (type === 'children') {
      setChildren(prev => Math.max(prev - 1, 0));
    } else {
      setRooms(prev => Math.max(prev - 1, 1));
    }
  };

  const handleDone = () => {
    onApply(adults, children, rooms);
    onClose();
  };

  return (
    <Box sx={{ 
      width: '320px', 
      backgroundColor: 'white', 
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      p: 2
    }}>
      {/* Adults */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body1">Adults</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            size="small" 
            onClick={() => handleDecrement('adults')}
            disabled={adults <= 1}
            sx={{ 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              p: 0.5,
              color: adults <= 1 ? '#ccc' : '#333'
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ mx: 2, minWidth: '20px', textAlign: 'center' }}>{adults}</Typography>
          <IconButton 
            size="small" 
            onClick={() => handleIncrement('adults')}
            disabled={adults >= 30}
            sx={{ 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              p: 0.5,
              color: adults >= 30 ? '#ccc' : '#333'
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Children */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body1">Children</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            size="small" 
            onClick={() => handleDecrement('children')}
            disabled={children <= 0}
            sx={{ 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              p: 0.5,
              color: children <= 0 ? '#ccc' : '#333'
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ mx: 2, minWidth: '20px', textAlign: 'center' }}>{children}</Typography>
          <IconButton 
            size="small" 
            onClick={() => handleIncrement('children')}
            disabled={children >= 10}
            sx={{ 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              p: 0.5,
              color: children >= 10 ? '#ccc' : '#333'
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Rooms */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body1">Rooms</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            size="small" 
            onClick={() => handleDecrement('rooms')}
            disabled={rooms <= 1}
            sx={{ 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              p: 0.5,
              color: rooms <= 1 ? '#ccc' : '#333'
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ mx: 2, minWidth: '20px', textAlign: 'center' }}>{rooms}</Typography>
          <IconButton 
            size="small" 
            onClick={() => handleIncrement('rooms')}
            disabled={rooms >= 30}
            sx={{ 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              p: 0.5,
              color: rooms >= 30 ? '#ccc' : '#333'
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Traveling with pets */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1">Travelling with pets?</Typography>
          <Switch 
            checked={travelingWithPets}
            onChange={(e) => setTravelingWithPets(e.target.checked)}
            color="primary"
          />
        </Box>
        {travelingWithPets && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Assistance animals aren't considered pets.
            <Box component="span" sx={{ color: '#006ce4', ml: 0.5, cursor: 'pointer' }}>
              Read more about travelling with assistance animals
            </Box>
          </Typography>
        )}
      </Box>

      {/* Done button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button 
          variant="contained" 
          fullWidth
          onClick={handleDone}
          sx={{ 
            backgroundColor: '#006ce4',
            '&:hover': {
              backgroundColor: '#00509e'
            }
          }}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
};

export default GuestsDropdown;