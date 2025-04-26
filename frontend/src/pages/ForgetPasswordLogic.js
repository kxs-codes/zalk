import { useState } from 'react';
import { toast } from 'react-toastify';

function useForgetPassword() {
  const [email, setEmail] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Reset link sent to your email!", { position: 'top-right' });
        setEmail('');
      } else {
        toast.error(data.message || "Failed to send reset link.", { position: 'top-right' });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.", { position: 'top-right' });
    }
  };

  return { email, setEmail, onSubmit };
}

export default useForgetPassword;
