import React from "react";
import { useState, useCallback, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";
import Deleteall from "./components/Deleteall";


// class 컴포넌트에서는 반드시 render 안에 ui를 작성해야 한다.
export default function App() {
  console.log("App Component");

  // state = {
  //   todoData : [],
  //   value: ""
  // };



  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");


//  function saveTodos() {
//   localStorage.setItem(setTodoData, JSON.stringify(todoData));
// }

// function init() {
//   loadTodos();
  
// }
// init();

// function loadTodos() {
//   const loadedTodos = localStorage.getItem(setTodoData);
//   if (loadedTodos !== null) {
//     //string(loadedTodos) to object
//     const parsedTodos = JSON.parse(loadedTodos);
//     //run functions each time
//     parsedTodos.forEach((itIsMeaningless) => {
//       //write the extracted texts in todoInput
//       setTodoData = parsedTodos;
//     });
//   }
// }

//   function saveToDos() {
//     console.log("되려나")
//     console.log(todoData)
//     localStorage.setItem("todoData", JSON.stringify(todoData)); //localStorage에 저장하기
//     // a, b, c를 추가하면 localStorage에는 ["a", "b", "c"] 가 저장된다. 하지만 이건 진짜 배열이 아닌 배열처럼 보이는 문자열이다.
    
// }
  
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

 

  // const onChangeEditInput = (e) => {
  //   setValue(e.target.value);
  // }

  // const onClickSubmitButton = () =>{
  //   const newTodoData = todoData.map((data) => ({
  //     ...data,
  //     text : data.id === todoData.id ? setValue : data.text,
  //   }));
  //   setTodoData(newTodoData);
  // };

  const onClickSubmitButton = (id, newTitle) => {
    setTodoData(
      todoData.map((data) =>
        data.id === id ? { ...data, title: newTitle } : data
      )
    );
    // saveToDos();
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

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // 원래 있던 할 일에 새로운 할 일 더해주기
    setTodoData((prev) => [...prev, newTodo]);
    setValue(""); // 이건 무슨의미지?
    // saveToDos();
  };
  // 여기서 실제 completed 속성을 바꿔줌


//   function loadToDos()    // 페이지가 로드될때 기존 등록되어 있는 todo들을 조회해서 뿌려주기
// {
//     const loadedToDos = JSON.parse(localStorage.getItem("todoData"));
//     setTodoData = loadToDos;
// }

// loadToDos();

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-['ui-serif']">할 일 목록</h1>
          <div>
            <Deleteall deleteclick={deleteclick} />
          </div>
        </div>

        <Lists
          // onClickEditButton={onClickEditButton}
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
