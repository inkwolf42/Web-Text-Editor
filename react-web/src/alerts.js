import Swal from 'sweetalert2'

export async function askForName(type,placeHolder="") {
    return await Swal.fire({
        title: `Enter ${type} name`,
        input: 'text',
        inputLabel: 'Name',
        inputPlaceholder: placeHolder=="" ? `Type ${type} name here...` : placeHolder,
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
            if (!value.trim()) {
                return `Please enter ${type} name!`;
            }
        }
    });


}

export async function confirmButtonText() {
    var res = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    })
    return res.isConfirmed;
}
