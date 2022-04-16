import { useState, useRef, useEffect, createRef } from "react";
import Crud from "../dinamic/Crud";

const About = ({ userData, auth }) => {

  // console.clear()
  console.log('userData', userData)

  const initState = { firstname: '', lastname: '', mobile: '', address: '', websites: [], gender: '' };
  const [aboutData, setAboutData] = useState(initState)
  const { firstname, lastname, mobile, address, websites, gender } = aboutData

  return (
    <>
      {userData.map((user, index) => (
        <div className="d-flex align-items-start" key={user._id + index}>

          <div className="nav flex-column nav-pills me-3 text-left" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <a className="text-black fs-3 fw-less-bold p-2">Información</a>
            <button className="nav-link text-start fw-less-bold active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Información General</button>
            <button className="nav-link text-start fw-less-bold" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Empleo y formación</button>
            <button className="nav-link text-start fw-less-bold" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Lugares de residencia</button>
            <button className="nav-link text-start fw-less-bold" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Información basica y de contacto</button>
            <button className="nav-link text-start fw-less-bold" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Familia y relaciones</button>
            <button className="nav-link text-start fw-less-bold" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Información sobre ti</button>
            <button className="nav-link text-start fw-less-bold" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Acontecimientos importantes</button>
            {/* <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Información General</button>
          <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Empleo y formación</button>
          <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Lugares de residencia</button>
          <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Información basica y de contacto</button> */}
          </div>

          <div className="tab-content" id="v-pills-tabContent">
            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">

              <div className="container mt-4">

                {/* CORREO */}
                <div className="row">
                  <div className="col-md-2 justify-content-center d-flex align-items-center">
                    <i className="fas fa-envelope fa-2x text-gray"></i>
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-12">
                        {user.email ? <div className="fs-5 fw-semi-bold">{user.email}</div> : user.username === auth.user.username ? (<a
                          href="#"
                        >
                          Agrega tu correo
                        </a>) : <span className="fw-less-bold text-muted">No hay información de correo disponible</span>}

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
                        {/* 
                        {
                          user.mobile ? <div className="fs-5 fw-semi-bold">{user.mobile}</div> : user.username === auth.user.username
                            ? <Crud auth={auth} fields={{ phones: '' }} addstr="tu celular" forallusersflag={false}/>
                            : <span className="fw-less-bold text-muted">No hay información de contacto disponible</span>
                        } */}
                        <Crud
                          auth={auth}
                          fields={{ number: ''  }}
                          modelRef="user"
                          addstr="tu celular"
                          forallusersflag={false}
                          model="phone"
                          optional={{
                            withDetail: false,
                            tabletype: 'list'
                          }}
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
            </div>
            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
            <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
            <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">

              <span className="p-2 fs-4 fw-semi-bold text-black">
                Información de contacto
              </span>

              <div className="container my-3">
                {/* MÓVIL */}
                <div className="row">
                  <div className="col-md-2 justify-content-center d-flex align-items-center">
                    <i className="fas fa-phone-alt fa-2x text-gray"></i>
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-12">
                        {
                          user.mobile ? <div className="fs-5 fw-semi-bold">{user.mobile}</div> : user.username === auth.user.username
                            ? <a href="#">Agrega tu celular</a>
                            : <span className="fw-less-bold text-muted">No hay información de contacto disponible</span>
                        }
                      </div>
                      <div className="col-md-12">
                        <div className="text-muted fs-8">Celular</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* END MÓVIL */}

                {/* ADDRESS */}
                <div className="row mt-4">
                  <div className="col-md-2 justify-content-center d-flex align-items-center">
                    <i className="fas fa-house-user fa-2x text-gray"></i>
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-12">
                        {
                          user.address ? <div className="fs-5 fw-semi-bold">{user.address}</div> : user.username === auth.user.username
                            ? <a href="#">Agrega tu dirección</a>
                            : <span className="fw-less-bold text-muted">
                              No hay información de ubicación disponible
                            </span>
                        }
                      </div>
                      <div className="col-md-12">
                        <div className="text-muted fs-8">Celular</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* END ADDRESS */}

                {/* CORREO */}
                <div className="row mt-4">
                  <div className="col-md-2 justify-content-center d-flex align-items-center">
                    <i className="fas fa-envelope fa-2x text-gray"></i>
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-12">
                        {user.email ? <div className="fs-5 fw-semi-bold">{user.email}</div> : user.username === auth.user.username ? (<a
                          href="#"
                        >
                          Agrega tu correo
                        </a>) : <span className="fw-less-bold text-muted">No hay información de correo disponible</span>}

                      </div>
                      <div className="col-md-12">
                        <div className="text-muted fs-8">Correo</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* END CORREO */}
              </div>

              <span className="p-2 pt-3 mt-5 fs-4 fw-semi-bold text-black">
                Información básica
              </span>

              <div className="container mt-3">

                {/* SEXO */}
                <div className="row">
                  <div className="col-md-2 justify-content-center d-flex align-items-center">
                    <i className={`fas fa-${user.gender == 'male' ? 'male' : 'female'} fa-2x text-gray`}></i>
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-12">
                        {user.gender
                          ? <div className="fs-5 fw-semi-bold">{user.gender == 'male' ? 'Hombre' : 'Mujer'}</div>
                          : <span className="fw-less-bold text-muted">Sin especificar</span>}
                      </div>
                      <div className="col-md-12">
                        <div className="text-muted fs-8">Sexo</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* END SEXO */}

                {/* CUMPLEAÑOS */}
                <div className="row mt-4">
                  <div className="col-md-2 justify-content-center d-flex align-items-center">
                    <i className="fas fa-birthday-cake fa-2x text-gray"></i>
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-12">
                        {user.birthday ? <div className="fs-5 fw-semi-bold">{user.birthday}</div> : user.username === auth.user.username ? (<a
                          href="#"
                        >
                          Agrega tu fecha de nacimiento
                        </a>) : <span className="fw-less-bold text-muted">No hay información de nacimiento disponible</span>}

                      </div>
                      <div className="col-md-12">
                        <div className="text-muted fs-8">Cumpleaños</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* END CUMPLEAÑOS */}
              </div>
            </div>
          </div>
        </div>
      ))}

    </>
  )
}

export default About
