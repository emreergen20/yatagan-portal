
import * as Yup from "yup";

const validations = Yup.object().shape({
    email: Yup
        .string()
        .email('Doğru Email Formatı Değil.')
        .required('Zorunlu Alan'),
    password: Yup
        .string()
        .min(6, 'En Az 6 Karakter')
        .required('Zorunlu Alan'),

});

module.exports = validations;
