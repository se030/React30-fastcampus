import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

type EditorProps = ReactQuill['props'];
const Editor = (props: EditorProps) => {
  const toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

    [{ 'font': [] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    //[{ 'header': 1 }, { 'header': 2 }],               // custom button values

    [{ 'align': [] }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    ['blockquote', 'code-block'],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],

    ['clean'],                                        // remove formatting button

    ['image']
  ];

  return <ReactQuill
    {...props}
    modules={{ toolbar: toolbarOptions }}
  />
}

export default Editor;
