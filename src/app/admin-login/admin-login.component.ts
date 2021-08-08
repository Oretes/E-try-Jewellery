import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {AuthService} from "../services/auth.service"
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor( public auth:AuthService) { }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  ngOnInit() {
   
  }
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      this.auth.Signin(this.form.value.username, this.form.value.password);
    }
  }

}
