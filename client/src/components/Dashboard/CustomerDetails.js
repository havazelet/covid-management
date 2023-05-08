import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import UtilsService from '../../UtilsService';
import ImageUpload from './ImageUpload';


const CustomerDetails = () => {
    const { state } = useLocation();
    const urlPrm = useParams().id;
    const navigate = useNavigate();
    const [customerCoronaDetails, setCustomerCoronaDetails] = useState(null);

    useEffect(() => {
        if (!state) {
            navigate('/login');
        } 
        const utilsService = new UtilsService();
        utilsService.getCoronabyCustomerId("http://localhost:3001/api/corona", urlPrm).then(data => setCustomerCoronaDetails(data)).catch(error => setCustomerCoronaDetails(error));;           
    }, [urlPrm]);

    if (customerCoronaDetails?.code ===  "ERR_BAD_REQUEST") {
        return <div>{customerCoronaDetails.response.data}</div>;
    }

    if (!customerCoronaDetails) {
        return <div>Loading...</div>;
    }

    
    return (
        <div className='mb-20'>
            <div className='bg-blue-100'>
                <h1 className='mt-10 mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'> פרטי מטופל {state.customer.name}</h1>
           </div>
           <div className='text-right'> {state.customer.imageUrl && <img style={{width: "100px", height: "100%"}} src={state.customer.imageUrl} alt="Uploade" />} </div>
           <div className='text-right'>
            <table className='text-right w-full mt-14 text-2xl'>
                <tbody className='text-right'>
                    <tr className='text-right'>
                        <td className='text-right'>{state.customer.name}</td>
                        <td>שם מלא</td>
                    </tr>
                    <tr>
                        <td>{state.customer.id}</td>
                        <td>תעודת זהות</td>
                    </tr>
                    <tr>                  
                        <td>{state.customer.address}</td>
                        <td>כתובת</td>
                    </tr>
                    <tr>                  
                        <td>{state.customer.birthDate}</td>
                        <td>תאריך לידה</td>
                    </tr>
                    <tr>                  
                        <td>{state.customer.phoneNumber}</td>
                        <td>טלפון</td>
                    </tr>
                    <tr>                  
                        <td>{state.customer.mobile}</td>
                        <td>טלפון נייד</td>
                    </tr>
                    <tr>                  
                        <td>{customerCoronaDetails.vaccinationDate?.map((date,index)=><div key={date+index}>{date}</div>)}</td>
                        <td>מועדי קבלת חיסון קורונה</td>
                    </tr>
                    <tr>                  
                        <td>{customerCoronaDetails.vaccinationDateMaker}</td>
                        <td>יצרן החיסון</td>
                    </tr>
                    <tr>                  
                        <td>{customerCoronaDetails.sicknessPeriod.getSickness}</td>
                        <td>מועד קבלת תוצאה חיובית</td>
                    </tr>
                    <tr>                  
                        <td>{customerCoronaDetails.sicknessPeriod.recoveryDate}</td>
                        <td>מועד החלמה מהמחלה</td>
                    </tr>
                </tbody>
            </table>
           </div>
           <div><ImageUpload customerId={state.customer.id}/></div>
        </div>
    );
}

export default CustomerDetails;
