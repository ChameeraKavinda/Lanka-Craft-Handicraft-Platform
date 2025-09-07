import { Box, Button, Grid, TextField } from '@mui/material';
import { memo } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../../State/Order/Action';

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Right side form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    // Capture form values
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("streetAddress"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zipCode"),
      mobile: data.get("mobile"),
    };

    // Check captured data
    console.log("Captured Address:", address);

    try {
      // Backend expects 'shippingAddress' key
    const order = await dispatch(createOrder(address)); // <--- send direct object
      console.log("Created order response:", order);

      if (order?.order_id) {
        navigate(`/checkout?step=3&order_id=${order.order_id}`);
      } else {
        console.error("Order does not contain an id:", order);
      }
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  // Left side saved address
  const handleSavedAddress = async () => {
    const savedAddress = {
      firstName: "John",
      lastName: "Doe",
      streetAddress: "123 Street, Colombo",
      city: "Colombo",
      state: "Western",
      zipCode: "10000",
      mobile: "0771234567",
    };

    try {
      const order = await dispatch(createOrder({ shippingAddress: savedAddress }));
      console.log("Created order from saved address:", order);

      if (order?.order_id) {
        navigate(`/checkout?step=3&order_id=${order.order_id}`);
      }
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  return (
    <Grid container spacing={8} className="px-2 sm:px-5">
      {/* Left Side - Saved Address */}
      <Grid item xs={12} lg={5} className="border rounded-e-md shadow-md max-h-[25rem] overflow-y-auto">
        <div className="px-5 py-7 border-b cursor-pointer">
          <AddressCard  />
          <Button
            sx={{ mt: 2, bgcolor: "RGB(238 164 113)", color: 'black', fontWeight: 'bold' }}
            size="large"
            variant="contained"
            onClick={handleSavedAddress}
          >
            Deliver Here
          </Button>
        </div>
      </Grid>

      {/* Right Side - New Address Form */}
      <Grid item xs={12} lg={7}>
        <Box className="border rounded-s-md shadow-md pt-5 px-2 sm:px-5 w-4xl">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  autoComplete="family-name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="streetAddress"
                  name="streetAddress"
                  label="Street Address"
                  fullWidth
                  autoComplete="street-address"
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="address-level2"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  autoComplete="address-level1"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zipCode"
                  name="zipCode"
                  label="Zip/Postal Code"
                  fullWidth
                  autoComplete="postal-code"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="mobile"
                  name="mobile"
                  label="Phone Number"
                  fullWidth
                  autoComplete="tel"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  sx={{ mt: 2, mb: 4, bgcolor: "RGB(238 164 113)", color: 'black', fontWeight: 'bold' }}
                  size="large"
                  variant="contained"
                  type="submit"
                >
                  Deliver Here
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(DeliveryAddressForm);
