import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CssBaseline } from '@mui/material';
import logoicon from '../../../assets/miniLogo.svg';
import thumbnailpic from '../../../assets/images/school1.png';
import ViewLeaps from './ViewLeaps';
const formData = {
  title: 'Info',
  name: 'Greenwood High',
  prerequisite: 'Required',
  classCapacity: '20',
  description: 'A prestigious institution providing quality education.',
};

const thumbnail = { thumbnailpic };
const logo = { logoicon };

const LeapsInfo = ({ CloseModal }) => (
  <>
    <ViewLeaps formData={formData} thumbnail={thumbnail} logo={logo} CloseModal={CloseModal} />
  </>
);
LeapsInfo.propTypes = {
  CloseModal: PropTypes.bool,
};

export default LeapsInfo;
