import { TextField, Button, Alert, CircularProgress, Typography, Divider } from '@mui/material';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, register } from '../../State/Auth/Action';

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, dispatch]);

    // Navigate to home page if user is already authenticated
    useEffect(() => {
        if (auth.user) {
            navigate('/');
        }
    }, [auth.user, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const data = new FormData(event.currentTarget);
        const userData = {
            firstname: data.get("firstname"),
            lastname: data.get("lastname"),
            email: data.get("email"),
            password: data.get("password"),
            mobile: data.get("mobile"),
            role: "CUSTOMER"
        };

        dispatch(register(userData));
        console.log("userData", userData);
    };

    return (
        <div style={{ width: '100%', maxWidth: '500px', marginTop:'5rem' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <Typography 
                    variant="h4" 
                    component="h1" 
                    style={{ 
                        fontWeight: 600, 
                        color: '#8F5E2C',
                        marginBottom: '8px',
                        fontFamily: '"Inter", "Roboto", sans-serif'
                    }}
                >
                    Create Account
                </Typography>
                <Typography 
                    variant="body2" 
                    style={{ 
                        color: '#666666',
                        fontSize: '14px'
                    }}
                >
                    Join our community of craft enthusiasts
                </Typography>
            </div>

            {/* Show error message if registration failed */}
            {auth.error && (
                <Alert 
                    severity="error" 
                    style={{ 
                        marginBottom: '24px',
                        borderRadius: '8px'
                    }}
                >
                    {auth.error}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                {/* Full Name & Last Name in same row */}
                <div style={{ 
                    display: 'flex', 
                    gap: '16px', 
                    marginBottom: '20px',
                    flexWrap: 'wrap'
                }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <TextField
                            required
                            id="firstname"
                            name="firstname"
                            label="First Name"
                            fullWidth
                            disabled={auth.loading}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: '#fafafa',
                                    '&:hover fieldset': {
                                        borderColor: '#8F5E2C',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#8F5E2C',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#8F5E2C',
                                }
                            }}
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <TextField
                            required
                            id="lastname"
                            name="lastname"
                            label="Last Name"
                            fullWidth
                            disabled={auth.loading}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: '#fafafa',
                                    '&:hover fieldset': {
                                        borderColor: '#8F5E2C',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#8F5E2C',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#8F5E2C',
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: '20px' }}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        disabled={auth.loading}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                backgroundColor: '#fafafa',
                                '&:hover fieldset': {
                                    borderColor: '#8F5E2C',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#8F5E2C',
                                },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#8F5E2C',
                            }
                        }}
                    />
                </div>

                {/* Mobile Number */}
                <div style={{ marginBottom: '20px' }}>
                    <TextField
                        required
                        id="mobile"
                        name="mobile"
                        label="Mobile Number"
                        type="tel"
                        fullWidth
                        disabled={auth.loading}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                backgroundColor: '#fafafa',
                                '&:hover fieldset': {
                                    borderColor: '#8F5E2C',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#8F5E2C',
                                },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#8F5E2C',
                            }
                        }}
                    />
                </div>

                {/* Password */}
                <div style={{ marginBottom: '24px' }}>
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        disabled={auth.loading}
                        inputProps={{ minLength: 6 }}
                        helperText="Password must be at least 6 characters"
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                backgroundColor: '#fafafa',
                                '&:hover fieldset': {
                                    borderColor: '#8F5E2C',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#8F5E2C',
                                },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#8F5E2C',
                            },
                            '& .MuiFormHelperText-root': {
                                color: '#666666',
                                fontSize: '12px'
                            }
                        }}
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={auth.loading}
                    sx={{
                        backgroundColor: '#8F5E2C',
                        color: 'white',
                        padding: '12px 0',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: '0 2px 8px rgba(143, 94, 44, 0.2)',
                        marginBottom: '24px',
                        '&:hover': { 
                            backgroundColor: '#785033',
                            boxShadow: '0 4px 12px rgba(143, 94, 44, 0.3)',
                        },
                        '&:active': {
                            backgroundColor: '#6B4529',
                        },
                        '&:disabled': {
                            backgroundColor: '#cccccc',
                            color: '#888888',
                        }
                    }}
                >
                    {auth.loading ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CircularProgress size={20} color="inherit" />
                            <span>Creating Account...</span>
                        </div>
                    ) : (
                        'Create Account'
                    )}
                </Button>
            </form>

            {/* Divider and Login Link */}
            <div style={{ textAlign: 'center' }}>
                <Divider style={{ margin: '16px 0', color: '#e0e0e0' }}>
                    <Typography variant="body2" style={{ color: '#666666', fontSize: '14px' }}>
                        OR
                    </Typography>
                </Divider>
                
                <Typography variant="body2" style={{ color: '#666666', marginTop: '16px' }}>
                    Already have an account?{' '}
                    <Button 
                        onClick={() => navigate("/login")} 
                        disabled={auth.loading}
                        sx={{
                            color: '#8F5E2C',
                            textTransform: 'none',
                            fontWeight: 600,
                            padding: '4px 8px',
                            minWidth: 'auto',
                            '&:hover': {
                                backgroundColor: 'rgba(143, 94, 44, 0.08)',
                            }
                        }}
                    >
                        Sign In
                    </Button>
                </Typography>
            </div>
        </div>
    );
};

export default memo(RegisterForm);