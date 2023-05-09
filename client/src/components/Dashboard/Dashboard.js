import React, {useEffect, useState} from 'react';
import UtilsService from '../../UtilsService';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NewCustomerModal from './NewCustomerModal';
import CoronaGraph from './CoronaGraph';


const Dashboard = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const utilsService = new UtilsService();
    const [customers, setCustomers] = useState([]);
    const [addCustomerModal, setAddCustomerModal] = useState(false);
    const [id, setId] = useState("");
    const [showIframe, setShowIframe] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const [customerAdded, setCustomerAdded] = useState(false);

    useEffect(() => {
        if (!state) {
            navigate('/login');
        }      
        utilsService.getItems("http://localhost:3001/api/customers").then(res => setCustomers(res));
    }, [customerAdded]);

    const navigateToCustomerDetails = (customer) => {
        navigate(`/customer/${customer.id}`);
    }

    return (
        <div>
            <div className='mb-10 mt-10 '>             
                <div className='mt-10 text-left flex w-full'>  
                    <div className='pl-2 w-min'>
                        <button onClick={() => setShowGraph(!showGraph)} className="border border-gray-300 w-48">הצג סטטיסטיקה</button>
                    </div>            
                    {/* <div className='pl-2 w-min'>
                        <button onClick={() => setShowIframe(!showIframe)} className="border border-gray-300 w-48">יצירת בידוד קבוצתי</button>
                    </div>                    */}
                    <div className='pl-2'>
                        <button onClick={() => setAddCustomerModal(true)} className="border border-gray-300 w-48">הכנס לקוח</button>
                    </div>
                    <div className='text-2xl text-right w-full' onClick={()=>navigate('/login')}>{state?.user.name}, יציאה</div>
                </div>
                { showIframe && <iframe className='w-full h-screen mt-6' src="http://localhost:3000/googleMap" title="google map"></iframe>}
                { showGraph && <div className='pt-10'><CoronaGraph customersSum={customers.length}/></div>}
                { addCustomerModal &&  <NewCustomerModal setAddCustomerModal={setAddCustomerModal} setCustomerAdded={setCustomerAdded}/>}
                <div className='mt-16 text-right mx-40'>
                    <input type="text" placeholder="הכנס תעודת זהות" value={id} onChange={(e) => setId(e.target.value)} className="text-right bg-gray-50 border border-gray-300"/>
                </div>         
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
                <table align='center' className='table-fixed w-full text-sm text-center text-blue-250 dark:text-blue-100'> 
                    <thead className="text-xs text-white uppercase bg-sky-900 dark:text-white">
                        <tr>                              
                            <th className="px-10 py-4">טלפון</th>
                            <th className="px-20 py-4">כתובת</th>
                            <th className="px-10 py-4">שם מלא</th>
                            <th className="px-10 py-4">תעודת זהות</th>
                        </tr>
                    </thead>
                    <tbody>            
                        {customers.filter(customer => customer.id.includes(id)).map(customer => 
                        <tr key={customer.id} onClick={() => navigateToCustomerDetails(customer)} className="bg-gray-50 border-b border-gray-150">                         
                            <td className=' py-6'>{customer.mobile}</td>
                            <td>{customer.address}</td>
                            <td>{customer.name}</td>
                            <td>{customer.id}</td>  
                        </tr>
                        )}
                        </tbody> 
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
