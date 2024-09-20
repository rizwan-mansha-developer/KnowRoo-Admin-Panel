import React, { useContext, useEffect, useState } from 'react';
import Adventure from '../pages/Advanture/Advanture';
import Dashboard from '../pages/Dashboard/Dashboard';
import Hops from '../pages/Hops/Hops';
import MainHops from '../pages/Hops/MainHops';
import Leaps from '../pages/Leaps/Leaps';
import Mobs from '../pages/Mobs/Mobs';
import Profile from '../pages/Profile/Profile';
import Schools from '../pages/Schools/Schools';
// import { AuthContext } from '../containers/Authentication/AuthContext';
import { ForgotPassword } from '../conainers/Authentication/ForgotPassword/index';
import { LoginContainer } from '../conainers/Authentication/Login/index';
import Cookies from 'js-cookie';
import _ from 'lodash';
import QuizQuestions from '../pages/Hops/PreviewHops/QuizPreview.jsx/Index';
import QuestionnaireQuestions from '../pages/Hops/PreviewHops/QuestionnairePreview/Index';
import ViewAssignment from '../pages/Hops/PreviewHops/AssignmentPreview/Index';
import AdvBySchool from '../pages/Advanture/AdventureBySchool';
import LeapsBySchool from '../pages/Leaps/LeapsById';
import { ChangePassword } from '../conainers/Authentication/ChangePassword';
import DashBoard from '../conainers/SchoolDashbard';
import SiteAdminDashBoard from '../conainers/AdminDashbard';
import TeacherDashBoard from '../conainers/TeacherDashbaord';

// const getRole = Cookies.get('role_id');
const getRole = _.get(Cookies, 'role_id', null);
// const getRolee = () => _.get(Cookies, 'role_id', null);
// const getRole = Role()

