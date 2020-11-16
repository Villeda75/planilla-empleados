import React, { Component } from 'react';
import  ShowEmp from './ShowEmp'
class TablaEmpleados extends Component{

    constructor(props) {
        super(props);
    this.state = {
        code:'',
        name:'',
        hours:0,
        ISSS:0,
        AFP:0,
        RENTA:0,
        LIQUIDO:0,
        NETO:0,
        isEditing:false,
        isMax:false,
        isMin:false,
      };
    }
    // llamar updateUser (App.js)
    
    CalcularDatos=(horas,_code,_name)=>
    {
  
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
  
   let DatosNuevos={
        code:_code,
        name:_name,
        hours:horas,
        ISSS:_ISSS.toFixed(2),
        AFP:_AFP.toFixed(2),
        RENTA:_renta.toFixed(2),
        LIQUIDO:_liquido.toFixed(2),
        NETO:_neto.toFixed(2),
        isEditing:false
      }
      return DatosNuevos;
      
    }

    DeleteEmpleado=(id)=>
    {
      this.props.pressDelete(id);
    
    }

    UpdateEmpleado=(i)=>
    {
        this.props.pressEditBtn(i);
    }
    componentDidUpdate() {

    }

    SendUpdate=(e)=>
    {
        e.preventDefault();
      
  let newUser=this.CalcularDatos(this.hours.value,this.code.value,this.name.value);
  delete newUser.isEditing;
     this.props.updateUser(this.idEmployee, newUser);
    }
    CancelUpdate=(e)=>
    {
        e.preventDefault();
      
     this.props.CancelEdit(this.idEmployee);
    }


    render(){

        const {allUsers} = this.props;
    
        const usersList = allUsers.map((user, index) => {

            return user.isEditing === true ? (
                
                <tr className="table-info" key={user.id}>
                    <td><input type="text" ref={(val) => {this.code = val}} required defaultValue={user.code}/></td>
                    <td><input type="text" ref={(val) => {this.name = val}} required defaultValue={user.name}/></td>
                    <td><input type="number" ref={(val) => {this.hours = val}} required defaultValue={user.hours}/></td>
                    
                    <td>{user.ISSS}</td>
                    <td>{user.AFP}</td>
                    <td>{user.RENTA}</td>
                    <td>{user.LIQUIDO}</td>
                    <td>{user.NETO}</td>
                    <td>
        
                    <button className="btn btn-warning" onClick={this.SendUpdate} ref={() => {this.idEmployee = user.id}}>Actualizar</button>
                    </td>
                    <td>
        
        <button className="btn btn-danger" onClick={this.CancelUpdate} ref={() => {this.idEmployee = user.id}}>Cancelar</button>
        </td>


                </tr>  

            ) : (

                <tr className="table-primary" style={{ color: "black" }} key={index}>
                    <td>{user.code}</td>
                    <td>{user.name}</td>
                    <td>{user.hours}</td>
                    <td>{user.ISSS}</td>
                    <td>{user.AFP}</td>
                    <td>{user.RENTA}</td>
                    <td>{user.LIQUIDO}</td>
                    <td>{user.NETO}</td>

                    <td><button className="btn btn-info" onClick={()=>this.UpdateEmpleado(user.id)} > <i className="material-icons">create</i> Editar</button> <button className="btn btn-danger" onClick={()=>this.DeleteEmpleado(user.id)}> <i className="material-icons">delete</i> Eliminar</button></td>
                </tr>

            );
        });

        return(
          <>
          <div className="offset-5">
            <ShowEmp 
              title = "Mostrar Empleador con Mayor Salario"
              clase = "info"
              data = {this.props.allUsers}
              id = "mayor"
            />
            <ShowEmp 
              title = "Mostrar Empleador con Menor Salario"
              clase = "warning"
              data = {this.props.allUsers}
              id = "menor"
            />
          </div>
          
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Horas Trabajadas</th>
                    <th>ISSS</th>
                    <th>AFP</th>
                    <th>RENTA</th>
                     <th>Sueldo Liquido</th>
                     <th>Sueldo Neto</th>
                     <th>Acciones</th>
                     <th></th>
                    </tr>
                </thead>
                <tbody>
                    {usersList}
                </tbody>
            </table>
          </>
        );
    }
}

export default TablaEmpleados;