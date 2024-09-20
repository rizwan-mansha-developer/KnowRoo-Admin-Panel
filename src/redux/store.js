// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import advDeleteSliceReducer from './deleteSlices/AdventureDeleteSlice';
import hopsDeleteSliceReducer from './deleteSlices/HopsDeleteSlice.jsx';
import leapsDeleteSliceReducer from './deleteSlices/LeapsDeleteSlice';
import mobDeleteSliceReducer from './deleteSlices/MobDeleteSlice';
import schoolsDeleteSliceReducer from './deleteSlices/SchoolDeleteSlice';
import userDeleteSliceReducer from './deleteSlices/UserDeleteSlice';
import addAdventureReducer from './postApiSlices/AddAdventureSlice';
import addAssignmentSliceReducer from './postApiSlices/AddAssignmentSlice';
import addCourseSliceReducer from './postApiSlices/AddCourseSlice';
import addleapsReducer from './postApiSlices/AddLeapsSlice';
import mobReducer from './postApiSlices/AddMobSlice';
import addQuestionnaireSliceReducer from './postApiSlices/AddQuestionnaireSlice';
import addquestionSliceReducer from './postApiSlices/AddQuizQuestionSlice';
import addquizSliceReducer from './postApiSlices/AddQuizSlice';
import addschoolSliceReducer from './postApiSlices/AddSchoolSlice';
import addUserReducer from './postApiSlices/AddUserSlice';
import adventureReducer from './slices/AdventureSlice';
import assignmentsSliceReducer from './slices/AssignmentSlice';
import coursesSliceReducer from './slices/CourseSlice';
import leapsReducer from './slices/LeapsSlice';
import hopsSliceReducer from './slices/MainHops.jsx';
import groupsReducer from './slices/MobSlice';
import questionnairesSliceReducer from './slices/QuestionnaireSlice';
import quizsSliceReducer from './slices/QuizSlice';
import schoolsReducer from './slices/Schools';
import userReducer from './slices/UserSlice';
import viewSchoolSliceReducer from './slices/ViewSchool.jsx';
import viewMobsSliceReducer from './slices/ViewMobs.jsx';
import viewUserSliceReducer from './slices/ViewUser.jsx';
import assignAdventureSliceReducer from './postApiSlices/AssignAdventure.jsx';
import assignLeapsSliceReducer from './postApiSlices/AssignLeaps.jsx';
import addHopsSliceReducer from './postApiSlices/AddHopsSlice.jsx';
import assignTASliceReducer from './postApiSlices/AssignTASlice.jsx';
import assignTeacherToMobReducer from './postApiSlices/AssignTeacherSlice.jsx';
import userByMobSliceReducer from './slices/UserByMobSlice.jsx';
import viewQuizSliceReducer from './slices/ViewQuiz.jsx';
import questionnaireQuestionSliceReducer from './slices/ViewQuestionnaire.jsx';
import viewAssignmentSliceReducer from './slices/ViewAssignment.jsx';
import viewCourseSliceReducer from './slices/ViewCourse.jsx';
import assignmentuserSliceReducer from './slices/UserByAssignment.jsx';
import checkAssignmentSliceReducer from './postApiSlices/CheckAssignment.jsx';
import quizUserSliceReducer from './slices/UserByQuiz.jsx';
import quizResultSliceReducer from './slices/ViewQuizResult.jsx';
import mobsLeaderBoardSliceReducer from './slices/MobsLeaderBoard.jsx';
import fetchAdventureBySchoolReducer from './slices/AdventureBySchoolId.jsx';
import leapsBySchoolSliceReducer from './slices/LeapsBySchool.jsx';
import teamMobsSliceReducer from './slices/TeamMobSlice.jsx';
import schoolDashbaordSliceReducer from './dashboardSlices/SchoolAdminSlice.jsx';

import siteAdminDashbaordSliceReducer from './dashboardSlices/SiteAdminSlice.jsx';
import analiyticDashbaordSliceReducer from './dashboardSlices/analiyticGraph.jsx';
import prerequisiteLeapSliceReducer from './postApiSlices/PrerequisiteLeaps.jsx';
import prerequisiteHopSliceReducer from './postApiSlices/PrerequisiteHop.jsx';
const store = configureStore({
  reducer: {
    //Get Apis
    groups: groupsReducer,
    schools: schoolsReducer,
    adventure: adventureReducer,
    leaps: leapsReducer,
    user: userReducer,
    quizs: quizsSliceReducer,
    questionnaires: questionnairesSliceReducer,
    assignments: assignmentsSliceReducer,
    courses: coursesSliceReducer,
    hops: hopsSliceReducer,
    viewSchool: viewSchoolSliceReducer,
    viewMobs: viewMobsSliceReducer,
    viewUser: viewUserSliceReducer,
    userByMob: userByMobSliceReducer,
    viewQuiz: viewQuizSliceReducer,
    questionnaireQuestion: questionnaireQuestionSliceReducer,
    viewAssignment: viewAssignmentSliceReducer,
    viewCourse: viewCourseSliceReducer,
    assignmentuser: assignmentuserSliceReducer,
    quizUser: quizUserSliceReducer,
    quizResult: quizResultSliceReducer,
    mobsLeaderBoard: mobsLeaderBoardSliceReducer,
    adventureBySchool: fetchAdventureBySchoolReducer,
    leapsBySchool: leapsBySchoolSliceReducer,
    teamMobs: teamMobsSliceReducer,
    //Dashbaord Apis
    schoolDashbaord: schoolDashbaordSliceReducer,
    siteAdminDashbaord: siteAdminDashbaordSliceReducer,
    analiyticDashbaord: analiyticDashbaordSliceReducer,
    //Post Apis
    school: addschoolSliceReducer,
    mob: mobReducer,
    addadventure: addAdventureReducer,
    addleaps: addleapsReducer,
    addUser: addUserReducer,
    addCourse: addCourseSliceReducer,
    addquiz: addquizSliceReducer,
    addquestion: addquestionSliceReducer,
    addQuestionnaire: addQuestionnaireSliceReducer,
    addAssignment: addAssignmentSliceReducer,
    assignLeaps: assignLeapsSliceReducer,
    addHops: addHopsSliceReducer,
    assignTA: assignTASliceReducer,
    assignTeacherToMob: assignTeacherToMobReducer,
    assignAdventure: assignAdventureSliceReducer,
    checkAssignment: checkAssignmentSliceReducer,
    prerequisiteLeap: prerequisiteLeapSliceReducer,
    prerequisiteHop: prerequisiteHopSliceReducer,

    //Delete Apis
    schoolsDelete: schoolsDeleteSliceReducer,
    deleteMobs: mobDeleteSliceReducer,
    deleteUser: userDeleteSliceReducer,
    deleteAdventure: advDeleteSliceReducer,
    deleteLeaps: leapsDeleteSliceReducer,
    deleteHops: hopsDeleteSliceReducer,
  },
});

export default store;
