// NavBarLogic.js
import { useNavigate } from 'react-router-dom';

const useNavBarLogic = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/portal');
  };

  return { handleClick };
};

export default useNavBarLogic;
