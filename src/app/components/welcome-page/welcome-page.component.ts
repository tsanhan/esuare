import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { IdentityService } from 'src/app/services/identity.service';
import { Router } from '@angular/router';
@Component({
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomePageComponent implements OnInit {

  nameFG: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public identity: IdentityService
    
  ) { }

  ngOnInit(): void {
     this.nameFG = this.fb.group({
      name: this.fb.control('', [
        Validators.required,
        this.notWhiteSpaceValidator,
      ])
    })
    
  }

  notWhiteSpaceValidator(value: FormControl): { [key: string]: boolean } {
    let error: any = !(<string>value.value)?.trim().length ? { 'empty': true } : null;
    return error;
  }

  updateUserName() {
    this.identity.UserName.next(this.nameFG.get('name').value);
    this.router.navigate(['/search-module']);
  }

}
