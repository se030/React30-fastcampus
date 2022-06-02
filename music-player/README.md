### Redux

자바스크립트 앱을 위한 예측 가능한 상태 컨테이너 **State Container**

서버, 클라이언트, 네이티브 등 다양한 환경에서 일관적으로 동작하고 테스트하기 쉬운 앱을 작성하도록

컴포넌트 단위로 구성된 리액트

`Global State`를 사용하는 App 컴포넌트와 `Local State`를 사용하는 하위 컴포넌트

→ state를 공유해야 하는 상황이 발생! 리덕스는 이 `Shared State`의 저장소

1️⃣ 모든 상태는 Store 안의 객체 트리에 저장

2️⃣ 상태 트리를 변경하는 유일한 방법은 Dispatcher를 통해 Action을 보내는 것

3️⃣ Action이 상태 트리를 어떻게 변경할지 명시하기 위해서 Reducer를 작성

⚠️ Reducer는 순수함수로만 구성 → 같은 인수로 실행한 결과가 언제나 같아야

비동기 동작이나 외부 데이터 구조를 변경하는 호출(e.g. 데이터베이스, HTTP request)은 사용할 수 없음

- Action
  중앙 저장소에 저장된 state에 어떤 동작을 할지 적어놓는 객체 — type 필수
  ```jsx
  const PLAY_MUSIC = "musicPlayer/PLAY_MUSIC";
  const STOP_MUSIC = "musicPlayer/STOP_MUSIC";
  const NEXT_MUSIC = "musicPlayer/NEXT_MUSIC";
  const PREV_MUSIC = "musicPlayer/PREV_MUSIC";
  const SET_REPEAT = "musicPlayer/SET_REPEAT";
  ```
- Action Creator
  inline action이 불편할 경우에 action 객체를 return하는 함수를 만들어 사용

  ```jsx
  export const playMusic = () => ({ type: PLAY_MUSIC });
  export const stopMusic = () => ({ type: STOP_MUSIC });
  export const nextMusic = () => ({ type: NEXT_MUSIC });
  export const prevMusic = () => ({ type: PREV_MUSIC });
  export const setRepeat = () => ({ type: SET_REPEAT });
  ```

  ✅ Action with parameters

  ```jsx
  export const setCurrentIndex = (index) =>
  	({type: SET_CURRENT_INDEX, index: index});

  // ...

  case SET_CURRENT_INDEX:
              const index = action.index;
              return {
                  ...state,
                  currentIndex: index,
                  currentMusicId: state.playList[index].id
              }
  ```

- Dispatcher
  store의 reducer에게 action을 넘겨주는 역할

  ```jsx
  const onClickPrevious = useCallback(() => {
    if (repeatMode === "ONE") resetDuration();
    // dispatch에 정의해둔 Action을 담아서 호출
    else dispatch(prevMusic());
  }, [repeatMode, resetDuration, dispatch]);
  const onClickNext = useCallback(() => {
    if (repeatMode === "ONE") resetDuration();
    else dispatch(nextMusic());
  }, [repeatMode, resetDuration, dispatch]);
  ```

- Reducer
  dispatch를 통해 넘겨받은 action type을 확인해서 동작을 하는 곳 = function
  복사한 state에 수정사항 반영해서 return

  ```jsx
  export default function musicPlayerReducer(state=initialState, action) {
      switch(action.type) {
          case PLAY_MUSIC:
              return {
                  ...state,
                  playing: true
              }
          case STOP_MUSIC:
              return {
                  ...state,
                  playing: false
              }
          case NEXT_MUSIC:
              const nextIndex = state.repeat === "SHUFFLE" ?
                  getRandomNum(playList.length, state.currentIndex)
                  : (state.currentIndex + 1) % state.playList.length
              return {
                  ...state,
                  currentIndex: nextIndex,
                  currentMusicId: state.playList[nextIndex].id
              }
  // ...
  ```

- Store
  모든 컴포넌트에서 사용할 수 있는 `Global State`를 저장해놓는 저장소
  **dispatch 함수를 통해서만** 접근이 가능

  ```jsx
  const initialState = {
    playList,
    currentMusicId: playList[0].id,
    currentIndex: 0,
    playing: false,
    repeat: "ALL", // ONE SHUFFLE
  };
  ```
