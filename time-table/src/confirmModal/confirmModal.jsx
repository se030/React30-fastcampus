import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

function ConfirmModal({open, handleClose, handleDelete}) {
  return (
    <Dialog open={open}>
        <DialogTitle></DialogTitle>
        <DialogContent>
            <DialogContentText>
                Delete this lecture?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete}>Confirm</Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmModal