import Swal from "sweetalert2";

/**
 * Formats a byte count into a human-readable string (KB/MB/GB).
 */
function formatBytes(bytes) {
    if (!bytes || bytes === 0) return "0 B";
    const units = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, i);
    return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

/**
 * Formats an ISO date string into a readable date.
 */
function formatDate(dateString) {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/**
 * Shows a SweetAlert2 popup with the user's profile info.
 *
 * @param {object} user - expects { name, email, created_at, consumed_size, number_of_folders, storage_limit? }
 */
export function showProfileInfo(user) {
    user.consumed_size = user.consumed_size<0?0:user.consumed_size
    const consumed = formatBytes(user.consumed_size);
    const limit = user.storage_limit ? formatBytes(user.storage_limit) : null;
    const percentUsed = user.storage_limit
        ? Math.min(100, Math.round((user.consumed_size / user.storage_limit) * 100))
        : null;

    console.log(user.consumed_size);


    return Swal.fire({
        title: user.name,
        html: `
            <div style="text-align:left; font-family: inherit; font-size: 0.95rem;">
                <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #eee;">
                    <span style="color:#6b7280;">Email</span>
                    <span style="font-weight:600;">${user.email ?? "—"}</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #eee;">
                    <span style="color:#6b7280;">Member since</span>
                    <span style="font-weight:600;">${formatDate(user.created_at)}</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #eee;">
                    <span style="color:#6b7280;">Folders</span>
                    <span style="font-weight:600;">${user.number_of_folders ?? 0} / ${user.folder_limit}</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding:6px 0;">
                    <span style="color:#6b7280;">Storage used</span>
                    <span style="font-weight:600;">${consumed}${limit ? ` / ${limit}` : ""}</span>
                </div>
                ${
                    percentUsed !== null
                        ? `
                    <div style="margin-top:10px; height:8px; width:100%; background:#e5e7eb; border-radius:4px; overflow:hidden;">
                        <div style="height:100%; width:${percentUsed}%; background:${
                              percentUsed > 90 ? "#ef4444" : "#6366f1"
                          };"></div>
                    </div>
                    <div style="text-align:right; font-size:0.75rem; color:#9ca3af; margin-top:4px;">
                        ${percentUsed}% used
                    </div>
                    `
                        : ""
                }
            </div>
        `,
        confirmButtonText: "Close",
        confirmButtonColor: "#6366f1",
        width: 380,
    });
}
