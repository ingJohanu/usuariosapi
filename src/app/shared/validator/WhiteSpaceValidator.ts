import { FormControl } from "@angular/forms";

export class WhiteSpaceValidator{
    static cannonContainSpace(formControl:FormControl){
        if(formControl.value.indexOf(' ')>=0){
            return {cannonContainSpace:true}
            debugger;
        }
        return null;
    }
}