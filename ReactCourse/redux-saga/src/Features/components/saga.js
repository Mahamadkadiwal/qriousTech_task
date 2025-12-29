import { call, put, takeEvery } from "redux-saga/effects";

// Worker saga: does the async task
function* fetchUser(action) {
  try {
    const data = yield call(fetch, `https://jsonplaceholder.typicode.com/users`);
    const json = yield data.json();
    yield put({ type: "FETCH_SUCCESS", payload: json }); // dispatch success action
  } catch (error) {
    yield put({ type: "FETCH_FAILED", payload: error.message });
  }
}

// Watcher saga: watches for actions
function* watchFetchUser() {
  yield takeEvery("FETCH_REQUEST", fetchUser);
}

export default watchFetchUser;
