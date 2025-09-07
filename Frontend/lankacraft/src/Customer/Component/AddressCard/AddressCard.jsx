import { memo } from 'react';

const AddressCard = ({ address }) => {
  console.log(address)
  if (!address) return null; // handle undefined

  return (
    <div className="AddressCard p-4 border rounded-lg shadow-sm">
      <div className="space-y-3">
        <p className="font-semibold">{address.firstName} {address.lastName}</p>
        <p>{address.streetAddress}, {address.city}, {address.state}, {address.zipCode}</p>
        <div className="space-y-1">
          <p className="font-semibold">Phone Number</p>
          <p>{address.mobile}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(AddressCard);
