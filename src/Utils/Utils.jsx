import Swal from 'sweetalert2';

export const base64ToBlob = (base64, type = "application/octet-stream") => {
    const binStr = atob(base64);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type: type });
}

export const guardarArchivo = (blob, filename) => {
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }, 0)
    }
}

export const Error = () => {
    Swal.fire({
        title: 'Oops!',
        text: 'Hubo un error inesperado, vuelva a intentarlo más tarde',
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}