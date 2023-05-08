import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import UtilsService from '../../UtilsService';

const LogIn = () => {
    const utilsService = new UtilsService();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [logInSuccess, setLogInSuccess] = useState(false);
    const [checkUserValid, setCheckUserValid] = useState(false);

    const navigate = useNavigate();

    const checkIfUserExist = async () => {
        try {
            const res = await utilsService.getUserbyUserName("http://localhost:3001/api/users/login", {
              params: { userName: userName, password: password }
            });
            console.log(res);
            if (res.status === 200) {
                setLogInSuccess(true);
                navigate('/dashboard', {state: {user: res.data}});
            } else {
              console.log('Invalid username or password');
            }
          } catch (error) {
            console.error(error.message);
            console.log('Internal server error');
          }
          setCheckUserValid(true);
    };

    return (
        <div className='mt-10 px-44'>
            <div className='border px-28 py-12 bg-gray-50'>
                <h1 className='text-3xl font-bold dark:text-white'>מערכת ניהול קורונה לקופת חולים</h1>
                <h2 className='text-lg font-bold dark:text-white mt-3'>!ברוכים הבאים</h2>
                <form className='mt-3'>
                    <label>
                        <div>:שם משתמש</div>
                        <input type="text" name="userName" value={userName} onChange={e => setUserName( e.target.value)} className="bg-gray-50 border border-gray-300" />
                    </label>
                    <label>
                        <div>:סיסמא</div>
                        <input type="password" name="password" value={password} onChange={e => setPassword( e.target.value)} className="bg-gray-50 border border-gray-300"/>
                    </label>
                </form>
                {checkUserValid && logInSuccess === false && <div className='text-red-500'>שם משתמש או סיסמא אינם נכונים, בבקשה נסה שוב</div>}
                <button type="submit" onClick={checkIfUserExist} className="bg-blue-500 border border-blue-300 mt-4">הכנס</button>
            </div>
        </div>
    );
}

export default LogIn;
