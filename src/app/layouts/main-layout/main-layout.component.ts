import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet,SidebarComponent, HeaderComponent,NgClass],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  isCollapsed = false;

  toggleSidebar() {

    this.isCollapsed = !this.isCollapsed;

  }

 }
