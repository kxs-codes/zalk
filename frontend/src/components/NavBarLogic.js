// NavBarLogic.js
import { useNavigate } from 'react-router-dom';

const useNavBarLogic = (role) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('role in navbar: ', role);
    navigate('/portal', { state: { role } });
  };

  return { handleClick };
};

export default useNavBarLogic;
