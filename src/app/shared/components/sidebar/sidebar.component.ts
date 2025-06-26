import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [NgIf,RouterLink,NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() isCollapsed = false;
 @Output() toggle = new EventEmitter<void>();

  onToggle() {
    console.log('Sidebar toggled');
    this.toggle.emit();
  }
}
