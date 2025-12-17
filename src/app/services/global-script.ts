import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalScript {

  constructor(private router: Router) {
    // Subscribe to router events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) 
    ).subscribe(() => {
      this.initializeScripts();
    });
  }

  private initializeScripts(): void {
  
    document.addEventListener('DOMContentLoaded', () => {
      const preloader = document.querySelector('.preloader') as HTMLElement; 
      if (preloader) {
        preloader.style.display = 'none'; 
      }
  
      // Search Form Open logic
      const searchOpen = document.getElementById('searchOpen');
      const searchClose = document.getElementById('searchClose');
      const searchWrapper = document.querySelector('.search-wrapper') as HTMLElement;
      const searchBox = document.querySelector('.search-box') as HTMLElement;
  
      console.log("searchOpen", searchOpen);
  
      if (searchOpen) {
        searchOpen.addEventListener('click', () => {
          if (searchWrapper) {
            searchWrapper.classList.add('open');
          }
          setTimeout(() => {
            if (searchBox) {
              searchBox.focus();
            }
          }, 400);
        });
      }
  
      if (searchClose) {
        searchClose.addEventListener('click', () => {
          if (searchWrapper) {
            searchWrapper.classList.remove('open');
          }
        });
      }
  
      const tabContents = document.querySelectorAll('.tab-content .tab-pane');
      tabContents.forEach((item) => {
        const title = item.getAttribute('title');
        const navTabs = item.closest('.code-tabs')?.querySelector('.nav-tabs');
        if (navTabs && title) {
          const listItem = document.createElement('li');
          listItem.classList.add('nav-item');
          const link = document.createElement('a');
          link.classList.add('nav-link');
          link.setAttribute('href', '#');
          link.textContent = title;
          listItem.appendChild(link);
          navTabs.appendChild(listItem);
        }
      });
  
      const navTabs = document.querySelectorAll('.code-tabs .nav-tabs li');
      navTabs.forEach((tab, index) => {
        tab.addEventListener('click', (e) => {
          e.preventDefault();
          navTabs.forEach((item) => {
            item.classList.remove('active');
          });
          tab.classList.add('active');
  
          const tabPanes = document.querySelectorAll('.code-tabs .tab-pane');
          tabPanes.forEach((tabPane) => {
            tabPane.classList.remove('active');
          });
          tabPanes[index].classList.add('active');
        });
      });
  
      const scrollTop = document.getElementById('scrollTop');
      if (scrollTop) {
        scrollTop.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        });
      }
  
      const menuToggle = document.querySelector('#content nav .bx.bx-menu');
      const sidebar = document.getElementById('sidebar') as HTMLElement; 
      if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
          sidebar.classList.toggle('hide');
        });
      }
  
      const adjustSidebar = () => {
        if (sidebar) {
          if (window.innerWidth <= 576) {
            sidebar.classList.add('hide');
            sidebar.classList.remove('show');
          } else {
            sidebar.classList.remove('hide');
            sidebar.classList.add('show');
          }
        }
      };
  
      window.addEventListener('resize', adjustSidebar);
      adjustSidebar();
    });
  }
  
}
