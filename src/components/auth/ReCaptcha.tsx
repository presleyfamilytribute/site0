import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaProps {
  onChange: (token: string | null) => void;
}

const ReCaptchaComponent: React.FC<ReCaptchaProps> = ({ onChange }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleExpired = () => {
    onChange(null);
  };

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'your-production-site-key'}
      onChange={onChange}
      onExpired={handleExpired}
    />
  );
};

export default ReCaptchaComponent;
