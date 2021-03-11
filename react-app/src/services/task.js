
export const get_tasks = async() => {
    const response = await fetch("/api/tasks")
}

export const delete_task = async(id) => {
  const response = await fetch(`/api/tasks/${id}`,{
    method: "delete",
  });
  let res = await response.json();
  return res
}