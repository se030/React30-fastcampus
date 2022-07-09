### Web Editor

- with `react-quill@2.0.0-beta.4`

  according React version 17

<br />

1. auto save

   - onChange

     ```TypeScript
     useEffect(() => {
        localStorage.setItem("tempContent", JSON.stringify(content))
     }, [content]);
     ```

     👎🏻 inefficient

   - every N-seconds

     ```TypeScript
        useEffect(() => {
            const autosave = setInterval(() => {
                localStorage.setItem("tempContent", JSON.stringify(content))
            }, 5000)
            return () =>  clearInterval(autosave)
        }, [content]);
     ```

     👎🏻 some data may be lost, interval cleared == X work, in case `content` keeps changing

   - 💡 to optimize: save if

     1️⃣ content has changed during last N-seconds

     2️⃣ too many changes made before setInterval callback is called

     with `useRef()` to refer to content, `hasChangedRef`, `changeCountRef` inside of the setInterval callback
