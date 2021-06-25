import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ) { }
  @Input() currentProduct$!: Observable<Product>
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @ViewChild('f') form!: NgForm;
  controls: any = {
    name: "",
    description: "",
    price: 0
  };
  formGroup!: FormGroup;

  ngOnInit(): void {

    this.formGroup = this.fb.group(this.controls);

    this.currentProduct$.subscribe(p => {
      p && this.formGroup.setValue(
        {name: p.name, price: p.price, description: p.description || ""}
      )
    })

  }

  onSubmit(){
    this.formSubmit.emit(this.formGroup.value);
  }
}
