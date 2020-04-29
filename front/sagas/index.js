import { all, call } from "redux-saga/effects";
import user from "../sagas/user";
import post from "../sagas/post";

export default function* rootSaga() {
  yield all([call(user), call(post)]);
}
