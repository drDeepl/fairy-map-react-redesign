import React, { useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

interface CaptchaComponentProps {
  onSuccessVerify: () => void;
  onErrorVerify: (error: any) => void;
}

const CaptchaComponent: React.FC<CaptchaComponentProps> = ({
  onSuccessVerify,
  onErrorVerify,
}) => {
  const captchaRef = useRef<HCaptcha>(null);

  const siteKey = import.meta.env.VITE_CAPTCHA_SITE_KEY;

  const handleVerificationSuccess = (token: any) => {
    captchaRef.current?.resetCaptcha();
    captchaRef.current?.removeCaptcha();
    onSuccessVerify();
  };

  const handleVerificationError = (error: any) => {
    onErrorVerify(error);
  };

  return (
    <HCaptcha
      ref={captchaRef}
      size="normal"
      sitekey={siteKey}
      onVerify={handleVerificationSuccess}
      onError={handleVerificationError}
    />
  );
};
export default CaptchaComponent;
