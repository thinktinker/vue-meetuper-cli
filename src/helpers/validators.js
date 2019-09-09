import { helpers } from 'vuelidate/lib/validators'

const allowedFileType = (value) =>{
    if(!helpers.req(value)) return true
    const allowedTypes = ['jpg', 'jpeg', 'gif', 'png']
    const extension = value.split('.').pop()
    return allowedTypes.includes(extension)
}

export default allowedFileType