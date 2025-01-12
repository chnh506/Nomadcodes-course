import React, { useState } from "react";
import { useForm } from "react-hook-form";

/*function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
    setToDoError("");
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(toDo.length < 10) {
      return setToDoError("ToDo should be longer.");
    }
    console.log("submit");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Write a To Do..."
          value={toDo}
          onChange={onChange}
        />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
}*/

// Form의 Interface를 만들어 준다.
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
}

function ToDoList() {
  // - register 함수를 사용하면, 'onChange' event handler & input의 props & useState() 가 필요 없다.
  // - watch 함수는 form의 입력값들의 변화를 관찰할 수 있게 해 주는 함수이다.
  // - handleSubmit 함수를 onSubmit에 넣어 줌으로써 validation 및 다른 동작들을 수행한다.
  // - formState.errors : 어떤 에러가 발생했는지를 알려준다!(type & message) register의 options과 연계한 에러 핸들링 ㄱㄱㄱㄱ
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  // onValid 함수 : react-hook-form이 모든 validation을 다 마쳤을 때만 이 함수가 호출된다.
  const onValid = (data: IForm) => {
    // 직접 에러를 설정하는 방법: useForm()의 setError() 함수를 이용한다!
    if (data.password !== data.password1) {
      return setError(
        "password1",
        { message: "Passwords are not the same" },
        { shouldFocus: true }
      );
    }
  };

  // 1. 객체를 만들고, 그 안에 register 함수를 spread 해서 넣어준다. (ES6 문법!)
  //    -> register 함수가 반환하는 객체(아래 콘솔 캡처 참고)를 input에다가 props로 준다.
  //    새로운 input을 만들 때마다, register 함수만 실행시켜주면 알잘딱으로 다 해 준다..~!!~!
  // 2. form 태그의 onSubmit props에다가 handleSubmit() 함수를 써 준다.
  //    -> onSubmit에 handleSubmit 함수를 사용할 때는 얘를 호출(()괄호)해 줘야 한다!! 보통은 하지 않는 일.
  // 3. RegisterOptions 설정 : JavaScript 단에서 validation을 진행할 수 있게 해 준다.
  //    -> HTML에 의지하지 않고 우리 서비스를 보호할 수 있다. + 부가기능 good
  //    -> 더해서, formState.errors와 연계해서 에러 핸들링을 손쉽게 진행할 수 있다.
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required.",
            pattern: {
              // 정규표현식으로 validation 조건을 설정해 줄 수 있다!
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only 'naver.com' emails allowed.",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: true,
            // 내가 직접 만든 조건으로 검사하는 방법: validate() 함수!
            // 아래처럼 객체 리터럴로 만들어서 여러 개의 함수를 등록할 수도 있다.
            // 함수를 async(비동기)로 만들어서 서버에다가 확인하고 응답을 받을 수도 있다.
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nicos allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nicks allowed" : true,
            },
          })}
          placeholder="First Name"
        />
        <input
          {...register("lastName", { required: true })}
          placeholder="Last Name"
        />
        <input
          {...register("username", { required: true, minLength: 10 })}
          placeholder="Username"
        />
        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 5, message: "Your password is too short." },
          })}
          placeholder="Password"
        />
        <input
          {...register("password1", { required: true, minLength: 5 })}
          placeholder="Password Confirmation"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
