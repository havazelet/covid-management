import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UtilsService from '../../UtilsService';
import ImageUpload from './ImageUpload';


const CustomerDetails = () => {
    // const { state } = useLocation();
    const urlPrm = useParams().id;
    // const navigate = useNavigate();
    const [customerCoronaDetails, setCustomerCoronaDetails] = useState(null);
    const [ImageUploaded, setImageUploaded] = useState(false);

    useEffect(() => { 
        const utilsService = new UtilsService();
        utilsService.getCoronabyCustomerId("http://localhost:3001/api/customers/customercorona", urlPrm).then(data => setCustomerCoronaDetails(data)).catch(error => setCustomerCoronaDetails(error));;           
    }, [urlPrm, ImageUploaded]);

    if (customerCoronaDetails?.code ===  "ERR_BAD_REQUEST" ) {
        return <div>{customerCoronaDetails.response.data}</div>;
    }

    if (!customerCoronaDetails) {
        return <div>Loading...</div>;
    }
 
    return (<div className='bg-gray-50 pb-10'> 
            <div className='mb-20'>
                <div className='bg-blue-100'>
                    <h1 className='mt-10 mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white py-4'> פרטי מטופל {customerCoronaDetails?.name}</h1>
                </div>
            <div className='text-right flex flex-row-reverse mr-14 mt-4'> {customerCoronaDetails?.image && <img style={{width: "100px", height: "100%"}} src={customerCoronaDetails?.image} alt="Upload" />} </div>
            <div className='text-right mr-10 flex flex-row-reverse'>
                <table className='text-right w-10/12 mt-14 text-2xl'>
                    <tbody className='text-right'>
                        <tr className='text-right border-b border-gray-150'>
                            <td className='text-right'>{customerCoronaDetails?.name}</td>
                            <td>שם מלא</td>
                        </tr>
                        <tr className='border-b border-gray-150'>
                            <td>{customerCoronaDetails?.id}</td>
                            <td>תעודת זהות</td>
                        </tr>
                        <tr className='border-b border-gray-150'>                  
                            <td>{customerCoronaDetails.address}</td>
                            <td>כתובת</td>
                        </tr>
                        <tr className='border-b border-gray-150'>                  
                            <td>{customerCoronaDetails.birthDate}</td>
                            <td>תאריך לידה</td>
                        </tr>
                        <tr className='border-b border-gray-150'>                  
                            <td>{customerCoronaDetails.phoneNumber}</td>
                            <td>טלפון</td>
                        </tr>
                        <tr className='border-b border-gray-150'>                  
                            <td>{customerCoronaDetails.mobile}</td>
                            <td>טלפון נייד</td>
                        </tr>
                        <tr className='border-b border-gray-150'>                  
                            <td>{customerCoronaDetails?.vaccinationDate?.map((date,index)=><div key={date+index}>{date}</div>)}</td>
                            <td>מועדי קבלת חיסון קורונה</td>
                        </tr>
                        <tr className='border-b border-gray-150'>                  
                            <td>{customerCoronaDetails?.vaccinationDateMaker}</td>
                            <td>יצרן החיסון</td>
                        </tr>
                        <tr className='border-b border-gray-150'>                  
                            <td>{customerCoronaDetails?.sicknessPeriod?.getSickness}</td>
                            <td>מועד קבלת תוצאה חיובית</td>
                        </tr>
                        <tr className='border-b border-gray-150'>                  
                            <td>{customerCoronaDetails?.sicknessPeriod?.recoveryDate}</td>
                            <td>מועד החלמה מהמחלה</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='mr-10'><ImageUpload customerId={customerCoronaDetails.id} setImageUploaded={setImageUploaded}/></div>
            </div>
        </div>
    );
}

export default CustomerDetails;
