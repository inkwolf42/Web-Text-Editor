import JSZip from "jszip";

async function addFolderToZip(zip, folder) {
  const zipFolder = zip.folder(folder.folder_name);

  for (const file of folder.files) {
    zipFolder.file(`${file.name}.${file.extension}`, file.content ?? "");
  }
  for (const child of folder.folders) {
    await addFolderToZip(zipFolder, child);
  }
}

export async function downloadFolder(rootFolder) {
  const zip = new JSZip();
  for (const file of rootFolder.files) {
    zip.file(`${file.name}.${file.extension}`, file.content ?? "");
  }
  for (const child of rootFolder.folders) {
    await addFolderToZip(zip, child);
  }
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${rootFolder.folder_name}.zip`;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadFile(file) {
  const blob = new Blob([file.content ?? ""], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${file.name}.${file.extension}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
