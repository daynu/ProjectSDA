 export default function convertTo64(file)
{
  return new Promise((resolve, reqject) =>
  {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () =>
    {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => 
    {
      reqject(error)
    } 
  })
}