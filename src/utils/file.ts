export async function getFileContentAsync(file: File): Promise<ArrayBuffer> {
  const reader = new FileReader();
  return await new Promise((resolve, reject) => {
    reader.addEventListener('load', function (e) {
      resolve(e.target?.result as ArrayBuffer);
    });
    reader.addEventListener('error', function (e) {
      reject(reader.error);
    });
    reader.readAsArrayBuffer(file);
  })
}