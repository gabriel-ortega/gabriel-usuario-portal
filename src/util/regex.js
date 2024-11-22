export function validaciones({ regexType, value }) {
    let isValid = true;
    let regex = null;
    let message = "";

    if (value === "") {
        return {
            isValid: true,
            message: ""
        };
    }

    if (regexType === "3") {
        regex = /^\d{1,3}(\.\d{0,2})?$/; // Permite números de 1 a 999 con hasta dos decimales
        message = "only numbers are allowed ";
    } else if (regexType === "1") {
        regex = /^[0-9]+$/;
        message = "It can only contain positive numbers.";
    } else if (regexType === "2") {
        regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
        message = "It can only contain letters and spaces.";
    }else if (regexType === "4") {
        regex = /^[1-2](\.\d{0,2})?$|^3(\.00)?$/;
        message = "only numbers from 1 to 3 are allowed ";
    }else if (regexType === "5") {
        regex = /^[0-9]+$/;
        message = "only numbers are allowed";
    }else if (regexType === "6") {
        regex = /^([0-9]|1[0-2])$/;
        message = "Only values 1-12 are allowed";
    }

    if (regex) {
        isValid = regex.test(value);
        if (!isValid) {
            message = message || "El valor ingresado no es válido.";
        }
    }

    return {
        isValid,
        message
    };
}
