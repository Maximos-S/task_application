export const get_lists = async() => {
  const response = await fetch('/api/lists/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  let res = await response.json();
  console.log(res)
  return res
}