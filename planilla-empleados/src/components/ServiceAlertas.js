
import Swal from 'sweetalert2';

export function showErrorAlert(textoalerta) {
        Swal.fire({
          type: 'error',
          title: 'Oops..',
          text: textoalerta
        })
      }


export function showSuccessAlert(textoalerta) {
        Swal.fire({
        
          type: 'success',
          title: 'WooHoo!',
          text: textoalerta
        })
      }
