import React, { useState } from 'react'
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'

import 'react-nice-dates/build/style.css'


function DatePicker2(props) {
  const [date, setDate] = useState()
  return (
    <DatePicker date={date} onDateChange={setDate} locale={enGB}>
      {({ inputProps, focused }) => (

        <input
        className={"uk-input uk-form-width-large uk-margin-bottom " + 'input' + (focused ? ' -focused' : '')} 
          onChange={props.callbackFunction}
          id="date"
          type="text"
          value={props.passedStateValue}
          {...inputProps}
        />

      )}
    </DatePicker>
  )
}

export default DatePicker2