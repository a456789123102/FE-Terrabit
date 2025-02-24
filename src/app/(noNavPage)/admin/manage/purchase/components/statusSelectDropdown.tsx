import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';

interface Status {
  key: string;
  label: string;
}

interface StatusSelectDropdownProps {
  status: string[]; // Initial selected status (array of key strings)
  setStatus: React.Dispatch<React.SetStateAction<string[]>>;
}

const StatusSelectDropdown = ({ status, setStatus }: StatusSelectDropdownProps) => {
  const statuses = useMemo(() => [
    { key: "pending_payment_proof", label: "To Pay" },
    { key: "pending_payment_verification", label: "Awaiting Confirmed" },
    { key: "pending_refound", label: "To Refound" },
    { key: "payment_verified", label: "Payment Verified" },
    { key: "cancelled_by_admin", label: "Cancelled by Admin" },
    { key: "cancelled_by_user", label: "Cancelled by User" },
    { key: "refund_completed", label: "Refund Completed" },
    { key: "refund_rejected", label: "Refund Rejected" },
  ], []);


  const [selectedOptions, setSelectedOptions] = useState<Status[]>([]);

  useEffect(() => {
    const initialSelectedOptions = status.map(key => statuses.find(s => s.key === key)).filter(Boolean) as Status[];
    setSelectedOptions(initialSelectedOptions);
  }, [status, statuses]);

  const handleChange = (selectedOptions: Status[]) => {
    setSelectedOptions(selectedOptions);
    const selectedKeys = selectedOptions.map(option => option.key);
    setStatus(selectedKeys);
  };

  return (
    <Select
      classNamePrefix="custom-select"
      isMulti={true}
      isClearable={true}
      isSearchable={true}
      placeholder={"Select order status..."}
      options={statuses}
      value={selectedOptions}
      className="text-sm text-black w-[200px] h-10" // กำหนดขนาดคงที่
      onChange={handleChange}
      getOptionValue={(option) => option.key}
      getOptionLabel={(option) => option.label}

      
    />

  );
};

export default StatusSelectDropdown;