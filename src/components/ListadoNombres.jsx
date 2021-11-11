import React, { useState } from 'react';
import uniqid from 'uniqid';

const ListadoNombre = () => {

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [listName, setListName] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);

  const addName = (event) => {
    event.preventDefault();
    if (!name.trim()) {
      setError('El campo nombre esta vacio');
      return;
    }
    setError(null);
    const newName = {
      id: uniqid(),
      name: name
    }
    setListName([...listName, newName]);
    setName('');
    setId('');
    setEditMode(false);
  }

  const deleteName = (id) => {
    const newArray = listName.filter(item => item.id !== id);
    setListName(newArray);
  }

  const edit = (item) => {
    setEditMode(true);
    setName(item.name);
    setId(item.id);
  }

  const editName = (event) => {
    event.preventDefault();
    if (!name.trim()) {
      setError('El campo nombre esta vacio');
      return;
    }
    setError(null);
    const newArray = listName.map(item => item.id === id ? { id: id, name: name } : item);
    setListName(newArray);
    setName('');
    setId('');
    setEditMode(false);
  }

  return (
    <div className="">
      <h2>App CRUD Básica</h2>
      <div className="row">
        <div className="col">
          <h2>Formulario para añadir nombres</h2>
          <form className="form-group" onSubmit={editMode ? editName : addName}>
            <input className="form-control mb-3"
              type="text"
              placeholder="Introduce el nombre"
              onChange={(e) => { setName(e.target.value) }}
              value={name}
            />
            <input className="btn btn-info btn-block"
              type="submit"
              value={editMode ? 'Editar nombre' : 'Registrar nombre'}
            />
          </form>
          {
            error != null ? (
              <div className="alert alert-danger">
                {error}
              </div>
            ) :
              (
                <div></div>
              )
          }
        </div>

        <div className="col">
          <h2>Listado de nombres</h2>
          <ul className="list-group">
            {
              listName.map(item =>
                <li key={item.id} className="list-group-item">
                  {item.name}
                  <button className="btn btn-danger float-right" onClick={() => deleteName(item.id)}>Borrar</button>
                  <button className="btn btn-info float-right" onClick={() => edit(item)}>Editar</button>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ListadoNombre;
