import {
  all,
  fork,
  takeLatest,
  call,
  put,
  take,
  takeEvery,
  delay,
} from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
} from "../reducers/user";

function logInAPI(loginData) {
  // 서버에 요청을 보내는 부분
  return axios.post("/user/login", loginData, {
    withCredentials: true,
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    // put은 dispatch와 동일
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패 시
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function signUpAPI(signUpData) {
  return axios.post("/user", signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    // yield delay(2000);
    // throw new Error("에러에러에러");
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}
function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function logOutAPI() {
  return axios.post(
    "/user/logout",
    {},
    {
      withCredentials: true,
    }
  );
}

function* logOut() {
  try {
    yield call(logOutAPI);
    // yield delay(2000);
    // throw new Error("에러에러에러");
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e,
    });
  }
}
function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}
//
function followAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.post(
    `/user/${userId}/follow`,
    {},
    {
      withCredentials: true,
    }
  );
}

function* follow(action) {
  try {
    // yield call(followAPI);
    const result = yield call(followAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: FOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: FOLLOW_USER_FAILURE,
      error: e,
    });
  }
}

function* watchFollow() {
  yield takeEvery(FOLLOW_USER_REQUEST, follow);
}

function unfollowAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.delete(`/user/${userId}/follow`, {
    withCredentials: true,
  });
}

function* unfollow(action) {
  try {
    // yield call(unfollowAPI);
    const result = yield call(unfollowAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error: e,
    });
  }
}

function* watchUnfollow() {
  yield takeEvery(UNFOLLOW_USER_REQUEST, unfollow);
}

function loadUserAPI(userId) {
  return axios.get(userId ? `/user/${userId}` : "/user/", {
    withCredentials: true,
  });
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data, // 유저정보가 없으면 내정보를 가져온다
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    });
  }
}
function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}
export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchSignUp),
    fork(watchLogOut),
    fork(watchLoadUser),
    fork(watchFollow),
    fork(watchUnfollow),
  ]);
}
