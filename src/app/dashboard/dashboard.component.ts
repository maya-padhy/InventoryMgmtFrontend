
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { NetworkAssetService } from '../network-asset.service';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  networkAssetsChart: any;
  storedUsername:any;
  networkAssetsPieChart: any;
  networkAssetsRadarChart: any;
  suppliers: any[] = [];
  assets: any[] = [];
  name:string=''
  uniqueNamesCount: number=0;
  uniqueAssetNamesCount: number=0;


  constructor(private networkAssetService: NetworkAssetService,
    private supplierService: SupplierService) {}

  ngOnInit() {
    // Bar Chart
    this.networkAssetService.getAllNetworkAssets().subscribe((data) => {
      const labels = data.map((asset) => asset.name);
      const quantities = data.map((asset) => asset.qty);

      this.networkAssetsChart = new Chart('networkAssetsChart', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Quantities',
              data: quantities,
              // backgroundColor: 'rgba(75, 192, 192, 0.2)',
              // borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
                gridLines: {
                  display: false, // Set this to false to remove grid lines
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true, // Set this to true to display the label
                  labelString: 'Network Assets', // Your x-axis label here
                },
                ticks: {
                  beginAtZero: true,
                },
                gridLines: {
                  display: false, // Set this to false to remove grid lines
                },
              },
            ],
          },
        },
      });
    });

    // Pie Chart
    this.networkAssetService.getAllNetworkAssets().subscribe((data) => {
      const assetTypes = data.map((asset) => asset.type);
      const typeCounts = this.countTypes(assetTypes);

      this.createPieChart(
        'networkAssetsPieChart',
        'Network Assets by Type',
        Object.keys(typeCounts),
        Object.values(typeCounts)
      );
    });

    // Radar Chart
    this.networkAssetService.getAllNetworkAssets().subscribe((data) => {
      const assetNames = data.map((asset) => asset.name);
      const prices = data.map((asset) => asset.price);

      this.networkAssetsRadarChart = new Chart('networkAssetsRadarChart', {
        type: 'radar',
        data: {
          labels: assetNames,
          datasets: [
            {
              label: 'Asset Prices',
              data: prices,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scale: {
            ticks: {
              beginAtZero: true,
            },
          },
        },
      });
    });



    this.supplierService.getAllSuppliers().subscribe(
      (data) => {
        this.suppliers = data;
        console.log("suply",data);
        const uniqueNames = new Set<string>();
for (const supplier of this.suppliers) {
  uniqueNames.add(supplier.name);
}
this.uniqueNamesCount = uniqueNames.size;
console.log('Count of unique names:', this.uniqueNamesCount);
      }
    );


    this.networkAssetService.getAllNetworkAssets().subscribe(
      (data: any[]) => {
        this.assets = data;
        console.log("Assets",data);
        const uniqueAssetNames= new Set<string>();
        for (const asset of this.assets) {
          uniqueAssetNames.add(asset.name);
        }
        this.uniqueAssetNamesCount = uniqueAssetNames.size;
        console.log(this.uniqueAssetNamesCount);

        
      },
    );



    this.storedUsername = sessionStorage.getItem('username');

  }

  // Count the occurrences of each asset type
  countTypes(types: string[]) {
    const counts: { [key: string]: number } = {};
    for (const type of types) {
      counts[type] = counts[type] ? counts[type] + 1 : 1;
    }
    return counts;
  }

  createPieChart(chartId: string, title: string, labels: string[], data: number[]): void {
    this.networkAssetsPieChart = new Chart(chartId, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
          },
        ],
      },
      options: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: title,
        },
      },
    });
  }



}
