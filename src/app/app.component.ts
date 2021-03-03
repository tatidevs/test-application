import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public form: FormGroup;
  public array: number[] = [];

  constructor(
    private formBuilder: FormBuilder
  ) {}


  public ngOnInit(): void {
    this.createForm()

  }

  public generateArray(): void {
    const { size, min, max } = this.form.value;


    if (this.form.valid) {
      this.array = Array
        .from({ length: size }, () => Math.floor(Math.random()  * (Number(max) + 1 - Number(min)) + Number(min)))
        .sort((a, b) => {
          return a - b ;
        });
    } else {
      this.array = [];
    }
  }

  public moveNumber(index: number, item: number): void {
    const { sort } = this.form.value;

    if (sort === 'start') {
      this.array = [item, ...this.array.slice(0, index), ...this.array.slice(index + 1)];
    } else  {
      this.array = [...this.array.slice(0, index), ...this.array.slice(index + 1), item];
    }
  }

  private createForm(): void {
      this.form = this.formBuilder.group({
        size: new FormControl('', [Validators.required, Validators.min(2), Validators.max(20)]),
        min: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
        max: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
        sort: new FormControl('start', [Validators.required]),
      });
  }
}
