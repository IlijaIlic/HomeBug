import { Component, OnInit } from '@angular/core';
import { Comment } from '../ui-components/comment/comment';
import { UnknownBugModel } from '../../models/unknown-bug.model';
import { UnknownBugService } from '../../services/unknown-bug.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unknown-bug',
  imports: [Comment],
  templateUrl: './unknown-bug.html',
  styleUrl: './unknown-bug.scss',
})
export class UnknownBug implements OnInit {

  bug?: UnknownBugModel;
  countryCode = 'rs';

  constructor(private ubugService: UnknownBugService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if(id){
      this.ubugService.getById(id).subscribe({
        next: (response) => this.bug = response,
        error: (response) => console.log(response)
      })
    }
  }

}
