import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { navData } from './navData.js';

@Component({
  selector: 'app-sublevel-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
   <ul *ngIf="collapsed && data.items && data.items.length > 0"
   [@submenu] = "expanded
    ? {value: 'visible', 
        params: {transitionParams: '400ms cubic-bezier(0.86,0,0.07,1)', height:'*'}}
    : {value: 'hidden',
        params: {transitionParams: '400ms cubic-bezier(0.86,0,0.07,1)', height: '0'}}
   "
    class="sublevel-nav">
      <li *ngFor="let item of data.items" class="sublevel-nav-item">
        <!-- Show item only if tipoUsuario matches current user type -->
        <ng-container *ngIf="shouldShowItem(item)">
          <a class="sublevel-nav-link"
            (click)="handleClick(item)"
            *ngIf="item.items && item.items.length > 0"
            [ngClass]="getActiveClass(item)">
            <i class="sublevel-link-icon fa fa-circle"></i>
            <span class="sublevel-link-text" *ngIf="collapsed">{{item.label}}</span>
            <i *ngIf="item.items && collapsed" class="menu-collapse-icon"
               [ngClass]="!item.expanded ? 'fal fa-angle-right' : 'fal fa-angle-down'">
            </i>
          </a>
          <a class="sublevel-nav-link"
             *ngIf="!item.items || (item.items && item.items.length === 0)"
             [routerLink]="[item.routeLink]" 
             routerLinkActive="active-sublevel"
             [routerLinkActiveOptions]="{exact: true}">
            <i class="sublevel-link-icon fa fa-circle"></i>
            <span class="sublevel-link-text" *ngIf="collapsed">{{item.label}}</span>
          </a>
          <div *ngIf="item.items && item.items.length > 0">
            <app-sublevel-menu
              [data]="item"
              [collapsed]="collapsed"
              [multiple]="multiple"
              [expanded]="item.expanded">
            </app-sublevel-menu>
          </div>
        </ng-container>
      </li>
   </ul>
  `,
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [style({overflow: 'hidden'}), animate('{{transitionParams}}')]),
      transition('void => *', animate(0))
    ])
  ]
})
export class SublevelMenuComponent implements OnInit {
  @Input() data: navData = {
    routeLink: '',
    icon: '',
    label: '',
    tipoUsuario: [],
    items: [],
  };
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  // Define the current user's type
  @Input() currentUserType: string = ''; // This can be passed as an Input property

  constructor(public router: Router) {}

  ngOnInit(): void {}

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(item: navData): string {
    return item.expanded && this.router.url.includes(item.routeLink) ? 'active-sublevel' : '';
  }

  // New method to check if the current user type should have access to the menu item
  shouldShowItem(item: navData): boolean {
    // Check if any of the allowed user types for this item matches the current user's type
    return item.tipoUsuario.includes(this.currentUserType);
  }
}
