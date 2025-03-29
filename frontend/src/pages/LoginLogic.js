import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = (role, setRole) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const onSubmit = (e) => {
      e.preventDefault();
      setUsername('');
      setPassword('');
      // Navigate to portal, passing role in state
      navigate('/portal', { state: { role } });
    };
  
    const handleChange = (e) => {
      setRole(e.target.value);
      console.log('role:', e.target.value);
    };
    
    return {
        username,
        setUsername,
        password,
        setPassword,
        onSubmit,
        handleChange,
    }
}

export default useLogin;