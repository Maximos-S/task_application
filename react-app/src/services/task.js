export const create_task = async(payload) => {
  const response = await fetch("/api/tasks", {
    method: "post",
    body: payload
  })
  return await response.json()
}
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