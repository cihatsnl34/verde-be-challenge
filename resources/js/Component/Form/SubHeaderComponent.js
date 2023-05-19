import React from 'react';
const SubHeaderComponent = (props) => {
    return (
        <div>
            <button className={props.action.class} onClick={props.action.uri}>
                {props.action.title}
            </button>
            <input placeholder={"Search..."} onChange={props.filter} style={{ flex:1}} type="text"
            className="ml-1 form-control" />
        </div>
    )
};
export default SubHeaderComponent;