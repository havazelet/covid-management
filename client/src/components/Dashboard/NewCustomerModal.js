import React, {useState} from 'react';
import UtilsService from '../../UtilsService';

const NewCustomerModal = (props) => {
    const [showNotValidMassage, setShowNotValidMessage] = useState(false);
    const [showDuplucateMassage, setShowDuplicateMessage] = useState(false);
    const [newCustomer, setNewCustomer] = useState({"id": "", "name": "", "address":"", "birthDate":"", "phoneNumber":"", "mobile":""});
    const utilsService = new UtilsService();

    const addNewCustomer = async () => {
        try {
            await utilsService.setCustomer("http://localhost:3001/api/customers", newCustomer);                 
            props.setAddCustomerModal(false);
            props.setCustomerAdded(true)
        } catch (error) {
            if (error.response.data === "Customer already exists") {
                setShowDuplicateMessage(true);
                setShowNotValidMessage(false);
            } else {
                setShowNotValidMessage(true);
                setShowDuplicateMessage(false);
            } 
        }      
    }
   

    return (
        <div className='mt-10  border border-gray-30'>
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
                        <button onClick={() => props.setAddCustomerModal(false)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">ביטול</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewCustomerModal;
