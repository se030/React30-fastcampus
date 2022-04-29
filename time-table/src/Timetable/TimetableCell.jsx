import React, { useCallback, useMemo, useState } from 'react'
import {TableCell} from '@mui/material'
import { useRecoilState } from 'recoil'
import { timetableState } from '../store/store'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ConfirmModal from '../confirmModal/confirmModal'

function TimetableCell({day, timeNum, Edit}) {
  
    const [ timetableData, settimetableData ] = useRecoilState(timetableState);
    const [ hover, sethover ] = useState(false);
    const [ open, setopen ] = useState(false);

    const timeData = useMemo( () =>
        timetableData[day].find((time) => time.start <= timeNum && timeNum < time.end)
    );
    const handleEdit = useCallback(() => Edit(day, timeData.id), [Edit, day, timeData?.id])
    const handleDelte = useCallback(() => {
        settimetableData((old) => {
            const newDayData = old[day].filter(data => data.id !== timeData.id);
            return {
                ...old,
                [day]: newDayData
            }
        });
        setopen(false);
    }, [day, settimetableData, timeData?.id])
    
    const handleConfirm = useCallback(() => setopen(true), []);
    const handleClose = useCallback(() => setopen(false), []);

    return (
        <>
        {
            timeData?.start === timeNum
            ? <TableCell 
                style={{backgroundColor:timeData.color, position:"relative"}} 
                align="center"
                rowSpan={timeData.end-timeData.start}
                onMouseOver={()=>sethover(true)}
                onMouseLeave={()=>sethover(false)}
            >
                {timeData.name}
                {hover? (
                    <div style={{position:"absolute", top: 5, right: 5}}>
                        <EditIcon style={{cursor:'pointer'}} onClick={handleEdit}></EditIcon>
                        <DeleteIcon style={{cursor:'pointer'}} onClick={handleConfirm}></DeleteIcon>
                    </div>
                ) : null}
            </TableCell>
            : timeData?.start < timeNum && timeNum < timeData?.end? null
            : <TableCell />
        }
        <ConfirmModal
            open={open}
            handleClose={handleClose}
            handleDelete={handleDelte}
        ></ConfirmModal>
        </>
    )
}

export default TimetableCell