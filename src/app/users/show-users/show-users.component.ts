import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../shared/services/users.service";
import {GetLangPipe} from "../../shared/pipes/get-lang.pipe";
import {Observable} from "rxjs/internal/Observable";
import {User} from "../../shared/models/User";
import {SubjectService} from "../../shared/services/subject.service";

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit {
  displayedColumns = ['profile_img', 'full_name', 'gender', 'birthday', 'email', 'users_status', 'actions'];
  users: User[];
  lang: string;

  constructor(
    private _users: UsersService,
    private getLang: GetLangPipe,
    private subject: SubjectService
  ) {
    this.lang = this.getLang.transform();

    // Gets the changes of system language
    this.subject.getLanguage().subscribe(lang => {
      this.lang = lang;
      this.getUsers();
    });

    // Subscribes table status change event
    this.subject.getTableForm().subscribe(data => {
      data.lang = this.lang;
      this.changeUserStatus(data);

    });
  }

  ngOnInit() {
    this.getUsers();

  }

  /**
   * Send a user id to server to change the user's status to the selected status
   * @param data
   */
  changeUserStatus(data) {
    this._users.changeUserStatus(data).subscribe(dt => {
      this.users = dt;
      this.subject.setTableData(dt);
    });
  }

  /**
   * Gets users list
   */
  getUsers() {
    this._users.get({lang: this.lang}).subscribe(dt => {
      this.users = dt;
      this.subject.setTableData(dt);
    });
  }

}
