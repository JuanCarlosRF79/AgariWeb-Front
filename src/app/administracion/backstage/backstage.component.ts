import { Component,OnInit,Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { isPlatformBrowser } from '@angular/common';
import { ProductoService } from 'src/app/servicios/producto.service';

// amCharts imports
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';


@Component({
  selector: 'app-backstage',
  templateUrl: './backstage.component.html',
  styleUrls: ['./backstage.component.css']
})
export class BackstageComponent implements OnInit {
  private root!: am5.Root;
  private root2!: am5.Root;

  servicios:any;
  
  constructor(private servicioSev:ServicioService, private productoServ:ProductoService,
    @Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) { }
  
  ngOnInit(): void {
    this.inicioServ();
    this.llenarServicios()
  }


  inicioServ(){
    this.servicioSev.consultarServInicio().subscribe(
      (res)=>{
        this.servicios=res;
        //console.log(this.servicios);
      },(err)=>{
        console.log(err);
      }
    );
  }

  formatoFecha(dates:any){
  var date = (dates);
  var currentDate = date.slice(0, 10);
  return currentDate;
  }

  formatoCosto(costo:any){
    return costo.toLocaleString('en-US')
  }

  masInformacion(codigo:any){
    this.servicioSev.setIdServicio(codigo)
  }

  formatoTelefono(telefono:any){
    var apoyo = telefono.slice(0,2)+" "+telefono.slice(2,6)+" "+telefono.slice(6,10)
    return apoyo
  }

  //Información bd gráficas
  servSolicitados:any
  servProceso:any
  filtro={
    estadoServicio:"",
    fechaFiltro:""
  }

  productoData:any

  //Mostrar las gráficas
  llenarServicios(){
    this.filtrarServSol()
    this.filtrarProd()
  }
  
  //Info servicios
  filtrarServSol(){
    this.filtro.estadoServicio="Solicitado"
    this.servicioSev.filtrarServ(this.filtro).subscribe(
      (res)=>{
        this.servSolicitados=res.length
        this.filtrarServProc()
      },
      (err)=>{
        if(err.error.text=="No hay servicios registrados"){
        }else{
          console.log(err)
        }
        
      })
  }

  filtrarServProc(){
    this.filtro.estadoServicio="En proceso"
    this.servicioSev.filtrarServ(this.filtro).subscribe(
      (res)=>{
        this.servProceso=res.length
        this.graficaServ()
      },
      (err)=>{
        if(err.error.text=="No hay servicios registrados"){
        }else{
          console.log(err)
        }
        
      })
  }


  //Info productos
  filtrarProd(){
    this.productoServ.graficaProd().subscribe(
      (res)=>{
        this.productoData=res
        console.log(this.productoData)
        this.graficaProd()
      },
      (err)=>{
        if(err.error.text=="No hay productos registrados"){
          console.log(err)
        }else{
          console.log(err)
        }
      }
    )
  }

  //Gráficas ==========================================================================================
  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  graficaProd() {
    // Chart code goes in here
    this.browserOnly(() => {
      let root = am5.Root.new("chartdivProd");

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout
        }) 
      );

      // Define data
      var data=[]
      for(let a of this.productoData){
        data.push(a)
      }

      // Create series
      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "stock",
          categoryField: "marca"
        })
      );
      series.data.setAll(data);

      // Add legend
      let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout
      }));

      legend.data.setAll(series.dataItems);

      this.root = root;
    });
  }

  graficaServ() {
    // Chart code goes in here
    this.browserOnly(() => {
      let root2 = am5.Root.new("chartdivServ");

      root2.setThemes([am5themes_Animated.new(root2)]);

      let chart2 = root2.container.children.push(
        am5percent.PieChart.new(root2, {
          layout: root2.verticalLayout
        }) 
      );

      // Define data
      let data2 = [{
        estado: "Pendientes",
        num: this.servSolicitados
      }, {
        estado: "En proceso", 
        num: this.servProceso
      }];

      // Create series
      let series2 = chart2.series.push(
        am5percent.PieSeries.new(root2, {
          name: "Series",
          valueField: "num",
          categoryField: "estado"
        })
      );
      series2.data.setAll(data2);

      // Add legend
      let legend2 = chart2.children.push(am5.Legend.new(root2, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root2.horizontalLayout
      }));

      legend2.data.setAll(series2.dataItems);

      this.root2 = root2;
    })
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose()
        this.root2.dispose()
      }
    });
  }

}
