import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlayIcon,
  ChartBarIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  DocumentTextIcon,
  PaintBrushIcon,
  UserPlusIcon,
  DocumentDuplicateIcon,
  Cog8ToothIcon,
  ArrowRightEndOnRectangleIcon
} from '@heroicons/react/24/solid';
import '../styles/NavBar.css';
import useNavBarLogic from './NavBarLogic';
import { useAuth } from './AuthProvider';

const NavBar = ({ userDetails }) => {
  const { handleClick } = useNavBarLogic(userDetails);
  const { token } = useAuth();

  return (
    <nav className="nav-container">
      <ul className="unordered-list-style">
        <li className="image-list-item">
          <img
            src="/transparent-zebra-logo.png"
            alt="zebra-logo"
            onClick={handleClick}
            className="img-style"
          />
        </li>

        {token.role === 'student' && (
          <>
            <li><Link to='/session' className='link-item'><PlayIcon className='icon-size' />Begin Session</Link></li>
            <li><Link to='/progress' className='link-item'><ChartBarIcon className='icon-size' />Progress Report</Link></li>
            <li><Link to='/classrooms' className='link-item'><AcademicCapIcon className='icon-size' />Classrooms</Link></li>
          </>
        )}

        {token.role === 'educator' && (
          <>
            <li><Link to='/classroom-progress' className='link-item'><ChartBarIcon className='icon-size' />Class Progress</Link></li>
            <li><Link to='/classrooms-management' className='link-item'><ClipboardDocumentListIcon className='icon-size' />Classroom Management</Link></li>
            <li><Link to='/session-configuration' className='link-item'><AdjustmentsHorizontalIcon className='icon-size' />Session Configuration</Link></li>
          </>
        )}

        {token.role === 'guardian' && (
          <>
            <li><Link to='/progress' className='link-item'><UserGroupIcon className='icon-size' />Child Progress</Link></li>
            <li><Link to='/report-issues' className='link-item'><ExclamationTriangleIcon className='icon-size' />Report Issues</Link></li>
          </>
        )}

        {token.role === 'advisory_board' && (
          <>
            <li><Link to='/view-progress' className='link-item'><EyeIcon className='icon-size' />View Progress</Link></li>
            <li><Link to='/access-reports' className='link-item'><DocumentTextIcon className='icon-size' />Access Reports</Link></li>
            <li><Link to='/report-issues' className='link-item'><ExclamationTriangleIcon className='icon-size' />Report Issues</Link></li>
          </>
        )}

        {token.role === 'moderator' && (
          <>
            <li><Link to='/create-classroom' className='link-item'><PaintBrushIcon className='icon-size' />Create Classroom</Link></li>
            <li><Link to='/create-account' className='link-item'><UserPlusIcon className='icon-size' />Create Accounts</Link></li>
            <li><Link to='/manage-accounts' className='link-item'><UserPlusIcon className='icon-size' />Manage Accounts</Link></li>
            <li><Link to='/access-logs' className='link-item'><DocumentDuplicateIcon className='icon-size' />Access Logs</Link></li>
            <li><Link to='/access-reports' className='link-item'><DocumentTextIcon className='icon-size' />Access Reports</Link></li>
            <li><Link to='/report-issues' className='link-item'><ExclamationTriangleIcon className='icon-size' />Report Issues</Link></li>
          </>
        )}
      </ul>
      <ul className="bottom-links">
        <li><Link to='/' className='link-item'><ArrowRightEndOnRectangleIcon className='icon-size' />Sign Out</Link></li>
        <li><Link to='/settings' className='link-item'><Cog8ToothIcon className='icon-size' />Settings</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
