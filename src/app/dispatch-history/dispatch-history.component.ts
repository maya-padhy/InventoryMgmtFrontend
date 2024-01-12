import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NetworkAssetService } from '../network-asset.service';

@Component({
  selector: 'app-dispatch-history',
  templateUrl: './dispatch-history.component.html',
  styleUrls: ['./dispatch-history.component.css']
})
export class DispatchHistoryComponent implements OnInit,OnChanges {
  dispatches: any[] = []; // Define the dispatches array to store dispatch history data

  constructor(private networkAssetService: NetworkAssetService) { }

  ngOnInit(): void {
    console.log('ng on init')
    // Fetch dispatch history data from the API
      this.networkAssetService.getDispatchHistoryWithAssets().subscribe((data: any[]) => {
        console.log(data)
      this.dispatches = data;
    },
    (error: any) => {
      console.error('Error displaying dispatch history:', error);
  }
    
    );
  }

  ngOnChanges(): void {
    console.log('ng on changes')
  }
}
