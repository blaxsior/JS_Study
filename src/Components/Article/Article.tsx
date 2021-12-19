import React, { useEffect, useState } from "react";

const Article = (props: {userid: string|undefined}) => {
    const [text, setText] = useState("");

    useEffect(() => {
        const initialText = localStorage.getItem("createdArticle");
        if(initialText) {
            setText(initialText);
        }
    }, []);

    useEffect(() => {
        const p = setTimeout(() => {
            localStorage.setItem("createdArticle", text);
        }, 300);

        return () =>{
            console.log("value");
            clearTimeout(p);
        };
    },[text]);

    const textTypingHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    return (
        <textarea
            value={text}
            onChange={textTypingHandler}
        ></textarea>
    )
};

export default Article;