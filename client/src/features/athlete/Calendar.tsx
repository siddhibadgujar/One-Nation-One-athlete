import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const TrainingCalendar = () => {
  const [value, setValue] = useState<Date>(new Date());
  return (
    <div className="glass p-3 rounded">
      <Calendar value={value} onChange={(v: any) => setValue(v as Date)} />
    </div>
  );
};
