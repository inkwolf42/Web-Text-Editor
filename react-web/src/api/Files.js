import { get, post, put, del } from "./Api";

/* ---------------- Folders ---------------- */

// GET /folders/{id}
export async function getFolder(id) {
    try {
        return await get(`/folders/${id}`);
    } catch (error) {
        throw error;
    }
}

// POST /folders/{parentId}/folders  { name }
export async function createFolder(parentId, name) {
    try {
        return await post(`/folders/${parentId}/folders`, { name });
    } catch (error) {
        throw error;
    }
}

// PUT /folders/{id}  { name }
export async function renameFolder(id, name) {
    try {
        return await put(`/folders/${id}`, { name });
    } catch (error) {
        throw error;
    }
}

// DELETE /folders/{id}
export async function deleteFolder(id) {
    try {
        return await del(`/folders/${id}`);
    } catch (error) {
        throw error;
    }
}

/* ---------------- Files ---------------- */

// GET /files/{id}
export async function getFile(id) {
    try {
        return await get(`/files/${id}`);
    } catch (error) {
        throw error;
    }
}

// POST /folders/{folderId}/files  { name, extension }
// creates an empty file record (no content yet)
export async function createFile(folderId, name, extension) {
    try {
        return await post(`/folders/${folderId}/files`, { name, extension });
    } catch (error) {
        throw error;
    }
}

// POST /folders/{folderId}/files/upload  { name, extension, content }
// creates a file with content in one step (also updates size/consumed_size)
export async function uploadFile(folderId, name, extension, content) {
    try {
        return await post(`/folders/${folderId}/files/upload`, {
            name,
            extension,
            content,
        });
    } catch (error) {
        throw error;
    }
}

// PUT /files/{id}  { name?, extension?, content? }
// all fields optional — send only what changed
export async function updateFile(id, data) {
    try {
        return await put(`/files/${id}`, data);
    } catch (error) {
        throw error;
    }
}

// DELETE /files/{id}
export async function deleteFile(id) {
    try {
        return await del(`/files/${id}`);
    } catch (error) {
        throw error;
    }
}

// Client-side download helper — triggers a browser download using file content
// already fetched via getFile(id). Backend has no dedicated /download route,
// so this builds a Blob from the file's content and name+extension.
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
