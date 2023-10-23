import TopBar from "../../components/topBar/TopBar";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function ProfilePage() {
  const {profileAddress} = useParams();

  return (
    <div>
      <TopBar />
      <div>PROFILE PAGE: {profileAddress}</div>
    </div>
  );
}

export default ProfilePage;
