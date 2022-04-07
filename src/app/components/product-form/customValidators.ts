import { AbstractControl, ValidationErrors } from "@angular/forms";

export class customValidator{
    static priceValueCheck(control: AbstractControl) : ValidationErrors | null {
        if ( control.value < 0)
            return { InvalidPrice: "Please enter price more than 0" };
        return null;
    }
}