import Crud from '../../dinamic/Crud'

const GeneralInformation = ({ user, auth }) => {
  return (
    <div className="container mt-4">

      {/* USUARIO */}
      <div className="row mt-4">
        <div className="col-md-2 justify-content-center d-flex align-items-center">
          <i className="fas fa-user fa-2x text-gray"></i>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-12">
              {/* <Crud
                model="workplace"
                fields={{ workplace: '' }}
                addstr={{ workplace: "un lugar de trabajo" }}
                auth={auth}
                user={user}
              /> */}
            </div>
            <div className="col-md-12">
              <div className="text-muted fs-8">Empleo</div>
            </div>
          </div>
        </div>
      </div>
      {/* END USUARIO */}

      {/* CORREO */}
      <div className="row mt-4">
        <div className="col-md-2 justify-content-center d-flex align-items-center">
          <i className="fas fa-envelope fa-2x text-gray"></i>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-12">
              <Crud
                model="personalemail"
                fields={{ personalemail: '' }}
                addstr={{ personalemail: "tu correo personal" }}
                auth={auth}
                user={user}
              />
            </div>
            <div className="col-md-12">
              <div className="text-muted fs-8">Correo</div>
            </div>
          </div>
        </div>
      </div>
      {/* END CORREO */}

      {/* USUARIO */}
      <div className="row mt-4">
        <div className="col-md-2 justify-content-center d-flex align-items-center">
          <i className="fas fa-user fa-2x text-gray"></i>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-12">
              {user.username
                ? <div className="fs-5 fw-semi-bold">{user.username}</div>
                : <span className="fw-less-bold text-muted">No hay información de usuario disponible</span>}
            </div>
            <div className="col-md-12">
              <div className="text-muted fs-8">Usuario</div>
            </div>
          </div>
        </div>
      </div>
      {/* END USUARIO */}

      {/* MÓVIL */}
      <div className="row mt-4">
        <div className="col-md-2 justify-content-center d-flex align-items-center">
          <i className="fas fa-phone-alt fa-2x text-gray"></i>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-12">

              <Crud
                user={user}
                model="phone"
                fields={{ number: '', pais: '' }}
                addstr={{ number: "tu celular", pais: " - código del país" }}
                auth={auth}
              />

            </div>
            <div className="col-md-12">
              <div className="text-muted fs-8">Celular</div>
            </div>
          </div>
        </div>
      </div>
      {/* END MÓVIL */}
    </div>
  )
}

export default GeneralInformation