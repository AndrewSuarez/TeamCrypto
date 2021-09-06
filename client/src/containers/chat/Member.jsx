import './member.css';
import userIcon from '../../assets/images/userIcon.png';
import PropTypes from 'prop-types';

import FolderIcon from '@material-ui/icons/Folder';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import DocumentsDialog from '../../components/DocumentsDialog';

function Member({ member, handleMemberClick, files }) {
  // const [currentUser, setCurrentUser] = useState([]);
  const [openDocuments, setOpenDocuments] = useState(false);

  const handleOpenDocuments = () => {
    setOpenDocuments(true);
  };
  const handleCloseDocuments = () => {
    setOpenDocuments(false);

  };

  // useEffect(() => {
  //   fetch('https://picsum.photos/v2/list?page=2&limit=100').then((res) => {
  //     return res.json().then((data) => {
  //       // console.log(data);
  //       setUserDocuments(data);
  //     });
  //   });
  // }, []);

  return (
    <div className='member'>
      <div className='groupMember'>
        <div className='groupMemberImgContainer'>
          <img className='groupMemberImage' src={userIcon} alt='' />
          <div className='groupMemberOnlineBadge'></div>
        </div>
        <div className='groupMemberName'>{`${member.userId?.nombre} ${member.userId?.apellido}`}</div>
        <div className='role' onClick={handleMemberClick}>
          {member.role}
        </div>
        <div className='memberFileIcon'>
          <FolderIcon onClick={handleOpenDocuments} />
        </div>
      </div>
      <DocumentsDialog
        open={openDocuments}
        handleClose={handleCloseDocuments}
        items={files}
      />
    </div>
  );
}

Member.propTypes = {
  members: PropTypes.array.isRequired,
  handleMemberClick: PropTypes.func,
};

export default Member;
