import { useState } from 'react';
import ReactQuill, { Value } from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { GoCloudUpload } from 'react-icons/go'
import { GiMagicBroom } from 'react-icons/gi'

function App() {
  const buttonStyle = {
    backgroundColor: '#000',
    color: "#61dbfb",
    border: 'none',
    borderRadius: '3px',
    fontSize: '20px',
    padding: '7px 15px',
    margin: '5px 5px 5px 0px'
  }
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
  const [ post, setPost ] = useState<String[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("post")?? '');
    } catch(e) {
      localStorage.removeItem("post");
      return [];
    }
  })
  const [ content, setContent ] = useState<String>('')

  return <div>
    <div style={{
      position: 'sticky',
      top: '0px',
      margin: '8px',
      backgroundColor: 'white',
      paddingBottom: '5px',
      borderBottom: post.length? "2px solid #000" : "none"
    }}>
      <button onClick={() => {
          if (content?.length === 0) {
            alert("내용을 입력해주세요.")
            return;
          }
          setPost(prev => {
            const p = [ ...prev, content ]
            localStorage.setItem("post", JSON.stringify(p))   // 이 콜백이 실행되기 전에 localStorage 저장이 이루어지면 안됨
            return p;
          })
          setContent('')
        }}
        style={buttonStyle} 
      >
        <GoCloudUpload />
      </button>
      <button onClick={() => {
          if (window.confirm("포스트를 초기화하시겠습니까?")) {
            localStorage.clear();
            setPost([]);
          }
        }}
        style={buttonStyle}
      >
        <GiMagicBroom />
      </button>
      <ReactQuill
        value={content as Value}
        onChange={setContent}
        modules={{ toolbar: toolbarOptions }}
      />
    </div>
    {
      post.map((post, idx) => <div key={idx} style={{border: '1px solid #cccccc', margin: '8px'}}>
        <div dangerouslySetInnerHTML={{
          __html: post as string
        }} />
      </div>)
    }
  </div>
}

export default App;
