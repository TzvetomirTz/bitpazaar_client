import './ProfilePage.css';
import TopBar from "../../components/topBar/TopBar";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function ProfilePage() {
  const { profileAddress } = useParams();

  return (
    <div className='ProfilePage'>
      <TopBar />
      <div className="ProfileContainer">
        <div className='ProfileHeader'>
          <div className='ProfilePic'></div>
          <div className='ProfileAddress'>{ profileAddress }</div>
        </div>
        <div className='ProfileBody'>
          
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
