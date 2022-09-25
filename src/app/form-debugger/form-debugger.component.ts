import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-debugger',
  templateUrl: './form-debugger.component.html',
  styleUrls: ['./form-debugger.component.scss']
})
export class FormDebuggerComponent implements OnInit {

  @Input() form: any;

  constructor() { }

  ngOnInit(): void {
  }

}
