import React, { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { motion } from "framer-motion";

interface CaptchaComponentProps {
  onSuccessVerify: () => void;
  onErrorVerify: (error: any) => void;
}

const CaptchaComponent: React.FC<CaptchaComponentProps> = ({
  onSuccessVerify,
  onErrorVerify,
}) => {
  const [token, setToken] = useState(null); // TODO: RESPONSE FROM SERVER

  const siteKey = import.meta.env.VITE_CAPTCHA_SITE_KEY;

  const handleVerificationSuccess = (token: any) => {
    setToken(token);
    onSuccessVerify();
  };

  const handleVerificationError = (error: any) => {
    onErrorVerify(error);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div>
        <HCaptcha
          sitekey={siteKey}
          onVerify={handleVerificationSuccess}
          onError={handleVerificationError}
        />
      </div>
    </motion.div>
  );
};
export default CaptchaComponent;
