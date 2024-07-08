import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-integrations-zapier',
  templateUrl: './integrations-zapier.component.html',
  styleUrls: ['./integrations-zapier.component.css']
})
export class IntegrationsZapierComponent {
  @Input() itemName: string;
  isDetail: any = true;
  profileName: string;
  firstName: string;
  lastName: string;
  Email: string;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.profileName = this.commonService.GetLocalStorage('profileName');
    this.Email = this.commonService.GetLocalStorage('emailAddress');
    const fullName = this.profileName;
    const parts = fullName.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1];
  }

  toggleScreen() {
    this.detailUpdate.emit();
  }

  @Output() detailUpdate = new EventEmitter<string>();
}
