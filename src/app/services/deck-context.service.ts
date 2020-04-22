import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeckContextService {
  public selectedDeckIds = new Set<string>();

  constructor(private router: Router) {

    router.events.subscribe( (event) => {
        if (event instanceof NavigationEnd) {
          console.log(event);
        }
    });

}
}
