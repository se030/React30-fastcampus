import React from 'react'
import TimetableCell from './TimetableCell'

function TimetableRow( {...props} ) {
  return (
    <>
        <TimetableCell day="mon" {...props}></TimetableCell>
        <TimetableCell day="tue" {...props}></TimetableCell>
        <TimetableCell day="wed" {...props}></TimetableCell>
        <TimetableCell day="thur" {...props}></TimetableCell>
        <TimetableCell day="fri" {...props}></TimetableCell>
    </>
  )
}

export default TimetableRow