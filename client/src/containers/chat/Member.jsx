import './member.css';
import userIcon from '../../assets/images/userIcon.png';
import PropTypes from 'prop-types';

import FolderIcon from '@material-ui/icons/Folder';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DocumentsDialog from '../../components/DocumentsDialog';

function Member({ member, handleMemberClick }) {
  const [currentUser, setCurrentUser] = useState([]);
  const [openDocuments, setOpenDocuments] = useState(false);
  const [userDocuments, setUserDocuments] = useState([]);

  const handleOpenDocuments = () => {
    setOpenDocuments(true);
  };
  const handleCloseDocuments = () => {
    setOpenDocuments(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/users/' + member.userId);
        setCurrentUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [member.userId]);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=2&limit=100').then((res) => {
      return res.json().then((data) => {
        console.log(data);
        setUserDocuments(data);
      });
    });
  }, []);

  return (
    <div className='member'>
      <div className='groupMember'>
        <div className='groupMemberImgContainer'>
          <img className='groupMemberImage' src={userIcon} alt='' />
          <div className='groupMemberOnlineBadge'></div>
        </div>
        <div className='groupMemberName'>{`${currentUser?.nombre} ${currentUser?.apellido}`}</div>
        <div className='role' onClick={handleMemberClick}>
          PM
        </div>
        <div className='memberFileIcon'>
          <FolderIcon onClick={handleOpenDocuments} />
        </div>
      </div>
      <DocumentsDialog
        open={openDocuments}
        handleClose={handleCloseDocuments}
        items={userDocuments}
      />
    </div>
  );
}

Member.propTypes = {
  members: PropTypes.array.isRequired,
  handleMemberClick: PropTypes.func,
};

export default Member;
