import React, { useEffect } from "react";
import { connect } from "react-redux";
import DataCollection from '../components/datacollection.component';
import { fetchAllDatas } from "../redux/actions/datasActionCreators";

const DataPage = ({ loading, datas, dispatchFetchAllDatasAction }) => {
    
    useEffect(() => dispatchFetchAllDatasAction(), [dispatchFetchAllDatasAction]);

    return (
        <React.Fragment>
            <DataCollection datas={datas} />
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    loading: state.loading,
    datas: state.datas
});
const mapDispatchToProps = dispatch => ({
    dispatchFetchAllDatasAction: () => dispatch(fetchAllDatas())
});
export default connect(mapStateToProps, mapDispatchToProps)(DataPage);