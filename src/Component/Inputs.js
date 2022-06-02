import { TextInput } from "@mantine/core";
import React from "react";

export default function InputText ({placeHolder, label, value, setValue}) {
    return(
        <TextInput placeholder={placeHolder} label={label} value={value} onChange={(e) => {setValue(e.currentTarget.value)}}
            styles={{
                label: {color: "#023047", fontSize: "31px", lineHeight: "37px"},
                input: {height: 72, width: 558, top: 43, borderRadius: 4}
            }}
        />
    )
}