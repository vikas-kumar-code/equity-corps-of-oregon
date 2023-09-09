'use client'

import React, { memo } from 'react'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import '../../styles/ck-editor.css'

const Editor = ({ value, handleContent }) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={value}
            onChange={(event, editor) => {
                const data = editor.getData();
                handleContent(data);
            }}
        />
    )
}

export default memo(Editor)
