
import React, { useState } from "react";

const List = React.memo(
  ({
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    handleClick,
    handleEditChange,
    saveToDos,
    // onClickSubmitButton,
  }) => {
    console.log("List Component");

    const [edited, setEdited] = useState(false); //수정모드인지 확인하기 위한 플래그 값
    const [editedTitle, setEditedTitle] = useState(title);

    const onClickEditButton = () => {
      setEdited(true);
    };

    const onClickSubmitButton = (id) => {
      let newTodoData = todoData.map((data) => {
        console.log("id", id);
        console.log("data.id", data.id);

        console.log("editedTitle", editedTitle);

        if (data.id === id) {
          data.title = editedTitle;
        }
        return data;
      });
      console.log("newTodoData", newTodoData);
      setTodoData(newTodoData);
      setEdited(false);
    };

    const handleEditingChange = (e) => {
      setEditedTitle(e.target.value);
    };

    const handleCompleteChange = (id) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(newTodoData);
      saveToDos();
    };

    return (
      <div
        key={id}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${
          snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
        } flex items-center justify-between w-full px-4 my-2 text-gray-600 bg-gray-100 border rounded`}
      >
        <div className="flex jutify-center items-center">
          <input
            type="checkbox"
            defaultChecked={completed}
            onChange={() => handleCompleteChange(id)}
          />

          {edited ? (
            <input
              className="w-full px-1 py-1 mr-2 text-gray-500 appearance-none"
              value={editedTitle}
              onChange={handleEditingChange}
              autoFocus
            />
          ) : (
            <span className={completed ? "line-through" : undefined}>
              {title}
            </span>
          )}
        </div>
        <div className="flex justyfy-center items-center">
          <div className="flex justfy-center items-center">
            {edited ? (
              <button onClick={() => onClickSubmitButton(id)}>👌</button>
            ) : (
              <button onClick={onClickEditButton}>✏</button>
            )}
          </div>
          <button
            className="px-4 py-2 float-right"
            onClick={() => handleClick(id)}
          >
            x
          </button>
        </div>
      </div>
    );
  }
);

export default List;
