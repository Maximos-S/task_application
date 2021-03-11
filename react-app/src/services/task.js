export const create_task = async(payload) => {
  const response = await fetch("/api/tasks/", {
    method: "post",
    body: payload
  })
  return await response.json()
}
export const edit_task = async(payload,id) => {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    body: payload
  })
  return await response.json()
}

export const create_comment = async(payload, id) => {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "post",
    body: payload
  })
  return await response.json()
}
export const delete_comment = async(id) => {
  const response = await fetch(`/api/tasks/comments/${id}`, {
    method: "delete",
  })
  return await response.json()
}

export const delete_task = async(id) => {
  const response = await fetch(`/api/tasks/${id}`,{
    method: "delete",
  });
  let res = await response.json();
  return res
}