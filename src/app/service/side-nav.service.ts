import { Injectable } from '@angular/core';
import { navData, navDataImport } from '../side-nav/navData.js';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  private navDataImport: navData[] = navDataImport
  private navData: navData[] = []

  constructor() { }

  filtrarFunciones(userType: string): void {
    this.clearNavData()
    this.navDataImport.forEach((item) => {
      if(item.tipoUsuario.includes(userType) || item.tipoUsuario.includes('')) { 
        if(item.logueado) {
          if(item.logueado === this.isLogged(userType)) {
            this.navData.push(item)
          }
        } else {
          this.navData.push(item)
        }
        
      }
    })
  }

  getNavData(): navData[] {
    return this.navData
  }

  clearNavData(): void {
    this.navData = []
  }

  isLogged(userType: string): string {
    if(userType === 'empleado' || userType === 'cliente') {
      return 'true'
    } else {
      return 'false'
    }
  }
}
