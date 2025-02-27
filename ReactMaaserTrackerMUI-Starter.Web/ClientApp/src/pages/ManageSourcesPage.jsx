import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageSourcesPage = () => {
  const [sources, setSources] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState('');
  const [editingSource, setEditingSource] = useState(null);


  const getSources = async () => {
    const { data } = await axios.get('/api/income/getincome');
    setSources(data);
  }

  useEffect(() => {
    getSources();
  }, [])

  const Edit = source => {
    setOpen(true);
    setSelectedSource(source.name);
    setEditingSource(source.id);
  }


  const handleOpen = (source = '') => {
    setOpen(true);
    setSelectedSource(source);
    setEditingSource(source);
  };

  const Update = async (editingSource, selectedSource) => {
    await axios.post('/api/income/update', { id: editingSource, Name: selectedSource })
    await getSources();
  }

  const handleClose = () => {
    setOpen(false);
    setSelectedSource('');
    setEditingSource(null);
  };

  const handleAddEdit = () => {

    if (editingSource) {
      //setSources(sources.map(source => source === editingSource ? selectedSource : source));
      Update(editingSource, selectedSource);
    } else {
      // setSources([...sources, selectedSource]);
      addIncomeSource(selectedSource);
    }
    handleClose();
  };

  const addIncomeSource = async () => {
    await axios.post('/api/income/addincome', { Name: selectedSource })
    await getSources();
  };

  const handleDelete = (id) => {
    setSources(sources.filter(source => source !== id));
    Delete(id);
  };

  const Delete = async (id) => {
    await axios.post('/api/income/delete', { id })
    await getSources();
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Button onClick={() => handleOpen()} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
          Add Source
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sources.map((source) => (
              <TableRow key={source.id}>
                <TableCell sx={{ fontSize: '18px' }}>{source.name}</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>
                  <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => Edit(source)}>Edit</Button>
                  <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleDelete(source.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{editingSource ? 'Edit Source' : 'Add Source'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Source" type="text" fullWidth value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEdit} color="primary">
            {editingSource ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ManageSourcesPage;
