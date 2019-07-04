// Import Froala Editor.
import FroalaEditor from 'froala-editor';

// We will make usage of the Init hook and make the implementation there.
import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
@Component({
    selector: 'app-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextEditorComponent),
            multi: true
        }
    ]
})
export class TextEditorComponent implements OnInit, ControlValueAccessor {

    options = {
        charCounterCount: true,
        toolbarButtons: [['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'],
            ['fontFamily', 'fontSize', 'textColor', 'backgroundColor'],
            ['inlineClass', 'inlineStyle', 'clearFormatting']]
    };

    private _text: string;
    set text(value: string) {
        this._text = value;
        this.propagateChange(this._text);
    }
    get text(): string {
        return this._text;
    };

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
