import React from "react";

const inputHelper = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, data: any) => {
    const tempData: any = {...data};
    tempData[e.target.name] = e.target.value;
    return tempData;
}

export default inputHelper;