/* eslint-disable react/prop-types */
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
      [ { 'size': [] }],
      [ 'blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      ['clean']
    ],
  };
  
  const formats = [
    'size',
    'header', 'blockquote', 'code-block',
    'list', 'bullet',
    'script',
    'indent', 'align',
    'color', 'background',
    'link', 'image', 'video'
  ];

const Editor = ({ value, setValue}) => {
  return (
    <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        style={{ height: 200 }}
      />
  )
}

export default Editor