import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';


export default function DeleteButton({id ,name, onClick}) {

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    onClick(id);
    handleClose();
  };

  return (
    <div>
    
      <IconButton color='primary' aria-label="eliminar" size="large" onClick={handleClickOpen}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>


      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`¿Esta seguro de eliminar ${name}?`}

        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Al aceptar se eliminara para siempre {name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
