import { inject, observer } from 'mobx-react';
import React from 'react';
import Layout from './../Component/Layout/adminFront.layout'

const Index = (props) => {
    props.AuthStore.getToken();
    return (
        <Layout>
            <div>ADMIN</div>    
        </Layout>
    )
};

export default inject("AuthStore")(observer(Index));