import { Component } from '@angular/core';

type Tab = 'info' | 'scans' | 'saved'

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile {
  active_tab: Tab = 'info'


  selectTab(tab: Tab){
    this.active_tab = tab
  }

}
