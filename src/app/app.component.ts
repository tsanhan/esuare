import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IdentityService } from './services/identity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'books';

  constructor(public identity: IdentityService) {
    
    
  }
}
