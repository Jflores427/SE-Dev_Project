import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VerifyEmailSuccess from "./Utils/VerifyEmailSuccess";
import VerifyEmailFailure from "./Utils/VerifyEmailFailure";

const VerifyEmail = () => {
  const { uid, token } = useParams();
  const [ isVerified, setIsVerified] = useState(false);
  
  const verifyEmail = async () => {
    const response = await fetch(
      `/api/authentication/verify-email/${uid}/${token}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [uid, token]);

  return (
    <div>
        {isVerified ? <VerifyEmailSuccess /> : <VerifyEmailFailure />}
    </div>
  )
};

export default VerifyEmail;
