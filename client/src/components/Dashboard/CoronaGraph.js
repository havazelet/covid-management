import React, { useState , useEffect } from 'react';
import UtilsService from '../../UtilsService';
import { XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { format, subMonths, eachDayOfInterval } from 'date-fns';

const today = new Date();
const lastMonth = subMonths(today, 1);
const allDaysOfLastMonth = eachDayOfInterval({ start: lastMonth, end: today });
const utilsService = new UtilsService();

const CoronaGraph = (props) => {
    const [coronaDetails, setCoronaDetails] = useState([]);
    
    useEffect(() => {      
        utilsService.getItems("http://localhost:3001/api/corona").then(res => setCoronaDetails(res));
    }, []);

    const formattedData = allDaysOfLastMonth.map(date => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const numOfPeople = coronaDetails && coronaDetails.reduce((count, record) => {
        if (record.sicknessPeriod.getSickness <= date.toISOString() && record.sicknessPeriod.recoveryDate >= date.toISOString()) {
            return count + 1;
            } else {
            return count;
            }
        }, 0);
        return { day: formattedDate, numOfPeople };
    });

    const sumOfNotVaccinatedCustomers = () => {
        const sumOfVaccinatedCustomers = coronaDetails.reduce((count, record) =>{
        if (record.vaccinationDate.length) {
            return count + 1;
        }
        return count;
    }, 0);
    return props.customersSum - sumOfVaccinatedCustomers;
   }

    return (
        <div className='flex bg-gray-50'>
            <div className='text-4xl border bg-green-300  my-4 mx-4 pt-10 px-4'>מספר הלקוחות שאינם מחוסנים הינו {sumOfNotVaccinatedCustomers()} מתוך {props.customersSum} כלל המטופלים</div>
            <div>
                <BarChart width={730} height={250} data={formattedData} margin={{top: 20, right: 20, bottom: 20, left: 20}} >
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="numOfPeople" fill="#67cf92" />
                </BarChart>
            </div>
        </div>
    );
}

export default CoronaGraph;
