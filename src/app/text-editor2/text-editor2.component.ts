import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-text-editor2',
  templateUrl: './text-editor2.component.html',
  styleUrls: ['./text-editor2.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextEditor2Component),
            multi: true
        }
    ]
})
export class TextEditor2Component implements OnInit, ControlValueAccessor {
    private _text: string;
    set text(value: string) {
        this._text = value;
        this.propagateChange(this._text);
    }
    get text(): string {
        return this._text;
    };

  constructor() { }

  ngOnInit() {
  }

    propagateChange = (obj: any) => {};

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: string): void {
        if (obj !== undefined) {
            this.text = obj;
        }
    }

}
