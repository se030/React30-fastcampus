import React, { useCallback, useState } from 'react'
import { TableContainer, Typography, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import TimetableRow from './TimetableRow';
import { withStyles } from "@mui/styles";
import AddBoxIcon from '@mui/icons-material/AddBox';
import InputModal from '../inputModal/inputModal';
import { useRecoilValue } from 'recoil';
import { timetableState } from '../store/store';

const hourData = Array.from({length: 11}, (i,j)=>j+9); // [9, 10, ... 19]
const styles = () => ({
    Table: {
        "& th, td": {
            border: "1px solid rgba(224, 224, 224, 1)"
        }
    }
})

function Timetable({classes}) {
    const timetableData = useRecoilValue(timetableState);

    const [ showModal, setshowModal ] = useState(false);
    const [ editInfo, seteditInfo ] = useState({})

    const handleClose = useCallback(() => {
        setshowModal(false);
        seteditInfo({});
    }, []);
    const Edit = useCallback((day, id) => {
        const { start, end, name, color } = timetableData[day].find((lectureInfo) => lectureInfo.id === id);
        seteditInfo({
            dayData: day,
            startTimeData: start,
            endTimeData: end,
            lectureNameData: name,
            colorData: color,
            idNum: id
        })
        setshowModal(true);
    }, [timetableData])

  return (
    <>
    <TableContainer sx={{width:"80%", minWidth:"650px", margin:"200px auto auto auto"}}>
        <Typography variant="h5" fontWeight={10} component="div" align="center">
            Timetable
        </Typography>
        <Button
            variant="contain" sx={{float:"right"}} endIcon={<AddBoxIcon />}
            onClick={() => setshowModal(true)}
        >Add</Button>
        <Table className={classes.Table}>
            <TableHead>
                <TableRow>
                    <TableCell align="center" width={100}>Time</TableCell>
                    <TableCell align="center" width={200}>Mon</TableCell>
                    <TableCell align="center" width={200}>Tue</TableCell>
                    <TableCell align="center" width={200}>Wed</TableCell>
                    <TableCell align="center" width={200}>Thur</TableCell>
                    <TableCell align="center" width={200}>Fri</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {hourData.map( (time, idx) => (
                    <TableRow key={idx}>
                        <TableCell align="center">{`${time}:00-${time+1}:00`}</TableCell>
                        <TimetableRow timeNum={time} Edit={Edit} ></TimetableRow>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    <InputModal showModal={showModal} handleClose={handleClose} {...editInfo}></InputModal>
    </>
  )
}

export default withStyles(styles)(Timetable)