import React from 'react'

export default function Deleteall({ handleSubmit, value, setValue}) {
    console.log("Deleteall Component");

  return (
    <form onSubmit={handleSubmit} className="flex pt-2" >

    <input className="text-xs p-2 text-gray-400 border-2 border-grey-400 rounded hover:text-white hover:bg-gray-500"
      type="submit"
      value="모두지우기"

    />
  </form>

  )
}