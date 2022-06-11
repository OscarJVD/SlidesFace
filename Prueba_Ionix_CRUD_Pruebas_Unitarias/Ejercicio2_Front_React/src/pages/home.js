import React from 'react';
import { useSelector } from 'react-redux';
import Crud from '../components/dinamic/Crud';

const Home = () => {

  const { auth } = useSelector((state) => state);

  return (
    <div>
      <Crud
        user={auth.user}
        model="phone"
        fields={{ number: '', pais: '' }}
        addstr={{ number: "tu celular", pais: "código del país" }}
        auth={auth}
        optional={{
          tableType: 'list'
        }}
      />
    </div>
  );
}

export default Home;
