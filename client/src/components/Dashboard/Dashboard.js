import React, {useEffect, useState} from 'react';
import UtilsService from '../../UtilsService';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const utilsService = new UtilsService();
    const [customers, setCustomers] = useState([]);
    const [addCustomerModal, setAddCustomerModal] = useState(false);
    const [id, setId] = useState("");
    const [showIframe, setShowIframe] = useState(false);
    const [showNotValidMassage, setShowNotValidMassage] = useState(false);
    const [showDuplucateMassage, setShowDuplucateMassage] = useState(false);
    const [validNewCustomer, setValidNewCustomer] = useState(false);
    const [newCustomer, setNewCustomer] = useState({"id": "", "name": "", "address":"", "birthDate":"", "phoneNumber":"", "mobile":""});
   // const [isDisabledNewCustomer, setIsDisabledNewCustomer] = useState(true);

    useEffect(() => {
        if (!state) {
            navigate('/login');
        }      
        utilsService.getItems("http://localhost:3001/api/customers").then(res => setCustomers(res));
    }, [validNewCustomer]);

    const addNewCustomer = async () => {
        const res = await utilsService.setCustomer("http://localhost:3001/api/customers", newCustomer);
        if (customers.some(customer => customer.id === newCustomer.id)) {
            setShowDuplucateMassage(true);
            setShowNotValidMassage(false); 
        } 
        else if (res === "Invalid data") {
            setShowNotValidMassage(true);
            setShowDuplucateMassage(false);  
        } else {       
            setAddCustomerModal(false);
            setValidNewCustomer(!validNewCustomer)
        }        
    }

    const navigateToCustomerDetails = (customer) => {
        navigate(`/customer/${customer.id}`, {state: {customer}});
    }

    const addCustomer = <div className='mt-10  border border-gray-30'>
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 text-right">                  
                        <h3 className='text-lg font-bold dark:text-white mt-3 text-center'>הכנס לקוח חדש</h3>
                            <form  className='mt-10' >
                            <label>
                                <div>תעודת זהות</div>
                                <input type="text"  value={newCustomer.id} onChange={e => setNewCustomer({...newCustomer,"id": e.target.value})} className="bg-gray-50 border border-gray-300" />
                            </label>
                            <label>
                                <div>שם מלא</div>
                                <input type="text" value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer,"name": e.target.value})} className="bg-gray-50 border border-gray-300"/>
                            </label>
                            <label>
                                <div>כתובת (עיר, רחוב ומספר)</div>
                                <input type="text" value={newCustomer.address} onChange={e => setNewCustomer({...newCustomer,"address": e.target.value})} className="bg-gray-50 border border-gray-300"/>
                            </label>
                            <label>
                                <div>תאריך לידה</div>
                                <input type="date" value={newCustomer.birthDate} onChange={e => setNewCustomer({...newCustomer,"birthDate": e.target.value})} className="bg-gray-50 border border-gray-300"/>
                            </label>
                            <label>
                                <div>טלפון</div>
                                <input type="text" value={newCustomer.phoneNumber} onChange={e => setNewCustomer({...newCustomer,"phoneNumber": e.target.value})} className="border border-gray-300"/>
                            </label>
                            <label>
                                <div>טלפון נייד</div>
                                <input type="text" value={newCustomer.mobile} onChange={e => setNewCustomer({...newCustomer,"mobile": e.target.value})} className="border border-gray-300"/>
                            </label>
                        </form>                    
                    </div>
                    {showNotValidMassage && <div className='text-red-500 text-right mr-6'>אחד או יותר מהשדות אינם תקינים</div>}
                    {showDuplucateMassage && <div className='text-red-500 text-right mr-6'>תעודת זהות קיימת במערכת</div>}
                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button onClick={() => addNewCustomer()} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">אישור</button>
                    <button onClick={() => setAddCustomerModal(false)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">ביטול</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>

    return (
        <div>
            <div className='mb-10 mt-10 '>             
                <div className='mt-10 text-left flex w-full'>            
                    <div className='pl-2 w-min'>
                        <button onClick={() => setShowIframe(!showIframe)} className="border border-gray-300 w-48">יצירת בידוד קבוצתי</button>
                    </div>                   
                    <div className='pl-2'>
                        <button onClick={() => setAddCustomerModal(true)} className="border border-gray-300 w-48">הכנס לקוח</button>
                    </div>
                    <div className='text-2xl text-right w-full' onClick={()=>navigate('/login')}>{state?.user.name}, יציאה</div>
                </div>
                {showIframe && <iframe className='w-full h-screen mt-6' src="http://localhost:3000/googleMap" title="google map"></iframe>}
                {addCustomerModal &&  addCustomer}
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
