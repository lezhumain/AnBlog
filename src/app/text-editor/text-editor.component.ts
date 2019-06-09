import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {fromEvent} from 'rxjs';
import {first, take} from 'rxjs/operators';
// import * as _ from '../../assets/jQuery-TE_v.1.4.0/jquery-te-1.4.0.min.js';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.css', '../../assets/jQuery-TE_v.1.4.0/jquery-te-1.4.0.css'],
})
export class TextEditorComponent implements OnInit, AfterViewInit {
    static libLoaded = false;

    @Input() text: string;
    @ViewChild("areaElement", {static: false}) areaElement: ElementRef<HTMLTextAreaElement>;
    @ViewChild("libElem", {static: false}) libElem: ElementRef<HTMLScriptElement>;

    get libLoaded(): boolean {
        return TextEditorComponent.libLoaded;
    }
    set libLoaded(value: boolean) {
        TextEditorComponent.libLoaded = TextEditorComponent.libLoaded === false ? value : true;
    }

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.libElem) {
            fromEvent(this.libElem.nativeElement, 'load').pipe(take(1)).subscribe(() => {
                const elem = $(this.areaElement.nativeElement);
                console.log(elem);
                elem.jqte();
            });
        }
    }

    setLibLoaded() {
        this.libLoaded = true;
    }
}
