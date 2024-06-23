import {Injectable} from "@angular/core";
import exp from "constants";
import {FormGroup} from "@angular/forms";

@Injectable({
    providedIn: 'root',
})
export class KeepFormService<T> {
    private readonly _formsData: Map<string, T> = new Map<string, T>();

    public keepForm(formName: string, form: FormGroup): void {
        form.valueChanges.subscribe(() => {
            this.store(formName, form);
        })
    }

    private store(name: string, form: FormGroup): void {
        this._formsData.set(name, form.value);
        localStorage.setItem(name, JSON.stringify(this._formsData));
    }

    public apply(name: string, form: FormGroup): void {
        const data: string | null = localStorage.getItem(name);
        if (data) {
            const parsedData = JSON.parse(data);
            form.setValue(parsedData);
        }
    }
}
