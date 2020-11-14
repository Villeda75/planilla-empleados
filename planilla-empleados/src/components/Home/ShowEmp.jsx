import React from 'react'

export default function ShowEmp(params){
  var getInfo = () =>{
    let data = params.data
    let comp = Number(data[0]['NETO'])
    let emp = data[0]
    if(params.id === "mayor"){
      data.forEach(a =>{
        if(Number(a.NETO) > comp) {
          comp = Number(a.NETO)
          emp = a
        }
      })
    }
    if(params.id === "menor"){
      data.forEach(a =>{
        if(Number(a.NETO) < comp) {
          comp = Number(a.NETO)
          emp = a
        }
      })
    }
    return emp
  }
  return(
    <>
      <button 
        className={"btn btn-"+params.clase+" mx-3 my-3"}
        data-toggle="modal" 
        data-target={"#showEmpleado"+params.id}
      >
        {params.title}
      </button>
      
      <div className="modal fade" id={"showEmpleado"+params.id} tabIndex="-1" aria-labelledby="showEmpleadoLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="showEmpleadoLabel">{getInfo().name}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container row">
                <div className="col-9"><h4>Horas trabajadas:</h4></div>
                <div className="col-3"><p className="text-right">{getInfo().hours}</p></div>
                <div className="col-9"><h4>Sueldo Liquido:</h4></div>
                <div className="col-3"><p className="text-right">$ {getInfo().LIQUIDO}</p></div>
                <div className="col-9"><h4>ISSS:</h4></div>
                <div className="col-3"><p className="text-right">- $ {getInfo().ISSS}</p></div>
                <div className="col-9"><h4>AFP:</h4></div>
                <div className="col-3"><p className="text-right">- $ {getInfo().AFP}</p></div>
                <div className="col-9"><h4>Renta:</h4></div>
                <div className="col-3"><p className="text-right">- $ {getInfo().RENTA}</p></div>
                <div className="col-9"><h4>Sueldo Neto:</h4></div>
                <div className="col-3"><p className="text-right">$ {getInfo().NETO}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}