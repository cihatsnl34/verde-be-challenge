import React from "react";

const CustomInput = (props) => {
    return(
            <div className="form-group">
                <label htmlFor="wizard-progress-firstname">{ props.title}</label>
                <input
                {...props}
                />
          </div>
    );
};
export default CustomInput;