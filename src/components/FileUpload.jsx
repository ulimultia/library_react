import React from "react";

const noop = () => {};

const FileUpload = ({ value, onChange = noop, ...rest }) => (
  <div>
    {Boolean(value.length) && (
      <div>Selected files: {value.map((f) => f.name).join(", ")}</div>
    )}
    <label>
      Choose File
      <input
        {...rest}
        style={{ display: "none" }}
        type="file"
        onChange={(e) => {
          onChange([...e.target.files]);
        }}
      />
    </label>
  </div>
);

export default FileUpload;
