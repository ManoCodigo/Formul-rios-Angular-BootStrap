import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "@angular/forms"


export class FormValidations {

  static requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      // const values = formArray.controls
      // let totalChecked = 0
      // for (let i = 0; i< values.length; i++) {
      //   if(values[i].value) {
      //     totalChecked += 1
      //   }
      // }
      // return totalChecked <= min ? null : { required: true }

      const totalChecked = formArray.controls.map(v => v.value)
      .reduce((total, current) => current ? total + current : total, 0)
      return totalChecked >= min ? null : { required: true }
    }
    return validator
  }

  static cepValidator(control: FormControl) {
    const cep = control.value
    if (cep && cep !== '') {
      const validaCep = /^[0-9]{8}$/
      return validaCep.test(cep) ? null : { cepInvalido: true }
    }
    return null
  }

  static equalsTo(outroCampo: string) {
    const validator = (formControl: FormControl) => {
      if (outroCampo == null) {
        throw new Error('É necessário informar um campo.')
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null
      }

      const campo = (<FormGroup>formControl.root).get(outroCampo)

      if (!campo) {
        throw new Error('É necessário informar um campo válido.')
      }

      if (campo.value !== formControl.value) {
        return { equalsTo: outroCampo}
      }

      return null
    }
    return validator
  }

  static validaCPF() {
    return (control: AbstractControl) => {
      const cpf = (control.value)?.replace(/\D/g, '');

      if (cpf) {
        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;
        if (cpf.length < 11) {
         return null
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return { cpfNotValid: false };
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(1))) {
            return { cpfNotValid: true };
          }
          return null;
        } else {
          return { cpfNotValid: true };
        }
     }
   return null;
 };
}
}
