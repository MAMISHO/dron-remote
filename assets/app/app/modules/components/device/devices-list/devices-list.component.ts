import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../../../api/models/device.model';
import { DeviceService } from '../../../api/services/device.service';

@Component({
  selector: 'devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  @Input() devices: Device[] = [];

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
