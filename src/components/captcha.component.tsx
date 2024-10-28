import React, { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import LoadSpinner from "./ui/load-spinner";

interface CaptchaComponentProps {
  onSuccessVerify: () => void;
  onErrorVerify: (error: any) => void;
}

const CaptchaComponent: React.FC<CaptchaComponentProps> = ({
  onSuccessVerify,
  onErrorVerify,
}) => {
  const [token, setToken] = useState(null); // TODO: RESPONSE FROM SERVER
  const [loading, setLoading] = useState<boolean>(true);
  const siteKey = import.meta.env.VITE_CAPTCHA_SITE_KEY;

  const handleVerificationSuccess = (token: any) => {
    setToken(token);
    onSuccessVerify();
  };

  const handleVerificationError = (error: any) => {
    onErrorVerify(error);
  };

  const captchaContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="mt-3" ref={captchaContainerRef}>
      <HCaptcha
        sitekey={siteKey}
        onVerify={handleVerificationSuccess}
        onError={handleVerificationError}
      />
    </div>
  );
};
export default CaptchaComponent;
