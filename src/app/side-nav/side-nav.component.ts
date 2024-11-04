import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../service/usuario.service.js';
import { navData } from './navData.js';
import { SideNavService } from '../service/side-nav.service.js';
import { AlmacenamientoService } from '../service/almacenamiento.service.js';
import { SublevelMenuComponent } from "./sublevel-menu.component";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, SublevelMenuComponent],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent implements OnInit{

  constructor(private usuarioService: UsuarioService,
    private sideNavService: SideNavService,
    private almacenamientoService: AlmacenamientoService,
    public router: Router
  ) {}

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  
  collapsed: boolean = false;
  screenWidth: number = 0;
  multiple: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }


  desplegarMenu(): void {
    this.collapsed = !this.collapsed
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  cerrarMenu(): void {
    this.collapsed = false
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }


  
  navData: navData[] = []

  updateNavData(): void {
    this.navData = this.sideNavService.getNavData()
  }

  ngOnInit(): void {
    this.sideNavService.filtrarFunciones(this.usuarioService.showTipoUsuario())
    this.updateNavData()
    if (typeof window !== 'undefined') {
      this.screenWidth = window.innerWidth;
    }
    const redirigirAHome = this.almacenamientoService.getItem('redirigirAHome')
    if(redirigirAHome === 'true') {
      this.almacenamientoService.removeItem('redirigirAHome')
      this.router.navigateByUrl('/home')
    }
  }

  handleClick(item: navData): void{
    this.shrinkItems(item);
    item.expanded = !item.expanded
  }

  getActiveClass(data:navData):string{
    return this.router.url.includes(data.routeLink) ? 'active':'';
  }

  shrinkItems(item:navData):void{
    if (!this.multiple){
      for(let modelItem of this.navData){
        if (item !== modelItem && modelItem.expanded){
          modelItem.expanded = false;
        }
      }
    }
  }
}
