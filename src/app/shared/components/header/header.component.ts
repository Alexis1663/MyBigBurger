import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../../services/auth.services";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    public readonly _authService: AuthService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngAfterContentChecked() {
    this.cdr.markForCheck();
  }
}
