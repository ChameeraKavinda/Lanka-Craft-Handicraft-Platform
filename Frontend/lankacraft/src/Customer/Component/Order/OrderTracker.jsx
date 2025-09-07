import { Step, StepLabel, Stepper } from '@mui/material';
import { memo } from 'react';

const steps = [
  "Placed",
  "Order Confirmed",
  "Shipped",
  "Out For Delivery",
  "Delivered"
];

const OrderTracker = ({ activeStep }) => {
  return (
    <div className="w-full">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel sx={{ color: "#9155FD", fontSize: "14px" }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default memo(OrderTracker);
