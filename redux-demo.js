// 1. 리덕스 import 
const redux = require('redux');

// 2. 리듀서 정의 
// 상태(state)와 액션(action)을 매개변수로 받음 
// 리듀서 안에서 action으로 변경될 값을 return함
const counterReducer = (state = { counter: 0 }, action) => {
	 											// 7. 따라서 여기서 state의 초기값을 설정해줌 
	if (action.type === 'increment') {
		return { 
			counter: state.counter + 1,
		};
	}

	// 13. 57줄에 새로운 액션타입에 따른 조건 추가 설정
	if (action.type === 'decrement') {
		return { 
			counter: state.counter - 1,
		}
	}
	
	return state; // 초기상태 반환 

	// 11 .일단 여기까지 작성하고 실행해보면 counter값이 1이나옴 
	// 만약 밑에서 action 의 type을 increment가 아닌 다른걸로 수정하면 counter값은 0이 나옴
	// 12.물론 57줄처럼 새로운 action을 만들 수도 있음
};

// 3. 저장소(store) 생성
// 저장소는 위에서 만든 리듀서를 매개변수로 받아서 실행(?)
const store = redux.createStore(counterReducer);

// 4. 리듀서와 저장소를 만들었으니 그걸 구독(?)할 무언가 생성 
const counterSubscriber = () => {
	const latestState = store.getState();
	// getState는 store에서 사용하는 메서드?라고 함 
	// 위에서 만든 리듀서로 얻은 값을 최신 State( latestState) 로 정의
	console.log(latestState);

}


// 5. 위에서 만든 구독자(?)를 인자로 받는 store의 subscribe메서드 실행 
// 단, 여기서 위에서 만든 구독자함수(?)를 실행해선 안됨 단지 가리킬 뿐 
// () 안에서 counterSubscriber() 라고 적으면 안 됨
// 15줄에서도 마찬가지인데 이걸 실행하는 건 리덕스임 
store.subscribe(counterSubscriber);

// 6. 여기까지 하고 터미널에서 파일을 실행해보면 에러가 나오는데 
// 이유는 7줄에서 맨 처음 초기 state의 값을 정의해주지 않았기 때문임 

// 8.   8줄의 7번(초기 state값 설정)까지 하고 터미널에서 파일을 실행하면 일단 실행은 되는데 아무 값도 나타나지 않음
// 왜냐하면 현재까지 아무런 action도 전해주지 않았기 때문에 
// 9. 따라서 action을 발송해줘야함
// dispatch는 action을 발송해주는 store메소드임 
store.dispatch({ type: 'increment' });
store.dispatch({ type: 'decrement' });
// 10. 여기까지 하고 실행을 해보면 counter: 2가 나옴 
// 	맨처음 실행되면서 counter가 0에서 1이 되고 42줄에 의해 action이 발송되면서 +1이 돼서 최종적으로 2가 됨
// 	근데 사실 여기까지만 하면 42줄은 아무 효과가 없음 
// 	그래서 다시 9줄로 돌아감 
