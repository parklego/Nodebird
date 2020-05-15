import { all, call } from "redux-saga/effects";
import axios from "axios";
import user from "../sagas/user";
import post from "../sagas/post";

axios.defaults.baseURL = "http://localhost:8080/api";

export default function* rootSaga() {
  yield all([call(user), call(post)]);
}
