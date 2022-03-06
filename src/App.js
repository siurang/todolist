import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/Lists";
import Deleteall from "./components/Deleteall";
import { data } from "autoprefixer";

// class 컴포넌트에서는 반드시 render 안에 ui를 작성해야 한다.
export default function App() {
  console.log("App Component");

  // state = {
  //   todoData : [],
  //   value: ""
  // };

  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");
  const [edited, setEdited] = useState(false); //수정모드인지 확인하기 위한 플래그 값

  

  // const onChangeCheckbox = () => {
  //   const newTodoData = todoData.map((item) => ({
  //     ...data,
  //     checked: data.id === todoData.id? !data.checked : data.checked,
  //   }));
  //   setTodoData(newTodoData);
  // }
  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      console.log("newTodoData", newTodoData);
      setTodoData(newTodoData);
    },
    [todoData]
  );
  const onClickEditButton = () => {
    setEdited(true);
  }
  const onChangeEditInput = (e) => {
    setValue(e.target.value);
  }

  const onClickSubmitButton = () =>{
    const newTodoData = todoData.map((data) => ({
      ...data,
      text : data.id === todoData.id ? setValue : data.text,

    }));
    setTodoData(newTodoData);
    setEdited(false);
  };




  

  const deleteclick = (e) => {
    // form 안에 input을 전송할 때 페이지 Reload 되는 것을 막아 줌
    e.preventDefault();
    setTodoData((prev) => [""]);
  };

  // const onClickEditButton=()=>{
  //   setEdited(true);
  // }
  
  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 Reload 되는 것을 막아 줌
    e.preventDefault();
    setEdited(false);

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // 원래 있던 할 일에 새로운 할 일 더해주기
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };
  // 여기서 실제 completed 속성을 바꿔줌



  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-['ui-serif']">할 일 목록</h1>
          <div>
            <Deleteall deleteclick={deleteclick} />
          </div>
        </div>

        <List
          // onClickEditButton={onClickEditButton}
          onClickEditButton={onClickEditButton}
          onClickSubmitButton={onClickSubmitButton}
          handleClick={handleClick}
          todoData={todoData}
          setTodoData={setTodoData}
        />

        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
