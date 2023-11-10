async function downloadFile(url: string) {
  return new Promise<File>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.responseType = "blob"
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(this.response)
      }
    }
    xhr.send()
  })
}
