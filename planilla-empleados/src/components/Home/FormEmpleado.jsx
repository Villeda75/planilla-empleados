import React, { Component,useState,useEffect} from 'react';

class FormEmpleado extends Component {
    constructor(props) {
      super(props);
      this.state = {
        code:'150',
        name:'Marcos',
        hours:0,
        ISSS:0,
        AFP:0,
        RENTA:0,
        LIQUIDO:0,
        NETO:0,
        isEditing:false

      };
    }

    componentDidMount() {
      
    }
    componentDidUpdate() {

    }
//Asi se declara una funcion dentro de una clase
    GuardarDatos=(e)=>
    { 
      
       e.preventDefault();
      
alert('datos enviados');

console.log(this.state);

this.props.addEmpleado(this.state);
//se resetea el formulario ya que apunta hacia el form
e.target.reset();

    }

    CalcularDatos=(e)=>
    {
  
   
   const {name,value}=e.target;
   this.setState({hours:value});
   let horas=value;
      let _ISSS;
      let _AFP;
      let _renta;
      let _liquido;
      let _neto;

      if(horas<=160)
      {
        _liquido=horas*9.75;

      }
      else if(horas >160 && horas<=200)
      {
        let parte1=0;
        let parte2=0;
         
       parte1=160*9.75;
       parte2=(horas-160)*11.50;
      _liquido=parte1+parte2;

      }

      else if(horas >200 && horas<=250)
      {
        let parte1=0;
        let parte2=0;
         
        parte1=160*9.75;
        parte2=40*11.50;
        _liquido=parte1+parte2+((horas-200)*(12.50));
      }
      else
      {
        _liquido=0;
      }
      
      _ISSS=_liquido*(0.0525);
     _AFP=_liquido*(0.0688);
     _renta=_liquido*(0.1);

      _neto=_liquido-(_ISSS+_AFP+_renta);

     this.setState({
        ISSS:_ISSS.toFixed(2),
        AFP:_AFP.toFixed(2),
        RENTA:_renta.toFixed(2),
        LIQUIDO:_liquido.toFixed(2),
        NETO:_neto.toFixed(2)
      })
    }

    GuardarInputs=(e)=>
    {
    const {name,value}=e.target;
   
    e.preventDefault();
    
    // sirve para pasar los datos se copian los datos iniciales luego se asignan con el value del target
    //que seria el input en el cual se esta escribiendo que se actualiza con el metodo onchange
   

   if(name=='code')
   {
    this.setState({code:value});
   }
   if(name=='name')
   {
    this.setState({name:value});
   }
  
   
    }
  
    render() {
      return (
        <form className="card card-body" onSubmit={this.GuardarDatos}> 
        
<h2>Codigo Empleado</h2>
        <div className="form-group input-group">
            <div className="input-group-text bg-light">  
            <i className="material-icons">fingerprint</i>
            </div>
            
        <input type="text"  onChange={this.GuardarInputs} className="form-control" name="code" value={this.state.code} aria-describedby="emailHelp" placeholder="150"/>
        </div>
        <h2>Nombre Empleado</h2>
        <div className="form-group input-group">
            <div className="input-group-text bg-light">  
            <i className="material-icons">assignment_ind</i>
            </div>
        <input type="text" className="form-control"  onChange={this.GuardarInputs} name="name"value={this.state.name} aria-describedby="emailHelp" placeholder="heres goes the website name"/>
        </div>
        
        <h2>Horas Trabajadas</h2>
        <div className="form-group input-group">
            <div className="input-group-text bg-light block">  
            <i className="material-icons">schedule</i>
            </div>
            <input type="text" className="form-control" onChange={this.CalcularDatos} name="hours" value={this.state.hours} aria-describedby="emailHelp" placeholder="heres goes the website name"/>
        </div>
        
        <button className="btn btn-primary btn-block" ><p><i className="material-icons">add_circle_outline</i></p> GUARDAR </button>
        
        
        </form>
        
        
      );
    }
}


export default FormEmpleado;