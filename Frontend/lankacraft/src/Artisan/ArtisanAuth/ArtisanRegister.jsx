import { TextField, Button } from '@mui/material';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUser, register } from '../../State/Auth/Action';

const RegisterForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const jwt = localStorage.getItem("jwt")

    const { auth } = useSelector(store => store)

    useEffect(() => {
    if (jwt) {
        dispatch(getUser(jwt))
    }
}, [jwt, dispatch])




    const handleSubmit = (event) => {
        event.preventDefault();


        const data = new FormData(event.currentTarget);

        const userData = {
            firstname: data.get("firstname"),  // match backend field
            lastname: data.get("lastname"),    // match backend field
            email: data.get("email"),
            password: data.get("password"),
            mobile: data.get("mobile"),
            role: "ARTISAN"  
        };


        dispatch(register(userData))
        console.log("userData", userData)
    };

    return (
        <div
            className="register-form-container"
            style={{
                maxWidth: '600px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginTop: '10rem',
            }}
        >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Full Name & Last Name in same row */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <TextField
                        required
                        id="firstname"
                        name="firstname"
                        label="Fist Name"
                        fullWidth
                    />
                    <TextField
                        required
                        id="lastname"
                        name="lastname"
                        label="Last Name"
                        fullWidth
                    />
                </div>

                {/* Email */}
                <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                />

                {/* Password */}
                <TextField
                    required
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                />

                {/* Mobile Number */}
                <TextField
                    required
                    id="mobile"
                    name="mobile"
                    label="Mobile Number"
                    fullWidth
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                        bgcolor: 'rgb(143, 94, 44)',
                        '&:hover': { bgcolor: 'rgb(120, 80, 30)' },
                        padding: '.8rem 0',
                    }}
                >
                    Register
                </Button>
            </form>
            <div className='flex justify-center flex-col items-center'>
                <div className='py-3 flex items-center'>
                    <p>If you have aleardy account ?</p>
                    <Button onClick={() => navigate("/login")} className='ml-5' size='small'>Login</Button>
                </div>
            </div>
        </div>
    );
};

export default memo(RegisterForm);
