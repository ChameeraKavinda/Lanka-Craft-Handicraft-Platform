import { Grid } from '@mui/material';
import { memo } from 'react';
import OrderCard from './OrderCard';

const orderStatus = [
    { lable: "On The Way", value: "on_the-way" },
    { lable: "Dilivered", value: "dilivered" },
    { lable: "Canceled", value: "canceled" },
    { lable: "Returned", value: "returned" },
];

const Order = () => {
    return (
        <div className="w-full flex justify-center">
            <Grid
                container
                spacing={3}
                sx={{ maxWidth: "1200px", justifyContent: "center" }}
            >
                {/* Sidebar filter */}
                <Grid item xs={12} md={3}>
                    <div className="h-auto shadow-lg bg-white p-5 sticky top-5 rounded-md">
                        <h1 className="font-bold text-lg">Filter</h1>
                        <div className="space-y-4 mt-10">
                            <h1 className="font-bold">Order Status</h1>
                            {orderStatus.map((option) => (
                                <div key={option.value} className="flex items-center">
                                    <input
                                        defaultValue={option.value}
                                        type="checkbox"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label className="ml-3 text-sm text-gray-600">
                                        {option.lable}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </Grid>

                {/* Orders Section */}
                <Grid item xs={12} md={9}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            {[1, 1, 1, 1, 1].map((item, index) => (
                                <OrderCard key={index} />
                            ))}
                        </div>



                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default memo(Order);
