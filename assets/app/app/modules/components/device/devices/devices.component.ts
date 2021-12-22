import { Component, Input, OnInit } from '@angular/core';
import { Device, DeviceType } from '../../../api/models/device.model';

@Component({
  selector: 'devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  @Input() device: Device;

  constructor() { }

  ngOnInit(): void {
  }

}
