import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    Button, 
    TextField, 
    DialogActions, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    RadioGroup, 
    Radio, 
    Stack, 
    MenuItem
} from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { timetableState } from '../store/store'
import { v4 as uuidv1 } from 'uuid'

const timeOptions = new Array(12).fill(null).map((e,i) => ({value: i+9, label: i+9}))

function InputModal({ showModal, handleClose,
    dayData='mon', startTimeData=9, endTimeData=10, lectureNameData='', colorData='##ccff99', idNum
}) {
    
    const {
        formState:{errors}, 
        control, 
        getValues, 
        handleSubmit, 
        reset
    } = useForm();
    const [ timetableData, settimetableData ] = useRecoilState(timetableState);
    const checkOverLap = (A, B) => B.start < A.start? B.end > A.start : B.start < A.end;

    // content update
    useEffect(() => {
        if (showModal) {
            reset({
                lectureName: lectureNameData,
                day: dayData,
                startTime: startTimeData,
                endTime: endTimeData,
                lectureColor: colorData
            })
        }
    }, [showModal, reset, dayData, startTimeData, endTimeData, lectureNameData, colorData])

    const Submit = useCallback( ( {lectureName, day, startTime, endTime, lectureColor} ) => {
        let valid = true;
        for (let idx=0; idx < timetableData[day].length; idx++) {
            if (checkOverLap(timetableData[day][idx], {start: startTime, end: endTime})) {
                valid = false;
                break;
            }
        }
        if (!valid) {
            alert("There already exists another lecture in this time slice!");
            return;
        }
        const data = {
            start: startTime,
            end: endTime,
            name: lectureName,
            color: lectureColor,
            id: uuidv1()
        }
        settimetableData((old) => ({
            ...old,
            [day]: [...old[day], data]
        }))

        handleClose();
    }, [timetableData, settimetableData, handleClose]);
    const Edit = useCallback( ( {lectureName, day, startTime, endTime, lectureColor} ) => {
        let valid = true;
        for (let idx=0; idx < timetableData[day].length; idx++) {
            if (checkOverLap(timetableData[day][idx], {start: startTime, end: endTime}) && timetableData[day][idx]["id"] !== idNum) {
                valid = false;
                break;
            }
        }
        if (!valid) {
            alert("There already exists another lecture in this time slice!");
            return;
        }

        const filterDayData = [ ...timetableData[dayData].filter(data => data.id !== idNum) ];
        const newTimetableData = {
            ...timetableData,
            [dayData]: filterDayData // filter out the existing ttData
        }
        const newDayData = [ ...newTimetableData[day],
            {
                start: startTime,
                end: endTime,
                name: lectureName,
                color: lectureColor,
                id: idNum
            }
        ]
        settimetableData({
            ...newTimetableData,
            [day]: newDayData // and update the day data using the user input 'day'
        })

        handleClose()
    }, [dayData, handleClose, idNum, settimetableData, timetableData]);

  return (
    <Dialog open={showModal} onClose={handleClose}>
        <form onSubmit={handleSubmit(idNum? Edit : Submit)}>
            <DialogTitle>Lecture Information</DialogTitle>

            <DialogContent style={{width:"400px"}}>
                <Controller
                    control={control}
                    name="lectureName"
                    rules={{required: true}}
                    render={({field}) => (
                        <TextField 
                            { ...field }    
                            error={ !!errors.lectureName }
                            style={{marginTop:"30px", width:"350px"}}
                            label="Lecture Name"
                            autoComplete="off"
                        />
                    )}
                />
                {errors.lectureName?.type === 'required' && (
                    <p style={{color: "#d32f2f"}}>Please enter the lecture name.</p>
                )}
                <FormControl style={{marginTop:"30px"}}>
                    <FormLabel>Day</FormLabel>
                    <Controller
                        control={control}
                        name="day"
                        rules={{required: true}}
                        render={({field}) => (
                            <RadioGroup {...field} style={{display:"block"}}>
                                <FormControlLabel value="mon" control={<Radio />} label="Mon" />
                                <FormControlLabel value="tue" control={<Radio />} label="Tue" />
                                <FormControlLabel value="wed" control={<Radio />} label="Wed" />
                                <FormControlLabel value="thur" control={<Radio />} label="Thur" />
                                <FormControlLabel value="fri" control={<Radio />} label="Fri" />
                            </RadioGroup>
                        )}
                    />
                </FormControl>
                <Stack spacing={3} style={{marginTop: "30px", width: "350px"}}>
                    <Controller
                        control={control}
                        name="startTime"
                        rules={{required: true}}
                        render={({field}) => (
                            <TextField
                                {...field}
                                select
                                error={
                                    !!errors.startTime ||
                                    !!(errors.endTime?.type === "validate")
                                }
                                style={{marginTop: "30px", width: "350px"}}
                                label="startTime"
                                placeholder='Select Start Time'
                            >
                                {timeOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    {errors.startTime?.type === "required" && (
                        <p style={{ color: "#d32f2f" }}>Please select the start time.</p>
                    )}
                    <Controller
                        control={control}
                        name="endTime"
                        rules={{
                            required: true,
                            validate: (value) => getValues("startTime") < value
                        }}
                        render={({field}) => (
                            <TextField
                                {...field}
                                select
                                error={!!errors.endTime}
                                style={{marginTop: "30px", width: "350px"}}
                                label="endTime"
                                placeholder='Select End Time'
                            >
                                {timeOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    {errors.endTime?.type === "required" && (
                        <p style={{ color: "#d32f2f" }}>Please select the end time.</p>
                    )}
                    {errors.endTime?.type === "validate" && (
                        <p style={{ color: "#d32f2f" }}>Please check the start and end time.</p>
                    )}
                </Stack>
                <div>
                    <label htmlFor="lectureColor">Color</label>
                    <Controller 
                        control={control}
                        name="lectureColor"
                        render={({field}) => (
                            <input
                                {...field}
                                style={{marginTop:"30px"}}
                                id="lectureColor"
                                type="color"
                            />
                        )}
                    />
                </div>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Submit</Button>
            </DialogActions>
        </form>
    </Dialog>
  )
}

export default InputModal