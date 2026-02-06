import { Component } from '@angular/core';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';

type Tab = 'info' | 'scans' | 'saved'
type ReputationKey = -2 | -1 | 0 | 1 | 2;

@Component({
  selector: 'app-user-profile',
  imports: [UnknownBugImage],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile {
  active_tab: Tab = 'info'

  reputations: Record<ReputationKey, string> = {
    "-2": "Bug Bait 🐞",
    "-1": "Web of Confusion 🕷️",
    "0": "Bug Spotter 🐜",
    "1": "Insect Insider 🐝",
    "2": "Bug Whisperer 🦋",
  }

  userReputation:ReputationKey = -1;




  selectTab(tab: Tab) {
    this.active_tab = tab
  }

}