const commonRoutes = [
  { path: '/', name: 'Login', element: <LoginContainer />, protected: false, allow: [] },
  {
    path: '/forgot-password',
    name: 'Forgot',
    element: <ForgotPassword />,
    protected: false,
    allow: [],
  },
  {
    path: '/reset-password',
    name: 'ChangePasswrod',
    element: <ChangePassword />,
    protected: false,
    allow: [],
  },
  {
    path: '/mobs',
    name: 'Mobs',
    element: <Mobs />,
    protected: true,
    allow: [1, 2, 3],
    subRoute: [
      {
        path: 'adventures',
        name: 'Adventures',
        element: <Adventure />,
        protected: true,
        allow: [1, 2, 3],
      },
      {
        path: 'adventures/leaps',
        name: 'Leaps',
        element: <Leaps />,
        protected: true,
        allow: [1, 2, 3, 4],
        subRoute: [
          {
            path: 'hops',
            name: 'Hops',
            element: <MainHops />,
            protected: true,
            allow: [1, 2, 3, 4],
            subRoute: [
              {
                path: 'startHops',
                name: 'StartHops',
                element: <Hops />,
                protected: true,
                allow: [1, 2, 3, 4],
                subRoute: [
                  {
                    path: 'quiz',
                    name: 'Quiz',
                    element: <QuizQuestions />,
                    protected: true,
                    allow: [1, 2, 3],
                  },
                  {
                    path: 'questionnaire',
                    name: 'Questionnaire',
                    element: <QuestionnaireQuestions />,
                    protected: true,
                    allow: [1, 2, 3],
                  },
                  {
                    path: 'assignment',
                    name: 'Assignment',
                    element: <ViewAssignment />,
                    protected: true,
                    allow: [1, 2, 3, 4],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/adventures',
    name: 'Adventures',
    element: <AdvBySchool />,
    protected: true,
    allow: [1, 2, 3],
  },
  {
    path: '/leaps',
    name: 'Leaps',
    element: <LeapsBySchool />,
    protected: true,
    allow: [1, 2, 3, 4],
    subRoute: [
      { path: 'hops', name: 'Hops', element: <Hops />, protected: true, allow: [1, 2, 3, 4] },
    ],
  },
  {
    path: '/signout',
    name: 'Signout',
    element: null, // No element needed as it will handle logout logic
    protected: true,
    allow: [1, 2, 3, 4],
  },
];

const adminRoutes = [
  {
    path: '/adminDashbaord',
    name: 'My Territory',
    element: <SiteAdminDashBoard />,
    protected: true,
    allow: [1],
  },
  {
    path: '/dashboard',
    name: 'My Territory',
    element: <DashBoard />,
    protected: true,
    allow: [1, 2],
  },
  // { path: '/teacherDashboard', name: 'Dashboard', element: <TeacherDashBoard />, protected: true, allow: [2, 3] },
  { path: '/schools', name: 'Schools/Company', element: <Schools />, protected: true, allow: [1] },
  { path: '/knowroos', name: 'Knowroos', element: <Profile />, protected: true, allow: [1, 2] },
  ...commonRoutes,
];

const SchoolAdmin = [
  {
    path: '/dashboard',
    name: 'My Territory',
    element: <DashBoard />,
    protected: true,
    allow: [1, 2],
  },
  { path: '/knowroos', name: 'Knowroos', element: <Profile />, protected: true, allow: [1, 2] },
  ...commonRoutes,
];

const teacherRoutes = [
  { path: '/', name: 'Login', element: <LoginContainer />, protected: false, allow: [] },
  {
    path: '/forgot-password',
    name: 'Forgot',
    element: <ForgotPassword />,
    protected: false,
    allow: [],
  },
  {
    path: '/mobs',
    name: 'Mobs',
    element: <Mobs />,
    protected: true,
    allow: [1, 2, 3],
    subRoute: [
      {
        path: 'adventures',
        name: 'Adventures',
        element: <Adventure />,
        protected: true,
        allow: [1, 2, 3],
      },
      {
        path: 'adventures/leaps',
        name: 'Leaps',
        element: <Leaps />,
        protected: true,
        allow: [1, 2, 3, 4],
        subRoute: [
          {
            path: 'hops',
            name: 'Hops',
            element: <MainHops />,
            protected: true,
            allow: [1, 2, 3, 4],
            subRoute: [
              {
                path: 'startHops',
                name: 'StartHops',
                element: <Hops />,
                protected: true,
                allow: [1, 2, 3, 4],
                subRoute: [
                  {
                    path: 'quiz',
                    name: 'Quiz',
                    element: <QuizQuestions />,
                    protected: true,
                    allow: [1, 2, 3],
                  },
                  {
                    path: 'questionnaire',
                    name: 'Questionnaire',
                    element: <QuestionnaireQuestions />,
                    protected: true,
                    allow: [1, 2, 3],
                  },
                  {
                    path: 'assignment',
                    name: 'Assignment',
                    element: <ViewAssignment />,
                    protected: true,
                    allow: [1, 2, 3, 4],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/leaps',
    name: 'Leaps',
    element: <LeapsBySchool />,
    protected: true,
    allow: [1, 2, 3, 4],
    subRoute: [
      { path: 'hops', name: 'Hops', element: <Hops />, protected: true, allow: [1, 2, 3, 4] },
    ],
  },
  {
    path: '/signout',
    name: 'Signout',
    element: null, // No element needed as it will handle logout logic
    protected: true,
    allow: [1, 2, 3, 4],
  },
];

const nonAdminRoutes = [
  { path: '/knowroos', name: 'Knowroos', element: <Profile />, protected: true, allow: [1, 2] },
  ...commonRoutes,
];

// const routes = getRole === '2' || getRole === '3' || getRole === '4' ? nonAdminRoutes : adminRoutes;

const routes =
  getRole == 3
    ? teacherRoutes
    : getRole == 2
      ? SchoolAdmin
      : getRole == 4
        ? nonAdminRoutes
        : adminRoutes;
export default routes;
