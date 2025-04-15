import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface OTPInputProps {
  length: number;
  onChange: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onChange }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    setOtp(newOtp);
    onChange(newOtp.join(''));
  };

  return (
    <div className="flex space-x-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          className={cn(
            'h-10 w-10 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
          )}
        />
      ))}
    </div>
  );
};

export { OTPInput };
