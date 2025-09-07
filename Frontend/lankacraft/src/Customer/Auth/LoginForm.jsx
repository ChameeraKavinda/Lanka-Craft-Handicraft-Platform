import { TextField, Button, Alert, CircularProgress, Typography, Divider } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, getUser } from '../../State/Auth/Action';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, dispatch]);

    // Handle successful login navigation and show success message
    useEffect(() => {
        if (auth.user && !showSuccessMessage) {
            setShowSuccessMessage(true);
            
            // Hide success message and navigate after 2 seconds
            setTimeout(() => {
                setShowSuccessMessage(false);
                
                console.log("Logged in user role:", auth.user.role);
                
                if (auth.user.role === "ADMIN") {
                    navigate("/admin");
                } else if (auth.user.role === "ARTISAN") {
                    navigate("/artisans");
                } else {
                    navigate("/");
                }
            }, 2000);
        }
    }, [auth.user, navigate, showSuccessMessage]);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get("email"),
            password: data.get("password")
        };

        // Basic validation
        if (!userData.email || !userData.password) {
            return;
        }

        dispatch(login(userData));
        console.log("userData", userData);
    };

    return (
        <div style={{ width: '100%', maxWidth: '500px', marginTop: '5rem' }}>
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
                    Welcome Back
                </Typography>
                <Typography 
                    variant="body2" 
                    style={{ 
                        color: '#666666',
                        fontSize: '14px'
                    }}
                >
                    Sign in to your account
                </Typography>
            </div>

            {/* Show success message */}
            {showSuccessMessage && (
                <Alert 
                    severity="success" 
                    style={{ 
                        marginBottom: '24px',
                        borderRadius: '8px'
                    }}
                >
                    Successfully logged in! Redirecting...
                </Alert>
            )}

            {/* Show error message if login failed */}
            {auth.error && !showSuccessMessage && (
                <Alert 
                    severity="error" 
                    style={{ 
                        marginBottom: '24px',
                        borderRadius: '8px'
                    }}
                >
                    {auth.error.includes('Invalid') || auth.error.includes('wrong') || auth.error.includes('incorrect') 
                        ? 'Invalid email or password. Please check your credentials and try again.' 
                        : auth.error.includes('Network') || auth.error.includes('network')
                        ? 'Network error. Please check your connection and try again.'
                        : auth.error || 'Login failed. Please enter valid credentials and try again.'}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
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
                            <span>Signing In...</span>
                        </div>
                    ) : (
                        'Sign In'
                    )}
                </Button>
            </form>

            {/* Divider and Register Link */}
            <div style={{ textAlign: 'center' }}>
                <Divider style={{ margin: '16px 0', color: '#e0e0e0' }}>
                    <Typography variant="body2" style={{ color: '#666666', fontSize: '14px' }}>
                        OR
                    </Typography>
                </Divider>
                
                <Typography variant="body2" style={{ color: '#666666', marginTop: '16px' }}>
                    Don't have an account?{' '}
                    <Button 
                        onClick={() => navigate("/register")} 
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
                        Create Account
                    </Button>
                </Typography>
            </div>
        </div>
    );
};

export default memo(LoginForm);